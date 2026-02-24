#!/usr/bin/env python3
"""
Firecrawl API integration for web scraping and crawling (Python stdlib version)

Usage:
    python3 firecrawl-scraper.py --url "https://example.com"
    python3 firecrawl-scraper.py --test-key
"""
import argparse
import json
import sys
import os
import urllib.request
import urllib.parse
from pathlib import Path

FIRECRAWL_API_URL = "https://api.firecrawl.dev/v0"

def get_api_key():
    """Get Firecrawl API key from GCP Secret Manager or environment"""
    # Try environment first
    api_key = os.environ.get("FIRECRAWL_API_KEY", "")
    if api_key:
        return api_key

    # Try file
    try:
        with open("/home/node/.firecrawl_key", "r") as f:
            return f.read().strip()
    except:
        pass

    return ""

def test_api_key(api_key):
    """Test if API key is valid"""
    print(f"🔑 Testing API key: {api_key[:8]}...{api_key[-4:]}")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    payload = {
        "url": "https://example.com"
    }

    try:
        req = urllib.request.Request(
            f"{FIRECRAWL_API_URL}/scrape",
            data=json.dumps(payload).encode('utf-8'),
            headers=headers,
            method='POST'
        )

        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
            print("✅ API key is valid!")
            return True

    except urllib.error.HTTPError as e:
        print(f"❌ HTTP Error: {e.code} - {e.reason}")
        if e.code == 401:
            print("   API key is invalid or expired")
        return False

    except Exception as e:
        print(f"❌ Error: {e}")
        return False

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
        req = urllib.request.Request(
            f"{FIRECRAWL_API_URL}/scrape",
            data=json.dumps(payload).encode('utf-8'),
            headers=headers,
            method='POST'
        )

        with urllib.request.urlopen(req, timeout=30) as response:
            data = json.loads(response.read().decode('utf-8'))
            print("✅ Scrape successful!")
            return data

    except urllib.error.HTTPError as e:
        print(f"❌ HTTP Error: {e.code} - {e.reason}")
        print(f"   Response: {e.read().decode('utf-8')}")
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
    parser.add_argument("--test-key", action="store_true", help="Test if API key is valid")
    parser.add_argument("--url", help="Single URL to scrape")
    parser.add_argument("--output", help="Output filename (default: auto-generated)")
    parser.add_argument("--set-key", help="Set Firecrawl API key (stores to /home/node/.firecrawl_key)")

    args = parser.parse_args()

    # Set key
    if args.set_key:
        with open("/home/node/.firecrawl_key", "w") as f:
            f.write(args.set_key.strip())
        print(f"✅ API key saved to /home/node/.firecrawl_key")
        return

    # Get API key
    api_key = get_api_key()
    if not api_key:
        print("❌ Error: No Firecrawl API key found")
        print("   Options:")
        print("   1. Set FIRECRAWL_API_KEY environment variable")
        print("   2. Store in GCP Secret Manager as FIRECRAWL_API_KEY")
        print("   3. Use --set-key flag to store to file")
        sys.exit(1)

    print(f"✅ API Key found: {api_key[:8]}...{api_key[-4:]}")

    # Test key
    if args.test_key:
        success = test_api_key(api_key)
        sys.exit(0 if success else 1)

    result = None
    output_name = None

    # Execute requested operation
    if args.url:
        result = scrape_url(args.url, api_key)
        safe_url = args.url.replace('https://', '').replace('http://', '').replace('/', '_')
        output_name = f"scrape_{safe_url}.json"

    else:
        print("❌ Error: Please specify --url or --test-key")
        parser.print_help()
        sys.exit(1)

    # Save and display result
    if result:
        output_file = save_result(result, args.output or output_name)

        # Print summary
        if "markdown" in result:
            print(f"\n📄 Content Length: {len(result['markdown'])} characters")
            print(f"📝 Preview (first 200 chars):")
            preview = result['markdown'][:200] + "..." if len(result['markdown']) > 200 else result['markdown']
            print(preview)

        print(f"\n✅ Complete! Full data saved to: {output_file}")

    else:
        print("\n❌ Failed to retrieve data")
        sys.exit(1)

if __name__ == "__main__":
    main()
