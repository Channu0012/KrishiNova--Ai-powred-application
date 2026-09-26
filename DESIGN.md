# KrishiNova: Design System & UI Architecture Specification

**Design Version:** 1.0.0  
**Design Philosophy:** Swiss Minimalist + Organic Biophilic Utility (Tailored for high-density agricultural decision support)  
**WCAG Target:** 2.2 AA Compliance  
**Author:** KrishiNova UI/UX Design System Team  

---

## 1. Visual Identity & Brand Foundations

KrishiNova's design language communicates scientific authority, reliability, and immediate practical utility for farmers and agriculturalists.

### 1.1 Brand Logo
- **Symbol:** An architectural emerald and forest green leaf converging upward into a mountain peak, sheltering a rising harvest sun (warm amber).
- **Favicon & Icon:** Scaled version of the official KrishiNova insignia located at `/public/logo.png`, `src/app/icon.png`, and `src/app/favicon.ico`.
- **Usage:** Minimum height 32px; always paired with high-contrast text "KrishiNova" with an optional subscript "Agricultural Intelligence Platform".

---

## 2. Color Palette & Semantic Tokens

We strictly avoid over-saturated neon gradients, floating glow blobs, or pervasive purple fills. The palette is grounded in authentic agrarian greens, earth tones, and warm harvest accents.

