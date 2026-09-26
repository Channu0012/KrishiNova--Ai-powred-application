# KrishiNova: DynamoDB & Storage Schema Architecture

**Database Engine:** Amazon DynamoDB (Single-Table Design)  
**Table Name:** `KrishiNovaTable` (Environment-scoped: `KrishiNovaTable-dev`, `KrishiNovaTable-prod`)  
**Billing Mode:** On-Demand (PAY_PER_REQUEST)  
**Encryption:** AWS KMS Managed Key (`aws/dynamodb`)  
**Time to Live (TTL):** Enabled on attribute `ttl` (Unix epoch seconds)  
**Point-in-Time Recovery (PITR):** Enabled  

---

## 1. Single-Table Key Design Strategy

DynamoDB Single-Table Design provides high performance (sub-10ms queries) and eliminates cross-table join latency. All entities share the primary key structure:
- **Partition Key (`PK`):** String (Entity namespace + unique identifier)
- **Sort Key (`SK`):** String (Sub-entity namespace, timestamp, or metadata marker)
- **Global Secondary Index 1 (`GSI1`):**
  - Partition Key: `GSI1PK`
  - Sort Key: `GSI1SK`
  - Projection: ALL
- **Global Secondary Index 2 (`GSI2`):**
  - Partition Key: `GSI2PK`
  - Sort Key: `GSI2SK`
  - Projection: ALL

---

## 2. Entity Specifications & Key Mappings

### 2.1 Users & Authentication (`USER`)
- **PK:** `USER#<userId>` (e.g. `USER#usr_98a7f1...` or Cognito Sub)
- **SK:** `METADATA`
- **Attributes:**
  - `userId` (String, UUID)
  - `email` (String)
  - `phone` (String, optional)
  - `cognitoSub` (String)
  - `status` (String: `ACTIVE` | `PENDING_VERIFICATION` | `SUSPENDED`)
  - `createdAt` (ISO 8601 String)
  - `updatedAt` (ISO 8601 String)
- **GSI1:**
  - `GSI1PK`: `EMAIL#<email>`
  - `GSI1SK`: `USER#<userId>`
- **Access Pattern:** Query user by ID (`PK = USER#<id>`, `SK = METADATA`), Query user by Email (`GSI1PK = EMAIL#<email>`).

---

### 2.2 Farmer Profile (`PROFILE`)
- **PK:** `USER#<userId>`
- **SK:** `PROFILE#CURRENT`
- **Attributes:**
  - `fullName` (String)
  - `state` (String, e.g. "Maharashtra")
  - `district` (String, e.g. "Nashik")
  - `taluka` (String, optional)
  - `village` (String, optional)
  - `latitude` (Number, e.g. 20.0059)
  - `longitude` (Number, e.g. 73.7997)
  - `primaryCrops` (List of Strings, e.g. `["Tomato", "Onion"]`)
  - `landSizeAcres` (Number, e.g. 4.5)
  - `soilType` (String: `BLACK_COTTON` | `ALLUVIAL` | `RED_LOAM` | `SANDY_LOAM` | `CLAY`)
  - `irrigationMode` (String: `DRIP` | `SPRINKLER` | `FLOOD` | `RAINFED`)
  - `preferredLanguage` (String: `en` | `hi` | `mr` | `kn` | `te` | `ta`)
  - `updatedAt` (ISO 8601 String)
- **Access Pattern:** Get farmer profile (`PK = USER#<userId>`, `SK = PROFILE#CURRENT`).

---

### 2.3 Crop Growth Tracking (`CROP`)
- **PK:** `USER#<userId>`
- **SK:** `CROP#<cropId>` (e.g. `CROP#crop_tom_202609`)
- **Attributes:**
  - `cropId` (String, UUID)
  - `cropName` (String, e.g. "Tomato")
  - `variety` (String, e.g. "Abhinav / F1 Hybrid")
  - `sowingDate` (ISO 8601 Date String, e.g. "2026-08-15")
  - `currentStage` (String: `NURSERY` | `VEGETATIVE` | `FLOWERING` | `FRUITING` | `HARVESTING`)
  - `areaUnderCultivationAcres` (Number)
  - `expectedHarvestDate` (ISO 8601 Date String)
  - `createdAt` (ISO 8601 String)
- **Access Pattern:** List all crops for farmer (`PK = USER#<userId>`, `SK begins_with "CROP#"`).

---

