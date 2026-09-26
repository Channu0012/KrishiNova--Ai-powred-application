"use client";

import React, { useEffect, useState } from "react";
import { 
  Landmark, 
  Search, 
  ExternalLink, 
  CheckSquare, 
  ShieldCheck, 
  ChevronRight, 
  FileText,
  RotateCw
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyStateView, ErrorStateView } from "@/components/ui/StateViews";
import { GovernmentScheme, SchemeCategory } from "@/types/schemes";

const CATEGORIES: { label: string; value: SchemeCategory }[] = [
  { label: "All Schemes", value: "ALL" },
  { label: "Income Support", value: "INCOME_SUPPORT" },
  { label: "Crop Insurance", value: "INSURANCE" },
  { label: "Solar & Irrigation", value: "IRRIGATION" },
  { label: "Credit & Loans", value: "CREDIT" },
  { label: "Organic Farming", value: "ORGANIC" },
];

export function SchemesExplorerCard() {
  const [category, setCategory] = useState<SchemeCategory>("ALL");
  const [search, setSearch] = useState("");
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeScheme, setActiveScheme] = useState<GovernmentScheme | null>(null);

  const fetchSchemes = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = new URL("/api/schemes", window.location.origin);
      if (category !== "ALL") url.searchParams.set("category", category);
      if (search.trim()) url.searchParams.set("search", search.trim());

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`Schemes API returned HTTP ${res.status}`);

      const json = await res.json();
      if (json.status === "success" && json.data) {
        setSchemes(json.data.schemes || []);
      } else {
        throw new Error(json.message || "Failed to load government schemes");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [category]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSchemes();
  };

  return (
    <Card id="schemes" className="border-slate-200">
      <CardHeader>
        <CardTitle>
          <Landmark className="w-5 h-5 text-emerald-800" aria-hidden="true" />
          <span>Verified Government Welfare Schemes</span>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="success">100% Official Portals</Badge>
          <Button size="sm" variant="ghost" className="h-8 px-2" onClick={fetchSchemes} title="Refresh Schemes">
            <RotateCw className="w-3.5 h-3.5 text-slate-600" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search scheme name, subsidy, or keyword (e.g. solar, insurance, kisan)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </form>
          <Button size="sm" variant="outline" onClick={fetchSchemes}>
            Search
          </Button>
        </div>

        {/* Category Filter Pills (Restrained rounded-md, not full pills) */}
        <div className="flex flex-wrap gap-1.5 pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategory(cat.value)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors border ${
                category === cat.value
                  ? "bg-emerald-800 text-white border-emerald-800 shadow-xs"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <ErrorStateView title="Schemes Service Unavailable" message={error} onRetry={fetchSchemes} />
        )}

        {/* Empty State */}
        {!loading && !error && schemes.length === 0 && (
          <EmptyStateView
            title="No Schemes Matching Filters"
            description="No government welfare schemes matched your search parameters. Try clearing the search query or selecting 'All Schemes'."
            actionText="View All Schemes"
            onAction={() => {
              setCategory("ALL");
              setSearch("");
            }}
          />
        )}

        {/* Schemes List */}
        {!loading && !error && schemes.length > 0 && (
          <div className="space-y-3">
            {schemes.map((scheme) => (
              <div
                key={scheme.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-white hover:bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{scheme.name}</span>
                    <Badge variant="neutral">{scheme.shortCode}</Badge>
                    <Badge variant="info">{scheme.category.replace("_", " ")}</Badge>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {scheme.description}
                  </p>
                  <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5 pt-1">
                    <span>Benefit:</span>
                    <span className="text-slate-900 font-normal">{scheme.benefits}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveScheme(scheme)}
                    className="text-xs"
                  >
                    View Details
                  </Button>
                  <a
                    href={scheme.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-emerald-800 text-white hover:bg-emerald-700 transition-colors shadow-xs"
                  >
                    <span>Official Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-[11px] text-slate-500">
          Source: Ministry of Agriculture & Farmers Welfare, GoI & State Portals
        </span>
        <span className="text-[11px] text-slate-400">
          Direct applications strictly through verified .gov.in domains
        </span>
      </CardFooter>

      {/* Scheme Detail Modal Dialog */}
      {activeScheme && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <Badge variant="success" className="mb-1">
                  {activeScheme.shortCode}
                </Badge>
                <h3 className="text-lg font-bold text-slate-900">{activeScheme.name}</h3>
                <span className="text-xs text-slate-500">{activeScheme.sponsoringAgency}</span>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setActiveScheme(null)}>
                ✕
              </Button>
            </div>

            <div>
              <h5 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Scheme Overview
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">{activeScheme.description}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <h5 className="text-xs font-bold text-emerald-950 mb-1">Financial Benefits</h5>
              <p className="text-xs text-emerald-900 leading-relaxed">{activeScheme.benefits}</p>
            </div>

            <div>
              <h5 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Eligibility Criteria
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {activeScheme.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Mandatory Documentation Checklist
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {activeScheme.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Verified: {activeScheme.lastVerifiedDate}
              </span>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => setActiveScheme(null)}>
                  Close
                </Button>
                <a
                  href={activeScheme.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg bg-emerald-800 text-white hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
