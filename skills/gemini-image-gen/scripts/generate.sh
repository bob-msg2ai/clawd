#!/bin/bash

# Gemini Image Generation Script

API_KEY="${GEMINI_API_KEY:-${GEMINI_API_KEY:-}}"
PROMPT="$1"
OUTPUT_DIR="${2:-./output}"

if [ -z "$API_KEY" ]; then
    echo "Error: GEMINI_API_KEY not set"
    echo "Set it with: export GEMINI_API_KEY=your_key"
    exit 1
fi

if [ -z "$PROMPT" ]; then
    echo "Usage: $0 'Your image prompt' [output_directory]"
    exit 1
fi

mkdir -p "$OUTPUT_DIR"

echo "Generating image with Gemini..."
echo "Prompt: $PROMPT"

# Note: Gemini's image generation API endpoint
# This uses the experimental image generation capability

curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=$API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    'contents': [{
      'parts': [{
        'text': '$PROMPT'
      }]
    }],
    'generationConfig': {
      'temperature': 0.9,
      'candidateCount': 1
    }
  }" > "$OUTPUT_DIR/response.json"

if [ $? -eq 0 ]; then
    echo "Response saved to $OUTPUT_DIR/response.json"
    # Extract and decode image if present in response
    if command -v jq &> /dev/null; then
        jq -r '.candidates[0].content.parts[0].inlineData.data' "$OUTPUT_DIR/response.json" | base64 -d > "$OUTPUT_DIR/generated_image.png" 2>/dev/null
        if [ -s "$OUTPUT_DIR/generated_image.png" ]; then
            echo "Image saved to $OUTPUT_DIR/generated_image.png"
        fi
    fi
else
    echo "Error: Failed to generate image"
fi
