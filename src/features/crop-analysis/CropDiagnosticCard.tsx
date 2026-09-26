"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { 
  Scan, 
  Upload, 
  AlertTriangle, 
  CheckCircle, 
  ShieldAlert, 
  Leaf, 
  FlaskConical, 
  RotateCw,
  HelpCircle,
  X
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorStateView } from "@/components/ui/StateViews";
import { CropDiagnosticResult } from "@/types/crop";
import { MAJOR_CROPS } from "@/lib/utils/constants";
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE_BYTES } from "@/lib/validators/cropAnalysisValidator";

interface CropDiagnosticCardProps {
  initialCrop?: string;
}

export function CropDiagnosticCard({ initialCrop = "Tomato" }: CropDiagnosticCardProps) {
  const [selectedCrop, setSelectedCrop] = useState(initialCrop);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileMime, setFileMime] = useState<string>("image/jpeg");
  const [fileName, setFileName] = useState<string>("sample.jpg");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CropDiagnosticResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setResult(null);

    // Validate size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError(`File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the 5 MB limit.`);
      return;
    }

    // Validate MIME
    if (!ALLOWED_MIME_TYPES.includes(file.type as unknown as (typeof ALLOWED_MIME_TYPES)[number])) {
      setError("Unsupported file format. Please upload a clear JPG, PNG, or WebP image.");
      return;
    }

    setFileMime(file.type);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!imagePreview) {
      setError("Please select or capture a crop leaf photo first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/crop-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop: selectedCrop,
          imageBase64: imagePreview,
          mimeType: fileMime,
          fileName: fileName,
        }),
      });

      const json = await res.json();
      if (!res.ok || json.status !== "success") {
        throw new Error(json.message || "Diagnostic service failed to process image.");
      }

      setResult(json.data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Analysis request failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImagePreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card id="crop-health" className="border-slate-200">
      <CardHeader>
        <CardTitle>
          <Scan className="w-5 h-5 text-emerald-800" aria-hidden="true" />
          <span>Multimodal Crop Health & Disease Diagnostic</span>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="neutral">Computer Vision Diagnostic</Badge>
          {(imagePreview || result) && (
            <Button size="sm" variant="ghost" className="h-8 px-2" onClick={handleReset} title="Clear and Scan New">
              <RotateCw className="w-3.5 h-3.5 text-slate-600" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Crop Selection & Input Guide */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-700 whitespace-nowrap">
              Target Crop:
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium"
            >
              {MAJOR_CROPS.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="text-[11px] text-slate-500">
            Take a focused close-up in natural daylight. Max 5 MB.
          </div>
        </div>

        {/* Upload Dropzone */}
        {!imagePreview && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white hover:bg-emerald-50/20 text-center"
          >
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
              <Upload className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900">Upload or Capture Leaf Photo</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Click to select a photo of affected crop leaves, stems, or fruits. Supports JPG, PNG, WebP up to 5 MB.
            </p>
            <Button size="sm" variant="outline" className="mt-4 pointer-events-none">
              Choose File
            </Button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload crop photo"
        />

        {/* Selected Image Preview & Action */}
        {imagePreview && !result && (
          <div className="space-y-4">
            <div className="relative w-full h-64 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
              <Image
                src={imagePreview}
                alt="Selected crop sample"
                fill
                className="object-contain"
              />
              <button
                type="button"
                onClick={handleReset}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 truncate max-w-xs">{fileName}</span>
              <Button size="md" variant="primary" isLoading={loading} onClick={handleAnalyze}>
                Run Diagnostic Scan
              </Button>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <ErrorStateView
            title="Image Diagnostic Failed"
            message={error}
            onRetry={imagePreview ? handleAnalyze : undefined}
          />
        )}

        {/* Loading Diagnostic Skeleton */}
        {loading && (
          <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-48 rounded" />
              <Skeleton className="h-6 w-20 rounded" />
            </div>
            <Skeleton className="h-16 w-full rounded" />
            <Skeleton className="h-24 w-full rounded" />
          </div>
        )}

        {/* Diagnostic Results Presentation */}
        {result && (
          <div className="space-y-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
            {/* Header: Detected Condition & Confidence */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Identified Condition
                </span>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 mt-0.5">
                  <Leaf className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span>{result.detectedCondition}</span>
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    result.confidenceRating === "HIGH"
                      ? "success"
                      : result.confidenceRating === "MODERATE"
                      ? "warning"
                      : "danger"
                  }
                >
                  {result.confidenceRating} Confidence
                </Badge>
                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={handleReset}>
                  Scan Another Leaf
                </Button>
              </div>
            </div>

            {/* Observable Symptoms */}
            <div>
              <h5 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
                Observable Diagnostic Markers
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {result.observedSymptoms.map((symptom, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatment Protocols (Organic & Chemical) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Organic Remedy */}
              <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-slate-900">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 mb-2">
                  <Leaf className="w-4 h-4 text-emerald-800" />
                  <span>Organic & Biological Management</span>
                </div>
                <ul className="space-y-1.5 text-xs text-emerald-950">
                  {result.treatment.organic.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chemical Remedy */}
              <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200 text-slate-900">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950 mb-2">
                  <FlaskConical className="w-4 h-4 text-amber-800" />
                  <span>CIBRC-Approved Chemical Control</span>
                </div>
                <ul className="space-y-1.5 text-xs text-amber-950">
                  {result.treatment.chemical.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Expert Escalation Notice */}
            <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">Expert Escalation Threshold: </span>
                <span>{result.expertEscalation.thresholdReason}</span>
                <div className="mt-1 text-[11px] text-slate-500 font-medium">
                  Recommended Institution: {result.expertEscalation.recommendedAgency}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-[11px] text-slate-500">
          Engine: {result?.metadata.providerName || "KrishiNova Multimodal Plant Pathology Model"}
        </span>
        <span className="text-[11px] text-slate-400">
          Decision Support Tool • Statutory Verification Advised
        </span>
      </CardFooter>
    </Card>
  );
}
