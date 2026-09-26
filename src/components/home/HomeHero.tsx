"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CloudSun, 
  TrendingUp, 
  Scan, 
  Landmark,
  MapPin,
  CheckCircle2,
  Zap,
  Leaf
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLocationLanguage } from "@/lib/context/LocationLanguageContext";

export function HomeHero() {
  const router = useRouter();
  const { isAuthenticated, demoLogin } = useAuth();
  const { activeHub, setIsLocationModalOpen } = useLocationLanguage();

  const handleDemoAccess = () => {
    demoLogin();
    router.push("/dashboard");
  };

  return (
    <section className="relative bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 border-b border-slate-200/80 pt-12 pb-20 overflow-hidden">
      {/* Subtle background ambient circles */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-emerald-100/40 via-transparent to-transparent pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-xs font-semibold text-emerald-900 shadow-2xs">
            <Leaf className="w-3.5 h-3.5 text-emerald-700" />
            <span>Autonomous Agricultural Intelligence</span>
          </div>

          <button
            type="button"
            onClick={() => setIsLocationModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors shadow-2xs cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span>Hub: <strong>{activeHub.district}, {activeHub.state}</strong></span>
            <span className="text-[10px] text-emerald-700 underline">Change</span>
          </button>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Precision Agriculture Intelligence,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-800">
              Built for Indian Farmers.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
            Eliminate chemical spray waste with 3-hour precipitation forecasts, discover transparent Agmarknet modal mandi prices, and detect crop diseases instantly with AI leaf diagnostics.
          </p>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" variant="primary" className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-8 shadow-sm">
              <span>{isAuthenticated ? "Open Farm Dashboard" : "Launch Dashboard"}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <button
            type="button"
            onClick={handleDemoAccess}
            className="w-full sm:w-auto px-5 py-3 rounded-lg border border-emerald-300 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-900 text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <Zap className="w-4 h-4 text-emerald-700" />
            <span>⚡ 1-Click Instant Demo</span>
          </button>
        </div>

        {/* Feature Cards Grid (Clean White Aesthetic) */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Feature 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Spray Feasibility</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Calculates drift velocity & precipitation runoff windows before costly chemical spray tanks open.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Real-time IMD & Meteo grids</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">APMC Mandi Rates</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Live modal prices and 30-day commodity trends directly from verified Agmarknet registers.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>8 Major Agricultural Hubs</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Crop Health Scanner</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Take photos of diseased leaves or stems to identify blights, rusts, and safe CIBRC dosage rates.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Multimodal Vision Analysis</span>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Govt Welfare Schemes</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Check eligibility criteria and required documents for PM-KISAN, PMFBY, and KCC subsidies.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Direct official .gov.in links</span>
            </div>
          </div>
        </div>

        {/* Security & Verification Guarantee Banner */}
        <div className="mt-10 p-4 rounded-xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 shadow-2xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span><strong>DPDP 2023 Compliant:</strong> 100% farmer data privacy, zero tracking pixels, no advertising brokers.</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
            <span>• Amazon Bedrock Nova Foundation Models</span>
            <span>• Amazon DynamoDB Single-Digit Latency</span>
          </div>
        </div>
      </div>
    </section>
  );
}
