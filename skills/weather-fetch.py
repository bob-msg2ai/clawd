#!/usr/bin/env python3
"""
Weather Fetch Skill - Robust Version
Fetches weather information using wttr.in API with better error handling
"""

import subprocess
import sys
import json

def fetch_weather(location):
    """Fetch weather data for a given location."""
    try:
        url = f"https://wttr.in/{location}?format=j1"
        
        result = subprocess.run(
            ['curl', '-s', url],
            capture_output=True,
            text=True,
            timeout=10
        )
        
        if result.returncode == 0:
            weather_data = json.loads(result.stdout)
            return weather_data
        else:
            error_msg = result.stderr if result.stderr else result.stdout
            print(f"❌ Error fetching weather: {error_msg[:100] if error_msg else 'Unknown error'}")
            return None
            
    except json.JSONDecodeError as e:
        print(f"❌ Error parsing weather data: {e}")
        return None
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return None

def format_weather_basic(weather, location):
    """Format weather data simply with defensive type checking."""
    if not weather:
        return "No weather data available"
    
    # Get nearest area - check type first
    nearest_area = weather.get('nearest_area')
    if isinstance(nearest_area, list) and len(nearest_area) > 0:
        area = nearest_area[0]
        area_name = area.get('areaName', {}).get('value', location) if isinstance(area, dict) else location
    elif isinstance(nearest_area, dict):
        area_name = nearest_area.get('areaName', {}).get('value', location)
    else:
        area_name = location
    
    # Get current condition - check type first
    current = weather.get('current_condition')
    if isinstance(current, list) and len(current) > 0:
        curr = current[0]
    elif isinstance(current, dict):
        curr = current
    else:
        curr = {}
    
    temp_c = curr.get('temp_C', 'N/A')
    temp_f = curr.get('temp_F', 'N/A')
    humidity = curr.get('humidity', 'N/A')
    wind = curr.get('windspeedKmph', 'N/A')
    
    # Get weather description - check type first
    weather_desc = curr.get('weatherDesc', [])
    if isinstance(weather_desc, list) and len(weather_desc) > 0:
        description = weather_desc[0].get('value', 'N/A') if isinstance(weather_desc[0], dict) else 'N/A'
    elif isinstance(weather_desc, dict):
        description = weather_desc.get('value', 'N/A')
    else:
        description = 'N/A'
    
    output = f"Current Weather in {area_name}\n\n"
    output += f"**Temperature:** {temp_c}°C ({temp_f}°F)\n"
    output += f"**Condition:** {description}\n"
    output += f"**Humidity:** {humidity}%\n"
    output += f"**Wind:** {wind} km/h\n"
    
    return output

def print_weather_report(location):
    """Fetch and print weather report."""
    print(f"Fetching weather for: {location}...\n")
    
    weather_data = fetch_weather(location)
    
    if not weather_data:
        print("❌ Failed to fetch weather data")
        return
    
    print(format_weather_basic(weather_data, location))

def main():
    """Main entry point."""
    if len(sys.argv) > 1:
        location = ' '.join(sys.argv[1:])
    else:
        location = "Cupertino"
    
    print_weather_report(location)

if __name__ == "__main__":
    main()
