import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://krishinova.in"),
  title: "KrishiNova | Agricultural Intelligence Platform",
  description:
    "Localized weather alerts, official Agmarknet mandi commodity rates, verified government welfare schemes, and multimodal AI crop disease diagnostics for Indian agriculture.",
  keywords: [
    "KrishiNova",
    "agriculture",
    "mandi rates",
    "Agmarknet",
    "weather spray window",
    "crop disease diagnostic",
    "PM-KISAN",
    "PMFBY",
    "Indian farming",
  ],
  authors: [{ name: "KrishiNova Engineering" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "KrishiNova | Agricultural Intelligence Platform",
    description: "Weather, market prices, verified schemes, and AI crop diagnostics in one place.",
    url: "https://krishinova.in",
    siteName: "KrishiNova",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "KrishiNova Official Insignia",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#064e3b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { ClientProviders } from "@/components/providers/ClientProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased overflow-x-hidden w-full max-w-full`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden w-full max-w-full">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
