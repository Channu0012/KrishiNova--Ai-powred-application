import { IWeatherProvider } from "./IWeatherProvider";
import { WeatherData, AgriculturalSprayWindow, DailyWeatherForecast } from "@/types/weather";

// WMO Weather interpretation codes (WW)
function mapWmoCodeToCondition(code: number): string {
  switch (code) {
    case 0: return "Clear Sky";
    case 1: return "Mainly Clear";
    case 2: return "Partly Cloudy";
    case 3: return "Overcast";
    case 45: return "Fog";
    case 48: return "Depositing Rime Fog";
    case 51: return "Light Drizzle";
    case 53: return "Moderate Drizzle";
    case 55: return "Dense Drizzle";
    case 61: return "Slight Rain";
    case 63: return "Moderate Rain";
    case 65: return "Heavy Rain";
    case 80: return "Slight Rain Showers";
    case 81: return "Moderate Rain Showers";
    case 82: return "Violent Rain Showers";
    case 95: return "Thunderstorm";
    case 96:
    case 99: return "Thunderstorm with Hail";
    default: return "Scattered Clouds";
  }
}

function calculateSprayFeasibility(
  windSpeedKmh: number,
  rainProbability: number,
  humidity: number,
  tempC: number
): AgriculturalSprayWindow {
  const riskFactors: string[] = [];
  let status: AgriculturalSprayWindow["status"] = "FAVORABLE";
  let reason = "Weather parameters are within optimal range for foliar spraying.";

  if (rainProbability >= 45) {
    status = "UNFAVORABLE";
    riskFactors.push(`High precipitation risk (${rainProbability}%). Spray wash-off will occur.`);
    reason = "Do not spray foliar agrochemicals. Imminent precipitation will wash away inputs.";
  } else if (windSpeedKmh >= 18) {
    status = "UNFAVORABLE";
    riskFactors.push(`High wind speed (${Math.round(windSpeedKmh)} km/h). Severe droplet drift risk.`);
    reason = "Wind velocity exceeds safe foliar application limits (15 km/h). Spray drift may harm non-target zones.";
  } else if (humidity >= 85) {
    status = "MARGINAL";
    riskFactors.push(`High ambient humidity (${Math.round(humidity)}%). Prolonged leaf wetness.`);
    reason = "High humidity delays droplet dry-time, accelerating fungal spore spread. Use systemic controls only if necessary.";
  } else if (tempC >= 35) {
    status = "MARGINAL";
    riskFactors.push(`High temperature (${Math.round(tempC)}°C). Rapid droplet evaporation.`);
    reason = "Apply sprays during early morning (6:00 - 9:00 AM) or late evening to prevent rapid chemical volatilization.";
  }

  return {
    status,
    reason,
    maxRecommendedWindSpeedKmh: 15,
    currentWindSpeedKmh: windSpeedKmh,
    rainProbabilityPercent: rainProbability,
    foliarRiskFactors: riskFactors,
  };
}

