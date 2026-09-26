import { z } from "zod";

export const AIAdvisoryRequestSchema = z.object({
  query: z.string().min(5, "Query must be at least 5 characters").max(1000, "Query cannot exceed 1000 characters"),
  crop: z.string().min(2, "Crop name is required").max(100),
  cropStage: z.string().max(100).optional(),
  ageDays: z.coerce.number().min(0).max(1000).optional(),
  district: z.string().min(2, "District is required").max(100),
  state: z.string().min(2, "State is required").max(100),
  soilType: z.string().max(100).optional(),
  irrigationMode: z.string().max(100).optional(),
  weatherSummary: z.string().max(500).optional(),
});

export type AIAdvisoryRequestBody = z.infer<typeof AIAdvisoryRequestSchema>;
