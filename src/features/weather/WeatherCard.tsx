"use client";

import React, { useEffect, useState } from "react";
import { 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Calendar,
  RotateCw,
  Gauge
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorStateView, OfflineStateView } from "@/components/ui/StateViews";
import { WeatherData } from "@/types/weather";
import { formatTemperature, formatHumidity, formatWindSpeed, formatDateTimeIndian } from "@/lib/utils/formatters";

interface WeatherCardProps {
  latitude: number;
  longitude: number;
  district: string;
  state: string;
  crop?: string;
}

export function WeatherCard({ latitude, longitude, district, state, crop = "Tomato" }: WeatherCardProps) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    setIsOffline(false);

    try {
      const url = new URL("/api/weather", window.location.origin);
      url.searchParams.set("lat", latitude.toString());
      url.searchParams.set("lon", longitude.toString());
      url.searchParams.set("crop", crop);
      url.searchParams.set("district", district);
      url.searchParams.set("state", state);

      const res = await fetch(url.toString());
      if (!res.ok) {
        if (res.status === 503) {
          setIsOffline(true);
          return;
        }
        throw new Error(`Weather API returned HTTP ${res.status}`);
      }

      const json = await res.json();
      if (json.status === "success" && json.data) {
        setData(json.data);
      } else {
        throw new Error(json.message || "Failed to load meteorological data");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude, district, crop]);

  return (
    <Card id="weather" className="border-slate-200">
      <CardHeader>
        <CardTitle>
          <Sun className="w-5 h-5 text-emerald-800" aria-hidden="true" />
          <span>Local Weather & Spray Window</span>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="neutral">
            {district}, {state}
          </Badge>
          <Button size="sm" variant="ghost" className="h-8 px-2" onClick={fetchWeather} title="Refresh Weather">
            <RotateCw className="w-3.5 h-3.5 text-slate-600" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        )}

        {/* Offline State */}
        {!loading && isOffline && (
          <OfflineStateView
            providerName="Open-Meteo Meteorological Service"
            reason="Could not connect to external meteorological telemetry. Retrying automatically in degraded mode."
            onRetry={fetchWeather}
          />
        )}

        {/* Error State */}
        {!loading && error && !isOffline && (
          <ErrorStateView
            title="Weather Feed Error"
            message={error}
            onRetry={fetchWeather}
          />
        )}

        {/* Success State */}
        {!loading && data && (
          <div className="space-y-5">
            {/* Primary Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  Temperature
                </span>
                <div className="mt-1 text-2xl font-bold font-mono text-slate-900">
                  {formatTemperature(data.current.temperatureC)}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Feels like {formatTemperature(data.current.apparentTemperatureC)}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-600" />
                  Relative Humidity
                </span>
                <div className="mt-1 text-2xl font-bold font-mono text-slate-900">
                  {formatHumidity(data.current.relativeHumidity)}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {data.current.relativeHumidity > 80 ? "High fungal pressure" : "Normal leaf drying"}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-emerald-700" />
                  Wind Velocity
                </span>
                <div className="mt-1 text-2xl font-bold font-mono text-slate-900">
                  {formatWindSpeed(data.current.windSpeedKmh)}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {data.current.windSpeedKmh > 15 ? "Drift risk elevated" : "Safe for spraying"}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  <CloudRain className="w-3.5 h-3.5 text-indigo-600" />
                  Precipitation Risk
                </span>
                <div className="mt-1 text-2xl font-bold font-mono text-slate-900">
                  {data.current.precipitationProbability}%
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {data.current.precipitationMm > 0 ? `${data.current.precipitationMm} mm recorded` : "Zero rain today"}
                </div>
              </div>
            </div>

            {/* Agricultural Spray Feasibility Advisory */}
            <div
              className={`p-4 rounded-xl border ${
                data.sprayWindow.status === "FAVORABLE"
                  ? "bg-emerald-50/80 border-emerald-300 text-emerald-950"
                  : data.sprayWindow.status === "MARGINAL"
                  ? "bg-amber-50/80 border-amber-300 text-amber-950"
                  : "bg-red-50/80 border-red-300 text-red-950"
              }`}
            >
              <div className="flex items-start gap-3">
                {data.sprayWindow.status === "FAVORABLE" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold">
                      Foliar Spray Feasibility: {data.sprayWindow.status}
                    </h4>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-white/80 border border-current">
                      {crop} Advisory
                    </span>
                  </div>
                  <p className="text-xs mt-1 leading-relaxed">{data.sprayWindow.reason}</p>
                  {data.sprayWindow.foliarRiskFactors.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs">
                      {data.sprayWindow.foliarRiskFactors.map((factor, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* 5-Day Outlook */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  5-Day Meteorological Outlook
                </span>
                <span className="text-[11px] text-slate-500">Daily Rain Probability</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 w-full max-w-full">
                {data.dailyForecast.map((day, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-slate-200 bg-white text-center hover:border-slate-300 transition-colors"
                  >
                    <div className="text-xs font-medium text-slate-500">
                      {new Date(day.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric" })}
                    </div>
                    <div className="my-1.5 font-mono text-sm font-bold text-slate-800">
                      {Math.round(day.maxTempC)}° / {Math.round(day.minTempC)}°
                    </div>
                    <div className="flex items-center justify-center gap-1 text-[11px] text-slate-600">
                      <CloudRain className="w-3 h-3 text-blue-500" />
                      <span>{day.rainProbability}%</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 truncate" title={day.condition}>
                      {day.condition}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-[11px] text-slate-500">
          Source: {data?.metadata.sourceAttribution || "Open-Meteo Global Numerical Weather Models"}
        </span>
        {data && (
          <span className="text-[11px] text-slate-400 font-mono">
            Observed: {formatDateTimeIndian(data.metadata.lastUpdated)}
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
