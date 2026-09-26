"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Landmark, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SchemesExplorerCard } from "@/features/schemes/SchemesExplorerCard";

export default function SchemesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans w-full max-w-full overflow-x-hidden">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 min-w-0 overflow-x-hidden">
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button size="sm" variant="outline">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Verified Official Government Schemes Registry</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-2">
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Landmark className="w-6 h-6 text-emerald-800" />
            <span>Central & State Agricultural Welfare Schemes Directory</span>
          </h1>
          <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
            Direct portal links, verified eligibility criteria, and required document checklists for major agricultural welfare programs in India. Applications and claims must be submitted directly through official government portals.
          </p>
        </div>

        <SchemesExplorerCard />
      </main>

      <Footer />
    </div>
  );
}
