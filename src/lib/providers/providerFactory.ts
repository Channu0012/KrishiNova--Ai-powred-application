import { WeatherProvider } from "./WeatherProvider";
import { MarketDataProvider } from "./MarketDataProvider";
import { SchemeProvider } from "./SchemeProvider";
import { AIProvider } from "./AIProvider";
import { CropAnalysisProvider } from "./CropAnalysisProvider";
import { IWeatherProvider } from "./IWeatherProvider";
import { IMarketDataProvider } from "./IMarketDataProvider";
import { ISchemeProvider } from "./ISchemeProvider";
import { IAIProvider } from "./IAIProvider";
import { ICropAnalysisProvider } from "./ICropAnalysisProvider";

class ProviderFactory {
  private static weatherProvider: IWeatherProvider;
  private static marketDataProvider: IMarketDataProvider;
  private static schemeProvider: ISchemeProvider;
  private static aiProvider: IAIProvider;
  private static cropAnalysisProvider: ICropAnalysisProvider;

  static getWeatherProvider(): IWeatherProvider {
    if (!this.weatherProvider) {
      this.weatherProvider = new WeatherProvider();
    }
    return this.weatherProvider;
  }

  static getMarketDataProvider(): IMarketDataProvider {
    if (!this.marketDataProvider) {
      this.marketDataProvider = new MarketDataProvider();
    }
    return this.marketDataProvider;
  }

  static getSchemeProvider(): ISchemeProvider {
    if (!this.schemeProvider) {
      this.schemeProvider = new SchemeProvider();
    }
    return this.schemeProvider;
  }

  static getAIProvider(): IAIProvider {
    if (!this.aiProvider) {
      this.aiProvider = new AIProvider();
    }
    return this.aiProvider;
  }

  static getCropAnalysisProvider(): ICropAnalysisProvider {
    if (!this.cropAnalysisProvider) {
      this.cropAnalysisProvider = new CropAnalysisProvider();
    }
    return this.cropAnalysisProvider;
  }
}

export default ProviderFactory;
