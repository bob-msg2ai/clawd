#!/bin/bash

API_KEY="AIzaSyALJ3CeMGvpzemStxZBdR77OVSQPI7wUeg"
MODEL="imagen-4.0-generate-001"

generate_image() {
    local filename="$1"
    local prompt="$2"
    
    echo "Generating: $filename..."
    
    curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/models/$MODEL:predict?key=$API_KEY" \
      -H "Content-Type: application/json" \
      -d "{
        \"instances\": [{\"prompt\": \"$prompt\"}],
        \"parameters\": {\"sampleCount\": 1}
      }" > "$filename.json"
    
    if [ -f "$filename.json" ]; then
        python3 -c "
import json
import base64
import sys
try:
    with open('$filename.json') as f:
        data = json.load(f)
    if 'predictions' in data and len(data['predictions']) > 0:
        img_data = data['predictions'][0].get('bytesBase64Encoded', '')
        if img_data:
            with open('$filename', 'wb') as f:
                f.write(base64.b64decode(img_data))
            print('✅ Saved: $filename')
        else:
            print('⚠️ No base64 data')
    else:
        print('⚠️ No predictions')
except Exception as e:
    print(f'❌ Error: {e}')
" 2>&1
        rm -f "$filename.json"
    fi
}

# Generate images for slides 6-20 (excluding already done ones)
generate_image "06-vibe-coding.png" "A person in pajamas sitting at a computer coding with sparkles and magic around them, a cat watching, cozy room, funny cartoon style, bright colors, high quality illustration"

generate_image "07-scuba-research.png" "ChatGPT robot wearing scuba gear and diving equipment, swimming underwater through an ocean of web pages and documents, funny cartoon style, blue colors, high quality"

generate_image "08-french-cheetah.png" "A fast cheetah wearing a French beret, typing furiously on a keyboard, speed lines, cartoon style, funny, high quality illustration"

generate_image "09-eiffel-code.png" "The Eiffel Tower made of computer code and digital elements, futuristic, blue and purple colors, cartoon style, high quality illustration"

generate_image "10-musk-money.png" "Elon Musk cartoon character holding a giant bag of money with dollar signs, another person looking skeptical, funny comic style, high quality"

generate_image "11-google-cats.png" "Google logo wearing cool sunglasses making AI-generated cat videos, multiple cats around, funny cartoon style, bright colors, high quality"

generate_image "12-claude-phd.png" "A robot wearing a PhD graduation cap and gown, surrounded by multiple computer monitors showing WORKING signs, cartoon style, funny, high quality"

generate_image "13-grok-spicy.png" "A robot with fire emojis and chili peppers around it, looking mischievous, spicy theme, red and orange colors, cartoon style, funny, high quality"

generate_image "15-grok-wins.png" "Two robots, one celebrating with a trophy looking happy, another looking confused at a test paper, competition scene, cartoon style, funny, high quality"

generate_image "16-baby-monitor.png" "A robot with a baby monitor watching over a smaller robot child, parental controls theme, cute cartoon style, funny, high quality"

generate_image "17-trump-genesis.png" "A person signing an important document at a desk with robots cheering in the background, celebration scene, cartoon style, funny, high quality"

generate_image "18-collage.png" "A collage of various AI robots and characters together, celebration scene, multiple characters, colorful, cartoon style, high quality illustration"

generate_image "19-robot-teacher.png" "A robot teacher standing at a chalkboard with confused robot students, classroom scene, funny cartoon style, high quality illustration"

generate_image "20-fortune-teller.png" "A robot fortune teller with a crystal ball looking mystical, predicting the future, magical atmosphere, cartoon style, funny, high quality"

echo ""
echo "Done! Generated images:"
ls -la *.png 2>/dev/null | wc -l
echo "total PNG files"
