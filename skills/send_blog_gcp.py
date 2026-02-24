#!/usr/bin/env python3
"""
Send email using direct API call with GCP service account support
"""
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
import os
import sys
import subprocess

# Load service account key
KEY_FILE = "/home/node/.gcp_service_account.json"
with open(KEY_FILE, "r") as f:
    GCP_SA = json.load(f)

# For now, let's use the service account to get the password
def get_secret_via_gcloud(secret_name):
    """Get secret from GCP using service account"""
    result = subprocess.run(
        ["gcloud", "secrets", "versions", "access", "latest",
             "--secret=" + secret_name, "--project=621645080414"],
        capture_output=True,
        text=True,
        timeout=30,
        env={**os.environ, "GOOGLE_APPLICATION_CREDENTIALS": KEY_FILE}
    )

    if result.returncode == 0:
        return result.stdout.strip()
    else:
        return None

def send_email(to_address, subject, body, from_address="bob@msg2ai.xyz"):
    """Send email via Zoho Mail SMTP"""

    # Get password from GCP Secret Manager
    password = get_secret_via_gcloud("BOB_ZOHO_MAIL_PWD")

    if not password:
        return False, "Could not retrieve email password from GCP"

    print(f"📧 Sending email to {to_address}...")

    # Create message
    msg = MIMEMultipart("alternative")
    msg["From"] = from_address
    msg["To"] = to_address
    msg["Subject"] = subject

    # Attach body
    text_part = MIMEText(body, "plain")
    msg.attach(text_part)

    # Also as HTML for better formatting
    html_part = MIMEText(f"<html><body><pre style='white-space: pre-wrap; font-family: monospace;'>{body}</pre></body></html>", "html")
    msg.attach(html_part)

    # Send via SMTP
    try:
        with smtplib.SMTP_SSL("smtp.zoho.com", 465) as server:
            server.login(from_address, password)
            server.send_message(msg)
        return True, "Email sent successfully"
    except Exception as e:
        return False, str(e)

if __name__ == "__main__":
    # Read blog post
    to = sys.argv[1] if len(sys.argv) > 1 else "amille@rtledgers.com"
    subject = sys.argv[2] if len(sys.argv) > 2 else "Blog Post: The Future of AI Messaging (Expanded)"

    with open("/home/node/clawd/blog-future-ai-messaging-expanded.md", "r") as f:
        body = f.read()

    print(f"📧 Sending blog post to {to}...")
    success, message = send_email(to, subject, body)

    if success:
        print(f"✅ {message}")
        sys.exit(0)
    else:
        print(f"❌ {message}")
        sys.exit(1)
