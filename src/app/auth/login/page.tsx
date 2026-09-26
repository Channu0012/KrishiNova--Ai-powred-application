"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Zap } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth/AuthContext";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";
  const { login, demoLogin, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectUrl);
    }
  }, [isAuthenticated, redirectUrl, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Form content validation
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

    try {
      const success = await login(email, password);
      if (success) {
        router.push(redirectUrl);
      }
    } catch {
      setError("Authentication error. Please try again or use Demo Mode.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    demoLogin();
    router.push(redirectUrl);
  };

  return (
    <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
      <div className="text-center space-y-2">
        <div className="relative w-12 h-12 mx-auto rounded-xl overflow-hidden shadow-xs border border-emerald-900/10">
          <Image src="/logo.png" alt="KrishiNova Logo" fill className="object-cover" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">Sign in to KrishiNova</h1>
        <p className="text-xs text-slate-500">
          Enter your registered farmer account credentials to access your protected dashboard.
        </p>
      </div>

      {/* 1-Click Instant Demo Login (Evaluator Mode) */}
      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 space-y-2 text-center">
        <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center justify-center gap-1">
          <Zap className="w-3.5 h-3.5 text-emerald-700" />
          <span>Hackathon Evaluator Quick Access</span>
        </span>
        <p className="text-[11px] text-emerald-800/80">
          Test all protected agricultural features instantly as farmer <strong>Ramesh Patil</strong> (Nashik, MH).
        </p>
        <button
          type="button"
          onClick={handleDemoSignIn}
          className="w-full py-2 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>⚡ Instant 1-Click Demo Sign In</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-200 w-full" />
        <span className="bg-white px-3 text-[11px] text-slate-400 uppercase font-semibold">Or sign in with email</span>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-900 flex items-center gap-2" role="alert">
          <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              id="login-email"
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

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="login-password" className="block text-xs font-semibold text-slate-700">Password</label>
            <span className="text-[11px] text-emerald-800 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
        </div>

        <Button type="submit" size="md" variant="primary" className="w-full" isLoading={loading}>
          <span>Sign In to Dashboard</span>
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </form>

      <div className="pt-2 text-center text-xs text-slate-500">
        Don&apos;t have a farmer account?{" "}
        <Link href="/auth/register" className="text-emerald-800 font-bold hover:underline">
          Register Farm
        </Link>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
        <span>DPDP 2023 Compliant • Protected Session</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <Suspense fallback={<div className="text-xs text-slate-500">Loading sign-in form...</div>}>
          <LoginFormContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
