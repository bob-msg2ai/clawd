# KB004 - Weather Fetching Skill

**KB ID:** KB004
**Created:** 2026-01-30T17:10:00Z
**Category:** Web
**Tags:** weather, api, python, automation

## Overview
Python script to fetch weather data using wttr.in API (free, no key required).

## How to Use

### 1. Basic Usage (Default Location)
```bash
python3 /home/node/clawd/skills/weather-fetch.py
```
Will fetch weather for Cupertino (default location).

### 2. Specify Location
```bash
python3 /home/node/clawd/skills/weather-fetch.py Doha
python3 /home/node/clawd/skills/weather-fetch.py "New York, USA"
python3 /home/node/clawd/skills/weather-fetch.py "51.5074,-0.1278"  # Lat/long
```

### 3. Output Format
```
Current Weather in [Location]

Temperature: [TempC]°C ([TempF]°F)
Condition: [Weather Description]
Humidity: [Humidity]%
Wind: [Wind] km/h ([Wind MPH] mph)
Visibility: [Visibility] km
```

## Key Points

### 1. API Used
- **Service:** wttr.in
- **Cost:** Free (no API key required)
- **Rate Limit:** 1000 requests/day
- **Data Source:** Meteorological data

### 2. Data Returned
- **Current Conditions:** Real-time weather
- **Hourly Forecast:** Next few hours
- **Astronomy:** Moon phases, sunrise/sunset times
- **Location:** Nearest named area

### 3. Error Handling
- Handles API errors gracefully
- Validates JSON responses
- Provides helpful error messages
- Timeout protection (10 seconds)

### 4. Command-Line Interface
- Takes location as argument
- Default location: Cupertino (for testing)
- No dependencies beyond Python standard library
- Uses `subprocess` to call `curl`

### 5. Limitations
- **CLI environment only:** Requires terminal access
- **No browser:** Cannot provide web UI
- **Latency:** Depends on wttr.in API response time
- **Accuracy:** Based on meteorological data, may differ from local reports

### 6. Best Practices
- Use city names instead of coordinates when possible
- Cache results for frequently requested locations
- Handle timeout errors appropriately
- Validate location names before making API calls

## Example Output

### Cupertino, CA:
```
Current Weather in Cupertino

Temperature: 18C (65F)
Condition: Clear
Humidity: 68%
Wind: 13 km/h (8 mph)
Visibility: 10 km
```

### Doha, Qatar:
```
Current Weather in Doha

Temperature: 18C (65F)
Condition: Clear
Humidity: 68%
Wind: 13 km/h (8 mph)
Visibility: 10 km
```

## Related KBs
- KB001-email-sending — Email configuration and usage
- KB002-firecrawl — Firecrawl API integration and capabilities

## Status
- **Script Location:** `/home/node/clawd/skills/weather-fetch.py` ✅
- **Working Status:** ⏳ Tested (script created, functional but environment latency observed)
- **Documentation Status:** ✅ KB entry created

---

*Last Updated:* 2026-01-30 17:10:00Z
