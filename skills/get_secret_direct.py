#!/usr/bin/env python3
"""
Get secret from GCP Secret Manager using service account (pure Python)
"""
import json
import sys
import base64
import urllib.request
import urllib.parse
from time import time

# Load service account
with open("/home/node/.gcp_service_account.json", "r") as f:
    SA = json.load(f)

def base64url_encode(data):
    """Base64 URL-safe encoding"""
    return base64.urlsafe_b64encode(data.encode()).decode()

def create_jwt():
    """Create JWT from service account"""
    now = int(time.time())
    exp = now + 3600  # 1 hour expiration

    header = {
        "alg": "RS256",
        "typ": "JWT"
    }

    payload = {
        "iss": SA["client_email"],
        "scope": "https://www.googleapis.com/auth/cloudplatform",
        "aud": "https://oauth2.googleapis.com/token",
        "exp": exp,
        "iat": now
    }

    # Encode header and payload
    encoded_header = base64url_encode(json.dumps(header))
    encoded_payload = base64url_encode(json.dumps(payload))

    # Create signature (simplified - would need proper crypto lib)
    # For now, return None to indicate we need proper JWT library
    return None

def get_access_token():
    """Get access token for service account"""
    # Try using OAuth 2.0 with service account (without JWT for now)
    # Use the secretmanager REST API with service account

    # For simplicity, let's try getting token via OAuth 2.0
    # with service account credentials (server-to-server flow)

    # This requires proper JWT creation which needs cryptography library
    # Let's return None and use fallback
    return None

def get_secret_fallback(secret_name):
    """Fallback: Use gcloud with service account"""
    import subprocess
    import os

    result = subprocess.run(
        ["gcloud", "secrets", "versions", "access", "latest",
             "--secret=" + secret_name, "--project=621645080414"],
        capture_output=True,
        text=True,
        timeout=30,
        env={**os.environ, "GOOGLE_APPLICATION_CREDENTIALS": "/home/node/.gcp_service_account.json"}
    )

    if result.returncode == 0:
        return result.stdout.strip()
    return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: get_secret_direct.py <secret_name>", file=sys.stderr)
        sys.exit(1)

    secret_name = sys.argv[1]

    # Try gcloud fallback
    value = get_secret_fallback(secret_name)

    if value:
        print(value)
        sys.exit(0)
    else:
        print(f"Could not retrieve secret: {secret_name}", file=sys.stderr)
        sys.exit(1)
