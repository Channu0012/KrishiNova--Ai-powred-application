# KrishiNova: Third-Party SDK & Dependency Security Audit

**Document Version:** 1.0.0  
**Audit Date:** September 2026  
**Auditor:** Senior Security & Cloud Architect  
**Compliance Standard:** Indian DPDP Act 2023, AWS Well-Architected Security Pillar, OWASP Top 10  

---

## 1. Executive Summary

This document presents a comprehensive audit of all runtime dependencies, developer tools, and external cloud APIs utilized in the KrishiNova agricultural intelligence platform. 

**Key Audit Findings:**
1. **0% Tracking SDKs:** No Google Analytics, Meta Pixel, Hotjar, or commercial tracking SDKs are installed or invoked.
2. **Server-Side Isolation:** 100% of AWS SDKs and external APIs (`Open-Meteo`, `Agmarknet`) are executed server-side; credentials and API endpoints are never exposed in client JavaScript bundles.
3. **Zero External Font/Script CDNs:** Icons (`lucide-react`) and styles are bundled locally. No runtime external scripts are executed in the browser.
4. **Zero Known Vulnerabilities:** `npm audit` reports zero critical or high-severity vulnerabilities across the active dependency tree.

---

## 2. Runtime Dependency Inventory

| Package Name | Version | Execution Scope | Purpose | Security & Privacy Impact |
|---|---|---|---|---|
| `@aws-sdk/client-bedrock-runtime` | `^3.1141.0` | **Server-side only** | Amazon Bedrock Nova Foundation Model inference | Isolated within `src/lib/providers/AIProvider.ts`. Zero client bundle leakage. Zero PII transmitted without explicit farmer consent. |
| `@aws-sdk/client-dynamodb` | `^3.1141.0` | **Server-side only** | DynamoDB farmer profile persistence | Handled exclusively via Next.js API routes with IAM role least-privilege scoping. |
| `@aws-sdk/lib-dynamodb` | `^3.1141.0` | **Server-side only** | DocumentClient abstraction for DynamoDB | In-memory document marshalling; zero external network requests. |
| `@aws-sdk/client-s3` | `^3.1141.0` | **Server-side only** | S3 bucket storage for crop leaf pathology imagery | Images verified via magic byte inspection before transmission to encrypted S3 buckets. |
| `lucide-react` | `^1.48.0` | Client & Server | Accessible SVG icon system | Pure SVG rendering. Zero external network calls. No external fonts loaded. |
| `clsx` | `^2.1.1` | Client & Server | Conditional CSS class merging | Micro-utility (350 bytes). In-memory string manipulation only. |
| `tailwind-merge` | `^3.7.0` | Client & Server | Conflict resolution for Tailwind utility classes | Micro-utility. Zero dependencies, zero external network calls. |
| `zod` | `^4.6.5` | Client & Server | Runtime schema validation & sanitization | Enforces boundary checks on all API payloads and image metadata. Prevents injection attacks. |
| `next` | `16.3.6` | Client & Server | React App Router full-stack framework | Core framework with Turbopack, SSR, and built-in security headers. |
| `react` & `react-dom` | `19.2.8` | Client & Server | UI Component engine | Official React 19 production release. |

---

## 3. External API & Data Flow Audit

### 3.1 Open-Meteo Meteorology Service
- **Endpoint:** `https://api.open-meteo.com/v1/forecast`
- **Call Origin:** Server-side `WeatherProvider.ts`
- **Privacy Assessment:** The farmer's browser never connects directly to Open-Meteo. The Next.js server proxies the request using geographic latitude and longitude coordinates. Farmer IP addresses are completely shielded from third-party logging.

### 3.2 Directorate of Marketing & Inspection (Agmarknet / data.gov.in)
- **Endpoint:** `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070`
- **Call Origin:** Server-side `MarketDataProvider.ts`
- **Privacy Assessment:** Proxied via server routes with local 30-minute in-memory cache to prevent denial-of-service on upstream government servers and preserve farmer confidentiality.

### 3.3 Amazon Bedrock (Nova Lite Foundation Models)
- **Endpoint:** AWS Bedrock Runtime (`bedrock-runtime.ap-south-1.amazonaws.com`)
- **Call Origin:** Server-side `AIProvider.ts`
- **Privacy Assessment:** Farm context is anonymized (district, soil type, crop name) before prompting. No personal identifiable information (name, Aadhaar, phone number, land revenue survey numbers) is passed to the AI model.

---

## 4. Third-Party Tracker & Cookie Audit

- **Google Tag Manager / Analytics:** ❌ NOT INSTALLED
- **Meta (Facebook) Pixel:** ❌ NOT INSTALLED
- **X (Twitter) Conversion Tracking:** ❌ NOT INSTALLED
- **TikTok / Snap Pixels:** ❌ NOT INSTALLED
- **Advertising Remarketing Cookies:** ❌ ZERO
- **Behavioral Fingerprinting Scripts:** ❌ ZERO

KrishiNova maintains a **100% clean browser footprint**. All client-side storage is restricted to:
- `krishinova_session`: Authenticated farmer session token
- `krishinova_active_hub`: Selected agricultural district
- `krishinova_language`: Interface language preference
- `krishinova_cookie_consent`: User consent decision

---

## 5. Security & Verification Directives

1. **Sub-resource Integrity:** Any external asset in future iterations must enforce SHA-384 SRI hashes.
2. **Content Security Policy (CSP):** The production deployment specifies a strict CSP permitting script execution exclusively from `'self'`.
3. **Regular Auditing:** Run `npm audit --omit=dev` as part of CI/CD pipeline in AWS Amplify.
