# 📚 Knowledge Base Entry

**KB ID:** KB005
**Created:** 2026-01-31 05:00 UTC
**Category:** Web
**Topic:** Firecrawl API Integration

## Question
"How do I use Firecrawl to scrape or crawl websites?"

## Answer

**What is Firecrawl?**
Firecrawl is an API for web scraping and crawling that handles complex websites, JavaScript rendering, and data extraction automatically.

**API Key:**
- **Status:** ✅ Provisioned and validated (2026-01-31)
- **Key:** fc-d3943f88605e47c985dd2055d43db650
- **Storage:** `/home/node/.firecrawl_key` (and GCP Secret Manager)

**Usage:**

### Set API Key (first time only)
```bash
python3 /home/node/clawd/skills/firecrawl-scraper-stdlib.py --set-key "fc-d3943f88605e47c985dd2055d43db650"
```

### Test API Key
```bash
python3 /home/node/clawd/skills/firecrawl-scraper-stdlib.py --test-key
```

### Scrape Single URL
```bash
python3 /home/node/clawd/skills/firecrawl-scraper-stdlib.py --url "https://example.com"
```

### Advanced Options
```bash
# Custom output filename
python3 /home/node/clawd/skills/firecrawl-scraper-stdlib.py --url "https://example.com" --output "my-scraperes.json"
```

**Output:**
- Results saved to: `/home/node/clawd/firecrawl-output/`
- Format: JSON with markdown content and metadata
- Includes: Full markdown, HTML, links, and other data

**Capabilities:**
- ✅ Scrape single pages
- ✅ Extract structured content
- ✅ Handle JavaScript-rendered sites
- ✅ Clean markdown output
- ✅ Link extraction

**Status:** ✅ Working (tested and validated on 2026-01-31 05:00 UTC)

## Use Cases

1. **Research:** Scrape articles, blogs, documentation for AI analysis
2. **Competitive Analysis:** Extract competitor pricing, features, positioning
3. **Content Aggregation:** Gather news, updates from multiple sites
4. **Data Extraction:** Pull structured data from websites
5. **Document Analysis:** Clean web content for summarization

## Related Skills
- KB001: Email Sending
- KB002: Firecrawl (this entry)
- KB004: Weather Fetching
- KB007: Document Summarization (planned)

## Next Steps
- Add crawling functionality (multi-page extraction)
- Add batch scraping
- Integrate with document summarization
