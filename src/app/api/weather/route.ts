import { NextRequest, NextResponse } from "next/server";
import { WeatherQuerySchema } from "@/lib/validators/weatherValidator";
import ProviderFactory from "@/lib/providers/providerFactory";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const rawParams = {
      lat: searchParams.get("lat"),
      lon: searchParams.get("lon"),
      crop: searchParams.get("crop") || "General",
      district: searchParams.get("district") || undefined,
      state: searchParams.get("state") || undefined,
    };

    const parsed = WeatherQuerySchema.safeParse(rawParams);
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

    const { lat, lon, crop, district, state } = parsed.data;
    const weatherProvider = ProviderFactory.getWeatherProvider();
    const weatherData = await weatherProvider.getWeatherForecast(lat, lon, crop, district, state);

    return NextResponse.json(
      {
        status: "success",
        data: weatherData,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Weather service temporarily unavailable";
    return NextResponse.json(
      {
        status: "error",
        code: "WEATHER_SERVICE_ERROR",
        message: "Weather data could not be retrieved from the meteorological provider. Please try again shortly.",
        details: process.env.NODE_ENV === "development" ? message : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
