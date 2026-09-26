import { GovernmentScheme, SchemeCategory } from "@/types/schemes";

export interface ISchemeProvider {
  getSchemes(category?: SchemeCategory, search?: string, state?: string): Promise<GovernmentScheme[]>;
  getSchemeById(id: string): Promise<GovernmentScheme | null>;
}
