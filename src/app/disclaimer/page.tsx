import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, CheckCircle2, HelpCircle, PhoneCall, Mail } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Agronomic Advisory Disclaimer | KrishiNova",
  description: "Official statutory notice regarding AI agronomic recommendations, decision-support boundaries, and CIBRC chemical thresholds.",
};

export default function DisclaimerPage() {
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
            <ShieldAlert className="w-4 h-4" />
            <span>Statutory Notice</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Agronomic Decision Support & Liability Disclaimer
          </h1>
          <p className="text-xs text-slate-500 mt-1">Classification: Public Agronomic Advisory Guideline • {currentYear}</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs leading-relaxed">
            <strong>Key Principle:</strong> KrishiNova is an engineering decision-support tool. It is designed to assist farmers in timing sprays, discovering market trends, and identifying common leaf symptoms, but it does not replace in-person agricultural extension science.
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Artificial Intelligence Limitations</h2>
            <p>
              The AI recommendations and computer vision leaf analyses provided by KrishiNova are probabilistic models powered by Amazon Bedrock and deterministic agronomic heuristic models. While calibrated against Indian Council of Agricultural Research (ICAR) guidelines:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Visual plant symptoms can overlap across diverse bacterial, viral, fungal, and physiological nutrient deficiencies.</li>
              <li>A digital photograph cannot measure micro-soil pH, sub-surface nematode infestations, or latent viral vectors.</li>
              <li>AI advice should always be treated as a preliminary indicator and verified prior to making substantial financial or chemical spray investments.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Official Agricultural Extension Escalation Path</h2>
            <p>
              Whenever crop symptoms exceed economic threshold levels (ETL) or when unseasonal weather creates catastrophic disease pressure, farmers are urged to utilize official statutory extension resources:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">Kisan Call Centre (Toll-Free):</span>
                <p className="text-emerald-800 font-mono font-bold text-sm">
                  <a href="tel:18001801551" className="hover:underline">1800-180-1551</a>
                </p>
                <p className="text-[11px] text-slate-500">Government of India 24x7 expert agricultural helpline.</p>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">Krishi Vigyan Kendra (ICAR-KVK):</span>
                <p className="text-slate-800 font-medium">District Agricultural Officers</p>
                <p className="text-[11px] text-slate-500">Locate your nearest district KVK scientist for field inspection.</p>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Advisory Desk Contact</h2>
            <p className="text-xs">
              For agronomic inquiries or correction of diagnostic heuristics, write to:{" "}
              <a href="mailto:advisory@krishinova.in" className="text-emerald-800 font-bold hover:underline inline-flex items-center gap-1">
                <Mail className="w-3 h-3" />
                advisory@krishinova.in
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
