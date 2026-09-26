# KrishiNova: Complete Application & User Experience Flow

**Document Version:** 1.0.0  
**Target User:** Indian Smallholder & Commercial Farmers, FPOs, Extension Agronomists  
**Guiding Philosophy:** Clear visual hierarchy, zero fake social proof, immediate utility, transparent degradation.  

---

## 1. High-Level User Journey Diagram

```
                                  [Landing Page (/)]
               "Weather, market prices and agricultural guidance in one place."
                                           │
                        ┌──────────────────┴──────────────────┐
                        ▼                                     ▼
                [Explore Public Data]                [Sign Up / Sign In]
         (Browse Verified Schemes, Disclaimers)       (/auth/login, /auth/register)
                                                              │
                                                              ▼
                                                   [Farmer Profile Setup]
                                                 - District & State (GPS/Select)
                                                 - Primary Crops & Growth Stage
                                                 - Land Size & Soil / Irrigation
                                                              │
                                                              ▼
                                               [Farmer Command Dashboard (/dashboard)]
                                                              │
    ┌──────────────────────┬──────────────────────┬───────────┴──────────┬──────────────────────┐
    ▼                      ▼                      ▼                      ▼                      ▼
[Local Weather]     [Mandi Market Rates]   [AI Crop Advisory]   [Crop Health Scanner]   [Govt Schemes]
- Real-time temp    - Min/Max/Modal        - Crop-stage tailored- Photo upload (leaves) - Verified subsidies
- Rain probability  - Source attribution   - Spray advisories   - Disease diagnostic    - Document list
- Spray window alert- Transparent offline  - Rationale & safety - Remedy (organic/chem) - Direct official links
```

---

## 2. Screen-by-Screen Flow & Interaction Logic

### 2.1 Landing Page (`/`)
1. **Header & Navigation:**
   - KrishiNova official logo (vector/PNG with leaf and rising sun).
   - Links: Features, Government Schemes, Live Mandi Rates, Privacy, Login.
   - Primary Action: "Open Dashboard" or "Get Started".
2. **Hero Section (Strict No-AI-Slop Principle):**
   - **Headline:** *"Weather, market prices and agricultural guidance in one place."*
   - **Sub-headline:** *"A dedicated agricultural intelligence platform combining hyper-local forecasts, official Agmarknet mandi rates, verified government welfare schemes, and multimodal AI crop disease diagnostics."*
   - **Action Buttons:**
     - `[Open Agricultural Dashboard]` -> Links directly to `/dashboard`.
     - `[Explore Government Schemes]` -> Scrolls to schemes directory.
   - **Immediate Value Callouts (No fake stats!):**
     - Hyper-local weather & spray feasibility calculator.
     - Official mandi commodity price tracker (`data.gov.in` / `agmarknet.gov.in`).
     - Computer vision crop leaf disease analysis.
     - 100% verified central and state subsidy documentation.
3. **Core Workflows Breakdown:**
   - Visual architectural explanation of how weather, mandi, and AI interact.
   - Transparent data source disclosure: No simulated numbers.
4. **Footer:**
   - System status indicator (All providers operational / degraded).
   - Legal links: Privacy Policy, Terms & Conditions, Agricultural Advisory Disclaimer.

---

### 2.2 Authentication Flow (`/auth/login`, `/auth/register`)
1. **Registration (`/auth/register`):**
   - Full Name, Email, Password (min 8 chars, numbers, symbols), State, District.
   - Consent checkbox acknowledging that AI recommendations are decision-support tools and not legal guarantees.
2. **Login (`/auth/login`):**
   - Email and Password with rate-limiting protection.
   - Session establishment via secure cookies.
3. **Quick Access / Guest Farmer Mode:**
   - In hackathon / preview environments, farmers can proceed directly to `/dashboard` with a default region (e.g. Nashik, Maharashtra) while retaining the ability to customize their profile immediately in-app.

---

### 2.3 Farmer Profile Setup & Management (`/profile`)
1. **Geographic Location:**
   - State selection (e.g. Maharashtra, Karnataka, Punjab, Andhra Pradesh, Uttar Pradesh, etc.).
   - District selection (dynamically sets coordinate bounding box for weather and primary mandi lookup).
2. **Agricultural Parameters:**
   - Landholding (Acres): Numerical input (e.g. 3.5).
   - Soil Category: Black Cotton, Alluvial, Red Loam, Sandy Loam, Clay.
   - Irrigation Source: Drip Irrigation, Sprinkler, Canal / Flood, Rainfed.
3. **Crop Portfolio:**
   - Primary Crop: Tomato, Paddy/Rice, Wheat, Cotton, Onion, Chilli, Maize, Soybean, Sugarcane.
   - Sowing Date / Crop Age: Used to compute active vegetative, flowering, or fruiting stage.
4. **Preference Controls:**
   - Language selector (English, Hindi, Marathi, etc.).

