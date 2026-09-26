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

  const isDashboardView = pathname.startsWith("/dashboard") || pathname.startsWith("/profile");

  const publicNavLinks = [
    { href: "/", label: "Home" },
    { href: "/#how-it-works", label: "Features" },
    { href: "/schemes", label: "Govt Schemes" },
    { href: "/dashboard", label: "Dashboard" },
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

          {/* 2. Center: Dedicated Navigation */}
          {isDashboardView ? (
            /* Dedicated Dashboard Mode: Only show Dashboard and Profile links */
            <nav className="hidden md:flex items-center gap-2" aria-label="Dashboard Navigation">
              <Link
                href="/dashboard"
                className={cn(
                  "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 shrink-0",
                  pathname.startsWith("/dashboard")
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                <LayoutDashboard className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/profile"
                className={cn(
                  "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 shrink-0",
                  pathname.startsWith("/profile")
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                <User className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Profile</span>
              </Link>
            </nav>
          ) : (
            /* Public Landing Mode: Clean Marketing Links */
            <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
              {publicNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 shrink-0",
                      isActive
                        ? "bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* 3. Right: Header Controls (Location, Language, Profile/Sign In/Out) */}
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

            {/* Profile & Auth Status Controls */}
            {isDashboardView ? (
              /* Inside Dashboard/Profile: Show sign-out button */
              <button
                type="button"
                onClick={logout}
                title="Sign Out of Farmer Account"
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-500" />
                <span>Sign Out</span>
              </button>
            ) : isAuthenticated ? (
              /* Public page while logged in: Profile Icon link + Dashboard CTA */
              <div className="flex items-center gap-1.5">
                <Link
                  href="/profile"
                  title={`Farmer Profile: ${user?.fullName || "Active"}`}
                  className={cn(
                    "relative w-9 h-9 flex items-center justify-center rounded-lg border transition-all duration-150 shrink-0",
                    pathname === "/profile"
                      ? "bg-emerald-100/80 text-emerald-950 border-emerald-400 shadow-xs"
                      : "bg-white text-slate-700 hover:text-emerald-900 hover:bg-emerald-50/60 border-slate-200"
                  )}
                >
                  <User className="w-4 h-4 text-emerald-800" aria-hidden="true" />
                  <span className="sr-only">Farmer Profile</span>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white" />
                </Link>
                <Link
                  href="/dashboard"
                  className="hidden sm:inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-800 text-white hover:bg-emerald-700 shadow-xs transition-colors"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              /* Public page when not logged in: Sign In link */
              <div className="flex items-center gap-1.5">
                <Link
                  href="/auth/login?redirect=/dashboard"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="hidden sm:inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-800 text-white hover:bg-emerald-700 shadow-xs transition-colors"
                >
                  Create Account
                </Link>
              </div>
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

          {/* Mobile Navigation Links */}
          {isDashboardView ? (
            <div className="space-y-1">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors",
                  pathname.startsWith("/dashboard")
                    ? "bg-emerald-800 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                )}
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors",
                  pathname.startsWith("/profile")
                    ? "bg-emerald-800 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                )}
              >
                <User className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span>Farmer Profile</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
              {publicNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-emerald-50 text-emerald-900 font-semibold"
                        : "text-slate-700 hover:bg-slate-100"
                    )}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          )}

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
              <div className="space-y-2">
                <Link
                  href="/auth/login?redirect=/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Access Dashboard</span>
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center border border-slate-200 text-slate-700 text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>Create Account</span>
                </Link>
              </div>
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
