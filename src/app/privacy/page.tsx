import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, Database, Server, Mail } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Privacy Policy & Farmer Data Rights | KrishiNova",
  description: "KrishiNova data governance, DPDP Act 2023 compliance, and strict confidentiality protections for Indian farmers.",
};

export default function PrivacyPolicyPage() {
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
            <Lock className="w-4 h-4" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            KrishiNova Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 mt-1">DPDP 2023 Compliant • Active {currentYear}</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Commitment to Data Integrity & Privacy</h2>
            <p>
              KrishiNova (&quot;we&quot;, &quot;our&quot;, or &quot;platform&quot;) operates as an agricultural intelligence decision-support service for Indian agriculturalists. We hold personal farm data, landholding information, and crop imagery to strict confidentiality standards. We never sell farmer data to third-party commercial marketing brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>
                <strong>Farmer Profile Data:</strong> Name, contact details (email or mobile number), state, district, taluka, and GPS coordinates for hyper-local meteorological resolution.
              </li>
              <li>
                <strong>Farm Agronomic Specifications:</strong> Total land acreage, soil classification (e.g. black cotton, alluvial), irrigation mode (drip, rainfed), and primary cultivated crops.
              </li>
              <li>
                <strong>Uploaded Crop Diagnostics:</strong> Digital photographs of crop leaves, stems, or fruits submitted voluntarily for plant pathology analysis.
              </li>
              <li>
                <strong>System Telemetry:</strong> Anonymized request logs, IP addresses, browser types, and response latencies collected for security, rate limiting, and infrastructure monitoring.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Purpose and Legal Basis of Processing</h2>
            <p>
              Collected information is used exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Calculate hyper-local meteorological spray windows and disease pressure indices.</li>
              <li>Retrieve relevant APMC mandi commodity prices from verified Agmarknet feeds.</li>
              <li>Filter central and state welfare subsidies matching farmer landholding categories.</li>
              <li>Maintain authenticated farmer sessions securely on Amazon DynamoDB.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Zero Advertising & Tracking Guarantee</h2>
            <p className="text-xs">
              KrishiNova maintains zero Google Analytics, zero Meta Pixels, and zero commercial remarketing trackers. We do not engage in behavioral profiling or monetization of farmer coordinates.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. Data Retention & Farmer Rights</h2>
            <p>
              You maintain full ownership of your data. You have the right to request access to, correction of, or permanent deletion of your farmer profile and diagnostic history at any time by contacting our privacy compliance desk.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">6. Contact Information</h2>
            <p className="text-xs">
              For privacy inquiries, contact the KrishiNova Data Protection Officer at:  
              <br />
              <strong>Email: </strong> 
              <a href="mailto:privacy@krishinova.in" className="text-emerald-800 font-bold hover:underline inline-flex items-center gap-1 ml-1">
                <Mail className="w-3 h-3" />
                privacy@krishinova.in
              </a>
              <br />
              <strong>Operating Region:</strong> Mumbai / Bengaluru, India.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
