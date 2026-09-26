"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  MapPin, 
  Globe, 
  Menu, 
  X, 
  LayoutDashboard,
  CloudSun, 
  TrendingUp, 
  Landmark, 
  Scan, 
  Bot,
  User,
  LogIn,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useLocationLanguage, SupportedLanguage } from "@/lib/context/LocationLanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeHub, setIsLocationModalOpen, language, setLanguage, t } = useLocationLanguage();
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { href: "/dashboard", labelKey: "nav.dashboard", defaultLabel: "Dashboard", shortLabel: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard#weather", labelKey: "nav.weather", defaultLabel: "Weather & Spray", shortLabel: "Weather", icon: CloudSun },
    { href: "/dashboard#markets", labelKey: "nav.markets", defaultLabel: "Mandi Rates", shortLabel: "Mandi", icon: TrendingUp },
    { href: "/dashboard#crop-health", labelKey: "nav.crop_diagnostic", defaultLabel: "Crop Diagnostic", shortLabel: "Diagnostic", icon: Scan },
    { href: "/dashboard#ai-assistant", labelKey: "nav.ai_assistant", defaultLabel: "AI Assistant", shortLabel: "AI Advisor", icon: Bot },
    { href: "/schemes", labelKey: "nav.schemes", defaultLabel: "Govt Schemes", shortLabel: "Schemes", icon: Landmark },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 w-full max-w-full overflow-x-hidden shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 min-w-0 gap-3">
          {/* 1. Left: Brand Identity & Insignia */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group focus-visible:outline-none shrink-0"
            aria-label="KrishiNova Home"
          >
            <div className="relative w-9 h-9 overflow-hidden rounded-lg border border-emerald-900/10 shadow-2xs shrink-0 transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="KrishiNova Logo"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors">
                KrishiNova
              </span>
              <span className="text-[10px] font-semibold text-emerald-800 tracking-wider uppercase -mt-1">
                Agri Intelligence
              </span>
            </div>
          </Link>

          {/* 2. Center: Clear Feature Navigation */}
          <nav 
            className="hidden md:flex items-center gap-1 lg:gap-1.5 min-w-0" 
            aria-label="Core Platform Features"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
              const translatedText = t(link.labelKey) || link.defaultLabel;

              return (
                <Link
                  key={link.defaultLabel}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none shrink-0",
                    isActive
                      ? "bg-emerald-50 text-emerald-900 border border-emerald-300/80 font-semibold shadow-2xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/90"
                  )}
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-700 shrink-0" aria-hidden="true" />
                  {/* Full label on lg+, concise label on md */}
                  <span className="hidden lg:inline">{translatedText}</span>
                  <span className="inline lg:hidden">{link.shortLabel}</span>
                </Link>
              );
            })}
          </nav>

          {/* 3. Right: Header Controls (Location Selector, Language, Profile Icon Only) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Interactive Location Chip */}
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              title="Click to Switch Agricultural Hub"
              aria-label={`Current location: ${activeHub.district}, ${activeHub.state}. Click to change.`}
              className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-all duration-150 cursor-pointer shrink-0"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" aria-hidden="true" />
              <span className="font-semibold text-[11px] text-slate-800">
                {activeHub.district}
              </span>
              <span className="text-[10px] text-emerald-700 font-mono hidden sm:inline">
                ▼
              </span>
            </button>

            {/* Language Selector */}
            <div className="relative hidden sm:flex items-center gap-1 text-xs text-slate-600 bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-200 shrink-0">
              <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" aria-hidden="true" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                aria-label="Select Interface Language"
                className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="EN">English (EN)</option>
                <option value="HI">हिन्दी (HI)</option>
                <option value="MR">मराठी (MR)</option>
                <option value="KN">ಕನ್ನಡ (KN)</option>
                <option value="TE">తెలుగు (TE)</option>
              </select>
            </div>

            {/* SINGLE Profile Icon Button Only (No Text, No Portal) */}
            {isAuthenticated ? (
              <Link
                href="/profile"
                title={`Farmer Profile: ${user?.fullName || "Active"}`}
                aria-label="Farmer Profile & Settings"
                className={cn(
                  "relative w-9 h-9 flex items-center justify-center rounded-lg border transition-all duration-150 shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none",
                  pathname === "/profile"
                    ? "bg-emerald-100/80 text-emerald-950 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs"
                    : "bg-white text-slate-700 hover:text-emerald-900 hover:bg-emerald-50/60 hover:border-emerald-300 border-slate-200 shadow-2xs"
                )}
              >
                <User className="w-4 h-4 text-emerald-800" aria-hidden="true" />
                <span className="sr-only">Farmer Profile</span>
                {/* Online / Active status indicator dot */}
                <span 
                  className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white" 
                  aria-hidden="true"
                />
              </Link>
            ) : (
              <Link
                href="/auth/login?redirect=/dashboard"
                title="Sign In to Farmer Account"
                aria-label="Sign In to Farmer Account"
                className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-emerald-900 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all shrink-0"
              >
                <User className="w-4 h-4 text-slate-600" aria-hidden="true" />
                <span className="sr-only">Sign In to Account</span>
              </Link>
            )}

            {/* Mobile Navigation Drawer Toggle */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-800" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-800" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Feature Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          {/* Active Context Chip on Mobile */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsLocationModalOpen(true);
              }}
              className="flex items-center gap-1.5 text-xs text-slate-700 text-left"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-semibold">{activeHub.name}</span>
              <span className="text-[10px] text-emerald-700 underline ml-1">Change</span>
            </button>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Active Hub
            </span>
          </div>

          {/* Mobile Feature Links */}
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            const labelText = t(link.labelKey) || link.defaultLabel;

            return (
              <Link
                key={link.defaultLabel}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-emerald-50 text-emerald-900 font-semibold"
                    : "text-slate-700 hover:bg-slate-100"
                )}
              >
                <Icon className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                <span>{labelText}</span>
              </Link>
            );
          })}

          {/* Auth & Profile Access in Mobile Drawer */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "w-full text-center text-xs font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2",
                    pathname === "/profile"
                      ? "bg-emerald-900 text-white"
                      : "bg-emerald-800 hover:bg-emerald-700 text-white"
                  )}
                >
                  <User className="w-4 h-4" />
                  <span>{user?.fullName || "Farmer Profile"}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center text-xs font-semibold py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                href="/auth/login?redirect=/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Access Dashboard</span>
              </Link>
            )}

            {/* Mobile Language Selector */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>Language</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                aria-label="Select Language"
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="EN">English (EN)</option>
                <option value="HI">हिन्दी (HI)</option>
                <option value="MR">मराठी (MR)</option>
                <option value="KN">ಕನ್ನಡ (KN)</option>
                <option value="TE">తెలుగు (TE)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
