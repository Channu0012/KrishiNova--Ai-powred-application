import { NextRequest, NextResponse } from "next/server";
import { CropAnalysisRequestSchema } from "@/lib/validators/cropAnalysisValidator";
import ProviderFactory from "@/lib/providers/providerFactory";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CropAnalysisRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          status: "error",
          code: "INVALID_UPLOAD_PAYLOAD",
          message: parsed.error.issues.map((i) => i.message).join(", "),
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const { crop, imageBase64, mimeType, fileName } = parsed.data;
    const cropProvider = ProviderFactory.getCropAnalysisProvider();
    const diagnostic = await cropProvider.analyzeCropHealth(crop, imageBase64, mimeType, fileName);

    return NextResponse.json(
      {
        status: "success",
        data: diagnostic,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Crop analysis failed";
    return NextResponse.json(
      {
        status: "error",
        code: "CROP_ANALYSIS_FAILED",
        message: message.includes("size") || message.includes("format")
          ? message
          : "Crop image analysis could not be completed. Please ensure you upload a clear close-up leaf photo in JPEG, PNG, or WebP format under 5 MB.",
        details: process.env.NODE_ENV === "development" ? message : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 422 }
    );
  }
}
