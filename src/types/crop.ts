import { ProviderMetadata } from "./common";

export type DiagnosticConfidence = "HIGH" | "MODERATE" | "INCONCLUSIVE";

export interface CropDiagnosticTreatment {
  organic: string[];
  chemical: string[];
  preventative: string[];
}

export interface CropDiagnosticResult {
  id: string;
  crop: string;
  detectedCondition: string;
  confidenceRating: DiagnosticConfidence;
  observedSymptoms: string[];
  treatment: CropDiagnosticTreatment;
  expertEscalation: {
    needed: boolean;
    thresholdReason: string;
    recommendedAgency: string; // e.g. "Nearest Krishi Vigyan Kendra (KVK)"
  };
  disclaimer: string;
  analyzedAt: string;
  metadata: ProviderMetadata;
}

export interface FarmerCropProfile {
  id: string;
  cropName: string;
  variety?: string;
  sowingDate: string;
  acreage: number;
  stage: "NURSERY" | "VEGETATIVE" | "FLOWERING" | "FRUITING" | "HARVESTING";
}
