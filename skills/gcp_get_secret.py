#!/usr/bin/env python3
"""
Get secrets from GCP Secret Manager using service account key
"""
import json
import sys
import time
import urllib.request
import urllib.parse
import urllib.error
import jwt
import os

KEY_FILE = "/home/node/.gcp_service_account.json"

def load_service_account():
    with open(KEY_FILE, "r") as f:
        return json.load(f)

def get_access_token(sa):
    """Get OAuth2 access token using JWT"""
    now = int(time.time())
    exp = now + 3600
    
    # Create JWT header and payload
    header = {"alg": "RS256", "typ": "JWT", "kid": sa["private_key_id"]}
    payload = {
        "iss": sa["client_email"],
        "sub": sa["client_email"],
        "scope": "https://www.googleapis.com/auth/cloud-platform",
        "aud": "https://oauth2.googleapis.com/token",
        "exp": exp,
        "iat": now
    }
    
    # Sign JWT
    private_key = sa["private_key"]
    signed_jwt = jwt.encode(payload, private_key, algorithm="RS256", headers=header)
    
    # Exchange JWT for access token
    token_url = "https://oauth2.googleapis.com/token"
    data = urllib.parse.urlencode({
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": signed_jwt
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
        import base64
        secret_value = base64.b64decode(result["payload"]["data"]).decode("utf-8")
        return secret_value

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: gcp_get_secret.py <secret_name>", file=sys.stderr)
        sys.exit(1)
    
    secret_name = sys.argv[1]
    try:
        value = get_secret(secret_name)
        print(value)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)