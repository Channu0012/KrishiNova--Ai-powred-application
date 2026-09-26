import { NextRequest, NextResponse } from "next/server";
import { SchemeQuerySchema } from "@/lib/validators/schemeValidator";
import ProviderFactory from "@/lib/providers/providerFactory";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const rawParams = {
      category: searchParams.get("category") || "ALL",
      search: searchParams.get("search") || undefined,
      state: searchParams.get("state") || undefined,
    };

    const parsed = SchemeQuerySchema.safeParse(rawParams);
    if (!parsed.success) {
      return NextResponse.json(
        {
          status: "error",
          code: "INVALID_PARAMETERS",
          message: parsed.error.issues.map((i) => i.message).join(", "),
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const { category, search, state } = parsed.data;
    const schemeProvider = ProviderFactory.getSchemeProvider();
    const schemes = await schemeProvider.getSchemes(category, search, state);

    return NextResponse.json(
      {
        status: "success",
        data: {
          total: schemes.length,
          schemes,
        },
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800",
        },
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Schemes directory unavailable";
    return NextResponse.json(
      {
        status: "error",
        code: "SCHEMES_SERVICE_ERROR",
        message: "Government schemes directory is temporarily unavailable. Please retry shortly.",
        details: process.env.NODE_ENV === "development" ? message : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
