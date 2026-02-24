#!/usr/bin/env python3
"""
List secrets in GCP Secret Manager
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

def list_secrets(project_id="molton-msg2qi"):
    """List secrets in GCP Secret Manager"""
    sa = load_service_account()
    access_token = get_access_token(sa)
    
    url = f"https://secretmanager.googleapis.com/v1/projects/{project_id}/secrets"
    
    req = urllib.request.Request(url, method="GET")
    req.add_header("Authorization", f"Bearer {access_token}")
    req.add_header("Content-Type", "application/json")
    
    with urllib.request.urlopen(req, timeout=30) as response:
        result = json.loads(response.read().decode())
        secrets = result.get("secrets", [])
        return [s["name"].split("/")[-1] for s in secrets]

if __name__ == "__main__":
    try:
        secrets = list_secrets()
        print("Secrets in GCP:")
        for s in secrets:
            print(f"  - {s}")
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)