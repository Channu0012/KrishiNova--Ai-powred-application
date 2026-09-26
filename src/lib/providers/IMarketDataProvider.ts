import { MarketPriceResult } from "@/types/market";

export interface IMarketDataProvider {
  getMandiPrices(
    state: string,
    district?: string,
    commodity?: string
  ): Promise<MarketPriceResult>;
}
