# 📋 Skills Registry

*Tracks available skills and capabilities.*

**How to use:**
I maintain this registry of skills I can execute. When you ask me to use a skill, I'll look it up here.

**Current Skills:**

## 📧 Email

### Available Skills:
- **email-send-test** — Send test emails using Zoho Mail SMTP
- **email-check-inbox** — Check IMAP inbox for unread emails

### Usage:
```
Send: "email-send-test" or "Send test email to [email]"
Check: "email-check-inbox"
```

### Configuration:
- **From:** bob@msg2ai.xyz
- **To (default):** bart@rtledgers.com
- **SMTP:** smtp.zoho.com:465 (SSL)
- **IMAP:** imap.zoho.com:993 (SSL)
- **Password:** Stored in GCP Secret Manager `BOB_ZOHO_MAIL_PWD`

### Status:
- ✅ Sending working
- ✅ Reading working

---

## 🌐 Web

### Available Skills:
- **firecrawl-test** — Test Firecrawl API access (NEW - pending API key)
- **firecrawl-crawl** — Crawl websites using Firecrawl
- **firecrawl-scrape** - Scrape specific pages using Firecrawl

### Usage:
```
Test: "firecrawl-test"
Crawl: "firecrawl-crawl [url]"
Scrape: "firecrawl-scrape [url]"
```

### Configuration:
- **API:** Firecrawl web crawling and scraping API
- **Status:** ⏳ Pending API key setup
- **Documentation:** See KB002-firecrawl

---

## 🔧 GitHub

### Available Skills:
- **github-clone-repo** — Clone a GitHub repository
- **github-create-repo** — Create a new GitHub repository (requires `repo` scope)
- **github-check-permissions** — Check permissions for a repository
- **github-list-repos** — List accessible repositories

### Usage:
```
Clone: "github-clone-repo [url]"
Create: "github-create-repo [name]"
Check: "github-check-permissions [owner/repo]"
List: "github-list-repos"
```

### Configuration:
- **Account:** bob-msg2ai (ID: 258233331)
- **Token:** Stored in GCP Secret Manager `GITHUB_TOKEN`
- **Current Limitations:** PAT has `public_repo` scope only (cannot create/write repos)
- **Accessible Orgs:** openclaw, RethinkLedgers (read-only)

### Status:
- ✅ Reading public repos working
- ❌ Creating/writing repos blocked (missing `repo` scope)

---

## 🔧 Git

### Available Skills:
- (Coming soon - git operations integration)

---

## 🔧 GCP

### Available Skills:
- **gcp-secret-get** — Retrieve a secret from GCP Secret Manager
- **gcp-secret-list** — List all secrets in a project
- **gcp-auth-activate** — Activate service account for gcloud CLI

### Usage:
```
Get secret: "gcp-secret-get [secret-name]"
List secrets: "gcp-secret-list"
Activate SA: "gcp-auth-activate [key-file]"
```

### Configuration:
- **Project:** molton-msg2qi (621645080414)
- **Service Account:** secret-manager@molton-msg2qi.iam.gserviceaccount.com
- **Key stored in:** GCP Secret Manager `GCP_SA_KEY_SECRET_MANAGER` (version 2)

### Status:
- ✅ Access working

---

## 🖥 System

### Available Skills:
- **file-read** — Read a file from the workspace
- **file-write** — Write content to a file
- **file-list** — List files in a directory
- **command-exec** — Execute a shell command

### Usage:
```
Read: "file-read [path]"
Write: "file-write [path] [content]"
List: "file-list [path]"
Execute: "command-exec [command]"
```

### Status:
- ✅ All system operations working

---

## 📚 Knowledge Base

### Available Skills:
- **kb-search** — Search knowledge base for topics
- **kb-add** — Add new entry to knowledge base
- **kb-get** — Get specific KB entry by ID

### Usage:
```
Search: "kb-search [topic]"
Add: "kb-add [topic] [links]"
Get: "kb-get [KB-ID]"
```

### Configuration:
- **KB Location:** `/home/node/clawd/skills/`
- **Registry:** `/home/node/clawd/skills/skills/registry.json`

### Status:
- ✅ KB system operational
- ✅ KB001-email-sending available

---

## 🛠️ Limitations

### Current Limitations:
- **GitHub:** Cannot create private repos, cannot write to repos (PAT has `public_repo` scope only)
- **Web:** No browsing capabilities (CLI environment only)
- **Browser Extensions:** Cannot install or use browser extensions (no GUI browser access)

### Notes:
- To unlock full GitHub capabilities, update PAT to include `repo` scope
- For web automation, I can use APIs (curl, python) to interact with web services

---

**Last Updated:** 2026-01-30 16:05 UTC
