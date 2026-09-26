export type SchemeCategory = 
  | "ALL"
  | "INCOME_SUPPORT"
  | "INSURANCE"
  | "IRRIGATION"
  | "CREDIT"
  | "ORGANIC"
  | "MACHINERY";

export interface GovernmentScheme {
  id: string;
  name: string;
  shortCode: string;
  category: SchemeCategory;
  sponsoringAgency: string;
  description: string;
  benefits: string;
  eligibility: string[];
  requiredDocuments: string[];
  officialPortalUrl: string;
  lastVerifiedDate: string;
  isNational: boolean;
  stateAvailability: string[]; // ["ALL"] or specific states
  applicationMode: "ONLINE" | "CSC_OFFLINE" | "BOTH";
}

export interface SchemeFilterOptions {
  category?: SchemeCategory;
  state?: string;
  searchQuery?: string;
}
