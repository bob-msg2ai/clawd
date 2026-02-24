#!/usr/bin/env python3
import subprocess
import json
import os

def add_firecrawl_skill():
    # Get Firecrawl API key from Bart's message
    firecrawl_api_key = "pending-from-bart"  # Bart said he'll provide API key

    # Read current registry
    registry_path = "/home/node/clawd/skills/skills/registry.json"
    
    try:
        with open(registry_path, 'r') as f:
            registry = json.load(f)
    except:
        registry = {"version": 1, "categories": {}, "last_updated": ""}

    # Add web category with Firecrawl skills
    if 'web' not in registry['categories']:
        registry['categories']['web'] = {
            "name": "Web",
            "description": "Web crawling, scraping, API interactions",
            "skills": []
        }

    # Add Firecrawl skills
    registry['categories']['web']['skills'] = [
        {
            "id": "firecrawl-test",
            "name": "Test Firecrawl API",
            "description": "Test Firecrawl API access with provided API key",
            "code": "python3 /home/node/clawd/skills/firecrawl-test.py"
        },
        {
            "id": "firecrawl-crawl",
            "name": "Crawl Website",
            "description": "Crawl a website using Firecrawl",
            "code": "python3 /home/node/clawd/skills/firecrawl-crawl.py"
        },
        {
            "id": "firecrawl-scrape",
            "name": "Scrape Specific Page",
            "description": "Scrape a specific URL using Firecrawl",
            "code": "python3 /home/node/clawd/skills/firecrawl-scrape.py"
        }
    ]

    # Update timestamp
    registry['last_updated'] = "2026-01-30T16:05:00Z"

    # Write back
    with open(registry_path, 'w') as f:
        json.dump(registry, f, indent=2)

    print("✅ Added Firecrawl skills to registry")
    print(f"   API Key: {firecrawl_api_key}")
    print(f"   3 Skills added: test, crawl, scrape")
    print(f"   Registry updated: {registry['last_updated']}")

if __name__ == "__main__":
    add_firecrawl_skill()
