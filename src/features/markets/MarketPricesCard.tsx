"use client";

import React, { useEffect, useState } from "react";
import { 
  TrendingUp, 
  Store, 
  Filter, 
  Calendar, 
  RotateCw, 
  Search,
  ExternalLink,
  ShieldCheck 
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyStateView, ErrorStateView } from "@/components/ui/StateViews";
import { MarketPriceResult } from "@/types/market";
import { formatPricePerQuintal, formatDateIndian, formatDateTimeIndian } from "@/lib/utils/formatters";
import { INDIAN_AGRICULTURAL_REGIONS, MAJOR_CROPS } from "@/lib/utils/constants";

interface MarketPricesCardProps {
  initialState?: string;
  initialDistrict?: string;
  initialCommodity?: string;
}

export function MarketPricesCard({
  initialState = "Maharashtra",
  initialDistrict = "Nashik",
  initialCommodity = "Tomato",
}: MarketPricesCardProps) {
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [selectedCommodity, setSelectedCommodity] = useState(initialCommodity);
  const [data, setData] = useState<MarketPriceResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Available districts based on selected state
  const availableDistricts =
    INDIAN_AGRICULTURAL_REGIONS.find((s) => s.state.toLowerCase() === selectedState.toLowerCase())?.districts || [];

  const fetchPrices = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = new URL("/api/markets", window.location.origin);
      url.searchParams.set("state", selectedState);
      if (selectedDistrict) url.searchParams.set("district", selectedDistrict);
      if (selectedCommodity) url.searchParams.set("commodity", selectedCommodity);

      const res = await fetch(url.toString());
      if (!res.ok) {
        throw new Error(`Market API returned HTTP ${res.status}`);
      }

      const json = await res.json();
      if (json.status === "success" && json.data) {
        setData(json.data);
      } else {
        throw new Error(json.message || "Failed to load mandi prices");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, [selectedState, selectedDistrict, selectedCommodity]);

  return (
    <Card id="markets" className="border-slate-200">
      <CardHeader>
        <CardTitle>
          <TrendingUp className="w-5 h-5 text-emerald-800" aria-hidden="true" />
          <span>Agricultural Mandi Market Prices</span>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="neutral">Official Mandi Bulletin</Badge>
          <Button size="sm" variant="ghost" className="h-8 px-2" onClick={fetchPrices} title="Refresh Mandi Prices">
            <RotateCw className="w-3.5 h-3.5 text-slate-600" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/80">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
              State
            </label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                const nextStateObj = INDIAN_AGRICULTURAL_REGIONS.find((s) => s.state === e.target.value);
                if (nextStateObj && nextStateObj.districts.length > 0) {
                  setSelectedDistrict(nextStateObj.districts[0].name);
                } else {
                  setSelectedDistrict("");
                }
              }}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium"
            >
              {INDIAN_AGRICULTURAL_REGIONS.map((st) => (
                <option key={st.state} value={st.state}>
                  {st.state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
              District
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium"
            >
              {availableDistricts.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Commodity / Crop
            </label>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium"
            >
              {MAJOR_CROPS.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <ErrorStateView
            title="Market Rates Service Unavailable"
            message={error}
            onRetry={fetchPrices}
          />
        )}

        {/* Empty State (Strictly enforced: no hallucinated fake rates) */}
        {!loading && !error && data && data.prices.length === 0 && (
          <EmptyStateView
            title="Market Data Currently Unavailable"
            description={`No trades were recorded today for ${selectedCommodity} in ${selectedDistrict}, ${selectedState}. Mandi auctions operate Monday through Saturday. Try selecting a neighboring district or different commodity.`}
            actionText="Reset to Nashik APMC"
            onAction={() => {
              setSelectedState("Maharashtra");
              setSelectedDistrict("Nashik");
              setSelectedCommodity("Tomato");
            }}
          />
        )}

        {/* Success State Table */}
        {!loading && !error && data && data.prices.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-slate-200 w-full max-w-full">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Market / Mandi</th>
                  <th className="px-4 py-3">Commodity & Variety</th>
                  <th className="px-4 py-3 text-right">Min Price</th>
                  <th className="px-4 py-3 text-right">Max Price</th>
                  <th className="px-4 py-3 text-right text-emerald-900 font-bold">Modal Price</th>
                  <th className="px-4 py-3 text-right">Arrival Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 text-xs">
                {data.prices.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5 font-medium text-slate-900 flex items-center gap-2">
                      <Store className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{p.marketName}</span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-700">
                      <div className="font-semibold text-slate-900">{p.commodity}</div>
                      <div className="text-[11px] text-slate-500">{p.variety}</div>
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-slate-600">
                      {formatPricePerQuintal(p.minPrice)}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-slate-600">
                      {formatPricePerQuintal(p.maxPrice)}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono font-bold text-emerald-800 text-sm">
                      {formatPricePerQuintal(p.modalPrice)}
                    </td>
                    <td className="px-4 py-3.5 text-right text-slate-500 font-mono text-[11px]">
                      {formatDateIndian(p.arrivalDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Source: {data?.metadata.sourceAttribution || "Agmarknet (agmarknet.gov.in)"}</span>
        </div>
        {data && (
          <span className="text-[11px] text-slate-400 font-mono">
            Reporting Date: {formatDateIndian(data.reportedDate)}
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
