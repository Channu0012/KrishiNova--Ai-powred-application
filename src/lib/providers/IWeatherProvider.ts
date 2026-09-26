import { WeatherData } from "@/types/weather";

export interface IWeatherProvider {
  getWeatherForecast(
    lat: number,
    lon: number,
    crop?: string,
    district?: string,
    state?: string
  ): Promise<WeatherData>;
}
