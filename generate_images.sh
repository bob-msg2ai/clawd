#!/bin/bash

API_KEY="${OPENAI_API_KEY}"
OUTPUT_DIR="/home/node/clawd/ai-2025-images"

# Image 1: Confused robot with timeline
curl -s https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "dall-e-3",
    "prompt": "A confused cartoon robot wearing cool sunglasses, looking at a chaotic timeline of AI events in 2025, funny comic style, bright colors, white background",
    "size": "1792x1024",
    "quality": "standard",
    "style": "vivid",
    "n": 1
  }' | jq -r '.data[0].url' | xargs -I {} curl -s {} -o "$OUTPUT_DIR/01-confused-robot-timeline.png"

echo "Image 1 generated"

# Image 2: Chinese dragon with coding trophy
curl -s https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "dall-e-3",
    "prompt": "A cute Chinese dragon wearing a graduation cap and holding a coding trophy, looking proud, cartoon style, red and gold colors, cheerful",
    "size": "1792x1024",
    "quality": "standard",
    "style": "vivid",
    "n": 1
  }' | jq -r '.data[0].url' | xargs -I {} curl -s {} -o "$OUTPUT_DIR/02-chinese-dragon-coding.png"

echo "Image 2 generated"

# Image 3: Stargate with dollar signs
curl -s https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "dall-e-3",
    "prompt": "A sci-fi stargate portal with dollar signs flying through it, futuristic but funny, cartoon style, blue and purple colors",
    "size": "1792x1024",
    "quality": "standard",
    "style": "vivid",
    "n": 1
  }' | jq -r '.data[0].url' | xargs -I {} curl -s {} -o "$OUTPUT_DIR/03-stargate-dollars.png"

echo "Image 3 generated"

# Image 4: Sad NVIDIA logo on roller coaster
curl -s https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "dall-e-3",
    "prompt": "The NVIDIA logo looking sad and depressed, sitting on a roller coaster going down, cartoon style, green colors, funny expression",
    "size": "1792x1024",
    "quality": "standard",
    "style": "vivid",
    "n": 1
  }' | jq -r '.data[0].url' | xargs -I {} curl -s {} -o "$OUTPUT_DIR/04-nvidia-sad-rollercoaster.png"

echo "Image 4 generated"

# Image 5: Robot PhD with upside down map
curl -s https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "dall-e-3",
    "prompt": "A robot wearing a PhD graduation robe but holding a world map upside down looking confused, cartoon style, funny, educational setting",
    "size": "1792x1024",
    "quality": "standard",
    "style": "vivid",
    "n": 1
  }' | jq -r '.data[0].url' | xargs -I {} curl -s {} -o "$OUTPUT_DIR/05-robot-phd-confused.png"

echo "Image 5 generated"

echo "All images saved to $OUTPUT_DIR"
