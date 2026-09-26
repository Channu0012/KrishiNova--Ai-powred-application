import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farmer Profile & Agricultural Parameters | KrishiNova",
  description: "Configure your geographic district coordinates, soil profile, acreage, irrigation mode, and active crop portfolio.",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
