"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, User, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { ProfileForm } from "@/features/profile/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans w-full max-w-full overflow-x-hidden">
      <Header />

      <AuthGuard>
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 min-w-0 overflow-x-hidden">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button size="sm" variant="outline">
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Profile stored securely on Amazon DynamoDB</span>
            </div>
          </div>

          <ProfileForm
            onProfileUpdated={(updated) => {
              console.log("Profile successfully updated:", updated);
            }}
          />
        </main>
      </AuthGuard>

      <Footer />
    </div>
  );
}