---

### 2.4 Agricultural Command Dashboard (`/dashboard`)

The dashboard is structured into high-density, accessible cards with zero wasted space and zero fake statistics.

#### Card 1: Localized Weather & Spray Window
- **Location Badge:** e.g. "Nashik, Maharashtra (20.00°N, 73.78°E)" with quick-change trigger.
- **Current Metrics:** Temperature (°C), Humidity (%), Wind Speed (km/h), Precipitation Probability (%).
- **Agronomic Spray Feasibility Indicator:**
  - `FAVORABLE`: Wind < 15 km/h, Rain chance < 30%. *"Conditions safe for foliar spraying."*
  - `UNFAVORABLE`: Rain chance > 50% or Wind > 20 km/h. *"High risk of wash-off or spray drift. Defer spraying."*
- **5-Day Outlook:** Minimal forecast strip showing high/low and precipitation likelihood.
- **Provider & Freshness:** *"Observed 12 mins ago via Open-Meteo Meteorological Service."*

#### Card 2: Mandi Market Rates
- **Commodity & Mandi Filter:** Defaulted to farmer's primary crop and district.
- **Price Matrix (₹ per Quintal):**
  - Minimum Price: ₹ / Q
  - Maximum Price: ₹ / Q
  - Modal (Average Traded) Price: ₹ / Q
- **Source & Freshness:** *"Source: Agmarknet Directorate of Marketing & Inspection | Updated: Today 11:30 AM"*.
- **Offline / Closed State:** If no trades took place today: *"Mandi market closed or rates unrecorded for today. Showing previous reported session [Date] or select another mandi."*

#### Card 3: AI Crop Advisory & Stage Recommendations
- **Input Context:** Active Crop (Tomato), Stage (Day 42, Flowering), Current Weather (High humidity, 82%).
- **AI Recommendation Output:**
  - *Recommendation:* Actionable step (e.g. "Monitor for early blight; apply protective bio-fungicide or copper oxychloride if spots emerge.").
  - *Agronomic Rationale:* Why this recommendation applies to the specific humidity and crop stage.
  - *Immediate Next Action:* 1-2 concrete tasks.
  - *Safety Warning:* Mandatory compliance note on withholding periods and protective equipment.

#### Card 4: Multimodal Crop Health Scanner
- **Upload Dropzone:** Drag-and-drop or camera capture of affected leaf/stem.
- **Validation:** Automatic check for file type (JPG/PNG/WebP), size (< 5MB), and clarity.
- **Diagnostic Engine:**
  - Analyzed Condition: e.g. *"Early Blight (Alternaria solani)"* or *"Healthy Leaf"*.
  - Confidence Grade: High / Moderate / Inconclusive.
  - Observable Symptoms: Target-like concentric rings, yellow chlorotic halo.
  - Treatment Protocol:
    - *Organic Control:* Trichoderma viride or Neem-based botanical formulation.
    - *Chemical Control:* Mancozeb 75% WP @ 2g/liter of water.
  - *Expert Escalation Notice:* *"If yellowing spreads to more than 20% of the plant canopy, bring a live leaf sample to your nearest Krishi Vigyan Kendra (KVK)."*

#### Card 5: Official Government Welfare Schemes Explorer
- **Filter Tabs:** All, Income Support, Crop Insurance, Irrigation & Solar, Credit & Finance.
- **Scheme Cards:**
  - Scheme Name (e.g. PM-KISAN, PMFBY, PM-KUSUM, Soil Health Card).
  - Financial Benefit (e.g. *"₹6,000/year direct transfer"* or *"Up to 60% solar pump subsidy"*).
  - Eligibility Criteria: Clear bullet points.
  - Mandatory Documents: Checklist (Aadhaar, Land Records, Bank IFSC).
  - Direct Action: `[Official Government Portal ->]` button opening the verified `.gov.in` domain in a new tab.

#### Card 6: AI Farming Assistant Chat Drawer / Tab
- Interactive conversational interface where the farmer can ask specific questions (e.g., *"My tomato crop is 40 days old and rain is expected tomorrow. What should I do?"*).
- Context is automatically pre-injected into the prompt payload (crop, location, weather, soil).
- Strict hallucination safeguards and safety disclaimer footer.

---

## 3. Transparency & Error Recovery Flows

1. **Network Disconnection:** Persistent amber notification ribbon: *"Offline mode active. Displaying cached dashboard data. Remote sync paused."*
2. **Third-Party API Rate Limit:** Instead of crashing or showing a 500 stack trace, displays: *"Agmarknet API is currently experiencing heavy traffic. Data temporarily cached or unavailable. Please retry in 5 minutes."*
3. **Invalid Image Upload:** Rejection occurs prior to network upload: *"File rejected: Image exceeds 5MB limit or is not an allowed image format (JPEG/PNG/WebP)."*
