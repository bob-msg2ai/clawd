#!/usr/bin/env python3
"""
Knowledge Base Manager - List and search KB entries

Usage:
    python3 kb-manager.py list           # Show all KB entries
    python3 kb-manager.py search <term> # Search in titles and descriptions
"""
import json
import sys
from pathlib import Path

# KB entries location
KB_DIR = Path("/home/node/clawd/skills")
REGISTRY_FILE = KB_DIR / "registry.json"

def load_kb_entries():
    """Load all KB entries from registry"""
    if not REGISTRY_FILE.exists():
        return []

    with open(REGISTRY_FILE, "r") as f:
        data = json.load(f)

    kb_entries = data.get("kb_entries", {})
    return [
        {
            "id": kb_id,
            "file": entry.get("file", ""),
            "title": entry.get("title", ""),
            "category": entry.get("category", "")
        }
        for kb_id, entry in kb_entries.items()
    ]

def list_kb_entries():
    """List all KB entries organized by category"""
    entries = load_kb_entries()

    if not entries:
        print("📚 No knowledge base entries found")
        return

    # Organize by category
    by_category = {}
    for entry in entries:
        cat = entry["category"]
        if cat not in by_category:
            by_category[cat] = []
        by_category[cat].append(entry)

    # Print by category
    print("\n" + "=" * 80)
    print("📚 KNOWLEDGE BASE ENTRIES")
    print("=" * 80)
    print()

    category_order = ["email", "web", "gcp", "github", "system", "ai"]

    for category in category_order:
        if category not in by_category:
            continue

        cat_emoji = {
            "email": "📧",
            "web": "🌐",
            "gcp": "☁️",
            "github": "📦",
            "system": "⚙️",
            "ai": "🤖"
        }.get(category, "📚")

        entries_in_cat = by_category[category]
        print(f"{cat_emoji} {category.upper():<20} ({len(entries_in_cat)} entries)")

        for entry in entries_in_cat:
            ellipsis = "..." if len(entry['title']) > 60 else ""
            print(f"   {entry['id']}: {entry['title'][:60]}{ellipsis}")
            print(f"        File: {entry['file'][:40]}")

    print()
    print(f"📊 Total: {len(entries)} KB entries")
    print("=" * 80)
    print()

def search_kb(search_term):
    """Search KB entries by title or description"""
    entries = load_kb_entries()

    # Load full KB entry files to search descriptions
    searchable = []
    for entry in entries:
        kb_file = KB_DIR / entry["file"]
        if kb_file.exists():
            try:
                with open(kb_file, "r") as f:
                    content = f.read()
                    searchable.append({
                        "id": entry["id"],
                        "title": entry["title"],
                        "file": entry["file"],
                        "category": entry["category"],
                        "content": content
                    })
            except:
                searchable.append({
                    "id": entry["id"],
                    "title": entry["title"],
                    "file": entry["file"],
                    "category": entry["category"],
                    "content": ""
                })
        else:
            searchable.append({
                "id": entry["id"],
                "title": entry["title"],
                "file": entry["file"],
                "category": entry["category"],
                "content": ""
            })

    # Search in title and content
    search_term_lower = search_term.lower()
    results = []

    for entry in searchable:
        # Search in title
        if search_term_lower in entry["title"].lower():
            results.append({
                **entry,
                "match_in": "title"
            })
            continue

        # Search in content
        if search_term_lower in entry["content"].lower():
            results.append({
                **entry,
                "match_in": "content"
            })

    # Remove duplicates
    seen_ids = set()
    unique_results = []
    for result in results:
        if result["id"] not in seen_ids:
            seen_ids.add(result["id"])
            unique_results.append(result)

    # Display results
    if not unique_results:
        print(f"\n🔍 No results found for: '{search_term}'")
        print("   Try a different search term or view all entries with 'list'")
        return

    print("\n" + "=" * 80)
    print(f"🔍 SEARCH RESULTS: '{search_term}'")
    print("=" * 80)
    print()

    # Group by match location
    by_title = [r for r in unique_results if r["match_in"] == "title"]
    by_content = [r for r in unique_results if r["match_in"] == "content"]

    if by_title:
        print(f"📝 Found {len(by_title)} match(es) in TITLE:")
        for result in by_title[:10]:  # Max 10 results
            match_location = result["match_in"].upper()
            cat = result["category"]
            title_short = result['title'][:60]
            print(f"   {result['id']} [{match_location}] {title_short}")
            print(f"        Category: {cat} | File: {result['file'][:40]}")
        if len(by_title) > 10:
            print(f"   ... and {len(by_title) - 10} more")

    if by_content:
        print(f"\n📄 Found {len(by_content)} match(es) in CONTENT:")
        for result in by_content[:10]:
            match_location = result["match_in"].upper()
            cat = result["category"]
            title_short = result['title'][:60]
            print(f"   {result['id']} [{match_location}] {title_short}")
            print(f"        Category: {cat} | File: {result['file'][:40]}")
        if len(by_content) > 10:
            print(f"   ... and {len(by_content) - 10} more")

    print()
    print(f"📊 Total Results: {len(unique_results)} matches")
    print(f"💡 Tip: Use 'KB <id>' to get full content, e.g., 'KB001'")
    print("=" * 80)
    print()

def main():
    if len(sys.argv) < 2:
        # List all entries
        list_kb_entries()
    elif sys.argv[1] == "list":
        list_kb_entries()
    elif sys.argv[1] == "search":
        if len(sys.argv) < 3:
            print("❌ Error: Please provide search term")
            print("   Usage: python3 kb-manager.py search <term>")
            sys.exit(1)
        search_kb(sys.argv[2])
    else:
        print("❌ Error: Unknown command")
        print("   Usage: python3 kb-manager.py [list|search] [term]")
        sys.exit(1)

if __name__ == "__main__":
    main()
