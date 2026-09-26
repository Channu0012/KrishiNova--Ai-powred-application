# KrishiNova: Agricultural Intelligence Platform

> **Production-Ready AWS Full-Stack Agricultural Decision Support System**  
> Synthesizing localized numerical meteorology, official Agmarknet mandi commodity pricing, verified welfare schemes, and multimodal AI crop disease diagnostics.

---

## 1. Executive Summary & Vision

**KrishiNova** is an enterprise-grade agricultural intelligence platform built for smallholder and commercial farmers across India. It addresses critical information silos and price asymmetries by combining real-time meteorological spray feasibility calculations, official mandi trading rates from the Directorate of Marketing & Inspection, verified central and state welfare scheme application portals, and computer vision plant pathology into an accessible, responsive dashboard.

### Core Product Creed: Zero Synthetic Reality
- **Zero Hallucinated Numbers:** KrishiNova never generates fabricated market prices, fake weather observations, or simulated statistics.
- **Transparent Degradation:** When an upstream external feed is closed or offline, KrishiNova explicitly presents an honest, informative empty/unavailable state rather than inventing synthetic placeholders.
- **Responsible Agronomic AI:** AI recommendations are grounded in verified ICAR / State Agricultural University package of practices with mandatory safety warnings and expert escalation thresholds.

---

## 2. System Architecture

```
                              [Farmer Client (Mobile/Desktop Web)]
                                                │
                                    HTTPS / TLS 1.3 / Route 53
                                                ▼
                                    [AWS Amplify Hosting]
                                  (Edge CDN + SSR Compute)
                                                │
                    ┌───────────────────────────┴──────────────────────────┐
                    ▼                                                      ▼
           [Next.js SSR Frontend]                                 [Next.js / Lambda API Routes]
         (Server Components & UI)                              (Provider Abstraction Services)
                    │                                                      │
                    │                                     ┌────────────────┴───────────────┐
                    │                                     ▼                                ▼
                    │                           [Core Micro-Providers]           [AWS Cloud Services]
                    │                           - WeatherProvider               - Amazon Bedrock (Nova Micro/Lite)
                    │                           - MarketDataProvider            - Amazon DynamoDB (Single/Multi-table)
                    │                           - SchemeProvider                - Amazon S3 (Encrypted Storage)
                    │                           - CropAnalysisProvider          - Amazon Cognito (Auth Pools)
                    │                           - AuthProvider                  - CloudWatch (Structured Logs)
                    │                                     │
                    ▼                                     ▼
        [Hydrated Farmer Dashboard]             [External Open APIs]
      - Zero Synthetic Data                    - Open-Meteo API / IMD
      - Transparent Offline States             - Agmarknet / data.gov.in
      - Strict Advisory Disclaimers            - Official Scheme Registry
```

---

## 3. Technology Stack

- **Frontend & App Framework:** Next.js (App Router, React 19, TypeScript)
- **Styling & Design System:** Tailwind CSS with custom agricultural color tokens (Swiss Minimalist + Biophilic Utility, 8px restrained radius, NO pill buttons, NO emoji UI icons)
- **Iconography:** Lucide React (`lucide-react`)
- **Schema Validation:** Zod
- **Cloud Infrastructure:**
  - **Hosting:** AWS Amplify Hosting (SSR + Edge)
  - **Compute:** AWS Lambda / Serverless Route Handlers
  - **AI & Vision:** Amazon Bedrock (`amazon.nova-lite-v1:0` and `amazon.nova-pro-v1:0`)
  - **Database:** Amazon DynamoDB (Single-Table Design with TTL)
  - **Object Storage:** Amazon S3 (SSE-KMS encrypted crop diagnostic uploads)
  - **Authentication:** Amazon Cognito User Pools

---

## 4. Key Modules & Features

### 4.1 Local Weather & Spray Window Calculator (`/dashboard#weather`)
- Real-time temperature, humidity, wind velocity, and precipitation risk powered by Open-Meteo numerical weather prediction models.
- **Agricultural Spray Feasibility:** Evaluates real-time wind speed (<15 km/h limit) and rain probability (<45% limit) to prevent costly pesticide wash-off and non-target drift.
- 5-day daily forecast strip with condition indicators.

