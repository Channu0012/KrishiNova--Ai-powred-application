"use client";

import React, { useState } from "react";
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  RotateCw,
  HelpCircle,
  Cpu 
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorStateView } from "@/components/ui/StateViews";
import { AIAdvisoryResponse } from "@/types/ai";

interface AIAssistantCardProps {
  crop: string;
  stage?: string;
  ageDays?: number;
  district: string;
  state: string;
  soilType?: string;
  irrigationMode?: string;
  weatherSummary?: string;
}

const SAMPLE_QUESTIONS = [
  "My tomato crop is 40 days old and rain is expected tomorrow. What should I do?",
  "How to manage early blast disease in paddy seedlings without heavy chemicals?",
  "Best spray timing for cotton square formation stage to deter bollworms?",
];

export function AIAssistantCard({
  crop,
  stage = "Flowering",
  ageDays = 42,
  district,
  state,
  soilType = "Black Cotton",
  irrigationMode = "Drip",
  weatherSummary = "28°C, 75% humidity, rain risk tomorrow",
}: AIAssistantCardProps) {
  const [query, setQuery] = useState(
    `My ${crop.toLowerCase()} crop is ${ageDays} days old and rain is expected tomorrow. What should I do?`
  );
  const [advisory, setAdvisory] = useState<AIAdvisoryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async (questionToAsk?: string) => {
    const activeQuery = questionToAsk || query;
    if (!activeQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: activeQuery,
          crop,
          cropStage: stage,
          ageDays,
          district,
          state,
          soilType,
          irrigationMode,
          weatherSummary,
        }),
      });

      const json = await res.json();
      if (!res.ok || json.status !== "success") {
        throw new Error(json.message || "Failed to generate agronomic advisory.");
      }

      setAdvisory(json.data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Advisory generation error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card id="ai-assistant" className="border-slate-200">
      <CardHeader>
        <CardTitle>
          <Bot className="w-5 h-5 text-emerald-800" aria-hidden="true" />
          <span>Context-Aware Agronomic AI Assistant</span>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="neutral">
            <Cpu className="w-3 h-3 text-emerald-700" />
            <span>Bedrock Nova Engine</span>
          </Badge>
          {advisory && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2"
              onClick={() => handleAsk()}
              title="Re-run Query"
            >
              <RotateCw className="w-3.5 h-3.5 text-slate-600" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Context Summary Banner */}
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="font-semibold text-slate-900">Active Query Context:</span>
          <span>Crop: <strong>{crop}</strong> ({stage}, Day {ageDays})</span>
          <span>Location: <strong>{district}, {state}</strong></span>
          <span>Soil: <strong>{soilType}</strong></span>
          <span>Weather: <strong>{weatherSummary}</strong></span>
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk();
          }}
          className="space-y-2"
        >
          <div className="relative">
            <textarea
              rows={3}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask an agronomic question regarding disease, spray timing, fertilizer, or crop stage..."
              className="w-full p-3 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700 resize-none font-normal leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuery(q);
                    handleAsk(q);
                  }}
                  className="text-[11px] px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-left truncate max-w-xs transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            <Button
              type="submit"
              size="md"
              variant="primary"
              isLoading={loading}
              disabled={!query.trim()}
              className="shrink-0"
            >
              <Send className="w-3.5 h-3.5 mr-1.5" />
              Ask AI Assistant
            </Button>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <Skeleton className="h-6 w-3/4 rounded" />
            <Skeleton className="h-16 w-full rounded" />
            <Skeleton className="h-20 w-full rounded" />
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <ErrorStateView
            title="Agronomic Engine Error"
            message={error}
            onRetry={() => handleAsk()}
          />
        )}

        {/* Structured Advisory Output */}
        {!loading && advisory && (
          <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            {/* Primary Recommendation */}
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                Primary Agronomic Advisory
              </span>
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                {advisory.recommendation}
              </p>
            </div>

            {/* Rationale */}
            <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="font-semibold text-slate-900 block">Scientific Rationale:</span>
              <p className="leading-relaxed">{advisory.rationale}</p>
            </div>

            {/* Action Steps */}
            <div>
              <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-2">
                Action Steps & Sequence
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {advisory.actionSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety Warning */}
            <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Agrochemical & Safety Directive: </span>
                <span>{advisory.safetyWarning}</span>
              </div>
            </div>

            {/* KVK Escalation Note */}
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{advisory.expertConsultationNote}</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-[11px] text-slate-500">
          Inference Engine: {advisory?.metadata.providerName || "Amazon Bedrock Nova / Local Agronomic Heuristic"}
        </span>
        <span className="text-[11px] text-slate-400">
          Non-Synthetic Agronomic Knowledge Base
        </span>
      </CardFooter>
    </Card>
  );
}
