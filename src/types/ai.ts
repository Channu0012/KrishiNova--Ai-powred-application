import { ProviderMetadata } from "./common";

export interface FarmContext {
  crop: string;
  cropStage?: string;
  ageDays?: number;
  district: string;
  state: string;
  soilType?: string;
  irrigationMode?: string;
  weatherSummary?: string;
}

export interface AIAdvisoryResponse {
  recommendation: string;
  rationale: string;
  actionSteps: string[];
  safetyWarning: string;
  expertConsultationNote: string;
  disclaimer: string;
  metadata: ProviderMetadata;
}

export interface AIChatMessage {
  id: string;
  sender: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  structuredAdvisory?: AIAdvisoryResponse;
}
