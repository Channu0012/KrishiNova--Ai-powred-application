"use client";

import React from "react";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { LocationLanguageProvider } from "@/lib/context/LocationLanguageContext";
import { LocationModal } from "@/components/layout/LocationModal";
import { CookieConsent } from "@/components/layout/CookieConsent";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LocationLanguageProvider>
        {children}
        <LocationModal />
        <CookieConsent />
      </LocationLanguageProvider>
    </AuthProvider>
  );
}
