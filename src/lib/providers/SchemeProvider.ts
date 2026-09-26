import { ISchemeProvider } from "./ISchemeProvider";
import { GovernmentScheme, SchemeCategory } from "@/types/schemes";
import { VERIFIED_GOVERNMENT_SCHEMES } from "@/lib/utils/constants";

export class SchemeProvider implements ISchemeProvider {
  async getSchemes(
    category: SchemeCategory = "ALL",
    search?: string,
    state?: string
  ): Promise<GovernmentScheme[]> {
    let result = [...VERIFIED_GOVERNMENT_SCHEMES];

    if (category && category !== "ALL") {
      result = result.filter((s) => s.category === category);
    }

    if (state && state !== "ALL") {
      result = result.filter(
        (s) => s.isNational || s.stateAvailability.includes("ALL") || s.stateAvailability.includes(state)
      );
    }

    if (search && search.trim().length > 0) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.shortCode.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.benefits.toLowerCase().includes(q)
      );
    }

    return result;
  }

  async getSchemeById(id: string): Promise<GovernmentScheme | null> {
    const found = VERIFIED_GOVERNMENT_SCHEMES.find((s) => s.id === id);
    return found || null;
  }
}
