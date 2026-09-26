import React from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, ArrowLeft, Lock, Info, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Cookie Policy | KrishiNova Agricultural Intelligence",
  description: "Transparent disclosure of cookies, local storage mechanisms, and farmer privacy protections on KrishiNova.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button size="sm" variant="outline">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Back to Home
            </Button>
          </Link>
          <span className="text-xs text-slate-500 font-mono">
            Last Updated: September 2026
          </span>
        </div>

        {/* Page Header */}
        <div className="space-y-3 pb-6 border-b border-slate-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900">
            <Cookie className="w-3.5 h-3.5 text-emerald-700" />
            <span>Digital Personal Data Protection Act (DPDP 2023) Compliant</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            KrishiNova Cookie Policy
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
            This policy outlines how KrishiNova uses browser cookies and local storage tokens to provide secure farmer authentication and micro-climate personalization. We operate with strict data integrity: zero third-party commercial tracking pixels or behavioral ad trackers.
          </p>
        </div>

        {/* Core Principles */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">1. What Are Cookies?</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Cookies are small cryptographic text files placed on your computer, tablet, or smartphone when you visit a web application. They allow the system to recognize your authenticated session between page loads and remember your agricultural hub preferences (such as your chosen district for weather and mandi lookups) without asking you to re-enter them on every screen.
          </p>
        </section>

        {/* Categorized Table of Cookies Used */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">2. Cookies Deployed by KrishiNova</h2>
          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5">Cookie Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Purpose</th>
                  <th className="p-3.5">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-3.5 font-mono font-bold text-slate-900">krishinova_session</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                      Strictly Necessary
                    </span>
                  </td>
                  <td className="p-3.5">Maintains your authenticated farmer session to protect confidential crop records and profile data.</td>
                  <td className="p-3.5 font-mono">7 Days</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-mono font-bold text-slate-900">krishinova_location</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold text-[10px]">
                      Functional Preference
                    </span>
                  </td>
                  <td className="p-3.5">Stores your active agricultural district (e.g. Nashik, Pune) for immediate localized weather models.</td>
                  <td className="p-3.5 font-mono">30 Days</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-mono font-bold text-slate-900">krishinova_language</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold text-[10px]">
                      Functional Preference
                    </span>
                  </td>
                  <td className="p-3.5">Persists your selected language (English, हिन्दी, मराठी, etc.) across visits.</td>
                  <td className="p-3.5 font-mono">30 Days</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-mono font-bold text-slate-900">krishinova_cookie_consent</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-semibold text-[10px]">
                      Compliance
                    </span>
                  </td>
                  <td className="p-3.5">Remembers your cookie consent choice so the banner is not redundantly displayed.</td>
                  <td className="p-3.5 font-mono">365 Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Zero Third Party Ad Tracking Guarantee */}
        <section className="p-5 rounded-2xl bg-emerald-950 text-white space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Third-Party Advertising Guarantee</span>
          </div>
          <h3 className="text-base font-bold">
            No Marketing Pixels. No Facebook SDK. No Google Ad Tracking.
          </h3>
          <p className="text-xs text-emerald-100/80 leading-relaxed">
            Agricultural intelligence requires absolute trust. We do not partner with ad brokers, commercial remarketing platforms, or third-party behavioral networks. Your crop acreage, yield targets, and market lookups are never sold or shared with commercial entities.
          </p>
        </section>

        {/* How to Manage Cookies */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">3. How Can You Manage or Clear Cookies?</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            You can configure your browser settings at any time to block or delete cookies. Note that disabling strictly necessary cookies will prevent login and access to the personalized farm dashboard.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900">Google Chrome & Android</h4>
              <p className="text-[11px] text-slate-500">
                Settings → Privacy and security → Third-party cookies → Clear browsing data.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900">Apple Safari & iOS</h4>
              <p className="text-[11px] text-slate-500">
                Settings → Safari → Advanced → Block All Cookies / Clear History and Website Data.
              </p>
            </div>
          </div>
        </section>

        {/* Regulatory Governance */}
        <section className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Governed under the laws of the Republic of India.</span>
          <Link href="/privacy" className="text-emerald-800 font-semibold hover:underline">
            View Privacy Policy
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
