import os
import json
import urllib.request
import urllib.error

API_KEY = os.environ.get("OPENAI_API_KEY")
OUTPUT_DIR = "/home/node/clawd/ai-2025-images"

images = [
    {
        "filename": "01-confused-robot-timeline.png",
        "prompt": "A confused cartoon robot wearing cool sunglasses, looking at a chaotic timeline of AI events in 2025, funny comic style, bright colors, white background"
    },
    {
        "filename": "02-chinese-dragon-coding.png", 
        "prompt": "A cute Chinese dragon wearing a graduation cap and holding a coding trophy, looking proud, cartoon style, red and gold colors, cheerful"
    },
    {
        "filename": "03-stargate-dollars.png",
        "prompt": "A sci-fi stargate portal with dollar signs flying through it, futuristic but funny, cartoon style, blue and purple colors"
    },
    {
        "filename": "04-nvidia-sad-rollercoaster.png",
        "prompt": "The NVIDIA logo looking sad and depressed, sitting on a roller coaster going down, cartoon style, green colors, funny expression"
    },
    {
        "filename": "05-robot-phd-confused.png",
        "prompt": "A robot wearing a PhD graduation robe but holding a world map upside down looking confused, cartoon style, funny, educational setting"
    }
]

def generate_image(prompt, filename):
    url = "https://api.openai.com/v1/images/generations"
    data = {
        "model": "dall-e-3",
        "prompt": prompt,
        "size": "1792x1024",
        "quality": "standard",
        "style": "vivid",
        "n": 1
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode('utf-8'),
        headers={
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json'
        },
        method='POST'
    )
    
    try:
        with urllib.request.urlopen(req, timeout=120) as response:
            result = json.loads(response.read().decode('utf-8'))
            image_url = result['data'][0]['url']
            
            # Download the image
            img_req = urllib.request.Request(image_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(img_req, timeout=120) as img_response:
                with open(os.path.join(OUTPUT_DIR, filename), 'wb') as f:
                    f.write(img_response.read())
            print(f"✓ Generated: {filename}")
            return True
    except Exception as e:
        print(f"✗ Failed {filename}: {e}")
        return False

print("Generating 5 AI-themed presentation images...")
print("-" * 50)

for img in images:
    generate_image(img["prompt"], img["filename"])

print("-" * 50)
print(f"All images saved to {OUTPUT_DIR}")
