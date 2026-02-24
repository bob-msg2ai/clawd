#!/usr/bin/env python3
"""
Get secret from GCP Secret Manager
"""
import subprocess
import sys

def get_secret(secret_name, project_id="621645080414"):
    """Get secret value from GCP Secret Manager"""
    try:
        # Try using gcloud CLI
        result = subprocess.run(
            ["/home/node/google-cloud-sdk/bin/gcloud", "secrets", "versions", "access", "latest",
             "--secret=" + secret_name, "--project=" + str(project_id)],
            capture_output=True,
            text=True,
            timeout=30
        )
        if result.returncode == 0:
            return result.stdout.strip()
        else:
            return None
    except Exception as e:
        print(f"Error accessing secret: {e}", file=sys.stderr)
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: get_secret.py <secret_name>", file=sys.stderr)
        sys.exit(1)

    secret_name = sys.argv[1]
    value = get_secret(secret_name)

    if value:
        print(value)
        sys.exit(0)
    else:
        print(f"Could not retrieve secret: {secret_name}", file=sys.stderr)
        sys.exit(1)
