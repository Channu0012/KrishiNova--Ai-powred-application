# KrishiNova: REST API Specification

**Base URL:** `/api`  
**Authentication:** Bearer JWT in `Authorization` header or Session Cookie  
**Payload Format:** `application/json` (except `/api/crop-analysis/upload` which accepts `multipart/form-data`)  
**Security Standard:** Strict Zod input validation, rate limiting headers, sanitized error responses  

---

## 1. Authentication & Security Headers

All responses return standard security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Cache-Control: private, no-cache, no-store, must-revalidate` (for authenticated routes)

---

## 2. API Endpoints Reference

### 2.1 Weather Forecast & Agricultural Spray Window
- **Endpoint:** `GET /api/weather`
- **Authentication:** Public / Optional User Session
- **Query Parameters:**
  - `lat` (Number, required, range: -90 to 90): Latitude coordinate (e.g. `20.0059`)
  - `lon` (Number, required, range: -180 to 180): Longitude coordinate (e.g. `73.7997`)
  - `crop` (String, optional): Active crop name for spray window calculation (default: "General")
- **Success Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "location": {
      "latitude": 20.01,
      "longitude": 73.80,
      "timezone": "Asia/Kolkata"
    },
    "current": {
      "temperatureC": 28.4,
      "apparentTemperatureC": 29.8,
      "relativeHumidity": 72,
      "windSpeedKmh": 12.5,
      "windDirection": 240,
      "precipitationMm": 0.0,
      "precipitationProbability": 15,
      "weatherCode": 1,
      "condition": "Mainly Clear"
    },
    "sprayWindow": {
      "status": "FAVORABLE",
      "reason": "Wind speed is under 15 km/h and precipitation probability is low (<20%). Suitable for foliar and pest spray applications.",
      "riskFactors": []
    },
    "dailyForecast": [
      {
        "date": "2026-09-26",
        "maxTempC": 31.2,
        "minTempC": 21.0,
        "rainProbability": 15,
        "condition": "Mainly Clear"
      }
    ],
    "source": "Open-Meteo Meteorological Service",
    "observedAt": "2026-09-26T14:30:00Z"
  }
}
```
- **Error Responses:**
  - `400 Bad Request`: `{"status": "error", "code": "INVALID_COORDINATES", "message": "Latitude and longitude must be valid floating point numbers."}`
  - `503 Service Unavailable`: `{"status": "error", "code": "WEATHER_SERVICE_OFFLINE", "message": "Weather provider is temporarily unreachable. Please retry shortly."}`

---

### 2.2 Mandi Commodity Market Prices
- **Endpoint:** `GET /api/markets`
- **Authentication:** Public
- **Query Parameters:**
  - `state` (String, required): State name (e.g. "Maharashtra")
  - `district` (String, optional): District name (e.g. "Nashik")
  - `commodity` (String, optional): Crop/Commodity name (e.g. "Tomato")
- **Success Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "state": "Maharashtra",
    "district": "Nashik",
    "commodity": "Tomato",
    "records": [
      {
        "marketName": "Nashik APMC",
        "district": "Nashik",
        "state": "Maharashtra",
        "commodity": "Tomato",
        "variety": "Local / Hybrid",
        "arrivalDate": "2026-09-26",
        "minPrice": 1800,
        "maxPrice": 2400,
        "modalPrice": 2150,
        "unit": "₹/Quintal"
      }
    ],
    "source": "Agmarknet (agmarknet.gov.in) / data.gov.in",
    "reportedDate": "2026-09-26",
    "isLiveFeed": true
  }
}
```
- **Empty State Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "state": "Maharashtra",
    "district": "Nashik",
    "commodity": "Broccoli",
    "records": [],
    "source": "Agmarknet",
    "reportedDate": "2026-09-26",
    "message": "Market prices are currently unavailable for this commodity in the selected mandi."
  }
}
```

---

### 2.3 Government Welfare Schemes Directory
- **Endpoint:** `GET /api/schemes`
- **Authentication:** Public
- **Query Parameters:**
  - `category` (String, optional: `ALL` | `INCOME_SUPPORT` | `INSURANCE` | `IRRIGATION` | `CREDIT` | `ORGANIC`)
  - `search` (String, optional): Search keyword
