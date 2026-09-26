import { z } from "zod";

export const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export const CropAnalysisRequestSchema = z.object({
  crop: z.string().min(2, "Crop name is required").max(100),
  imageBase64: z.string().min(100, "Valid image binary or base64 stream is required"),
  mimeType: z.enum(ALLOWED_MIME_TYPES, {
    message: "Only JPEG, PNG, or WebP images are supported.",
  }),
  fileName: z.string().max(255).optional().default("crop-sample.jpg"),
});

export type CropAnalysisRequestBody = z.infer<typeof CropAnalysisRequestSchema>;
