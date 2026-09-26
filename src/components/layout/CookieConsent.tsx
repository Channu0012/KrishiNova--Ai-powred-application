"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("krishinova_cookie_consent");
      if (!consent) {
        // Show after a subtle 600ms delay for smooth page load
        const timer = setTimeout(() => setShowBanner(true), 600);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn("Could not check cookie consent", e);
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem("krishinova_cookie_consent", "all");
      document.cookie = "krishinova_cookie_consent=all; path=/; max-age=31536000; SameSite=Lax";
    } catch (e) {
      console.warn("Cookie persistence failed", e);
    }
    setShowBanner(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem("krishinova_cookie_consent", "essential");
      document.cookie = "krishinova_cookie_consent=essential; path=/; max-age=31536000; SameSite=Lax";
    } catch (e) {
      console.warn("Cookie persistence failed", e);
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside 
      aria-label="Cookie and Privacy Consent" 
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-5 shadow-2xl border border-slate-700/80 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400 shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Cookie & Data Privacy Choice
            </h3>
          </div>
          <button
            type="button"
            onClick={handleEssentialOnly}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          KrishiNova uses strictly essential cookies for secure farmer authentication and localized weather session preferences. We <strong>never</strong> use third-party advertising cookies or sell farmer data.
        </p>

        <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Button 
            size="sm" 
            variant="primary" 
            onClick={handleAcceptAll}
            className="text-xs font-semibold py-2 bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            Accept All Cookies
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleEssentialOnly}
            className="text-xs font-medium py-2 border-slate-700 text-slate-200 hover:bg-slate-800"
          >
            Essential Only
          </Button>
          <Link 
            href="/cookies" 
            className="text-[11px] text-emerald-400 hover:underline text-center sm:text-left self-center ml-auto"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </aside>
  );
}
