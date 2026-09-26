"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, MapPin, Sprout, ShieldCheck, AlertCircle, ArrowRight, Zap } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { INDIAN_AGRICULTURAL_REGIONS, MAJOR_CROPS } from "@/lib/utils/constants";
import { useAuth } from "@/lib/auth/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login, demoLogin } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [district, setDistrict] = useState("Nashik");
  const [crop, setCrop] = useState("Tomato");
  const [landSizeAcres, setLandSizeAcres] = useState("3.5");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableDistricts =
    INDIAN_AGRICULTURAL_REGIONS.find((s) => s.state === state)?.districts || [];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Form content validation
    if (!fullName.trim() || fullName.trim().length < 3) {
      setError("Please enter your complete full name (minimum 3 characters).");
      setLoading(false);
      return;
    }

    if (!email || !email.includes("@")) {
      setError("Please enter a valid agricultural email address.");
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must contain at least 6 characters.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify your password entry.");
      setLoading(false);
      return;
    }

    const acres = parseFloat(landSizeAcres);
    if (isNaN(acres) || acres <= 0 || acres > 10000) {
      setError("Please enter a valid land holding size between 0.1 and 10,000 acres.");
      setLoading(false);
      return;
    }

    if (!consent) {
      setError("Please review and accept the Agricultural Advisory Disclaimer to proceed.");
      setLoading(false);
      return;
    }

    // Save profile to API and login
    try {
      await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          state,
          district,
          landSizeAcres: acres,
          soilType: "BLACK_COTTON",
          irrigationMode: "DRIP",
          preferredLanguage: "en",
          primaryCrops: [crop],
        }),
      });

      await login(email, password, {
        fullName: fullName.trim(),
        state,
        district,
      });
      router.push("/dashboard");
    } catch {
      await login(email, password, {
        fullName: fullName.trim(),
        state,
        district,
      });
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="relative w-12 h-12 mx-auto rounded-xl overflow-hidden shadow-xs border border-emerald-900/10">
              <Image src="/logo.png" alt="KrishiNova Logo" fill className="object-cover" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Create Farmer Account</h1>
            <p className="text-xs text-slate-500">
              Register to receive personalized weather alerts, mandi rates, and AI crop advice.
            </p>
          </div>

          {/* Quick Evaluator Mode */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 space-y-2 text-center">
            <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center justify-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-700" />
              <span>Instant Evaluator Demo</span>
            </span>
            <button
              type="button"
              onClick={() => {
                demoLogin();
                router.push("/dashboard");
              }}
              className="w-full py-2 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>⚡ Skip & Open Dashboard as Ramesh Patil</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] text-slate-400 uppercase font-semibold">Or fill farmer details</span>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-900 flex items-center gap-2" role="alert">
              <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="reg-name" className="block text-xs font-semibold text-slate-700 mb-1">
                Farmer Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                <input
                  id="reg-name"
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patil"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                <input
                  id="reg-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="ramesh.patil@krishinova.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="reg-pass" className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                  <input
                    id="reg-pass"
                    type="password"
                    required
                    autoComplete="new-password"
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reg-pass-conf" className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                  <input
                    id="reg-pass-conf"
                    type="password"
                    required
                    autoComplete="new-password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="reg-state" className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                <select
                  id="reg-state"
                  value={state}
                  onChange={(e) => {
                    const newState = e.target.value;
                    setState(newState);
                    const firstDist = INDIAN_AGRICULTURAL_REGIONS.find((s) => s.state === newState)?.districts[0]?.name || "";
                    setDistrict(firstDist);
                  }}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                >
                  {INDIAN_AGRICULTURAL_REGIONS.map((r) => (
                    <option key={r.state} value={r.state}>{r.state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="reg-dist" className="block text-xs font-semibold text-slate-700 mb-1">District</label>
                <select
                  id="reg-dist"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                >
                  {availableDistricts.map((d) => (
                    <option key={d.name} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="reg-crop" className="block text-xs font-semibold text-slate-700 mb-1">Primary Crop</label>
                <select
                  id="reg-crop"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                >
                  {MAJOR_CROPS.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="reg-land" className="block text-xs font-semibold text-slate-700 mb-1">Holding (Acres)</label>
                <input
                  id="reg-land"
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="10000"
                  required
                  placeholder="3.5"
                  value={landSizeAcres}
                  onChange={(e) => setLandSizeAcres(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-emerald-800 focus:ring-emerald-700"
                />
                <span className="text-[11px] text-slate-600 leading-normal">
                  I acknowledge that KrishiNova AI recommendations are agricultural decision-support guidance. Final chemical applications must follow local manufacturer container labels.
                </span>
              </label>
            </div>

            <Button type="submit" size="md" variant="primary" className="w-full" isLoading={loading}>
              <span>Register & Access Dashboard</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-emerald-800 font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
