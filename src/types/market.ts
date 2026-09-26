import { ProviderMetadata } from "./common";

export interface MandiCommodityPrice {
  id: string;
  state: string;
  district: string;
  marketName: string;
  commodity: string;
  variety: string;
  arrivalDate: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string; // e.g. "₹/Quintal"
}

export interface MarketPriceResult {
  state: string;
  district: string;
  commodity?: string;
  prices: MandiCommodityPrice[];
  reportedDate: string;
  metadata: ProviderMetadata;
}
