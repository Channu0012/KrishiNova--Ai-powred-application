import { GovernmentScheme } from "@/types/schemes";

export interface DistrictLocation {
  name: string;
  latitude: number;
  longitude: number;
  primaryMandis: string[];
}

export interface StateData {
  state: string;
  districts: DistrictLocation[];
}

export const INDIAN_AGRICULTURAL_REGIONS: StateData[] = [
  {
    state: "Maharashtra",
    districts: [
      { name: "Nashik", latitude: 20.0059, longitude: 73.7997, primaryMandis: ["Nashik APMC", "Pimpalgaon", "Lasalgaon", "Sinnar"] },
      { name: "Pune", latitude: 18.5204, longitude: 73.8567, primaryMandis: ["Pune Gultekdi", "Manchar", "Baramati"] },
      { name: "Solapur", latitude: 17.6599, longitude: 75.9064, primaryMandis: ["Solapur APMC", "Pandharpur"] },
      { name: "Nagpur", latitude: 21.1458, longitude: 79.0882, primaryMandis: ["Nagpur Cotton Market", "Kalamna"] },
      { name: "Ahmednagar", latitude: 19.0952, longitude: 74.7496, primaryMandis: ["Ahmednagar", "Rahata", "Sangamner"] },
      { name: "Kolhapur", latitude: 16.7050, longitude: 74.2433, primaryMandis: ["Kolhapur Market Yard", "Gadhinglaj"] },
    ],
  },
  {
    state: "Punjab",
    districts: [
      { name: "Ludhiana", latitude: 30.9010, longitude: 75.8573, primaryMandis: ["Ludhiana Mandi", "Khanna Grain Market", "Jagraon"] },
      { name: "Amritsar", latitude: 31.6340, longitude: 74.8723, primaryMandis: ["Amritsar Bhagtanwala", "Rayya"] },
      { name: "Bhatinda", latitude: 30.2110, longitude: 74.9455, primaryMandis: ["Bathinda Mandi", "Rampura Phul"] },
      { name: "Patiala", latitude: 30.3398, longitude: 76.3869, primaryMandis: ["Patiala Mandi", "Nabha", "Rajpura"] },
    ],
  },
  {
    state: "Karnataka",
    districts: [
      { name: "Belagavi", latitude: 15.8497, longitude: 74.4977, primaryMandis: ["Belagavi APMC", "Bailhongal", "Athani"] },
      { name: "Kolar", latitude: 13.1367, longitude: 78.1340, primaryMandis: ["Kolar APMC (Tomato Market)", "Srinivaspur"] },
      { name: "Dharwad", latitude: 15.4589, longitude: 75.0078, primaryMandis: ["Hubballi APMC", "Dharwad Market Yard"] },
      { name: "Mysuru", latitude: 12.2958, longitude: 76.6394, primaryMandis: ["Mysuru Bandipalya", "Nanjangud"] },
      { name: "Shivamogga", latitude: 13.9299, longitude: 75.5681, primaryMandis: ["Shivamogga APMC", "Bhadravathi"] },
    ],
  },
  {
    state: "Andhra Pradesh",
    districts: [
      { name: "Guntur", latitude: 16.3067, longitude: 80.4365, primaryMandis: ["Guntur Mirchi Yard", "Tenali", "Narasaraopet"] },
      { name: "Kurnool", latitude: 15.8281, longitude: 78.0373, primaryMandis: ["Kurnool APMC", "Adoni Cotton Market", "Nandyal"] },
      { name: "Anantapur", latitude: 14.6819, longitude: 77.6006, primaryMandis: ["Anantapur Groundnut Yard", "Hindupur", "Dharmavaram"] },
      { name: "Krishna", latitude: 16.1809, longitude: 81.1303, primaryMandis: ["Vijayawada Market Yard", "Gudivada"] },
    ],
  },
  {
    state: "Uttar Pradesh",
    districts: [
      { name: "Agra", latitude: 27.1767, longitude: 78.0081, primaryMandis: ["Agra Fatehabad Road", "Achhnera (Potato Yard)"] },
      { name: "Varanasi", latitude: 25.3176, longitude: 82.9739, primaryMandis: ["Varanasi Chandpur", "Raja Ka Talab"] },
      { name: "Bareilly", latitude: 28.3670, longitude: 79.4304, primaryMandis: ["Bareilly Grain Mandi", "Aonla"] },
      { name: "Aligarh", latitude: 27.8974, longitude: 78.0880, primaryMandis: ["Aligarh Dhanipur", "Khurja"] },
    ],
  },
  {
    state: "Gujarat",
    districts: [
      { name: "Rajkot", latitude: 22.3039, longitude: 70.8022, primaryMandis: ["Rajkot Bedi Yard", "Gondal Market Yard"] },
      { name: "Surat", latitude: 21.1702, longitude: 72.8311, primaryMandis: ["Surat APMC", "Bardoli"] },
      { name: "Junagadh", latitude: 21.5222, longitude: 70.4579, primaryMandis: ["Junagadh Yard", "Keshod"] },
      { name: "Mehsana", latitude: 23.5880, longitude: 72.3693, primaryMandis: ["Unjha Jeera Market Yard", "Kadi"] },
    ],
  },
  {
    state: "Madhya Pradesh",
    districts: [
      { name: "Indore", latitude: 22.7196, longitude: 75.8577, primaryMandis: ["Indore Choithram Mandi", "Sanwer"] },
      { name: "Ujjain", latitude: 23.1765, longitude: 75.7885, primaryMandis: ["Ujjain Chimanganj Mandi", "Badnagar"] },
      { name: "Hoshangabad", latitude: 22.7519, longitude: 77.7289, primaryMandis: ["Itarsi Mandi", "Hoshangabad Yard"] },
    ],
  },
];

