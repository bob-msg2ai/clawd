# 📚 Knowledge Base Entry

**KB ID:** KB008
**Created:** 2026-01-31 05:45 UTC
**Category:** System
**Topic:** Knowledge Base Search and Listing

## Question
"How do I list and search my knowledge base?"

## Answer

**What is Knowledge Base Manager?**
A skill to list all KB entries and search through titles and descriptions of all knowledge base articles.

**KB Entries:**
- KB001: Email Sending
- KB002: Firecrawl API
- KB003: Image Limitations
- KB004: Weather Fetching
- KB005: Firecrawl Integration
- KB006: Task Management
- KB007: Kanban Task Board
- KB008: Knowledge Base Search (this entry)
- And more...

**Usage:**

### List All KB Entries
```bash
# Show all entries organized by category
python3 /home/node/clawd/skills/kb-manager.py list
```

### Search Knowledge Base
```bash
# Search in both title and description content
python3 /home/node/clawd/skills/kb-manager.py search <term>

# Examples
python3 /home/node/clawd/skills/kb-manager.py search email
python3 /home/node/clawd/skills/kb-manager.py search firecrawl
python3 /home/node/clawd/skills/kb-manager.py search task
```

**Output Example - List:**
```
📚 KNOWLEDGE BASE ENTRIES
================================================================================

📧 EMAIL                (1 entries)
   KB001: Email Sending
        File: KB001-email-sending.md
🌐 WEB                  (3 entries)
   KB002: Firecrawl API
        File: KB002-firecrawl.md
   KB004: Weather Fetching
        File: KB004-weather-fetching.md
   KB005: Firecrawl Integration
        File: KB005-firecrawl-integration.md
⚙️ SYSTEM               (3 entries)
   KB003: Image Limitations
        File: KB003-image-limitations.md
   KB006: Task Management
        File: KB006-task-management.md
   KB007: Kanban Task Board
        File: KB007-kanban-board.md

📊 Total: 7 KB entries
================================================================================
```

**Output Example - Search:**
```
🔍 SEARCH RESULTS: 'email'
================================================================================

📝 Found 1 match(es) in TITLE:
   KB001 [TITLE] Email Sending
        Category: email | File: KB001-email-sending.md

📄 Found 6 match(es) in CONTENT:
   KB002 [CONTENT] Firecrawl API
        Category: web | File: KB002-firecrawl.md
   KB003 [CONTENT] Image Limitations
        Category: system | File: KB003-image-limitations.md
   KB004 [CONTENT] Weather Fetching
        Category: web | File: KB004-weather-fetching.md
   KB005 [CONTENT] Firecrawl Integration
        Category: web | File: KB005-firecrawl-integration.md
   KB006 [CONTENT] Task Management
        Category: system | File: KB006-task-management.md
   KB007 [CONTENT] Kanban Task Board
        Category: system | File: KB007-kanban-board.md

📊 Total Results: 7 matches
💡 Tip: Use 'KB <id>' to get full content, e.g., 'KB001'
================================================================================
```

**Features:**
- ✅ Lists all KB entries organized by category
- ✅ Searches in both title and description content
- ✅ Shows results grouped by match location (title vs content)
- ✅ Limits to top 10 results per category to avoid overwhelming output
- ✅ Displays KB ID, category, and filename
- ✅ Tips on how to get full content

**Search Behavior:**
- Searches are case-insensitive
- Finds partial matches (not just exact)
- Prioritizes title matches over content matches
- Shows total count of all matches

**Status:** ✅ Working (tested and validated on 2026-01-31 05:45 UTC)

## Use Cases

1. **Quick Reference:** See all available knowledge at a glance
2. **Topic Discovery:** Find KB entries related to a specific topic
3. **Documentation Lookup:** Search for specific commands, configurations, or workflows
4. **Learning:** Browse knowledge base to learn new capabilities

## Related Skills
- All KB entries are searchable through this tool
- KB006: Task Management (for managing KB updates)

## Future Enhancements

- Search within KB entry content (not just title/description)
- Filter by category when listing
- Export KB entries to JSON/markdown
- Add tags to KB entries for better search
- Fuzzy search capabilities
