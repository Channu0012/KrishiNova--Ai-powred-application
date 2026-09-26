# KrishiNova: Product Requirements Document (PRD)

**Document Version:** 1.0.0  
**Status:** Approved for Implementation  
**Target Platform:** Web (Desktop, Tablet, Mobile)  
**Infrastructure Target:** AWS (Amplify, Lambda, Bedrock/Nova, DynamoDB, S3, Cognito)  
**Author:** KrishiNova Engineering & Product Team  

---

## 1. Product Vision

KrishiNova is a production-grade, AI-powered agricultural intelligence platform designed to empower farmers with localized, transparent, and actionable agricultural intelligence. By synthesizing localized meteorology, official mandi market commodity pricing, verified government welfare schemes, and multimodal AI crop diagnostics into a unified, high-integrity dashboard, KrishiNova bridges the critical information asymmetry in agricultural decision-making.

### Guiding Engineering & Product Creed: Zero Synthetic Reality
- **Absolute Truth in Data:** KrishiNova never fabricates farmers, market rates, weather data, reviews, accuracy metrics, or government schemes.
- **Transparent Degradation:** When an external API (such as Agmarknet or IMD/Open-Meteo) is unavailable or rate-limited, the system displays honest, actionable empty/offline states rather than hallucinated or stale placeholders.
- **Responsible Agronomic AI:** AI recommendations are grounded in verified agronomic practices and explicitly segregated from raw data. AI diagnostics always provide severity ratings and expert consultation warnings.

---

## 2. Problem Statement

Smallholder and commercial farmers across India face severe operational and financial risks due to:
1. **Fragmented Information Silos:** Weather alerts, mandi commodity prices, government subsidy schemes, and agronomic advisories exist across disconnected portals (IMD, Agmarknet, State Agriculture Depts, VikasPedia), most of which are desktop-oriented, slow, or difficult to navigate.
2. **Untimely Agronomic Guidance:** Pest and disease outbreaks (e.g., tomato leaf blight, cotton bollworm) are identified too late, resulting in devastating yield loss or excessive chemical overuse.
3. **Price Asymmetry at Mandis:** Middlemen exploit lack of real-time market data, causing farmers to sell distress produce below fair market value.
4. **Bureaucratic Overhead in Schemes:** Billions of rupees in central and state welfare programs (PM-KISAN, PMFBY, Soil Health Card) go underutilized because smallholders do not know their specific eligibility or required documentation.
5. **Superficial "AI Slop" in Tech:** Existing agricultural apps often show fabricated testimonials, fake accuracy percentages, or generic AI chatter that fails to consider real farm location, crop growth stage, or soil type.

---

## 3. Target Users & Personas

### 3.1 Target User Segments
- **Progressive Smallholder Farmers (1–5 Acres):** Cultivate cash crops (tomato, chilli, onion, cotton) or staples (rice/paddy, wheat). High smartphone adoption, reliant on local mandi prices and weather forecasts.
- **Medium & Commercial Farmers (5–25 Acres):** Need structured multi-day crop scheduling, spray timing advisories, and price trend analysis.
- **Farmer Producer Organizations (FPOs) & Extension Workers:** Need a unified tool to guide member farmers on government scheme documentation and crop diagnostics.

### 3.2 User Personas

#### Persona A: Ramesh Patil (Cash Crop Cultivator, Maharashtra)
- **Profile:** 42 years old, cultivates 3.5 acres of tomatoes and onions in Nashik district.
- **Behavior:** Checks weather forecasts every morning before planning pesticide spraying; monitors Lasalgaon and Pimpalgaon mandi prices before harvesting.
- **Pain Points:** Sudden unseasonal rainfall washes away expensive fungicidal sprays; local traders quote lower rates claiming oversupply.
- **Goal:** Know if rain is expected in the next 24–48 hours, see modal mandi rates for his district, and upload photos when leaf spots appear.

#### Persona B: Ananya Devi (Staple Farmer, Punjab)
- **Profile:** 38 years old, cultivates 8 acres of wheat and paddy in Ludhiana district.
- **Behavior:** Registered under PM-KISAN, looking into solar pump subsidies (PM-KUSUM) and crop insurance (PMFBY).
- **Pain Points:** Cannot easily find the checklist of documents needed for state subsidy verification; misses application deadlines.
- **Goal:** Clear, verified scheme criteria with official government portal application links and required document lists.

---

## 4. User Goals & Value Proposition

