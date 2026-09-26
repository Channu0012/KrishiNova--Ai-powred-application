import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, AlertTriangle, ShieldCheck, Mail } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Terms & Conditions of Service | KrishiNova",
  description: "Terms and conditions governing the use of the KrishiNova agricultural intelligence platform.",
};

export default function TermsAndConditionsPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div>
          <Link href="/">
            <Button size="sm" variant="outline" className="mb-4">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Platform Agreement</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            KrishiNova Terms & Conditions of Service
          </h1>
          <p className="text-xs text-slate-500 mt-1">Effective: {currentYear} • Version 1.2</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Nature of the Platform</h2>
            <p>
              KrishiNova is an agricultural intelligence platform that provides decision-support information, including numerical meteorological forecasts, agricultural spray feasibility assessments, official mandi commodity prices, government scheme summaries, and multimodal artificial intelligence crop disease diagnostics.
            </p>
          </section>

          <section className="space-y-2 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-950">
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>2. Crucial Agronomic Decision-Support Disclaimer</span>
            </div>
            <p className="text-xs leading-relaxed mt-1">
              All AI recommendations, disease diagnoses, spray window calculations, and mandi rate forecasts are provided strictly for <strong>informational decision-support purposes</strong>. Agriculture is subject to biological variations, unexpected micro-climatic events, and local soil conditions. KrishiNova does not replace statutory agricultural advice from certified agronomists, Krishi Vigyan Kendras (KVK), or State Agricultural Extension Officers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Agrochemical & Pesticide Safety Responsibility</h2>
            <p>
              Any mention of bio-pesticides, fungicides, or synthetic crop protection chemicals is based on standard Central Insecticides Board & Registration Committee (CIBRC) and ICAR published scientific literature. The farmer retains sole responsibility for reading manufacturer container labels, adhering strictly to pre-harvest intervals (PHI), wearing personal protective equipment (PPE), and ensuring that any chemical used is legally permitted for their specific crop and jurisdiction.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Third-Party Data Sources</h2>
            <p>
              KrishiNova aggregates data from public government portals (such as `data.gov.in`, `agmarknet.gov.in`, and official ministry portals) and meteorological services (Open-Meteo). We strive to ensure timely data ingestion; however, we are not liable for delayed reporting, errors, or omissions occurring within upstream third-party government feeds.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. Limitation of Liability</h2>
            <p className="text-xs">
              To the fullest extent permitted by applicable Indian law, KrishiNova, its developers, and contributors shall not be liable for any crop yield losses, financial market fluctuations, chemical misapplications, or indirect damages resulting from the use or inability to use this platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">6. Governing Law & Inquiries</h2>
            <p className="text-xs">
              These terms are governed by the laws of India. For statutory compliance questions or service notices, contact our legal desk at{" "}
              <a href="mailto:compliance@krishinova.in" className="text-emerald-800 font-bold hover:underline inline-flex items-center gap-1">
                <Mail className="w-3 h-3" />
                compliance@krishinova.in
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
