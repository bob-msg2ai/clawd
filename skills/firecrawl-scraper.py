#!/usr/bin/env python3
"""
Firecrawl API integration for web scraping and crawling

Usage:
    python3 firecrawl-scraper.py --url "https://example.com"
    python3 firecrawl-scraper.py --crawl "https://example.com" --limit 10
    python3 firecrawl-scraper.py --extract "https://example.com/article"
"""
import argparse
import json
import sys
import subprocess
import requests
from pathlib import Path

FIRECRAWL_API_URL = "https://api.firecrawl.dev/v0"

def get_api_key():
    """Get Firecrawl API key from GCP Secret Manager or environment"""
    # Try environment first
    api_key = sys.environ.get("FIRECRAWL_API_KEY", "")
    if api_key:
        return api_key

    # Try GCP Secret Manager
    try:
        result = subprocess.run(
            ["python3", "/home/node/clawd/skills/get_secret.py", "FIRECRAWL_API_KEY"],
            capture_output=True,
            text=True,
            timeout=10
        )
        if result.returncode == 0:
            return result.stdout.strip()
    except:
        pass

    # Fallback
    return ""

def scrape_url(url, api_key):
    """Scrape a single URL"""
    print(f"🕷️ Scraping: {url}")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    payload = {
        "url": url
    }

    try:
        response = requests.post(
            f"{FIRECRAWL_API_URL}/scrape",
            headers=headers,
            json=payload,
            timeout=30
        )

        if response.status_code == 200:
            data = response.json()
            return data
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            return None

    except Exception as e:
        print(f"❌ Request failed: {e}")
        return None

def crawl_website(url, api_key, limit=10, max_depth=2):
    """Crawl an entire website"""
    print(f"🌐 Crawling: {url} (max pages: {limit}, depth: {max_depth})")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    payload = {
        "url": url,
        "limit": limit,
        "maxDepth": max_depth
    }

    try:
        response = requests.post(
            f"{FIRECRAWL_API_URL}/crawl",
            headers=headers,
            json=payload,
            timeout=60
        )

        if response.status_code == 200:
            data = response.json()
            return data
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            return None

    except Exception as e:
        print(f"❌ Request failed: {e}")
        return None

def extract_content(url, api_key):
    """Extract structured content from URL"""
    print(f"📄 Extracting content: {url}")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    payload = {
        "url": url,
        "formats": ["markdown", "html"]
    }

    try:
        response = requests.post(
            f"{FIRECRAWL_API_URL}/scrape",
            headers=headers,
            json=payload,
            timeout=30
        )

        if response.status_code == 200:
            data = response.json()
            return data
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            return None

    except Exception as e:
        print(f"❌ Request failed: {e}")
        return None

def save_result(data, filename):
    """Save result to file"""
    output_dir = Path("/home/node/clawd/firecrawl-output")
    output_dir.mkdir(exist_ok=True)

    output_file = output_dir / filename
    with open(output_file, "w") as f:
        json.dump(data, f, indent=2)

    print(f"💾 Saved to: {output_file}")
    return output_file

def main():
    parser = argparse.ArgumentParser(description="Firecrawl web scraping and crawling")
    parser.add_argument("--url", help="Single URL to scrape")
    parser.add_argument("--crawl", help="Website to crawl")
    parser.add_argument("--extract", help="URL to extract structured content from")
    parser.add_argument("--limit", type=int, default=10, help="Max pages for crawl (default: 10)")
    parser.add_argument("--depth", type=int, default=2, help="Max crawl depth (default: 2)")
    parser.add_argument("--output", help="Output filename (default: auto-generated)")

    args = parser.parse_args()

    # Get API key
    api_key = get_api_key()
    if not api_key:
        print("❌ Error: No Firecrawl API key found")
        print("   Set FIRECRAWL_API_KEY environment variable or store in GCP Secret Manager")
        sys.exit(1)

    print(f"✅ API Key found: {api_key[:8]}...{api_key[-4:]}")

    result = None
    output_name = None

    # Execute requested operation
    if args.url:
        result = scrape_url(args.url, api_key)
        output_name = f"scrape_{args.url.replace('://', '_').replace('/', '_')}.json"

    elif args.crawl:
        result = crawl_website(args.crawl, api_key, args.limit, args.depth)
        output_name = f"crawl_{args.crawl.replace('://', '_').replace('/', '_')}.json"

    elif args.extract:
        result = extract_content(args.extract, api_key)
        output_name = f"extract_{args.extract.replace('://', '_').replace('/', '_')}.json"

    else:
        print("❌ Error: Please specify --url, --crawl, or --extract")
        parser.print_help()
        sys.exit(1)

    # Save and display result
    if result:
        output_file = save_result(result, args.output or output_name)

        # Print summary
        if "markdown" in result:
            print(f"\n📄 Content Length: {len(result['markdown'])} characters")
            print(f"📝 Preview (first 200 chars):")
            print(result['markdown'][:200] + "..." if len(result['markdown']) > 200 else result['markdown'])

        if "content" in result:
            print(f"\n📄 Content Retrieved")

        if "total" in result:
            print(f"\n📊 Total Pages Crawled: {result['total']}")

        print(f"\n✅ Complete! Full data saved to: {output_file}")

    else:
        print("\n❌ Failed to retrieve data")
        sys.exit(1)

if __name__ == "__main__":
    main()
