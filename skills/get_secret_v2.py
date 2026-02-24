#!/usr/bin/env python3
"""
Get secret from GCP Secret Manager using REST API and service account key
"""
import json
import sys
import os
import urllib.request
import urllib.parse

# Load service account key
KEY_FILE = "/home/node/.gcp_service_account.json"

with open(KEY_FILE, "r") as f:
    SERVICE_ACCOUNT = json.load(f)

def get_access_token():
    """Get OAuth2 access token from service account"""
    now = int(os.popen("date +%s").read().strip())
    exp = now + 3600  # 1 hour expiration

    header = {
        "alg": "RS256",
        "typ": "JWT"
    }

    payload = {
        "iss": SERVICE_ACCOUNT["client_email"],
        "scope": "https://www.googleapis.com/auth/cloudplatform",
        "aud": "https://oauth2.googleapis.com/token",
        "exp": exp,
        "iat": now
    }

    # Create JWT (simplified - would need proper JWT library)
    # For now, let's try using gcloud with env var
    pass

def get_secret_simple():
    """Simple approach using GOOGLE_APPLICATION_CREDENTIALS env var"""
    # Set env var and try gcloud
    import subprocess
    result = subprocess.run(
        ["gcloud", "secrets", "versions", "access", "latest",
             "--secret=" + sys.argv[1], "--project=621645080414"],
        capture_output=True,
        text=True,
        timeout=30,
        env={**os.environ, "GOOGLE_APPLICATION_CREDENTIALS": KEY_FILE}
    )

    if result.returncode == 0:
        return result.stdout.strip()
    else:
        print(f"Error: {result.stderr}", file=sys.stderr)
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: get_secret_v2.py <secret_name>", file=sys.stderr)
        sys.exit(1)

    secret_name = sys.argv[1]
    value = get_secret_simple()

    if value:
        print(value)
    else:
        print(f"Could not retrieve secret: {secret_name}", file=sys.stderr)
        sys.exit(1)
