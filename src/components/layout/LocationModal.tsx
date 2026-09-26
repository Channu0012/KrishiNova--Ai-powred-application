"use client";

import React from "react";
import { 
  SUPPORTED_AGRICULTURAL_HUBS, 
  useLocationLanguage, 
  AgriculturalHub 
} from "@/lib/context/LocationLanguageContext";
import { MapPin, Check, X, Building2, Sprout } from "lucide-react";

export function LocationModal() {
  const { 
    activeHub, 
    setActiveHub, 
    isLocationModalOpen, 
    setIsLocationModalOpen, 
    t 
  } = useLocationLanguage();

  if (!isLocationModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-modal-title"
    >
      <div 
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 id="location-modal-title" className="text-base font-bold text-slate-900">
                {t("location.title")}
              </h2>
              <p className="text-[11px] text-slate-500">
                {t("location.subtitle")}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsLocationModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {SUPPORTED_AGRICULTURAL_HUBS.map((hub) => {
            const isSelected = activeHub.id === hub.id;
            return (
              <button
                key={hub.id}
                type="button"
                onClick={() => {
                  setActiveHub(hub);
                  setIsLocationModalOpen(false);
                }}
                className={`p-3 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500"
                    : "border-slate-200 hover:border-emerald-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {hub.district}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {hub.state}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <div className="pt-1 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-600">
                  <span className="flex items-center gap-1 text-emerald-800 font-medium">
                    <Sprout className="w-3 h-3" />
                    {hub.primaryCrop}
                  </span>
                  <span className="text-slate-400 truncate max-w-[100px]">
                    {hub.apmcMandiName.replace(" APMC", "")}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Coordinates sync live with Open-Meteo & Agmarknet feeds.</span>
          <button
            type="button"
            onClick={() => setIsLocationModalOpen(false)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
