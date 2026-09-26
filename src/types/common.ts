// Common System & API Types

export type ApiResponseStatus = "success" | "error";

export interface ApiResponse<T> {
  status: ApiResponseStatus;
  data?: T;
  code?: string;
  message?: string;
  timestamp: string;
}

export type UIStateStatus = "idle" | "loading" | "success" | "empty" | "error" | "offline";

export interface ProviderMetadata {
  providerName: string;
  isRealTime: boolean;
  isFallback: boolean;
  lastUpdated: string;
  sourceAttribution: string;
  officialUrl?: string;
}