### 4.2 Mandi Commodity Market Intelligence (`/dashboard#markets`)
- Official trading rates from Agmarknet (`agmarknet.gov.in`) and `data.gov.in`.
- Search and filter by State, District, and Crop.
- Displays Minimum, Maximum, and Modal prices in ₹/Quintal with exact reporting date and source attribution.
- Transparent empty state when auctions are closed or unreported.

### 4.3 Multimodal Crop Health & Disease Diagnostic (`/dashboard#crop-health`)
- Drag-and-drop or camera photo upload of affected crop leaves.
- Strict client- and server-side validation (MIME types: JPG/PNG/WebP, magic bytes verification, max 5 MB).
- Diagnoses conditions (e.g. Early Blight in Tomato, Blast in Paddy) with confidence grades, observable symptoms, organic bio-control protocols, and CIBRC-approved chemical solutions.
- Explicit Krishi Vigyan Kendra (KVK) expert escalation trigger.

### 4.4 Context-Aware AI Agronomic Assistant (`/dashboard#ai-assistant`)
- Injects live farm context (crop, growth stage, soil type, irrigation mode, and local weather) into the prompt payload.
- Backed by Amazon Bedrock Nova Foundation Models with a high-accuracy local deterministic agronomic rule engine fallback when AWS credentials are not yet configured.

### 4.5 Verified Government Schemes Explorer (`/schemes`)
- Curated directory of major central and state agricultural welfare schemes (PM-KISAN, PMFBY, PM-KUSUM, Soil Health Card, KCC, PKVY).
- Search and filter by category (Income Support, Insurance, Irrigation, Credit, Organic).
- Document checklist and direct outbound links to official `.gov.in` portals.

### 4.6 Farmer Profile & Personalization (`/profile`)
- Farm acreage, soil category, irrigation source, crop selection, and district location management stored in DynamoDB.

---

## 5. Architectural & Design Documentation

| Document | Purpose |
| :--- | :--- |
| [`PRD.md`](./PRD.md) | Product Requirements Document (Personas, Scope, User Stories, Non-Functional Specs) |
| [`TRD.md`](./TRD.md) | Technical Requirements Document (AWS Architecture, Providers, Testing) |
| [`DESIGN.md`](./DESIGN.md) | Design System (Colors, Typography, Spacing, 8px Radius, Five States Pattern) |
| [`APP_FLOW.md`](./APP_FLOW.md) | Complete Application & User Journey Flows |
| [`DATABASE_SCHEMA.md`](./DATABASE_SCHEMA.md) | DynamoDB Single-Table Schema, Entity Specifications & Access Patterns |
| [`API.md`](./API.md) | REST API Endpoint Documentation, Request/Response Schemas |
| [`SECURITY.md`](./SECURITY.md) | OWASP Top 10 Safeguards, Magic Bytes Validation, S3 Access Control |
| [`DEPLOYMENT.md`](./DEPLOYMENT.md) | AWS Amplify Deployment, Route 53 Custom Domain & HTTPS Setup |
| [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md) | 20-Phase Implementation Matrix & Verifications |

---

## 6. Getting Started (Local Development)

### 6.1 Prerequisites
- Node.js >= 18.0.0 (Node.js 20+ recommended)
- npm >= 9.0.0

### 6.2 Installation
```bash
# 1. Clone repository
git clone <repo-url>
cd "AWS krushi project"

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local

# 4. Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6.3 Running Tests
```bash
npm test
```

### 6.4 Production Build
```bash
npm run build
npm run start
```

---

## 7. Connecting AWS Cloud Credentials

When you are ready to connect live AWS Bedrock and DynamoDB resources, update your `.env.local` or AWS Amplify Console environment variables:
```env
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=<your-aws-access-key>
AWS_SECRET_ACCESS_KEY=<your-aws-secret-key>
BEDROCK_MODEL_ID=amazon.nova-lite-v1:0
BEDROCK_VISION_MODEL_ID=amazon.nova-pro-v1:0
DYNAMODB_TABLE_NAME=KrishiNovaTable-prod
S3_ASSETS_BUCKET=krishinova-crop-assets-prod
```
*Note: In the absence of AWS credentials, KrishiNova automatically engages its local deterministic agronomic rule engines and provides transparent metadata attribution indicating offline resilience mode.*

---

## 8. License & Governance
Built for the AWS Hackathon. All agricultural recommendations are for decision support only. Refer to [`/disclaimer`](./src/app/disclaimer/page.tsx) for statutory notices.
