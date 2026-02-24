#!/usr/bin/env python3
"""
Send email using direct API call
"""
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import sys

def send_email(to_address, subject, body, from_address="bob@msg2ai.xyz"):
    """Send email via Zoho Mail SMTP"""

    # Get password from environment
    password = os.environ.get("ZOHO_MAIL_PWD", "")
    if not password:
        # Try to get from file (for testing)
        try:
            with open("/home/node/.zoho_password", "r") as f:
                password = f.read().strip()
        except:
            pass

    if not password:
        return False, "No password available - set ZOHO_MAIL_PWD env var or provide password"

    # Create message
    msg = MIMEMultipart("alternative")
    msg["From"] = from_address
    msg["To"] = to_address
    msg["Subject"] = subject

    # Attach body as plain text
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
    to = sys.argv[1] if len(sys.argv) > 1 else "bart@rtledgers.com"
    subject = sys.argv[2] if len(sys.argv) > 2 else "Test Email from Bob"
    body = sys.argv[3] if len(sys.argv) > 3 else "Hello! This is a test email from Bob."

    success, message = send_email(to, subject, body)
    if success:
        print(f"✅ {message}")
        sys.exit(0)
    else:
        print(f"❌ {message}")
        sys.exit(1)