export const MAJOR_CROPS = [
  { name: "Tomato", stages: ["Nursery", "Vegetative", "Flowering", "Fruiting", "Harvesting"], durationDays: 110, season: "Kharif/Rabi" },
  { name: "Paddy (Rice)", stages: ["Transplanting", "Tillering", "Panicle Initiation", "Grain Filling", "Maturity"], durationDays: 135, season: "Kharif" },
  { name: "Wheat", stages: ["CRI Stage", "Tillering", "Jointing", "Heading", "Milking", "Dough"], durationDays: 125, season: "Rabi" },
  { name: "Cotton", stages: ["Seedling", "Square Formation", "Flowering", "Boll Development", "Boll Bursting"], durationDays: 160, season: "Kharif" },
  { name: "Onion", stages: ["Bulb Initiation", "Bulb Development", "Maturity", "Curing"], durationDays: 120, season: "Rabi/Late Kharif" },
  { name: "Chilli", stages: ["Vegetative", "Branching", "Flowering", "Fruit Setting", "Plucking"], durationDays: 150, season: "Annual" },
  { name: "Maize", stages: ["Knee-high", "Tasseling", "Silking", "Cob Filling", "Maturity"], durationDays: 100, season: "Kharif/Rabi" },
  { name: "Soybean", stages: ["Emergence", "V4 Branching", "R1 Flowering", "Pod Formation", "Senescence"], durationDays: 95, season: "Kharif" },
];

