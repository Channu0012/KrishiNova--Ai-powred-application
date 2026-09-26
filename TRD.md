# KrishiNova: Technical Requirements Document (TRD)

**Document Version:** 1.0.0  
**Target Infrastructure:** AWS (Amplify, Lambda, Bedrock / Amazon Nova, DynamoDB, S3, Cognito)  
**Framework Stack:** Next.js (App Router, React 19, TypeScript), Tailwind CSS, Lucide React, Zod  
**Security Standard:** OWASP Top 10 Compliant, AWS Well-Architected Framework  

---

## 1. System Architecture Overview

KrishiNova utilizes a decoupled, serverless, cloud-native architecture optimized for high availability, low latency across Indian rural and tier-2/3 network conditions, and strict data integrity.

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

## 2. Frontend Architecture

### 2.1 Next.js App Router Structure
- **Root Layout (`src/app/layout.tsx`):** Implements global font loading (`Inter`), meta headers, high-contrast accessible design tokens, and the official KrishiNova favicon/branding.
- **Route Segments:**
  - `/` — High-integrity Landing Page (Concrete value proposition, no AI marketing slop, zero fake counters, feature breakdown, official schemes directory preview).
  - `/auth/login` & `/auth/register` — Accessible credential forms with Zod validation.
  - `/dashboard` — Core Farmer Command Center.
    - Weather Card & Spray Advisories.
    - Mandi Market Rates (Min/Max/Modal per quintal).
    - AI Agronomic Advisory (Tailored to farmer's crop and stage).
    - Crop Health Diagnostic & Image Upload.
    - Official Government Schemes Catalog.
    - Interactive Farming Assistant Chat.
  - `/profile` — Farm details, land acreage, soil type, irrigation mode, crop calendar.
  - `/privacy` — Comprehensive privacy policy on data collection and AI processing.
  - `/terms` — Terms of Service, liability limitations, and agricultural decision support disclaimer.
  - `/disclaimer` — Dedicated Agronomic Advisory Disclaimer.

### 2.2 Component & State Principles
- **No Ad-Hoc Styling:** All UI elements use Tailwind tokens adhering to the KrishiNova Design System (Dark green `#14532d` / `#166534`, Warm harvest amber `#d97706`, Slate neutrals, 8px radius, no pill buttons).
- **No Emoji Interface Icons:** 100% Lucide React icons with semantic labels and accessible SVG attributes (`aria-hidden="true"` or descriptive title).
- **Five State UX Guarantee:** Every component handling external data handles:
  1. `LOADING`: Skeleton pulse matching layout dimensions.
  2. `SUCCESS`: Verified data with observation timestamp and source attribution.
  3. `EMPTY`: Clear explanation when no data exists for today's date or region.
  4. `ERROR`: Graceful failure notification with retry button.
  5. `OFFLINE / UNAVAILABLE`: Transparent indicator when external providers are down or unconfigured.

---

## 3. Backend & Provider Abstraction Architecture

In accordance with Section 4 and Section 40 of the specifications, all external integrations are strictly isolated behind server-side provider interfaces. Secret credentials are never bundled into client JavaScript.

### 3.1 Provider Interfaces

```typescript
// 1. Weather Provider
export interface IWeatherProvider {
  getForecast(latitude: number, longitude: number): Promise<WeatherForecastResult>;
  getAgriculturalAdvisory(weather: WeatherData, crop: string): AgriculturalSprayAdvice;
}

// 2. Market Data Provider
export interface IMarketDataProvider {
  getMandiPrices(state: string, district?: string, commodity?: string): Promise<MarketPriceResult>;
  getSupportedCommodities(): Promise<string[]>;
}

// 3. Scheme Provider
export interface ISchemeProvider {
  getSchemes(filters?: SchemeFilters): Promise<GovernmentScheme[]>;
  getSchemeById(id: string): Promise<GovernmentScheme | null>;
}

// 4. AI Provider (Amazon Bedrock / Nova)
export interface IAIProvider {
  generateAgronomicAdvice(context: FarmContext, query: string): Promise<AIAdvisoryResponse>;
  analyzeCropHealth(imageBase64: string, mimeType: string, crop: string): Promise<CropDiagnosticResponse>;
}

// 5. Storage Provider (Amazon S3)
export interface IStorageProvider {
  uploadCropImage(fileBuffer: Buffer, mimeType: string, filename: string): Promise<{ fileUrl: string; key: string }>;
  getPresignedUploadUrl(filename: string, mimeType: string): Promise<{ uploadUrl: string; key: string }>;
}
```

### 3.2 Offline / Development Fallback Strategy
When AWS Bedrock, S3, or Agmarknet credentials are not supplied in `.env.local`:
- The provider factory instantiates the **Local Offline Provider** or **Public Open Provider** (e.g. Open-Meteo for live global/Indian meteorology).
- The response carries a metadata flag: `provider: "open-meteo" | "local-agronomic-engine" | "bedrock-nova"`.
- If a provider has no local heuristic, it returns an explicit `UNAVAILABLE` payload so the UI shows an honest empty state without hallucinating data.

---

## 4. AWS Cloud Architecture

### 4.1 AWS Amplify
- Hosts the Next.js App Router application with automatic CI/CD deployment from Git.
- Provides SSL/TLS certificates via AWS Certificate Manager (ACM).
- Manages environment variables securely via Amplify Console (never in Git).

### 4.2 Amazon Bedrock / Amazon Nova
- Model IDs:
  - `amazon.nova-lite-v1:0` (Rapid agronomic queries, fast latency).
  - `amazon.nova-pro-v1:0` (Multimodal crop disease image classification).
- Guardrails:
  - Input filtering for agricultural relevance.
  - Output constraint enforcement (strict JSON schema output).
  - Mandatory disclaimer insertion on all pesticide/fertilizer recommendations.

### 4.3 Amazon DynamoDB
- Primary Database utilizing Single-Table Design pattern for low cost and sub-10ms queries.
- Encryption at rest via AWS KMS (AWS managed key `aws/dynamodb`).
- Point-In-Time Recovery (PITR) enabled in production.
- TTL (Time-To-Live) enabled on weather cache (`ttl` timestamp) to prevent stale meteorological data.

### 4.4 Amazon S3
- Bucket: `krishinova-crop-assets-${stage}`
- Encryption: Server-Side Encryption with KMS (SSE-KMS).
- Access Control: Bucket policy blocking all public reads. Image downloads handled via CloudFront signed URLs or short-lived presigned URLs (15-minute expiration).
- CORS: Restricted to KrishiNova production and staging domains.

### 4.5 Amazon Cognito
- User Pool: Email-based authentication, password policy requiring min 8 chars, numbers, symbols.
- App Client: Web client with SRP (Secure Remote Password) protocol.
- JWT Tokens: Access tokens valid for 1 hour, Refresh tokens valid for 30 days with token revocation enabled.

---

## 5. Security & Threat Mitigation

### 5.1 OWASP Top 10 Safeguards
1. **Broken Access Control:** Server-side route handlers verify JWT/session tokens on all `/api/profile/*` and `/api/ai/*` mutations.
2. **Cryptographic Failures:** TLS 1.3 enforced. All credentials passed strictly via environment variables. Zero credentials exposed in `NEXT_PUBLIC_*`.
3. **Injection:** Zod schemas validate all inputs. DynamoDB SDK v3 parameterized queries prevent NoSQL injection.
4. **Insecure Design:** Mandatory disclaimer on agricultural recommendations; system prevents farmers from treating AI advice as legally binding certitude.
5. **Security Misconfiguration:** Strict Content-Security-Policy (CSP), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security: max-age=31536000; includeSubDomains`.
6. **Vulnerable and Outdated Components:** Dependabot/npm audit verification before build.
7. **Identification and Authentication Failures:** Rate limiting on auth endpoints (max 5 failed attempts per 15 minutes).
8. **Software and Data Integrity Failures:** Image upload validation checks both declared MIME type and magic byte file headers.
9. **Security Logging and Monitoring Failures:** Structured JSON logs sent to stdout / AWS CloudWatch without sensitive PII (redacted phone/passwords).
10. **Server-Side Request Forgery (SSRF):** Weather and market endpoints do not accept arbitrary URLs from clients; queries use predefined upstream endpoints.

### 5.2 File & Image Upload Validation
- Max file size: 5 MB (5,242,880 bytes).
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`.
- Server-side validation: Verifies file magic numbers (`FF D8 FF` for JPEG, `89 50 4E 47` for PNG, `52 49 46 46` for WebP).
- Sanitized filenames: Input filenames stripped of path traversals (`../`) and re-keyed with UUIDv4.

---

## 6. Testing & Quality Assurance Plan

### 6.1 Testing Levels
- **Unit Testing:** Vitest / Jest testing for provider factories, validation schemas, weather risk calculators, and market price parsers.
- **Integration Testing:** Verification of API endpoints (`/api/weather`, `/api/markets`, `/api/schemes`, `/api/ai/advice`, `/api/crop-analysis`).
- **End-to-End Testing:** Critical path flows:
  1. Profile creation -> Dashboard personalization.
  2. Selecting district -> Weather & market updates.
  3. Crop image diagnostic upload -> Report rendered.
  4. AI Assistant query -> Structured agronomic answer.
- **Edge Case & Failure Testing:**
  - Mock network failures on weather API -> Verify offline card.
  - Blank/empty mandi responses -> Verify "Mandi data unavailable" notice.
  - Invalid file upload -> Verify prompt rejection.

---

## 7. Observability, Logging & Monitoring

- **Structured Logging:** Standard JSON format with `timestamp`, `level`, `requestId`, `service`, `durationMs`, and `error`.
- **Metrics Tracked:**
  - API Latency p50, p95, p99.
  - Bedrock token consumption and error rates.
  - External weather/mandi provider timeout frequency.
- **Alerting:** CloudWatch Alarms trigger SNS notification if 5xx error rate exceeds 1% over 5 minutes.
