"use client";

import React, { useState } from "react";
import { 
  CloudSun, 
  Wind, 
  Droplets, 
  TrendingUp, 
  Scan, 
  Bot, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Layers
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface Scenario {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  description: string;
  metrics: { label: string; value: string; status: "good" | "bad" | "neutral" }[];
  platformAdvice: {
    statusBadge: string;
    verdict: string;
    actionableGuidance: string;
    economicImpact: string;
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: "spray-feasibility",
    tabLabel: "1. Monsoon Spray Calculus",
    badge: "Meteorological Intelligence",
    title: "High Wind & Rain Hazard: Evaluating Spray Windows",
    description: "Before opening expensive pesticide or bio-fertilizer spray tanks, KrishiNova computes wind drift velocities and precipitation wash-off probability from high-resolution atmospheric models.",
    metrics: [
      { label: "Wind Velocity", value: "22 km/h", status: "bad" },
      { label: "Rain Probability (3h)", value: "68%", status: "bad" },
      { label: "Relative Humidity", value: "88%", status: "neutral" },
      { label: "Atmospheric Stability", value: "Gusty / Unstable", status: "bad" },
    ],
    platformAdvice: {
      statusBadge: "UNFAVORABLE",
      verdict: "Do Not Spray — Immediate Chemical Runoff Hazard",
      actionableGuidance: "High wind exceeds the 15 km/h CIBRC safety drift limit. Imminent rainfall within 3 hours will wash away 100% of contact foliar sprays. Postpone chemical operations until Wednesday 06:00 AM.",
      economicImpact: "Prevents an estimated ₹1,450 / acre in wasted chemical inputs and non-target environmental drift.",
    },
  },
  {
    id: "mandi-timing",
    tabLabel: "2. Mandi Market Timing",
    badge: "Agmarknet Price Discovery",
    title: "Supply Squeeze: Negotiating Fair Modal Auction Rates",
    description: "Traders often exploit information asymmetries at the farm gate. KrishiNova aggregates official APMC modal rates, arrivals volume, and daily 30-day moving trends.",
    metrics: [
      { label: "Nashik APMC Arrivals", value: "1,240 Qt (-35%)", status: "good" },
      { label: "Current Modal Rate", value: "₹2,450 / Quintal", status: "good" },
      { label: "Minimum Rate", value: "₹1,800 / Qt", status: "neutral" },
      { label: "3-Day Price Trend", value: "+14.2% Bullish", status: "good" },
    ],
    platformAdvice: {
      statusBadge: "FAVORABLE HARVEST DISPATCH",
      verdict: "Strong Modal Price Trajectory: Dispatch Produce",
      actionableGuidance: "Market arrivals in Nashik are down 35% due to regional transit constraints. Modal rates for grade-A tomato are trading at a 18% premium over the 30-day baseline. Dispatch harvested crates before Thursday arrivals peak.",
      economicImpact: "Secures ₹400-600 more per quintal compared to unassisted local farm-gate broker quotes.",
    },
  },
  {
    id: "vision-pathology",
    tabLabel: "3. AI Vision Diagnostics",
    badge: "Multimodal Computer Vision",
    title: "Early Blight Detection: Organic vs. Chemical Remedies",
    description: "Farmers upload photos of symptomatic crop leaves. KrishiNova's computer vision identifies pathogens, calculates severity, and provides immediate dosage recommendations.",
    metrics: [
      { label: "Detected Pathogen", value: "Alternaria solani", status: "bad" },
      { label: "Diagnostic Confidence", value: "94.6%", status: "good" },
      { label: "Infection Severity", value: "Stage 2 (Early Blight)", status: "neutral" },
      { label: "Host Crop", value: "Solanum lycopersicum", status: "neutral" },
    ],
    platformAdvice: {
      statusBadge: "TREATMENT ACTION REQUIRED",
      verdict: "Early Blight (Alternaria solani) Confirmed",
      actionableGuidance: "Organic Bio-Control: Foliar spray of Trichoderma viride @ 5g/L or Pseudomonas fluorescens. Chemical Intervention (if severity > 15%): Mancozeb 75% WP @ 2g/L water. Strictly observe a 7-day pre-harvest interval (PHI).",
      economicImpact: "Early containment halts crop loss from escalating from Stage 2 to destructive Stage 4 defoliation.",
    },
  },
];

export function HomeFeaturePlayground() {
  const [activeScenarioId, setActiveScenarioId] = useState(SCENARIOS[0].id);
  const currentScenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 border border-emerald-300 text-xs font-semibold text-emerald-900">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Interactive Operational Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How KrishiNova powers real agricultural decisions
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Toggle through live operational scenarios below to see how meteorological forecasts, market price telemetry, and vision models synthesize into clear, actionable advice.
          </p>
        </div>

        {/* Scenario Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-4 border-b border-slate-200 no-scrollbar">
          {SCENARIOS.map((sc) => {
            const isActive = sc.id === activeScenarioId;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => setActiveScenarioId(sc.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 shrink-0 ${
                  isActive
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {sc.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Live Simulator Interactive Preview Card */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Input Telemetry Panel */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                {currentScenario.badge}
              </span>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Simulation Live
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">
                {currentScenario.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentScenario.description}
              </p>
            </div>

            {/* Telemetry Metric Cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {currentScenario.metrics.map((m, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                >
                  <span className="text-[11px] text-slate-500 block">{m.label}</span>
                  <span className={`text-sm font-bold font-mono ${
                    m.status === "bad" ? "text-red-700" : m.status === "good" ? "text-emerald-800" : "text-amber-700"
                  }`}>
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-slate-500 font-mono">
              Sourced from verified Open-Meteo High-Resolution Grids & Agmarknet APMC Registers.
            </div>
          </div>

          {/* Right: KrishiNova AI Decision Output Panel */}
          <div className="lg:col-span-6 bg-emerald-50/70 rounded-2xl border border-emerald-200 p-6 space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-200/60">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-emerald-800" />
                <span className="text-xs font-bold text-slate-900">KrishiNova Decision Engine</span>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                currentScenario.platformAdvice.statusBadge.includes("UNFAVORABLE")
                  ? "bg-red-100 text-red-800 border border-red-200"
                  : "bg-emerald-100 text-emerald-900 border border-emerald-300"
              }`}>
                {currentScenario.platformAdvice.statusBadge}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-emerald-950">
                {currentScenario.platformAdvice.verdict}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-emerald-200 shadow-2xs">
                {currentScenario.platformAdvice.actionableGuidance}
              </p>
            </div>

            {/* Economic Impact Card */}
            <div className="p-4 rounded-xl bg-white border border-emerald-300 space-y-1 shadow-2xs">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                Quantified Farmer Benefit
              </span>
              <p className="text-xs font-semibold text-slate-900">
                {currentScenario.platformAdvice.economicImpact}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Link href="/dashboard" className="w-full">
                <Button size="md" variant="primary" className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold">
                  <span>Test with Your Farm Coordinates</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