| Token | Hex Value | Semantic Role & Application | Contrast Ratio (vs #FFFFFF) |
| :--- | :--- | :--- | :--- |
| `--color-primary-900` | `#064e3b` | Primary branding, deep headers, critical status text | 9.8:1 (AAA) |
| `--color-primary-800` | `#065f46` | Navigation active items, primary solid button background | 7.6:1 (AAA) |
| `--color-primary-700` | `#047857` | Primary button hover state, prominent active badges | 5.2:1 (AA) |
| `--color-primary-600` | `#059669` | Success indicators, favorable spray conditions | 4.6:1 (AA) |
| `--color-primary-50` | `#ecfdf5` | Primary background tint, subtle highlights, active cards | N/A (Background) |
| `--color-accent-amber` | `#d97706` | Sun accent, marginal warnings, financial subsidy badges | 4.8:1 (AA) |
| `--color-accent-amber-light` | `#fef3c7` | Warning banners, marginal spray condition backgrounds | N/A (Background) |
| `--color-danger-700` | `#b91c1c` | Error alerts, severe pest warnings, unfavorable spray | 5.9:1 (AA) |
| `--color-danger-50` | `#fef2f2` | Error banner backgrounds | N/A (Background) |
| `--color-neutral-900` | `#0f172a` | Primary body typography and card titles | 16.2:1 (AAA) |
| `--color-neutral-700` | `#334155` | Secondary body text, table data labels | 8.5:1 (AAA) |
| `--color-neutral-500` | `#64748b` | Sub-labels, metadata timestamps, input borders | 4.6:1 (AA) |
| `--color-neutral-200` | `#e2e8f0` | Card borders, table dividers, form borders | N/A (Border) |
| `--color-neutral-100` | `#f1f5f9` | Secondary button background, card hover fills | N/A (Background) |
| `--color-neutral-50` | `#f8fafc` | Global application canvas background | N/A (Canvas) |
| `--color-surface` | `#ffffff` | Elevated card surfaces, modal sheets | N/A (Surface) |

---

## 3. Typography System

- **Primary Font Family:** `Inter`, `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.
- **Monospace (Numbers & Rates):** `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` (used for mandi rates, coordinates, and weather numbers to ensure vertical tabular alignment).

### Type Scale

| Element | Class / Token | Font Size | Line Height | Weight | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Page H1** | `text-3xl font-bold` | 30px (1.875rem) | 38px | 700 (Bold) | `-0.02em` |
| **Section H2** | `text-2xl font-semibold` | 24px (1.5rem) | 32px | 600 (Semibold) | `-0.015em` |
| **Card H3** | `text-lg font-semibold` | 18px (1.125rem) | 26px | 600 (Semibold) | `-0.01em` |
| **Subhead H4** | `text-base font-medium` | 16px (1.0rem) | 24px | 500 (Medium) | `0` |
| **Body (Default)** | `text-sm font-normal` | 14px (0.875rem) | 20px | 400 (Regular) | `0` |
| **Data Metric Large** | `text-2xl font-bold font-mono` | 24px (1.5rem) | 28px | 700 (Bold) | `-0.02em` |
| **Caption / Timestamp** | `text-xs font-medium` | 12px (0.75rem) | 16px | 500 (Medium) | `0.01em` |

---

## 4. Spacing, Grid & Border Radius

- **Base Spacing Unit:** 4px (Tailwind standard: `p-1` = 4px, `p-2` = 8px, `p-4` = 16px, `p-6` = 24px, `p-8` = 32px).
- **Border Radius (Strict Prohibition on Pill Shapes):**
  - **Inputs & Buttons:** `rounded-lg` (8px / 0.5rem). Restrained, professional, tactile.
  - **Cards & Containers:** `rounded-xl` (12px / 0.75rem) with subtle border `border border-slate-200`.
  - **Badges & Tags:** `rounded-md` (6px / 0.375rem).
  - **Forbidden:** Full pill buttons (`rounded-full`) are prohibited for action buttons.

---

## 5. Component Standards

### 5.1 Buttons
Buttons must communicate clear, actionable outcomes.
- **Primary:** `bg-emerald-800 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none`.
- **Secondary / Outline:** `bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-medium px-4 py-2 rounded-lg transition-colors`.
- **Destructive:** `bg-red-700 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg`.
- **Action Verbs Enforced:**
  - *"Check weather"* (NOT "Discover the Sky")
  - *"View market prices"* (NOT "Unlock Market Dynamics")
  - *"Analyze crop image"* (NOT "Experience Vision Intelligence")
  - *"Ask agronomy assistant"* (NOT "Empower Your Journey")

### 5.2 Form Inputs
- Clear floating or top-aligned labels (`text-xs font-semibold text-slate-700 uppercase tracking-wide`).
- Border: `border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none`.
- Form errors: Explicit red helper text (`text-xs text-red-600 mt-1 flex items-center gap-1`).

### 5.3 Data Cards
- Container: `bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-colors`.
- Card Header: Left-aligned icon + title + right-aligned badge or timestamp.
- Card Body: Clean metric presentation with explicit source attribution.

### 5.4 Data Tables (Mandi Prices & Forecasts)
- Bordered, striped or clean dividers (`divide-y divide-slate-100`).
- Header: `bg-slate-50 text-xs font-semibold text-slate-600 uppercase tracking-wider px-4 py-3 text-left`.
- Cells: `px-4 py-3 text-sm text-slate-800`.
- Numbers: Tabular numbers (`tabular-nums font-mono text-right`).

---

## 6. Icons & Visual Hierarchy (Strict No-Emoji Rule)

- **Library:** `lucide-react`.
- **Size Consistency:**
  - In-button icons: 16px (`w-4 h-4`).
  - Card header icons: 20px (`w-5 h-5`).
  - Large status illustration icons: 32px–40px (`w-8 h-8` or `w-10 h-10`).
- **Semantic Color Pairs:**
  - Weather: `Sun`, `CloudRain`, `Wind`, `Droplets` in Slate/Emerald/Amber.
  - Market: `TrendingUp`, `TrendingDown`, `Store`, `Tag` in Emerald/Slate.
  - Crop Diagnostic: `Scan`, `Leaf`, `AlertTriangle`, `CheckCircle` in Emerald/Amber/Red.
  - Schemes: `Landmark`, `ShieldCheck`, `FileText`, `ExternalLink` in Slate/Emerald.

---

## 7. The Five UI States Pattern

Every feature that ingests or generates agricultural data implements five distinct, accessible UI states:

1. **Loading State:**
   - Skeleton shimmer matching exact element geometries (`animate-pulse bg-slate-200 rounded`).
   - Accessible ARIA label: `aria-busy="true" aria-live="polite"`.
2. **Success State:**
   - Display rendered data.
   - Mandatory metadata: "Observed at [Time] via [Provider Name]".
3. **Empty State:**
   - Concise illustration icon (Lucide) + Title + Specific rationale.
   - Example: *"No mandi trades reported today for Tomato in Nashik APMC. Mandi auctions occur Monday through Saturday."*
4. **Error State:**
   - Amber/Red border box with alert icon.
   - Plain error message (no developer stack traces).
   - Prominent "Retry Request" button.
5. **Offline / External API Unavailable State:**
   - Explicit disclaimer badge: e.g. `[Provider Offline / Disconnected]`.
   - Explains that external Agmarknet or IMD endpoints are unreachable and that KrishiNova will automatically resume polling.

---

## 8. Motion & Animation Standards

- **Principle:** Purposeful, restrained micro-interactions only.
- **Allowed Transitions:**
  - Button hover: `transition-colors duration-150 ease-in-out`.
  - Dropdown & Modal: `transition-opacity duration-200 ease-out`.
  - Loading skeleton: `animate-pulse duration-1000`.
- **Strictly Prohibited:**
  - Parallax scrolling.
  - Mouse/cursor-following effects or particle animations.
  - Excessive 3D flip cards or rotating icons.
- **Accessibility:**
  - `@media (prefers-reduced-motion: reduce)` disables all transforms and pulses.
