#!/usr/bin/env python3
"""
Add a secret to GCP Secret Manager
"""
import json
import sys
import time
import base64
import urllib.request
import urllib.parse
import tempfile
import subprocess
import os

KEY_FILE = "/home/node/.gcp_service_account.json"

def load_service_account():
    with open(KEY_FILE, "r") as f:
        return json.load(f)

def get_access_token(sa):
    """Get OAuth2 access token using JWT"""
    now = int(time.time())
    exp = now + 3600
    
    header = json.dumps({"alg": "RS256", "typ": "JWT", "kid": sa["private_key_id"]})
    header_b64 = base64.urlsafe_b64encode(header.encode()).rstrip(b'=').decode('ascii')
    
    payload = json.dumps({
        "iss": sa["client_email"],
        "sub": sa["client_email"],
        "scope": "https://www.googleapis.com/auth/cloud-platform",
        "aud": "https://oauth2.googleapis.com/token",
        "exp": exp,
        "iat": now
    })
    payload_b64 = base64.urlsafe_b64encode(payload.encode()).rstrip(b'=').decode('ascii')
    
    jwt_unsigned = f"{header_b64}.{payload_b64}"
    
    with tempfile.NamedTemporaryFile(mode='w', suffix='.pem', delete=False) as f:
        f.write(sa["private_key"])
        key_file = f.name
    
    try:
        result = subprocess.run(
            ["openssl", "dgst", "-sha256", "-sign", key_file],
            input=jwt_unsigned.encode(),
            capture_output=True,
            timeout=10
        )
        signature = base64.urlsafe_b64encode(result.stdout).rstrip(b'=').decode('ascii')
        signed_jwt = f"{jwt_unsigned}.{signature}"
        
        token_url = "https://oauth2.googleapis.com/token"
        data = urllib.parse.urlencode({
            "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
            "assertion": signed_jwt
        }).encode()
        
        req = urllib.request.Request(token_url, data=data, method="POST")
        req.add_header("Content-Type", "application/x-www-form-urlencoded")
        
        with urllib.request.urlopen(req, timeout=30) as response:
            token_response = json.loads(response.read().decode())
            return token_response["access_token"]
    finally:
        os.unlink(key_file)

def create_secret(secret_name, secret_value, project_id="molton-msg2qi"):
    """Create a secret in GCP Secret Manager"""
    sa = load_service_account()
    access_token = get_access_token(sa)
    
    # First create the secret with secretId in URL
    create_url = f"https://secretmanager.googleapis.com/v1/projects/{project_id}/secrets?secretId={secret_name}"
    create_data = json.dumps({
        "replication": {
            "automatic": {}
        }
    }).encode()
    
    req = urllib.request.Request(create_url, data=create_data, method="POST")
    req.add_header("Authorization", f"Bearer {access_token}")
    req.add_header("Content-Type", "application/json")
    
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            result = json.loads(response.read().decode())
            print(f"Secret created: {result['name']}")
    except urllib.error.HTTPError as e:
        if e.code == 409:
            print(f"Secret {secret_name} already exists, adding new version...")
        else:
            error_body = e.read().decode()
            print(f"Create secret error: {error_body}", file=sys.stderr)
            raise
    
    # Now add a version with the secret value
    version_url = f"https://secretmanager.googleapis.com/v1/projects/{project_id}/secrets/{secret_name}:addVersion"
    version_data = json.dumps({
        "payload": {
            "data": base64.b64encode(secret_value.encode()).decode()
        }
    }).encode()
    
    req = urllib.request.Request(version_url, data=version_data, method="POST")
    req.add_header("Authorization", f"Bearer {access_token}")
    req.add_header("Content-Type", "application/json")
    req.add_header("X-Goog-User-Project", project_id)
    
    with urllib.request.urlopen(req, timeout=30) as response:
        result = json.loads(response.read().decode())
        return result["name"]

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: gcp_add_secret.py <secret_name> <secret_value>", file=sys.stderr)
        sys.exit(1)
    
    secret_name = sys.argv[1]
    secret_value = sys.argv[2]
    
    try:
        version_name = create_secret(secret_name, secret_value)
        print(f"Secret version created: {version_name}")
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)