import { z } from "zod";

export const ProfileUpdateSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  state: z.string().min(2, "State is required").max(100),
  district: z.string().min(2, "District is required").max(100),
  taluka: z.string().max(100).optional(),
  landSizeAcres: z.coerce.number().min(0.1, "Land size must be at least 0.1 acres").max(5000),
  soilType: z.enum(["BLACK_COTTON", "ALLUVIAL", "RED_LOAM", "SANDY_LOAM", "CLAY", "LATERITE"]),
  irrigationMode: z.enum(["DRIP", "SPRINKLER", "FLOOD_CANAL", "BOREWELL", "RAINFED"]),
  preferredLanguage: z.string().max(10).default("en"),
  primaryCrops: z.array(z.string()).min(1, "Please select at least one primary crop"),
});

export type ProfileUpdateBody = z.infer<typeof ProfileUpdateSchema>;
