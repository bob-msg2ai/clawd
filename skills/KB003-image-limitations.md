# KB003 - Image & Media Limitations

**KB ID:** KB003
**Created:** 2026-01-30T17:05:00Z
**Category:** System
**Tags:** limitations, cli, images, media, environment

## Overview
I have limitations on processing images and media in my current CLI-based environment.

## What I Can Do

### ✅ Text-Based Commands
- Execute shell commands
- Read and write text files
- Make HTTP requests (curl, python)
- Parse JSON, CSV, XML data
- Run Python/Node.js scripts

### ❌ Image Processing
- **Cannot view images** — No image processing capability in my environment
- **Cannot analyze screenshots** — I can't see what's in an image file
- **Cannot extract text from images** — No OCR capability
- **Cannot analyze charts/graphs** — Cannot process visual data from images

## Why I Can't Process Images

### 1. CLI Environment
- I run in a Linux container without GUI
- Only have terminal access (no graphical interface)
- No image viewing/editing software installed

### 2. No OCR Tools
- Optical Character Recognition (OCR) is not available
- Cannot extract text from screenshots
- Cannot read charts or diagrams

### 3. No Image Analysis AI
- No image processing AI models available
- Cannot analyze visual content
- Cannot describe what's in a picture

## How I Handle Images

### When You Send an Image
- I receive the file path (e.g., `/home/node/.clawdbot/media/inbound/file_0---.jpg`)
- I know an image was received, but I cannot see it
- I cannot extract any information from it
- I cannot analyze or process it

### What I Need Instead
- **Text descriptions** — Describe what's in the image
- **Data values** — If it's a chart/graph, provide the numbers
- **File paths** — If you want me to process a specific file
- **Screenshots of code** — Copy-paste the text instead of sending screenshot

## Alternatives for Image-Based Tasks

### 1. Text-Based Input
- Copy text from screenshots
- Paste data into messages
- Type out chart/graph values

### 2. File Access
- If you want me to read a specific file, tell me the path
- I can read text files, JSON, CSV, etc.
- I can process and extract data from them

### 3. API Integration
- If you have data in an API, I can call it directly
- Example: Weather, stock prices, etc.
- Better than processing screenshots of websites

### 4. Code Review
- Send code snippets as text
- I can analyze, refactor, and improve code
- Don't send screenshots of code editors

## Examples

### ❌ What Doesn't Work
```
Bart: [Screenshot of error message]
Bob: "I can't see the screenshot. Please copy-paste the error text."
```

### ✅ What Does Work
```
Bart: "Error: 'module not found' in line 42"
Bob: "I can fix that. Let me check imports..."
```

### ❌ What Doesn't Work
```
Bart: [Screenshot of dashboard showing 5 metrics]
Bob: "I can't analyze the dashboard image."
```

### ✅ What Does Work
```
Bart: "The dashboard shows: Users: 125, Revenue: $5,000, Growth: 12%"
Bob: "I can create a script to track these metrics."
```

## Workarounds for Common Tasks

### 1. Code from Screenshots
- Copy the code text
- Paste it in Telegram
- I can analyze, refactor, debug

### 2. Data from Charts
- Type out the numbers
- Tell me what you want to do with the data
- I can process, calculate, visualize

### 3. Error Messages
- Copy the exact error text
- Include surrounding code
- I can debug and suggest fixes

## Related KBs
- KB001-email-sending — Email capabilities
- KB002-firecrawl — Web API integration

## Status
- **Image Processing:** ❌ Not available
- **OCR:** ❌ Not available
- **Text Processing:** ✅ Fully available
- **File Access:** ✅ Fully available
- **API Integration:** ✅ Fully available

**Recommendation:** Always provide text-based input instead of images for the best experience.

---

*Last Updated:* 2026-01-30 17:05:00Z
