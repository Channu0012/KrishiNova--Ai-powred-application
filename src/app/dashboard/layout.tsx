import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farm Command Dashboard | KrishiNova Agricultural Intelligence",
  description: "Real-time farm command center integrating localized spray feasibility, official Agmarknet mandi rates, crop leaf diagnostics, and AI agronomic advice.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