### 2.4 Weather Cache (`WEATHER_CACHE`)
- **PK:** `GEO#<lat_rounded>#<lon_rounded>` (e.g. `GEO#20.01#73.80`)
- **SK:** `WEATHER#LATEST`
- **Attributes:**
  - `temperatureC` (Number)
  - `humidityPercent` (Number)
  - `windSpeedKmh` (Number)
  - `weatherCode` (Number)
  - `weatherDescription` (String)
  - `precipitationChance` (Number)
  - `forecast` (JSON Array: 5-day daily highs, lows, precipitation, condition)
  - `sprayWindow` (String: `FAVORABLE` | `MARGINAL` | `UNFAVORABLE`)
  - `sprayWindowReason` (String)
  - `observedAt` (ISO 8601 String)
  - `provider` (String: `open-meteo` | `imd` | `bedrock-agent`)
  - `ttl` (Number: Unix timestamp in seconds, TTL = observedAt + 1800s / 30 mins)
- **Access Pattern:** Get cached weather (`PK = GEO#<lat>#<lon>`, `SK = WEATHER#LATEST`). If TTL expired or item not found, fetch from external provider and write back.

---

### 2.5 Market Mandi Commodity Prices (`MARKET_PRICE`)
- **PK:** `MARKET#<state>#<district>` (e.g. `MARKET#Maharashtra#Nashik`)
- **SK:** `COMMODITY#<commodity>#<date>` (e.g. `COMMODITY#Tomato#2026-09-26`)
- **Attributes:**
  - `state` (String)
  - `district` (String)
  - `marketName` (String, e.g. "Nashik APMC" or "Pimpalgaon")
  - `commodity` (String, e.g. "Tomato")
  - `variety` (String, e.g. "Hybrid")
  - `minPrice` (Number, ₹/Quintal)
  - `maxPrice` (Number, ₹/Quintal)
  - `modalPrice` (Number, ₹/Quintal)
  - `priceUnit` (String: "₹/Quintal")
  - `reportingDate` (ISO 8601 Date String)
  - `source` (String: "agmarknet.gov.in")
  - `ttl` (Number: Unix timestamp, 24 hours expiry)
- **GSI1:**
  - `GSI1PK`: `COMMODITY#<commodity>`
  - `GSI1SK`: `DATE#<date>`
- **Access Patterns:**
  - Get today's market rates for a district: `PK = MARKET#<state>#<district>`, `SK begins_with "COMMODITY#"`.
  - Search rates for a commodity nationwide: `GSI1PK = COMMODITY#Tomato`, `GSI1SK begins_with "DATE#"`.

---

### 2.6 Official Government Schemes (`SCHEME`)
- **PK:** `SCHEMES`
- **SK:** `SCHEME#<schemeId>` (e.g. `SCHEME#pm-kisan`, `SCHEME#pmfby`)
- **Attributes:**
  - `schemeId` (String)
  - `schemeName` (String, e.g. "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)")
  - `shortCode` (String: "PM-KISAN")
  - `category` (String: `INCOME_SUPPORT` | `INSURANCE` | `IRRIGATION` | `CREDIT` | `ORGANIC`)
  - `sponsoringAgency` (String: "Ministry of Agriculture & Farmers Welfare, GoI")
  - `description` (String)
  - `eligibility` (List of Strings)
  - `financialBenefits` (String, e.g. "₹6,000 per year in three equal instalments of ₹2,000")
  - `requiredDocuments` (List of Strings: Aadhaar, Land Records, Bank Account)
  - `officialPortalUrl` (String: "https://pmkisan.gov.in")
  - `lastVerifiedDate` (String: "2026-08-01")
  - `isNational` (Boolean)
  - `eligibleStates` (List of Strings or `["ALL"]`)
- **GSI1:**
  - `GSI1PK`: `CATEGORY#<category>`
  - `GSI1SK`: `SCHEME#<schemeId>`
- **Access Patterns:**
  - List all schemes: `PK = SCHEMES`, `SK begins_with "SCHEME#"`.
  - Filter schemes by category: `GSI1PK = CATEGORY#INSURANCE`.

---

### 2.7 AI Farming Advisory History (`AI_RECOMMENDATION`)
- **PK:** `USER#<userId>`
- **SK:** `ADVISORY#<timestamp>#<advisoryId>`
- **Attributes:**
  - `advisoryId` (String, UUID)
  - `query` (String)
  - `cropContext` (Object: `{ crop: "Tomato", stage: "Flowering", ageDays: 42 }`)
  - `weatherContext` (Object: `{ temp: 28, rainChance: 65, humidity: 82 }`)
  - `recommendation` (String)
  - `rationale` (String)
  - `actionSteps` (List of Strings)
  - `safetyWarning` (String)
  - `modelUsed` (String: "amazon.nova-lite-v1:0" or "local-agronomic-engine")
  - `createdAt` (ISO 8601 String)