export const VERIFIED_GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: "pm-kisan",
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    shortCode: "PM-KISAN",
    category: "INCOME_SUPPORT",
    sponsoringAgency: "Ministry of Agriculture & Farmers Welfare, GoI",
    description: "Central Sector scheme providing income support of ₹6,000 per annum to all landholding farmer families across India, payable in three equal four-monthly installments of ₹2,000.",
    benefits: "Direct Benefit Transfer (DBT) of ₹6,000 annually directly into the farmer's Aadhaar-seeded bank account.",
    eligibility: [
      "All landholding farmer families who own cultivable agricultural land.",
      "Land ownership must be in farmer's name in state land revenue records.",
      "Institutional landholders, constitutional post holders, and income tax payees are excluded."
    ],
    requiredDocuments: [
      "Aadhaar Card (e-KYC mandatory)",
      "Land Ownership Documents (7/12 Extract / Khasra-Khatauni / Jamabandi)",
      "Active Bank Account Passbook with IFSC code",
      "Active Mobile number linked with Aadhaar"
    ],
    officialPortalUrl: "https://pmkisan.gov.in",
    lastVerifiedDate: "2026-08-01",
    isNational: true,
    stateAvailability: ["ALL"],
    applicationMode: "BOTH"
  },
  {
    id: "pmfby",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    shortCode: "PMFBY",
    category: "INSURANCE",
    sponsoringAgency: "Department of Agriculture and Farmers Welfare, GoI",
    description: "Comprehensive national crop insurance scheme providing financial support and risk mitigation against non-preventable natural risks (drought, flood, unseasonal rain, pests) from pre-sowing to post-harvest stages.",
    benefits: "Maximum premium of 2.0% for Kharif food crops, 1.5% for Rabi crops, and 5% for commercial/horticultural crops. Balance premium is 100% subsidized by Central & State governments.",
    eligibility: [
      "All farmers including sharecroppers and tenant farmers growing notified crops in notified areas.",
      "Voluntary for both loanee and non-loanee farmers."
    ],
    requiredDocuments: [
      "Land Possession Certificate (LPC) or Revenue Records",
      "Crop Sowing Certificate / Self-Declaration of Sowing",
      "Bank Account details (Aadhaar linked)",
      "Aadhaar Card copy"
    ],
    officialPortalUrl: "https://pmfby.gov.in",
    lastVerifiedDate: "2026-08-15",
    isNational: true,
    stateAvailability: ["ALL"],
    applicationMode: "BOTH"
  },
  {
    id: "pm-kusum",
    name: "PM-KUSUM (Kisan Urja Suraksha evam Utthaan Mahabhiyan)",
    shortCode: "PM-KUSUM",
    category: "IRRIGATION",
    sponsoringAgency: "Ministry of New and Renewable Energy (MNRE), GoI",
    description: "National initiative providing substantial financial subsidies for individual farmers to install standalone solar agriculture pumps (Component B) and solarize existing grid-connected agriculture pumps (Component C).",
    benefits: "Up to 60% total subsidy (30% Central + 30% State Govt). Farmer contributes only 10% upfront; remaining 30% available via bank loan.",
    eligibility: [
      "Individual farmers, water user associations, and farmer producer organizations.",
      "Must possess agricultural land requiring irrigation with no existing grid electric pump connection for Component B."
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Agricultural Land ownership documents",
      "Bank Account details",
      "Source of water availability certificate (borewell/open well)"
    ],
    officialPortalUrl: "https://pmkusum.mnre.gov.in",
    lastVerifiedDate: "2026-07-20",
    isNational: true,
    stateAvailability: ["ALL"],
    applicationMode: "ONLINE"
  },
  {
    id: "soil-health-card",
    name: "Soil Health Card Scheme",
    shortCode: "SHC",
    category: "ORGANIC",
    sponsoringAgency: "Ministry of Agriculture & Farmers Welfare, GoI",
    description: "Provides crop-wise customized fertilizer and soil amendment recommendations based on laboratory analysis of 12 critical chemical and physical soil parameters (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC).",
    benefits: "Free or nominal soil sample testing and customized 3-year soil amendment nutrient advisory, reducing indiscriminate chemical fertilizer expenses by 15-20%.",
    eligibility: [
      "All agricultural landholders in covered village clusters."
    ],
    requiredDocuments: [
      "Farmer Identity proof (Aadhaar)",
      "Field Survey / Khasra number where soil core was sampled"
    ],
    officialPortalUrl: "https://soilhealth.dac.gov.in",
    lastVerifiedDate: "2026-08-10",
    isNational: true,
    stateAvailability: ["ALL"],
    applicationMode: "BOTH"
  },
  {
    id: "kisan-credit-card",
    name: "Kisan Credit Card (KCC) Scheme",
    shortCode: "KCC",
    category: "CREDIT",
    sponsoringAgency: "Reserve Bank of India (RBI) & NABARD",
    description: "Institutional short-term credit facility to meet cultivation expenses, post-harvest expenses, produce marketing loans, consumption requirements of farmer household, and working capital for maintenance of farm assets.",
    benefits: "Concessional credit interest rate as low as 4% per annum (with 3% prompt repayment incentive) for loans up to ₹3,00,000. Collateral-free limit up to ₹1,60,000.",
    eligibility: [
      "All farmers, individuals or joint borrowers who are owner cultivators.",
      "Tenant farmers, oral lessees, and sharecroppers.",
      "SHGs or Joint Liability Groups of farmers."
    ],
    requiredDocuments: [
      "Filled loan application form",
      "Identity Proof (Aadhaar / Voter ID / PAN)",
      "Proof of Residence",
      "Land records showing crop cultivated"
    ],
    officialPortalUrl: "https://www.myscheme.gov.in/schemes/kcc",
    lastVerifiedDate: "2026-08-12",
    isNational: true,
    stateAvailability: ["ALL"],
    applicationMode: "BOTH"
  },
  {
    id: "pkvy",
    name: "Paramparagat Krishi Vikas Yojana (PKVY)",
    shortCode: "PKVY",
    category: "ORGANIC",
    sponsoringAgency: "Department of Agriculture, Cooperation & Farmers Welfare, GoI",
    description: "Sub-component of Soil Health Management under National Mission of Sustainable Agriculture to promote organic farming through a cluster approach with Participatory Guarantee System (PGS) certification.",
    benefits: "Financial assistance of ₹50,000 per hectare over 3 years, of which ₹31,000 is directly provided via DBT to the farmer for organic inputs (seeds, bio-fertilizers, vermicompost).",
    eligibility: [
      "Farmers willing to form a cluster of 50 or more farmers with 50 acres of land for organic cultivation."
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Land holding certificate",
      "Bank Account details",
      "Cluster membership enrollment"
    ],
    officialPortalUrl: "https://pgsindia-ncof.gov.in",
    lastVerifiedDate: "2026-07-28",
    isNational: true,
    stateAvailability: ["ALL"],
    applicationMode: "CSC_OFFLINE"
  }
];
