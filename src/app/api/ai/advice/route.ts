import { NextRequest, NextResponse } from "next/server";
import { AIAdvisoryRequestSchema } from "@/lib/validators/aiValidator";
import ProviderFactory from "@/lib/providers/providerFactory";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = AIAdvisoryRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          status: "error",
          code: "INVALID_REQUEST_BODY",
          message: parsed.error.issues.map((i) => i.message).join(", "),
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const { query, crop, cropStage, ageDays, district, state, soilType, irrigationMode, weatherSummary } = parsed.data;

    const farmContext = {
      crop,
      cropStage,
      ageDays,
      district,
      state,
      soilType,
      irrigationMode,
      weatherSummary,
    };

    const aiProvider = ProviderFactory.getAIProvider();
    const advisory = await aiProvider.generateAgronomicAdvice(farmContext, query);

    return NextResponse.json(
      {
        status: "success",
        data: advisory,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "AI advisory generation failed";
    return NextResponse.json(
      {
        status: "error",
        code: "AI_SERVICE_ERROR",
        message: "Unable to generate agronomic advisory at this moment. Please verify your connection or try again.",
        details: process.env.NODE_ENV === "development" ? message : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
