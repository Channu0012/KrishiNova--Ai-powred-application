"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CloudSun, 
  TrendingUp, 
  Bot, 
  Scan, 
  Landmark, 
  MapPin, 
  Sprout, 
  User, 
  Layers, 
  SlidersHorizontal,
  ShieldAlert 
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { WeatherCard } from "@/features/weather/WeatherCard";
import { MarketPricesCard } from "@/features/markets/MarketPricesCard";
import { AIAssistantCard } from "@/features/ai/AIAssistantCard";
import { CropDiagnosticCard } from "@/features/crop-analysis/CropDiagnosticCard";
import { SchemesExplorerCard } from "@/features/schemes/SchemesExplorerCard";
import { FarmerProfile } from "@/types/profile";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useLocationLanguage } from "@/lib/context/LocationLanguageContext";

export default function DashboardPage() {
  const { activeHub } = useLocationLanguage();
  const [profile, setProfile] = useState<FarmerProfile>({
    userId: "usr_farmer_001",
    fullName: "Ramesh Patil",
    email: "ramesh.patil@krishinova.in",
    state: "Maharashtra",
    district: "Nashik",
    latitude: 20.0059,
    longitude: 73.7997,
    landSizeAcres: 3.5,
    soilType: "BLACK_COTTON",
    irrigationMode: "DRIP",
    preferredLanguage: "en",
    crops: [
      {
        id: "c1",
        cropName: "Tomato",
        variety: "Abhinav F1",
        sowingDate: "2026-08-15",
        acreage: 2.0,
        stage: "FLOWERING",
      },
      {
        id: "c2",
        cropName: "Onion",
        variety: "Bhima Super",
        sowingDate: "2026-08-01",
        acreage: 1.5,
        stage: "VEGETATIVE",
      },
    ],
    updatedAt: new Date().toISOString(),
  });

  const [activeTab, setActiveTab] = useState<"overview" | "weather" | "markets" | "crop-diagnostic" | "schemes" | "ai-assistant">("overview");

  // Sync with profile API on load
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile");
        const json = await res.json();
        if (json.status === "success" && json.data) {
          setProfile(json.data);
        }
      } catch (e) {
        console.warn("Could not sync remote profile, using session defaults:", e);
      }
    }
    loadProfile();
  }, []);

  // Sync hash deep-linking from header feature links
  useEffect(() => {
    function handleHashNavigation() {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      setActiveTab("overview");

      setTimeout(() => {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 60);
    }

    handleHashNavigation();
    window.addEventListener("hashchange", handleHashNavigation);
    return () => window.removeEventListener("hashchange", handleHashNavigation);
  }, []);

  const primaryCrop = activeHub?.primaryCrop || profile.crops[0]?.cropName || "Tomato";
  const currentDistrict = activeHub?.district || profile.district;
  const currentState = activeHub?.state || profile.state;
  const currentLat = activeHub?.latitude ?? profile.latitude;
  const currentLon = activeHub?.longitude ?? profile.longitude;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans">
      <Header />

      <AuthGuard>
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 min-w-0 overflow-x-hidden">
          {/* Farmer Profile Context Banner */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full max-w-full">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 truncate">
                  {profile.fullName}&apos;s Farm Command Dashboard
                </h1>
                <Badge variant="success">Active Session</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <strong>{currentDistrict}, {currentState}</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Primary Crop: <strong>{primaryCrop}</strong></span>
                </span>
                <span>•</span>
                <span>Holding: <strong>{profile.landSizeAcres} Acres</strong></span>
                <span>•</span>
                <span>Irrigation: <strong>{profile.irrigationMode}</strong></span>
              </div>
            </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link href="/profile">
              <Button size="sm" variant="outline">
                <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
                Customize Farm Profile
              </Button>
            </Link>
          </div>
        </section>

        {/* Dashboard Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-1 border-b border-slate-200 w-full max-w-full no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === "overview"
                ? "bg-emerald-800 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            Unified Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("weather")}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === "weather"
                ? "bg-emerald-800 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            Weather & Spray Window
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("markets")}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === "markets"
                ? "bg-emerald-800 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            Mandi Market Prices
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("crop-diagnostic")}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === "crop-diagnostic"
                ? "bg-emerald-800 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            Crop Health Scanner
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ai-assistant")}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === "ai-assistant"
                ? "bg-emerald-800 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            AI Agronomic Assistant
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("schemes")}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === "schemes"
                ? "bg-emerald-800 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            Welfare Schemes
          </button>
        </div>

        {/* Tab View: Overview (High-Density Multi-Card Layout) */}
        {activeTab === "overview" && (
          <div className="space-y-6 min-w-0 w-full max-w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0 w-full max-w-full">
              {/* Weather Module */}
              <div id="weather" className="min-w-0 w-full scroll-mt-20">
                <WeatherCard
                  latitude={currentLat}
                  longitude={currentLon}
                  district={currentDistrict}
                  state={currentState}
                  crop={primaryCrop}
                />
              </div>

              {/* AI Agronomic Assistant */}
              <div id="ai-assistant" className="min-w-0 w-full scroll-mt-20">
                <AIAssistantCard
                  crop={primaryCrop}
                  stage="Flowering"
                  ageDays={42}
                  district={currentDistrict}
                  state={currentState}
                  soilType={profile.soilType}
                  irrigationMode={profile.irrigationMode}
                />
              </div>
            </div>

            {/* Mandi Commodity Prices */}
            <div id="markets" className="min-w-0 w-full scroll-mt-20">
              <MarketPricesCard
                initialState={currentState}
                initialDistrict={currentDistrict}
                initialCommodity={primaryCrop}
              />
            </div>

            {/* Crop Diagnostic Scanner */}
            <div id="crop-health" className="min-w-0 w-full scroll-mt-20">
              <CropDiagnosticCard initialCrop={primaryCrop} />
            </div>

            {/* Government Schemes Directory */}
            <div id="schemes" className="min-w-0 w-full scroll-mt-20">
              <SchemesExplorerCard />
            </div>
          </div>
        )}

        {/* Individual Tab Views */}
        {activeTab === "weather" && (
          <WeatherCard
            latitude={currentLat}
            longitude={currentLon}
            district={currentDistrict}
            state={currentState}
            crop={primaryCrop}
          />
        )}

        {activeTab === "markets" && (
          <MarketPricesCard
            initialState={currentState}
            initialDistrict={currentDistrict}
            initialCommodity={primaryCrop}
          />
        )}

        {activeTab === "crop-diagnostic" && (
          <CropDiagnosticCard initialCrop={primaryCrop} />
        )}

        {activeTab === "ai-assistant" && (
          <AIAssistantCard
            crop={primaryCrop}
            stage="Flowering"
            ageDays={42}
            district={currentDistrict}
            state={currentState}
            soilType={profile.soilType}
            irrigationMode={profile.irrigationMode}
          />
        )}

        {activeTab === "schemes" && <SchemesExplorerCard />}

        {/* Statutory Compliance Footer Notice */}
        <div className="p-4 rounded-xl bg-slate-200/80 border border-slate-300 text-xs text-slate-700 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Agronomic Advisory Notice:</strong> KrishiNova synthesizes data from Open-Meteo, Agmarknet, and Amazon Bedrock Foundation Models for agricultural decision support. Always cross-reference chemical intervention thresholds with your local Krishi Vigyan Kendra (KVK) or State Agricultural University extension guidelines before application.
          </p>
        </div>
      </main>
      </AuthGuard>

      <Footer />
    </div>
  );
}
