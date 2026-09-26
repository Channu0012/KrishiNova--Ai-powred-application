import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government Schemes Directory | KrishiNova Agricultural Intelligence",
  description: "Direct official portal links, eligibility requirements, and document checklists for PM-KISAN, PMFBY, PM-KUSUM, and Kisan Credit Card.",
};

export default function SchemesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
