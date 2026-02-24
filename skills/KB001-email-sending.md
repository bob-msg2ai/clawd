# 📚 Knowledge Base Entry

**KB ID:** KB001
**Created:** 2026-01-30 14:47 UTC
**Category:** Email
**Topic:** Zoho Mail SMTP Configuration

## Question
"How do I send an email using Zoho Mail?"

## Answer

**SMTP Configuration:**
- **Server:** smtp.zoho.com
- **Port:** 465 (SSL)
- **From:** bob@msg2ai.xyz
- **Password:** Stored in GCP Secret Manager (`BOB_ZOHO_MAIL_PWD`)

**Usage:**
To send a test email, run:
```bash
python3 /home/node/clawd/skills/email-send-test.py
```

Customize with:
- `--to [email]` - Different recipient (default: bart@rtledgers.com)
- `--subject [text]` - Custom subject
- `--body [text]` - Custom body

**Example:**
```bash
python3 /home/node/clawd/skills/email-send-test.py --to someone@example.com --subject "Test" --body "Hello World"
```

**Status:** ✅ Working (tested on 2026-01-30 11:56 UTC)

## Related Skills
- KB002: Check Email Inbox (IMAP access)