- **Access Pattern:** Get historical recommendations for farmer: `PK = USER#<userId>`, `SK begins_with "ADVISORY#"`.

---

### 2.8 Multimodal Crop Image Analyses (`CROP_ANALYSIS`)
- **PK:** `USER#<userId>`
- **SK:** `ANALYSIS#<timestamp>#<analysisId>`
- **Attributes:**
  - `analysisId` (String, UUID)
  - `cropType` (String)
  - `s3ImageKey` (String: `uploads/crops/<userId>/<analysisId>.jpg`)
  - `detectedCondition` (String, e.g. "Early Blight (Alternaria solani)")
  - `confidenceRating` (String: `HIGH` | `MODERATE` | `INCONCLUSIVE`)
  - `observedSymptoms` (List of Strings)
  - `organicRemedies` (List of Strings: e.g. "Neem oil spray (5ml/L), Trichoderma viride")
  - `chemicalRemedies` (List of Strings: e.g. "Mancozeb 75% WP @ 2g/L or Chlorothalonil")
  - `preventativeMeasures` (List of Strings)
  - `expertEscalationNeeded` (Boolean)
  - `escalationNotes` (String: "Consult nearest KVK if symptoms exceed 15% leaf canopy.")
  - `analyzedAt` (ISO 8601 String)
- **Access Pattern:** List farmer's past crop health scans: `PK = USER#<userId>`, `SK begins_with "ANALYSIS#"`.

---

### 2.9 Uploaded Files Security Registry (`UPLOADED_FILE`)
- **PK:** `FILE#<fileKey>`
- **SK:** `METADATA`
- **Attributes:**
  - `fileKey` (String, UUID + extension)
  - `ownerUserId` (String)
  - `originalFileName` (String, sanitized)
  - `mimeType` (String: `image/jpeg` | `image/png` | `image/webp`)
  - `sizeBytes` (Number, <= 5242880)
  - `s3Bucket` (String)
  - `s3Key` (String)
  - `status` (String: `PENDING_SCAN` | `CLEAN` | `QUARANTINED`)
  - `uploadedAt` (ISO 8601 String)
- **Access Pattern:** Validate ownership and metadata for presigned URL authorization.

---

## 3. Comprehensive Access Pattern Summary Table

| Access Pattern | Method | Key Expression | Index |
| :--- | :--- | :--- | :--- |
| **Get User Account** | Query | `PK = USER#<id> AND SK = METADATA` | Primary |
| **Find User by Email** | Query | `GSI1PK = EMAIL#<email>` | GSI1 |
| **Get Farmer Profile** | Query | `PK = USER#<id> AND SK = PROFILE#CURRENT` | Primary |
| **Save / Update Profile** | PutItem | `PK = USER#<id>`, `SK = PROFILE#CURRENT` | Primary |
| **Get Live Weather Cache** | GetItem | `PK = GEO#<lat>#<lon> AND SK = WEATHER#LATEST` | Primary |
| **Put Weather Cache (TTL 30m)** | PutItem | `PK = GEO#<lat>#<lon>`, `SK = WEATHER#LATEST`, `ttl = <now+1800>` | Primary |
| **Get Mandi Prices by District** | Query | `PK = MARKET#<state>#<district> AND SK begins_with COMMODITY#` | Primary |
| **List Verified Govt Schemes** | Query | `PK = SCHEMES AND SK begins_with SCHEME#` | Primary |
| **Filter Schemes by Category** | Query | `GSI1PK = CATEGORY#<cat>` | GSI1 |
| **Save AI Farming Advisory** | PutItem | `PK = USER#<id>`, `SK = ADVISORY#<timestamp>#<uuid>` | Primary |
| **List Farmer's Past Advisories** | Query | `PK = USER#<id> AND SK begins_with ADVISORY#` | Primary |
| **Save Crop Image Analysis** | PutItem | `PK = USER#<id>`, `SK = ANALYSIS#<timestamp>#<uuid>` | Primary |
| **List Farmer's Past Crop Scans** | Query | `PK = USER#<id> AND SK begins_with ANALYSIS#` | Primary |