- **Success Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "schemes": [
      {
        "id": "pm-kisan",
        "name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        "shortCode": "PM-KISAN",
        "category": "INCOME_SUPPORT",
        "ministry": "Ministry of Agriculture & Farmers Welfare, GoI",
        "description": "Income support of ₹6,000 per year in three equal instalments of ₹2,000 every four months to all landholding farmer families.",
        "benefits": "₹6,000/year via Direct Benefit Transfer (DBT) directly into verified bank accounts.",
        "eligibility": [
          "All landholding farmer families with cultivable landholding in their names.",
          "Subject to institutional exclusion criteria (e.g. constitutional post holders, income tax payees)."
        ],
        "requiredDocuments": [
          "Aadhaar Card linked with mobile number",
          "Land ownership records (Khasra / Khatauni / 7-12 extract)",
          "Active bank account details with IFSC code"
        ],
        "officialPortalUrl": "https://pmkisan.gov.in",
        "lastVerifiedDate": "2026-08-01",
        "isVerified": true
      }
    ]
  }
}
```

---

### 2.4 AI Agronomic Advisory (Amazon Bedrock / Nova)
- **Endpoint:** `POST /api/ai/advice`
- **Authentication:** Protected (Session or Demo Token)
- **Request Body:**
```json
{
  "crop": "Tomato",
  "cropStage": "Flowering",
  "ageDays": 42,
  "district": "Nashik",
  "state": "Maharashtra",
  "weatherSummary": "28°C, 75% humidity, rain expected tomorrow",
  "query": "My tomato crop is 40 days old and rain is expected tomorrow. What should I do?"
}
```
- **Success Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "recommendation": "Do not apply chemical foliar sprays or water-soluble fertilizers within 24 hours of forecasted rain to prevent input wash-off. Ensure field drainage channels are cleared to prevent water stagnation in the root zone.",
    "rationale": "High humidity combined with impending rainfall creates ideal sporulation conditions for fungal pathogens like Early Blight (Alternaria solani). However, sprays applied immediately before precipitation will wash off, wasting chemicals and causing environmental runoff.",
    "actionSteps": [
      "1. Inspect field drainage channels to allow excess runoff to escape freely.",
      "2. Postpone systemic fungicidal sprays until leaves have completely dried post-rain.",
      "3. Conduct a physical field walk 24 hours after rain to check for lower leaf water-soaked spots."
    ],
    "safetyWarning": "Always adhere to the Central Insecticides Board & Registration Committee (CIBRC) approved dosage. Wear protective mask and gloves when handling agrochemicals.",
    "provider": "Amazon Bedrock (Amazon Nova Lite)",
    "disclaimer": "KrishiNova AI recommendations are intended as agronomic decision support. Verify critical interventions with your local Krishi Vigyan Kendra (KVK) or Agriculture Extension Officer."
  }
}
```

---

### 2.5 Crop Image Health Diagnostic
- **Endpoint:** `POST /api/crop-analysis`
- **Authentication:** Protected / Guest
- **Content-Type:** `multipart/form-data` or `application/json` (Base64)
- **Payload Constraints:**
  - Max image size: 5,242,880 bytes (5MB).
  - Permitted MIME types: `image/jpeg`, `image/png`, `image/webp`.
- **Success Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "crop": "Tomato",
    "detectedCondition": "Early Blight (Alternaria solani)",
    "confidenceRating": "HIGH",
    "observedSymptoms": [
      "Dark brown to black necrotic spots on older leaves",
      "Concentric circular rings forming a 'target board' pattern",
      "Yellow chlorotic halos surrounding lesions"
    ],
    "treatment": {
      "organic": [
        "Spray Neem Seed Kernel Extract (NSKE 5%) or Trichoderma viride @ 5g/L water as a protective bio-barrier.",
        "Prune and safely burn or bury severely infected lower foliage to reduce spore load."
      ],
      "chemical": [
        "Mancozeb 75% WP @ 2.0g to 2.5g per litre of water, or Chlorothalonil 75% WP @ 2.0g per litre.",
        "Ensure spray nozzle coats both upper and lower leaf surfaces."
      ],
      "prevention": [
        "Avoid overhead sprinkler irrigation; maintain drip lines to keep foliage dry.",
        "Practice crop rotation with non-solanaceous crops (e.g. Maize or Pulses)."
      ]
    },
    "expertEscalation": {
      "needed": false,
      "threshold": "Escalate to local KVK agronomist if yellowing impacts more than 20% of middle canopy foliage."
    },
    "disclaimer": "Diagnostic result generated by KrishiNova Multimodal Vision Engine. In-person plant pathology verification is recommended for severe blight outbreaks."
  }
}
```
- **Error Response (400 Bad Request):**
```json
{
  "status": "error",
  "code": "FILE_VALIDATION_ERROR",
  "message": "Uploaded file is not a supported image format. Supported formats are JPG, PNG, and WebP up to 5MB."
}
```

---

### 2.6 Farmer Profile Management
- **Endpoint:** `GET /api/profile` & `PUT /api/profile`
- **Authentication:** Protected (Session required)
- **PUT Payload:**
```json
{
  "fullName": "Ramesh Patil",
  "state": "Maharashtra",
  "district": "Nashik",
  "primaryCrops": ["Tomato", "Onion"],
  "landSizeAcres": 3.5,
  "soilType": "BLACK_COTTON",
  "irrigationMode": "DRIP",
  "preferredLanguage": "en"
}
```
