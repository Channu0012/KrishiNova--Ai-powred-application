import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, ExternalLink, Activity, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* 1. Clickable Brand & Purpose */}
          <div className="space-y-4 md:col-span-1">
            <Link 
              href="/" 
              className="flex items-center gap-3 group focus-visible:outline-none shrink-0"
              aria-label="KrishiNova Home"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-slate-700 transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="KrishiNova Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-base font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                KrishiNova
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Agricultural intelligence platform synthesizing hyper-local weather, official mandi commodity prices, verified welfare schemes, and computer vision crop diagnostics.
            </p>

            <div className="space-y-1.5 pt-1 text-xs">
              <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
                <Activity className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Core Providers: Active</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:support@krishinova.in"
                  className="hover:text-emerald-400 hover:underline transition-colors"
                >
                  support@krishinova.in
                </a>
              </div>
            </div>
          </div>

          {/* 2. Core Platform Features */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">
                  Agricultural Command Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard#weather" className="hover:text-emerald-400 transition-colors">
                  Localized Weather & Spray Windows
                </Link>
              </li>
              <li>
                <Link href="/dashboard#markets" className="hover:text-emerald-400 transition-colors">
                  Agmarknet Mandi Commodity Rates
                </Link>
              </li>
              <li>
                <Link href="/dashboard#crop-health" className="hover:text-emerald-400 transition-colors">
                  Crop Leaf Disease Diagnostic Scanner
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="hover:text-emerald-400 transition-colors">
                  Central & State Welfare Schemes Directory
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-emerald-400 transition-colors">
                  Farmer Profile & Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Official Open Data Sources */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Verified Data Sources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://agmarknet.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Agmarknet (DMI, GoI)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://open-meteo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Open-Meteo Meteorology</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://pmkisan.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>PM-KISAN Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://pmfby.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>PM Fasal Bima Yojana (PMFBY)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Trust, Governance & Legal */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Trust & Legal Compliance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/disclaimer" className="hover:text-emerald-400 inline-flex items-center gap-1 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Agronomic Advisory Disclaimer</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy & DPDP Rights
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-emerald-400 transition-colors">
                  Cookie Policy & Consent
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms & Conditions of Service
                </Link>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-400 leading-normal">
              <strong>Integrity Pledge:</strong> KrishiNova displays 0% simulated market prices or fake farmer metrics. Data is sourced from verified feeds or marked unavailable.
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {currentYear} KrishiNova. Built for Indian Agricultural Ecosystems.</p>
          <p className="flex items-center gap-2">
            <span>Serverless AWS Architecture</span>
            <span>•</span>
            <span>WCAG 2.2 AA Compliant</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