export class WeatherProvider implements IWeatherProvider {
  async getWeatherForecast(
    lat: number,
    lon: number,
    crop: string = "General",
    district?: string,
    state?: string
  ): Promise<WeatherData> {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", lat.toString());
    url.searchParams.set("longitude", lon.toString());
    url.searchParams.set(
      "current",
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m"
    );
    url.searchParams.set(
      "daily",
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max"
    );
    url.searchParams.set("timezone", "Asia/Kolkata");
    url.searchParams.set("forecast_days", "5");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(url.toString(), {
        signal: controller.signal,
        next: { revalidate: 1800 }, // Cache on server for 30 minutes
      });

      if (!response.ok) {
        throw new Error(`Open-Meteo weather upstream returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const current = data.current;
      const daily = data.daily;

      const rainProb = daily.precipitation_probability_max?.[0] ?? (current.precipitation > 0 ? 80 : 10);
      const sprayWindow = calculateSprayFeasibility(
        current.wind_speed_10m ?? 0,
        rainProb,
        current.relative_humidity_2m ?? 50,
        current.temperature_2m ?? 25
      );

      const dailyForecast: DailyWeatherForecast[] = [];
      const daysCount = daily.time?.length ?? 0;
      for (let i = 0; i < daysCount; i++) {
        dailyForecast.push({
          date: daily.time[i],
          maxTempC: daily.temperature_2m_max[i] ?? 0,
          minTempC: daily.temperature_2m_min[i] ?? 0,
          rainProbability: daily.precipitation_probability_max?.[i] ?? 0,
          precipitationMm: daily.precipitation_sum?.[i] ?? 0,
          weatherCode: daily.weather_code[i] ?? 0,
          condition: mapWmoCodeToCondition(daily.weather_code[i] ?? 0),
        });
      }

      return {
        location: {
          latitude: lat,
          longitude: lon,
          districtName: district,
          stateName: state,
          timezone: data.timezone ?? "Asia/Kolkata",
        },
        current: {
          temperatureC: current.temperature_2m,
          apparentTemperatureC: current.apparent_temperature,
          relativeHumidity: current.relative_humidity_2m,
          windSpeedKmh: current.wind_speed_10m,
          windDirectionDegrees: current.wind_direction_10m,
          precipitationProbability: rainProb,
          precipitationMm: current.precipitation ?? 0,
          weatherCode: current.weather_code,
          condition: mapWmoCodeToCondition(current.weather_code),
          isDaytime: current.is_day === 1,
        },
        dailyForecast,
        sprayWindow,
        metadata: {
          providerName: "Open-Meteo Meteorological Service (Global Numerical Weather Prediction)",
          isRealTime: true,
          isFallback: false,
          lastUpdated: new Date().toISOString(),
          sourceAttribution: "Open-Meteo.com & India Meteorological Department (IMD) Models",
          officialUrl: "https://open-meteo.com",
        },
      };
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      console.warn("Open-Meteo upstream connection unreachable, engaging local agro-met baseline:", err);

      // Resilient Fallback based on Indian Climatological Norms
      const fallbackTemp = 28.5;
      const fallbackHumidity = 68;
      const fallbackWind = 11.2;
      const fallbackRainProb = 15;
      const sprayWindow = calculateSprayFeasibility(fallbackWind, fallbackRainProb, fallbackHumidity, fallbackTemp);

      const today = new Date();
      const dailyForecast: DailyWeatherForecast[] = [];
      for (let i = 0; i < 5; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() + i);
        dailyForecast.push({
          date: d.toISOString().split("T")[0],
          maxTempC: 31 - i * 0.5,
          minTempC: 21 - i * 0.3,
          rainProbability: i === 1 ? 60 : 15,
          precipitationMm: i === 1 ? 8.5 : 0,
          weatherCode: i === 1 ? 61 : 1,
          condition: i === 1 ? "Slight Rain" : "Mainly Clear",
        });
      }

      return {
        location: {
          latitude: lat,
          longitude: lon,
          districtName: district || "Agricultural District",
          stateName: state || "India",
          timezone: "Asia/Kolkata",
        },
        current: {
          temperatureC: fallbackTemp,
          apparentTemperatureC: 29.8,
          relativeHumidity: fallbackHumidity,
          windSpeedKmh: fallbackWind,
          windDirectionDegrees: 240,
          precipitationProbability: fallbackRainProb,
          precipitationMm: 0,
          weatherCode: 1,
          condition: "Mainly Clear",
          isDaytime: true,
        },
        dailyForecast,
        sprayWindow,
        metadata: {
          providerName: "Indian Agro-Met Climatological Baseline (Open-Meteo Feed Disconnected)",
          isRealTime: false,
          isFallback: true,
          lastUpdated: new Date().toISOString(),
          sourceAttribution: "IMD District Agro-Meteorological Climatological Norms",
          officialUrl: "https://mausam.imd.gov.in",
        },
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
