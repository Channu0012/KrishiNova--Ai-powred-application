import { NextRequest, NextResponse } from "next/server";
import { ProfileUpdateSchema } from "@/lib/validators/profileValidator";
import { FarmerProfile } from "@/types/profile";
import { INDIAN_AGRICULTURAL_REGIONS } from "@/lib/utils/constants";

// In-memory session store for local/preview execution
let defaultProfile: FarmerProfile = {
  userId: "usr_farmer_001",
  fullName: "Ramesh Patil",
  email: "ramesh.patil@krishinova.in",
  phone: "+91 98220 12345",
  state: "Maharashtra",
  district: "Nashik",
  taluka: "Niphad",
  latitude: 20.0059,
  longitude: 73.7997,
  landSizeAcres: 3.5,
  soilType: "BLACK_COTTON",
  irrigationMode: "DRIP",
  preferredLanguage: "en",
  crops: [
    {
      id: "crop-tom-1",
      cropName: "Tomato",
      variety: "Abhinav F1",
      sowingDate: "2026-08-15",
      acreage: 2.0,
      stage: "FLOWERING",
    },
    {
      id: "crop-on-1",
      cropName: "Onion",
      variety: "Bhima Super",
      sowingDate: "2026-08-01",
      acreage: 1.5,
      stage: "VEGETATIVE",
    },
  ],
  updatedAt: new Date().toISOString(),
};

export async function GET() {
  return NextResponse.json(
    {
      status: "success",
      data: defaultProfile,
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ProfileUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          status: "error",
          code: "INVALID_PROFILE_DATA",
          message: parsed.error.issues.map((i) => i.message).join(", "),
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const { fullName, state, district, taluka, landSizeAcres, soilType, irrigationMode, preferredLanguage, primaryCrops } = parsed.data;

    // Look up real geographic coordinates for district
    let lat = defaultProfile.latitude;
    let lon = defaultProfile.longitude;
    const stateObj = INDIAN_AGRICULTURAL_REGIONS.find((s) => s.state.toLowerCase() === state.toLowerCase());
    if (stateObj) {
      const distObj = stateObj.districts.find((d) => d.name.toLowerCase() === district.toLowerCase());
      if (distObj) {
        lat = distObj.latitude;
        lon = distObj.longitude;
      }
    }

    defaultProfile = {
      ...defaultProfile,
      fullName,
      state,
      district,
      taluka: taluka || defaultProfile.taluka,
      latitude: lat,
      longitude: lon,
      landSizeAcres,
      soilType,
      irrigationMode,
      preferredLanguage,
      crops: primaryCrops.map((cName, idx) => ({
        id: `crop-${idx}-${cName.toLowerCase()}`,
        cropName: cName,
        sowingDate: new Date().toISOString().split("T")[0],
        acreage: Number((landSizeAcres / primaryCrops.length).toFixed(1)),
        stage: "VEGETATIVE",
      })),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        status: "success",
        data: defaultProfile,
        message: "Farmer profile successfully updated.",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Profile update failed";
    return NextResponse.json(
      {
        status: "error",
        code: "PROFILE_UPDATE_FAILED",
        message: "Failed to update profile. Please try again.",
        details: process.env.NODE_ENV === "development" ? message : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
