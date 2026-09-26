"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, MapPin, Sprout, Droplets, CheckCircle, AlertCircle, LogOut } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FarmerProfile } from "@/types/profile";
import { INDIAN_AGRICULTURAL_REGIONS, MAJOR_CROPS } from "@/lib/utils/constants";
import { useAuth } from "@/lib/auth/AuthContext";

interface ProfileFormProps {
  onProfileUpdated?: (updated: FarmerProfile) => void;
}

export function ProfileForm({ onProfileUpdated }: ProfileFormProps) {
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [fullName, setFullName] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [district, setDistrict] = useState("Nashik");
  const [taluka, setTaluka] = useState("");
  const [landSizeAcres, setLandSizeAcres] = useState(3.5);
  const [soilType, setSoilType] = useState<FarmerProfile["soilType"]>("BLACK_COTTON");
  const [irrigationMode, setIrrigationMode] = useState<FarmerProfile["irrigationMode"]>("DRIP");
  const [preferredLanguage, setPreferredLanguage] = useState("en");
  const [selectedCrops, setSelectedCrops] = useState<string[]>(["Tomato", "Onion"]);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile");
        const json = await res.json();
        if (json.status === "success" && json.data) {
          const p: FarmerProfile = json.data;
          setProfile(p);
          setFullName(p.fullName);
          setState(p.state);
          setDistrict(p.district);
          setTaluka(p.taluka || "");
          setLandSizeAcres(p.landSizeAcres);
          setSoilType(p.soilType);
          setIrrigationMode(p.irrigationMode);
          setPreferredLanguage(p.preferredLanguage);
          setSelectedCrops(p.crops.map((c) => c.cropName));
        }
      } catch (err) {
        console.warn("Failed to load initial profile:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleStateChange = (newState: string) => {
    setState(newState);
    const stateObj = INDIAN_AGRICULTURAL_REGIONS.find((s) => s.state === newState);
    if (stateObj && stateObj.districts.length > 0) {
      setDistrict(stateObj.districts[0].name);
    }
  };

  const handleCropToggle = (cropName: string) => {
    if (selectedCrops.includes(cropName)) {
      if (selectedCrops.length > 1) {
        setSelectedCrops(selectedCrops.filter((c) => c !== cropName));
      }
    } else {
      setSelectedCrops([...selectedCrops, cropName]);
    }
  };

  const router = useRouter();
  const { logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    // Form content validation
    if (!fullName.trim()) {
      setError("Please provide your full farmer name.");
      setSaving(false);
      return;
    }

    if (landSizeAcres <= 0 || landSizeAcres > 10000) {
      setError("Land size must be between 0.1 and 10,000 acres.");
      setSaving(false);
      return;
    }

    if (selectedCrops.length === 0) {
      setError("Please select at least one active crop in your portfolio.");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          state,
          district,
          taluka: taluka.trim(),
          landSizeAcres: Number(landSizeAcres),
          soilType,
          irrigationMode,
          preferredLanguage,
          primaryCrops: selectedCrops,
        }),
      });

      const json = await res.json();
      if (!res.ok || json.status !== "success") {
        throw new Error(json.message || "Failed to update profile");
      }

      setProfile(json.data);
      setSuccessMessage("Farm profile and parameters successfully saved!");
      if (onProfileUpdated) {
        onProfileUpdated(json.data);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Save failed";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const availableDistricts =
    INDIAN_AGRICULTURAL_REGIONS.find((s) => s.state === state)?.districts || [];

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle>
          <User className="w-5 h-5 text-emerald-800" aria-hidden="true" />
          <span>Farmer Profile & Agricultural Parameters</span>
        </CardTitle>
        <Badge variant="neutral">Verified Farmer Account</Badge>
      </CardHeader>

      <CardContent>
        {successMessage && (
          <div className="mb-5 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Personal Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Registered Contact / Email
              </label>
              <input
                type="text"
                disabled
                value={profile?.email || "ramesh.patil@krishinova.in"}
                className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Location Parameters */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>Geographic Location</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">State</label>
                <select
                  value={state}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium"
                >
                  {INDIAN_AGRICULTURAL_REGIONS.map((st) => (
                    <option key={st.state} value={st.state}>
                      {st.state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium"
                >
                  {availableDistricts.map((d) => (
                    <option key={d.name} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Taluka / Tehsil</label>
                <input
                  type="text"
                  value={taluka}
                  onChange={(e) => setTaluka(e.target.value)}
                  placeholder="e.g. Niphad"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>
          </div>

          {/* Farm Specification */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sprout className="w-3.5 h-3.5 text-emerald-700" />
              <span>Farm Land & Irrigation</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Land Size (Acres)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="5000"
                  required
                  value={landSizeAcres}
                  onChange={(e) => setLandSizeAcres(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Soil Type</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value as FarmerProfile["soilType"])}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium"
                >
                  <option value="BLACK_COTTON">Black Cotton Soil (Regur)</option>
                  <option value="ALLUVIAL">Alluvial Soil</option>
                  <option value="RED_LOAM">Red Loam Soil</option>
                  <option value="SANDY_LOAM">Sandy Loam</option>
                  <option value="CLAY">Heavy Clay</option>
                  <option value="LATERITE">Laterite Soil</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Irrigation Mode
                </label>
                <select
                  value={irrigationMode}
                  onChange={(e) => setIrrigationMode(e.target.value as FarmerProfile["irrigationMode"])}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium"
                >
                  <option value="DRIP">Drip Micro-Irrigation</option>
                  <option value="SPRINKLER">Sprinkler System</option>
                  <option value="BOREWELL">Borewell / Tube Well</option>
                  <option value="FLOOD_CANAL">Canal / Surface Flood</option>
                  <option value="RAINFED">Rainfed (Dryland)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Primary Crops Cultivated */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Primary Cultivated Crops (Select all that apply)
              </label>
              <span className="text-[11px] text-slate-500">
                {selectedCrops.length} crop{selectedCrops.length > 1 ? "s" : ""} active
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {MAJOR_CROPS.map((c) => {
                const isChecked = selectedCrops.includes(c.name);
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => handleCropToggle(c.name)}
                    className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-colors ${
                      isChecked
                        ? "bg-emerald-50 text-emerald-900 border-emerald-500 font-semibold"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{c.name}</span>
                      {isChecked && <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/auth/login");
              }}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out of Account</span>
            </button>

            <Button type="submit" size="md" variant="primary" isLoading={saving}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
