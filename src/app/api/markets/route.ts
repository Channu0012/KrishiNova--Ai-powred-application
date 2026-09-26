import { NextRequest, NextResponse } from "next/server";
import { MarketQuerySchema } from "@/lib/validators/marketValidator";
import ProviderFactory from "@/lib/providers/providerFactory";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const rawParams = {
      state: searchParams.get("state") || "",
      district: searchParams.get("district") || undefined,
      commodity: searchParams.get("commodity") || undefined,
    };

    const parsed = MarketQuerySchema.safeParse(rawParams);
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

    const { state, district, commodity } = parsed.data;
    const marketProvider = ProviderFactory.getMarketDataProvider();
    const result = await marketProvider.getMandiPrices(state, district, commodity);

    return NextResponse.json(
      {
        status: "success",
        data: result,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Market provider unavailable";
    return NextResponse.json(
      {
        status: "error",
        code: "MARKET_SERVICE_ERROR",
        message: "Market price information is currently unavailable from the reporting mandis. Please check back later.",
        details: process.env.NODE_ENV === "development" ? message : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
