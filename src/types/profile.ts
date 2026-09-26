import { FarmerCropProfile } from "./crop";

export type SoilType = 
  | "BLACK_COTTON"
  | "ALLUVIAL"
  | "RED_LOAM"
  | "SANDY_LOAM"
  | "CLAY"
  | "LATERITE";

export type IrrigationType = 
  | "DRIP"
  | "SPRINKLER"
  | "FLOOD_CANAL"
  | "BOREWELL"
  | "RAINFED";

export interface FarmerProfile {
  userId: string;
  fullName: string;
  email: string;
  phone?: string;
  state: string;
  district: string;
  taluka?: string;
  latitude: number;
  longitude: number;
  landSizeAcres: number;
  soilType: SoilType;
  irrigationMode: IrrigationType;
  preferredLanguage: string;
  crops: FarmerCropProfile[];
  updatedAt: string;
}
