import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  CloudSun, 
  TrendingUp, 
  Scan, 
  Landmark, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Layers, 
  Cpu, 
  Compass, 
  Lock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Server,
  Zap,
  Globe2
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BlackholeHero } from "@/components/ui/BlackholeHero";
import { HomeFeaturePlayground } from "@/components/home/HomeFeaturePlayground";
import { LocationModal } from "@/components/layout/LocationModal";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { VERIFIED_GOVERNMENT_SCHEMES } from "@/lib/utils/constants";

export const metadata = {
  title: "KrishiNova | Enterprise AI Agricultural Intelligence Platform",
  description: "Unified agricultural decision platform combining hyper-local weather spray windows, official Agmarknet mandi commodity rates, verified government welfare schemes, and computer vision plant leaf diagnostics.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans w-full max-w-full overflow-x-hidden">
      <Header />
      <LocationModal />

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* 1. Cosmic Blackhole Hero Section */}
        <BlackholeHero />

        {/* 2. Interactive Operational Decision Simulator */}
        <HomeFeaturePlayground />

        {/* 3. The 5-Step Operational Architecture: How Big-Tech Quality Works for Farmers */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14 space-y-3">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                System Workflow Guide
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                A unified 5-step operational protocol
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Traditional farming forces you to juggle multiple slow, disconnected portals and television weather broadcasts. KrishiNova unifies every critical agronomic milestone into one coherent pipeline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    01
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Define Farm Context</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Set state, district, soil profile (Black Cotton, Loam, Alluvial), acreage, and sowing dates. All models calibrate to your field boundaries.
                  </p>
                </div>
                <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                  <span>GPS / Boundary Sync</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    02
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Calculate Spray Windows</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Check live wind velocity, rain probability within 3 hours, and leaf wetness. Never waste expensive agrochemicals on rainy or windy days.
                  </p>
                </div>
                <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                  <span>Open-Meteo Grids</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    03
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Track Mandi Auctions</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Review official Agmarknet arrivals, modal prices, and 30-day price trends across nearby APMCs to negotiate fair terms with middlemen.
                  </p>
                </div>
                <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                  <span>Agmarknet & DMI Feeds</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    04
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Diagnose Plant Health</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Take a photo of diseased leaves or stems. Multimodal vision models detect blights, rusts, and wilts, providing safe CIBRC-approved dosages.
                  </p>
                </div>
                <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                  <span>Multimodal Vision</span>
                </div>
              </div>

              {/* Step 5 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    05
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Claim Direct Subsidies</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Browse verified Central and State agricultural schemes (PM-KISAN, PMFBY, KUSUM). Access document lists and official portal links in 1 click.
                  </p>
                </div>
                <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                  <span>Verified .gov.in Portals</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Enterprise Standard vs Fragmented Portals Matrix */}
        <section className="py-20 bg-slate-100 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 space-y-3">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                The KrishiNova Difference
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Why modern agriculture requires an integrated intelligence platform
              </h2>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-4">Operational Capability</th>
                    <th className="p-4 text-emerald-400">KrishiNova Enterprise Standard</th>
                    <th className="p-4 text-slate-400">Traditional / Disjointed Systems</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Spray Feasibility</td>
                    <td className="p-4 text-emerald-900 font-semibold bg-emerald-50/50">
                      Calculates drift velocity & precipitation runoff window before spray tanks open.
                    </td>
                    <td className="p-4 text-slate-500">
                      General television weather without wind drift thresholds or spray advice.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Mandi Price Data</td>
                    <td className="p-4 text-emerald-900 font-semibold bg-emerald-50/50">
                      Directly verified Agmarknet feeds with transparent offline state if mandis are closed.
                    </td>
                    <td className="p-4 text-slate-500">
                      Static newspapers, verbal broker quotes, or unverified social media claims.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Pathology Diagnosis</td>
                    <td className="p-4 text-emerald-900 font-semibold bg-emerald-50/50">
                      Computer vision diagnostics with organic bio-controls and CIBRC chemical dosages.
                    </td>
                    <td className="p-4 text-slate-500">
                      Guesswork at retail input shops often leading to unnecessary expensive pesticides.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Welfare Schemes</td>
                    <td className="p-4 text-emerald-900 font-semibold bg-emerald-50/50">
                      100% verified document checklists and direct outbound links to official .gov.in domains.
                    </td>
                    <td className="p-4 text-slate-500">
                      Confusing government portals, outdated blog posts, or predatory scam links.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Data Privacy</td>
                    <td className="p-4 text-emerald-900 font-semibold bg-emerald-50/50">
                      DPDP 2023 compliant: 0% ad tracking, no third-party pixels, encrypted serverless storage.
                    </td>
                    <td className="p-4 text-slate-500">
                      Ad-supported apps selling farmer contact lists to commercial agrochemical brokers.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5. Cloud Architecture & Technical Transparency */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900">
                  <Server className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Cloud Architecture Transparency</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Engineered with Amazon Bedrock, DynamoDB, and Open Meteorological Standards
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  KrishiNova relies on decoupled cloud primitives designed for resilience. When external government feeds or internet connectivity experience regional drops, the system gracefully falls back to deterministic ICAR agronomic rules.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <Zap className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Amazon Bedrock Nova Models</h4>
                      <p className="text-xs text-slate-600">
                        Context-conditioned agronomic reasoning running on secure AWS infrastructure in ap-south-1 (Mumbai).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <Layers className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Amazon DynamoDB Persistence</h4>
                      <p className="text-xs text-slate-600">
                        Single-digit millisecond latency for farmer profile configuration, land records, and diagnostic histories.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <Globe2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Open Meteorological Grids</h4>
                      <p className="text-xs text-slate-600">
                        High-resolution 1km atmospheric numerical weather prediction feeds parsed server-side to shield farmer IP addresses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Code & Architecture Box */}
              <div className="lg:col-span-6 bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-emerald-400 font-bold">src/lib/providers/providerFactory.ts</span>
                  <span className="text-[10px] text-slate-500">Decoupled Adapter Layer</span>
                </div>
                <pre className="text-slate-300 overflow-x-auto text-[11px] leading-relaxed no-scrollbar p-2">
{`// KrishiNova Provider Architecture
export class ProviderFactory {
  // Meteorological Spray Calculus
  static getWeatherProvider(): WeatherProvider {
    return new WeatherProvider(process.env.METEO_URL);
  }

  // Agmarknet Official APMC Mandi Ingestion
  static getMarketDataProvider(): MarketDataProvider {
    return new MarketDataProvider();
  }

  // Bedrock Nova-Lite Agronomic AI
  static getAIProvider(): AIProvider {
    return new AIProvider({
      region: "ap-south-1",
      modelId: "amazon.nova-lite-v1:0"
    });
  }
}`}
                </pre>
                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-sans">
                  Resilient fallback ensures 100% platform availability even during upstream API outages.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Frequently Asked Questions (FAQ) */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Farmer FAQ
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-600">
                Clear answers regarding data sources, privacy, offline capabilities, and government scheme legitimacy.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Where does KrishiNova get its market commodity prices?</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  Prices are ingested from the Directorate of Marketing & Inspection (DMI) under the Ministry of Agriculture & Farmers Welfare, GoI (via Agmarknet feeds and data.gov.in). If an APMC mandi is closed on Sundays or holidays, KrishiNova explicitly states that trading is closed rather than inventing fake numbers.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>How does the Agricultural Spray Window Calculator work?</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  It assesses real-time numerical weather prediction data. If wind speed exceeds 15-18 km/h (causing spray drift), or rain probability within 3 hours is higher than 40% (causing chemical wash-off into groundwater), the platform flags the window as UNFAVORABLE to protect your investment.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Is my farm acreage and personal information kept private?</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  Yes. Under our DPDP 2023 compliant data governance policy, your agricultural coordinates, crop names, and landholdings are strictly confidential. We do not sell farmer lists to agrochemical brokers or third-party marketing networks.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Can I apply for government schemes directly within KrishiNova?</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  For your legal security, final applications for PM-KISAN, PMFBY, and KCC must be submitted directly through official government portals. KrishiNova provides verified eligibility checklists and direct outbound links to the authentic .gov.in domains.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Dedicated Trust, Integrity & Launch CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="space-y-3 max-w-2xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-xs font-semibold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Production Ready Agricultural Intelligence</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Experience Truth in Agriculture with KrishiNova
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Join Indian agriculturalists utilizing verified atmospheric data, transparent Agmarknet modal prices, and multimodal vision diagnostics.
                </p>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <Link href="/auth/login?redirect=/dashboard" className="w-full sm:w-auto">
                  <Button size="lg" variant="primary" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 shadow-xl">
                    <span>Access Dashboard</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/schemes" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-700 text-slate-200 hover:bg-slate-800">
                    Browse Schemes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieConsent />
    </div>
  );
}
