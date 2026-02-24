#!/usr/bin/env python3
"""
Get GCP secret using only standard library - no PyJWT dependency
Uses subprocess to call openssl for JWT signing
"""
import json
import base64
import subprocess
import sys
import time
import urllib.request
import urllib.parse

KEY_FILE = "/home/node/.gcp_service_account.json"

def base64url_encode(data):
    """Base64URL encode without padding"""
    if isinstance(data, str):
        data = data.encode()
    elif isinstance(data, dict):
        data = json.dumps(data).encode()
    return base64.urlsafe_b64encode(data).rstrip(b'=').decode()

def load_service_account():
    with open(KEY_FILE, "r") as f:
        return json.load(f)

def sign_with_openssl(data, private_key):
    """Sign data using openssl subprocess"""
    # Write private key to temp file
    import tempfile
    import os
    
    with tempfile.NamedTemporaryFile(mode='w', suffix='.pem', delete=False) as f:
        f.write(private_key)
        key_file = f.name
    
    try:
        # Create input data file
        with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False) as f:
            f.write(data)
            data_file = f.name
        
        # Sign with openssl
        result = subprocess.run(
            ['openssl', 'dgst', '-sha256', '-sign', key_file, data_file],
            capture_output=True
        )
        
        if result.returncode != 0:
            raise Exception(f"OpenSSL error: {result.stderr.decode()}")
        
        return base64url_encode(result.stdout)
    finally:
        os.unlink(key_file)
        os.unlink(data_file)

def get_access_token(sa):
    """Get OAuth2 access token using JWT signed with openssl"""
    now = int(time.time())
    exp = now + 3600
    
    # JWT header
    header = {"alg": "RS256", "typ": "JWT", "kid": sa["private_key_id"]}
    header_b64 = base64url_encode(header)
    
    # JWT payload (claims)
    payload = {
        "iss": sa["client_email"],
        "sub": sa["client_email"],
        "scope": "https://www.googleapis.com/auth/cloud-platform",
        "aud": "https://oauth2.googleapis.com/token",
        "exp": exp,
        "iat": now
    }
    payload_b64 = base64url_encode(payload)
    
    # Create signing input
    signing_input = f"{header_b64}.{payload_b64}"
    
    # Sign with openssl
    signature = sign_with_openssl(signing_input, sa["private_key"])
    
    # Complete JWT
    jwt_token = f"{signing_input}.{signature}"
    
    # Exchange JWT for access token
    token_url = "https://oauth2.googleapis.com/token"
    data = urllib.parse.urlencode({
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": jwt_token
    }).encode()
    
    req = urllib.request.Request(token_url, data=data, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    
    with urllib.request.urlopen(req) as response:
        token_response = json.loads(response.read().decode())
        return token_response["access_token"]

def get_secret(secret_name, project_id="molton-msg2qi"):
    """Get secret value from GCP Secret Manager"""
    sa = load_service_account()
    access_token = get_access_token(sa)
    
    secret_url = f"https://secretmanager.googleapis.com/v1/projects/{project_id}/secrets/{secret_name}/versions/latest:access"
    
    req = urllib.request.Request(secret_url, method="GET")
    req.add_header("Authorization", f"Bearer {access_token}")
    req.add_header("Content-Type", "application/json")
    
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode())
        # Secret data is base64 encoded
        secret_value = base64.b64decode(result["payload"]["data"]).decode("utf-8")
        return secret_value

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: gcp_get_secret_stdlib.py <secret_name>", file=sys.stderr)
        sys.exit(1)
    
    secret_name = sys.argv[1]
    try:
        value = get_secret(secret_name)
        print(value)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