| User Need | KrishiNova Solution | Value Delivered |
| :--- | :--- | :--- |
| "Will it rain before I spray my crop tomorrow?" | Hyper-local precipitation probability, agricultural spray alerts (wind, humidity, rain). | Prevents chemical wash-off, saves input costs (₹3,000–₹10,000/acre). |
| "What are tomatoes selling for in my nearby mandis?" | Daily minimum, maximum, and modal mandi prices with exact timestamp and official Agmarknet attribution. | Stronger bargaining power with traders, reduces distress sales. |
| "What are these white spots on my tomato leaves?" | Multimodal crop image analysis diagnosing likely pathogen, symptoms, organic/chemical controls, and severity. | Early disease interception, preventing harvest collapse. |
| "Which government schemes am I eligible for?" | Searchable, filtered scheme registry with document checklists, direct official links, and verified subsidy details. | Direct access to financial support and subsidies without middlemen. |
| "I need context-specific advice for my 40-day tomato crop." | AI Farming Assistant powered by Amazon Bedrock / Nova, conditioned on farmer location, crop stage, and live weather. | Practical agronomic decision support. |

---

## 5. Scope of MVP

### 5.1 In-Scope (MVP Priorities)
1. **Farmer Profile Management:**
   - Identity (Name, Contact, Region: State, District).
   - Farm specs (Acreage, Soil Type, Primary Crops, Irrigation Mode).
   - Language preferences.
2. **Localized Weather Dashboard:**
   - Current temperature, humidity, wind velocity, and condition code.
   - 5-day precipitation probability and agricultural spray windows.
   - Real-time meteorological alerts (high humidity fungal risk, heat stress, frost warnings).
   - Strict API error handling: Transparent offline/unavailable states if meteorological feed is disconnected.
3. **Mandi Market Intelligence:**
   - Commodity filter by crop, state, and district mandis.
   - Minimum, maximum, and modal prices per quintal.
   - Data freshness timestamp and source attribution (`agmarknet.gov.in` / `data.gov.in`).
   - Honest empty states: If a mandi hasn't reported data today, explicitly displays "Price data unavailable for this date".
4. **AI Agronomic Assistant (Amazon Bedrock / Nova Integration):**
   - Context-aware advisory engine combining farm profile, crop stage, and local weather.
   - Guardrails against hallucination: Differentiates verified facts from probabilistic suggestions.
   - Clear agronomic disclaimer on every advisory.
5. **Multimodal Crop Image Diagnostic:**
   - Image upload with strict client-side & server-side validation (MIME type, max size 5MB, dimension sanity).
   - Analysis returns: Identified condition/pest, observable visual cues, actionable organic remedy, chemical control, prevention, and expert consultation trigger.
   - S3 secure storage abstraction with presigned URLs.
6. **Government Schemes Explorer:**
   - Verified catalog of major national and state agricultural schemes (PM-KISAN, PMFBY, PM-KUSUM, Soil Health Card, KCC, PKVY).
   - Document checklist, subsidy terms, eligibility requirements, and direct official government URLs.
7. **Legal, Security & Trust Foundation:**
   - Privacy Policy (`/privacy`), Terms & Conditions (`/terms`), Agricultural Advisory Disclaimer (`/disclaimer`).
   - Zero synthetic social proof, zero fake testimonials, zero fake farmer counts.
   - Official brand asset integration (KrishiNova custom vector logo and favicon).

### 5.2 Out of Scope (Post-MVP Roadmap)
- Real-time IoT soil sensor hardware integrations (slated for v2.0).
- Payment gateway for buying agricultural inputs directly in-app.
- Peer-to-peer farmer forum or social feed.
- Drone multispectral imagery processing.

---

## 6. Functional Requirements

### 6.1 Authentication & Profile
- **FR-AUTH-01:** Farmers can sign up and authenticate securely with email/password and session management (Cognito-ready abstraction).
- **FR-AUTH-02:** User session tokens are strictly handled server-side or via secure HTTP-only cookies; credentials are never leaked.
- **FR-PROF-01:** Farmers can create and update their farm profile (State, District, Land Size, Soil Type, Primary Crop, Sowing Date).
- **FR-PROF-02:** The dashboard automatically personalizes weather, market data, and AI prompts based on the saved active profile.

### 6.2 Weather Module
- **FR-WTH-01:** System retrieves coordinates for the selected district and queries meteorological provider.
- **FR-WTH-02:** Displays current temperature (°C), weather condition, relative humidity (%), wind speed (km/h), and precipitation chance (%).
- **FR-WTH-03:** Calculates Agricultural Advisory flags:
  - *Spray Window:* Safe, Marginal, or Unsafe (based on wind speed > 20 km/h or rain chance > 50%).
  - *Fungal Risk:* Elevated when humidity > 85% for 48 consecutive hours.
- **FR-WTH-04:** Displays exact observation timestamp and provider attribution.

### 6.3 Market Intelligence Module
- **FR-MKT-01:** Allows searching commodity rates by Crop, State, and District.
- **FR-MKT-02:** Shows Min Price, Max Price, and Modal Price per Quintal (₹/Q).
- **FR-MKT-03:** When prices are not reported for the current trading session, displays: *"Market data currently unavailable for this mandi. Showing last reported session [date] or empty."*

