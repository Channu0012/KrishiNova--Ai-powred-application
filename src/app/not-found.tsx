import React from "react";
import Link from "next/link";
import { Compass, Home, LayoutDashboard, Landmark, ArrowLeft, ShieldAlert } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "404 - Field Not Found | KrishiNova",
  description: "The agricultural page or coordinates you requested could not be located on KrishiNova.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 py-16">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
            <Compass className="w-8 h-8 animate-spin-slow" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100/80 px-2.5 py-0.5 rounded">
              Error 404 • Coordinate Mismatch
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Field Coordinates Not Found
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              The page, module, or agricultural resource you navigated to does not exist or has been relocated to another section.
            </p>
          </div>

          {/* Quick Helpful Navigation Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="w-full sm:w-auto">
              <Button size="md" variant="primary" className="w-full sm:w-auto shadow-xs">
                <Home className="w-4 h-4 mr-2" />
                <span>Return to Home</span>
              </Button>
            </Link>

            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="md" variant="outline" className="w-full sm:w-auto">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                <span>Open Dashboard</span>
              </Button>
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <Link 
              href="/schemes" 
              className="p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 hover:border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <Landmark className="w-3.5 h-3.5 text-emerald-700" />
              <span>Govt Schemes</span>
            </Link>
            <Link 
              href="/dashboard#weather" 
              className="p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 hover:border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              <span>Weather & Spray</span>
            </Link>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
            <span>Need assistance? Contact</span>
            <a href="mailto:support@krishinova.in" className="text-emerald-800 font-semibold hover:underline">
              support@krishinova.in
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
