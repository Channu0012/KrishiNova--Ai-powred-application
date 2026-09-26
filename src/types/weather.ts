import { ProviderMetadata } from "./common";

export type SprayFeasibility = "FAVORABLE" | "MARGINAL" | "UNFAVORABLE";

export interface AgriculturalSprayWindow {
  status: SprayFeasibility;
  reason: string;
  maxRecommendedWindSpeedKmh: number;
  currentWindSpeedKmh: number;
  rainProbabilityPercent: number;
  foliarRiskFactors: string[];
}

export interface DailyWeatherForecast {
  date: string;
  maxTempC: number;
  minTempC: number;
  rainProbability: number;
  precipitationMm: number;
  condition: string;
  weatherCode: number;
}

export interface CurrentWeather {
  temperatureC: number;
  apparentTemperatureC: number;
  relativeHumidity: number;
  windSpeedKmh: number;
  windDirectionDegrees: number;
  precipitationProbability: number;
  precipitationMm: number;
  weatherCode: number;
  condition: string;
  isDaytime: boolean;
}

export interface WeatherData {
  location: {
    latitude: number;
    longitude: number;
    districtName?: string;
    stateName?: string;
    timezone: string;
  };
  current: CurrentWeather;
  dailyForecast: DailyWeatherForecast[];
  sprayWindow: AgriculturalSprayWindow;
  metadata: ProviderMetadata;
}