### 6.4 AI Assistant Module
- **FR-AI-01:** Accepts farmer questions in natural language.
- **FR-AI-02:** Automatically binds system context: Farmer's selected crop, crop age/sowing date, district, soil type, and current weather summary.
- **FR-AI-03:** Generates structured response format:
  1. Primary Advisory
  2. Agronomic Rationale
  3. Action Steps (Do this first, do this next)
  4. Safety / Toxicity Considerations
- **FR-AI-04:** Every response contains a standard advisory disclaimer.

### 6.5 Crop Image Analysis Module
- **FR-IMG-01:** Allows uploading image files (JPEG, PNG, WebP) up to 5MB.
- **FR-IMG-02:** Validates file magic bytes and MIME type before processing.
- **FR-IMG-03:** Produces diagnostic report: Identified Issue, Observable Symptoms, Immediate Remediation, Prevention Plan, Expert Escalation Threshold.
- **FR-IMG-04:** Clearly marks diagnostic confidence level (High, Moderate, Inconclusive) and reminds farmer to verify with local Krishi Vigyan Kendra (KVK).

### 6.6 Government Schemes Module
- **FR-SCH-01:** Categorizes schemes by: Direct Benefit Transfer, Crop Insurance, Solar & Irrigation, Credit & Loans, Organic Farming.
- **FR-SCH-02:** Provides exact required documents list (Aadhaar, Land 7/12 extract, Bank passbook, etc.).
- **FR-SCH-03:** Contains verified external hyperlinks to official `.gov.in` portals.

---

## 7. Non-Functional Requirements

### 7.1 Performance & Responsiveness
- First Contentful Paint (FCP) < 1.2s on 4G networks.
- Time to Interactive (TTI) < 2.5s.
- Total JavaScript bundle < 180kB initial chunk.
- Responsive across viewports: Mobile (360px–480px), Tablet (768px–1024px), Desktop (1280px+).

### 7.2 Security & Data Protection
- Zero plaintext API keys or cloud credentials in client-side bundles.
- Provider abstraction layer ensures credentials reside solely in server-side runtime environments.
- Strict Content Security Policy (CSP) and security headers (HSTS, X-Content-Type-Options, X-Frame-Options).
- Image uploads sanitized and restricted by size, dimensions, and MIME types.

### 7.3 Accessibility (WCAG 2.2 AA)
- Minimum contrast ratio of 4.5:1 for standard text and 3:1 for large graphical elements.
- Semantic HTML tags (`<main>`, `<nav>`, `<article>`, `<section>`, `<header>`).
- Full keyboard navigability (Tab, Enter, Space, Escape) with visible focus rings (`focus-visible`).
- Zero reliance on color alone for conveying status (icons + text always paired).
- Respects `prefers-reduced-motion`.

### 7.4 Reliability & Fault Tolerance
- All remote API calls must have bounded timeouts (default 8 seconds).
- Graceful degradation: If Bedrock is unreachable or unconfigured, the app falls back to a deterministic, expert-authored agronomic rule engine with a clear status notice.
- If weather API is unavailable, the dashboard remains usable for market prices and schemes.

---

## 8. Error States & Edge Cases

| Scenario | System Reaction & User Experience |
| :--- | :--- |
| **API Timeout on Weather** | Displays: *"Weather service is temporarily unreachable. Retrying in background..."* with a manual "Refresh Weather" button. |
| **No Mandi Rates Today (Sunday/Holiday)** | Displays: *"Mandi closed or no trades reported for [Date]. Market trades resume on standard business days."* |
| **Unsupported Image Uploaded (e.g. PDF/EXE)** | Client rejects instantly: *"Invalid file type. Please upload a clear photo of crop leaves or stems (JPG, PNG, WebP up to 5MB)."* |
| **Blurred / Unclear Crop Image** | AI diagnostic responds with: *"Image resolution or focus is insufficient to reliably identify leaf symptoms. Please take a close-up photo in natural daylight."* |
| **No Internet Connection** | Client displays an offline banner: *"You appear to be offline. Reconnecting to KrishiNova servers..."* |
| **New Farmer with No Profile** | Guides farmer through a 2-minute setup: State -> District -> Crop -> Acreage. |

---

## 9. Future Roadmap (Post-Hackathon)
- **v1.1:** Multilingual localized voice input (Hindi, Marathi, Telugu, Kannada, Tamil, Punjabi).
- **v1.2:** SMS/WhatsApp weather advisory alerts for low-bandwidth zones.
- **v1.3:** Direct integration with Krishi Vigyan Kendra (KVK) agricultural extension scientists for live escalation.
- **v2.0:** IoT soil moisture and NPK sensor telemetry ingestion via AWS IoT Core.
