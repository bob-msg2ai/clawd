---
name: gemini-image-gen
description: Generate images using Google's Gemini Pro API
homepage: https://ai.google.dev/gemini-api/docs
metadata:
  {
    "openclaw":
      {
        "emoji": "🎨",
        "requires": { "bins": ["curl"], "env": ["GEMINI_API_KEY"] },
        "primaryEnv": "GEMINI_API_KEY",
      },
  }
---

# Gemini Image Generation

Generate images using Google's Gemini Pro API.

## Setup

Set your Gemini API key:
```bash
export GEMINI_API_KEY="your-key-here"
```

Or add to `~/.openclaw/openclaw.json`:
```json
{
  "env": {
    "vars": {
      "GEMINI_API_KEY": "your-key-here"
    }
  }
}
```

## Usage

```bash
{baseDir}/scripts/generate.sh "Your prompt here"
```

## API Reference

Gemini Pro supports image generation with the `gemini-pro-vision` model or dedicated image models.

See: https://ai.google.dev/gemini-api/docs
