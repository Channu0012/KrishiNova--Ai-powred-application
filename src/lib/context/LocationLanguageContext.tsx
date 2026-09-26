"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface AgriculturalHub {
  id: string;
  name: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  primaryCrop: string;
  apmcMandiName: string;
}

export const SUPPORTED_AGRICULTURAL_HUBS: AgriculturalHub[] = [
  {
    id: "nashik-mh",
    name: "Nashik, Maharashtra",
    district: "Nashik",
    state: "Maharashtra",
    latitude: 20.0059,
    longitude: 73.7997,
    primaryCrop: "Tomato",
    apmcMandiName: "Nashik APMC",
  },
  {
    id: "pune-mh",
    name: "Pune, Maharashtra",
    district: "Pune",
    state: "Maharashtra",
    latitude: 18.5204,
    longitude: 73.8567,
    primaryCrop: "Onion",
    apmcMandiName: "Pune (Gultekdi) APMC",
  },
  {
    id: "nagpur-mh",
    name: "Nagpur, Maharashtra",
    district: "Nagpur",
    state: "Maharashtra",
    latitude: 21.1458,
    longitude: 79.0882,
    primaryCrop: "Cotton",
    apmcMandiName: "Nagpur Kalamna APMC",
  },
  {
    id: "belagavi-ka",
    name: "Belagavi, Karnataka",
    district: "Belagavi",
    state: "Karnataka",
    latitude: 15.8497,
    longitude: 74.4977,
    primaryCrop: "Sugarcane",
    apmcMandiName: "Belgaum APMC",
  },
  {
    id: "indore-mp",
    name: "Indore, Madhya Pradesh",
    district: "Indore",
    state: "Madhya Pradesh",
    latitude: 22.7196,
    longitude: 75.8577,
    primaryCrop: "Soybean",
    apmcMandiName: "Indore Choithram APMC",
  },
  {
    id: "ludhiana-pb",
    name: "Ludhiana, Punjab",
    district: "Ludhiana",
    state: "Punjab",
    latitude: 30.9010,
    longitude: 75.8573,
    primaryCrop: "Wheat",
    apmcMandiName: "Ludhiana New Grain Market",
  },
  {
    id: "kurnool-ap",
    name: "Kurnool, Andhra Pradesh",
    district: "Kurnool",
    state: "Andhra Pradesh",
    latitude: 15.8281,
    longitude: 78.0373,
    primaryCrop: "Chilli",
    apmcMandiName: "Kurnool APMC",
  },
  {
    id: "varanasi-up",
    name: "Varanasi, Uttar Pradesh",
    district: "Varanasi",
    state: "Uttar Pradesh",
    latitude: 25.3176,
    longitude: 82.9739,
    primaryCrop: "Paddy",
    apmcMandiName: "Varanasi Mandi Samiti",
  },
];

export type SupportedLanguage = "EN" | "HI" | "MR" | "KN" | "TE";

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  EN: {
    // Nav
    "nav.dashboard": "Dashboard",
    "nav.weather": "Weather & Spray",
    "nav.markets": "Mandi Rates",
    "nav.crop_diagnostic": "Crop Diagnostic",
    "nav.ai_assistant": "AI Assistant",
    "nav.schemes": "Govt Schemes",
    "nav.profile": "Farmer Profile",
    "nav.signin": "Sign In",
    "nav.signout": "Sign Out",
    "nav.active_hub": "Active Hub",
    // Hero
    "hero.badge": "AWS-Powered Agricultural Intelligence Platform",
    "hero.title": "Weather, market prices and agricultural guidance in one place.",
    "hero.subtitle": "KrishiNova connects Indian farmers directly with hyper-local spray feasibility, official Agmarknet mandi commodity rates, verified government welfare schemes, and computer vision plant disease diagnostics.",
    "hero.cta_dashboard": "Launch Farm Dashboard",
    "hero.cta_explore": "Explore System Capabilities",
    "hero.trust_badge": "Zero Synthetic Data: 100% Verified Open Government Feeds",
    // Location modal
    "location.title": "Select Agricultural Hub",
    "location.subtitle": "Change your active region to update meteorological spray models and primary APMC mandi auctions.",
  },
  HI: {
    // Nav
    "nav.dashboard": "डैशबोर्ड",
    "nav.weather": "मौसम व छिड़काव",
    "nav.markets": "मंडी भाव",
    "nav.crop_diagnostic": "फसल रोग जांच",
    "nav.ai_assistant": "एआई सलाहकार",
    "nav.schemes": "सरकारी योजनाएं",
    "nav.profile": "किसान प्रोफाइल",
    "nav.signin": "लॉग इन",
    "nav.signout": "लॉग आउट",
    "nav.active_hub": "सक्रिय केंद्र",
    // Hero
    "hero.badge": "एडब्ल्यूएस संचालित कृषि बुद्धिमत्ता मंच",
    "hero.title": "मौसम, मंडी भाव और कृषि सलाह — सब एक ही स्थान पर।",
    "hero.subtitle": "कृषिनोवा भारतीय किसानों को सटीक मौसम छिड़काव खिड़की, आधिकारिक एगमार्कनेट मंडी दरें, सत्यापित सरकारी कल्याण योजनाएं और कंप्यूटर विज़न फसल रोग पहचान से जोड़ता है।",
    "hero.cta_dashboard": "कृषि डैशबोर्ड खोलें",
    "hero.cta_explore": "सुविधाओं की जानकारी देखें",
    "hero.trust_badge": "सटीक आंकड़े: शून्य फर्जी डेटा नीति, पूर्णतः सरकारी डेटा स्रोत",
    // Location modal
    "location.title": "कृषि क्षेत्र चुनें",
    "location.subtitle": "मौसम मॉडल और मुख्य एपीएमसी मंडी भाव अपडेट करने के लिए अपना क्षेत्र बदलें।",
  },
  MR: {
    // Nav
    "nav.dashboard": "डॅशबोर्ड",
    "nav.weather": "हवामान व फवारणी",
    "nav.markets": "बाजार भाव",
    "nav.crop_diagnostic": "पीक रोग निदान",
    "nav.ai_assistant": "एआय कृषी सल्लागार",
    "nav.schemes": "शासकीय योजना",
    "nav.profile": "शेतकरी प्रोफाईल",
    "nav.signin": "लॉग इन",
    "nav.signout": "लॉग आउट",
    "nav.active_hub": "सक्रिय केंद्र",
    // Hero
    "hero.badge": "एडब्ल्यूएस समर्थित कृषी बुद्धिमत्ता प्लॅटफॉर्म",
    "hero.title": "हवामान, बाजारभाव आणि पीक मार्गदर्शन — एकाच ठिकाणी.",
    "hero.subtitle": "कृषिनोव्हा भारतीय शेतकऱ्यांना थेट अचूक फवारणी वेळ, अधिकृत ॲगमार्कनेट बाजारभाव, पडताळणी केलेल्या सरकारी योजना आणि कॉम्प्युटर व्हिजन रोग निदानाशी जोडते.",
    "hero.cta_dashboard": "शेतकरी डॅशबोर्ड सुरू करा",
    "hero.cta_explore": "वैशिष्ट्ये जाणून घ्या",
    "hero.trust_badge": "१००% सत्य माहिती: शून्य बनावट आकडे, अधिकृत सरकारी डेटा",
    // Location modal
    "location.title": "कृषी विभाग निवडा",
    "location.subtitle": "स्थानिक हवामान आणि एपीएमसी बाजारभाव अद्ययावत करण्यासाठी आपला जिल्हा निवडा.",
  },
  KN: {
    "nav.dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "nav.weather": "ಹವಾಮಾನ ಮತ್ತು ಸಿಂಪಡಣೆ",
    "nav.markets": "ಮಾರುಕಟ್ಟೆ ದರಗಳು",
    "nav.crop_diagnostic": "ಬೆಳೆ ರೋಗ ಪರೀಕ್ಷೆ",
    "nav.ai_assistant": "ಎಐ ಕೃಷಿ ಸಲಹೆಗಾರ",
    "nav.schemes": "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
    "nav.profile": "ರೈತ ಪ್ರೊಫೈಲ್",
    "nav.signin": "ಸೈನ್ ಇನ್",
    "nav.signout": "ಸೈನ್ ಔಟ್",
    "nav.active_hub": "ಸಕ್ರಿಯ ಕೇಂದ್ರ",
    "hero.badge": "ಎಡಬ್ಲ್ಯೂಎಸ್ ಆಧಾರಿತ ಕೃಷಿ ಇಂಟೆಲಿಜೆನ್ಸ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್",
    "hero.title": "ಹವಾಮಾನ, ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಮತ್ತು ಕೃಷಿ ಮಾರ್ಗದರ್ಶನ ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ.",
    "hero.subtitle": "ಕೃಷಿನೋವಾ ರೈತರಿಗೆ ಸ್ಥಳೀಯ ಸಿಂಪಡಣೆ ಸಮಯ, ಅಧಿಕೃತ ಎಗ್ಮಾರ್ಕ್‌ನೆಟ್ ಮಾರುಕಟ್ಟೆ ದರಗಳು ಮತ್ತು ಬೆಳೆ ರೋಗ ಪತ್ತೆಯನ್ನು ಒದಗಿಸುತ್ತದೆ.",
    "hero.cta_dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ತೆರೆಯಿರಿ",
    "hero.cta_explore": "ವಿವರಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
    "hero.trust_badge": "100% ದೃಢೀಕೃತ ಸರ್ಕಾರಿ ಡೇಟಾ",
    "location.title": "ಕೃಷಿ ಕೇಂದ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    "location.subtitle": "ಸ್ಥಳೀಯ ಹವಾಮಾನ ಮತ್ತು ಮಂಡಿ ದರಗಳನ್ನು ನವೀಕರಿಸಲು ನಿಮ್ಮ ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
  },
  TE: {
    "nav.dashboard": "డాష్‌బోర్డ్",
    "nav.weather": "వాతావరణం & స్ప్రే సమయం",
    "nav.markets": "మార్కెట్ ధరలు",
    "nav.crop_diagnostic": "పంట వ్యాధి నిర్ధారణ",
    "nav.ai_assistant": "ఏఐ వ్యవసాయ సలహాదారు",
    "nav.schemes": "ప్రభుత్వ పథకాలు",
    "nav.profile": "రైతు ప్రొఫైల్",
    "nav.signin": "సైన్ ఇన్",
    "nav.signout": "సైన్ అవుట్",
    "nav.active_hub": "క్రియాశీల కేంద్రం",
    "hero.badge": "ఏడబ్ల్యూఎస్ ఆధారిత వ్యవసాయ ఇంటెలిజెన్స్ ప్లాట్‌ఫారమ్",
    "hero.title": "వాతావరణం, మార్కెట్ ధరలు మరియు వ్యవసాయ సలహాలు ఒకే చోట.",
    "hero.subtitle": "కృషినోవా భారతీయ రైతులకు కచ్చితమైన స్ప్రే విండో, అధికారిక అగ్‌మార్క్‌నెట్ మార్కెట్ ధరలు మరియు పంట వ్యాధి నిర్ధారణను అందిస్తుంది.",
    "hero.cta_dashboard": "రైతు డాష్‌బోర్డ్ తెరవండి",
    "hero.cta_explore": "సదుపాయాలు తెలుసుకోండి",
    "hero.trust_badge": "100% ధృవీకరించబడిన ప్రభుత్వ డేటా",
    "location.title": "వ్యవసాయ కేంద్రాన్ని ఎంచుకోండి",
    "location.subtitle": "స్థానిక వాతావరణం మరియు మార్కెట్ ధరలను నవీకరించడానికి మీ జిల్లాను ఎంచుకోండి.",
  },
};

interface LocationLanguageContextType {
  activeHub: AgriculturalHub;
  setActiveHub: (hub: AgriculturalHub) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  t: (key: string) => string;
}

const LocationLanguageContext = createContext<LocationLanguageContextType | undefined>(undefined);

export function LocationLanguageProvider({ children }: { children: React.ReactNode }) {
  const [activeHub, setActiveHubState] = useState<AgriculturalHub>(SUPPORTED_AGRICULTURAL_HUBS[0]);
  const [language, setLanguageState] = useState<SupportedLanguage>("EN");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    try {
      const storedHubId = localStorage.getItem("krishinova_active_hub");
      if (storedHubId) {
        const found = SUPPORTED_AGRICULTURAL_HUBS.find((h) => h.id === storedHubId);
        if (found) setActiveHubState(found);
      }
      const storedLang = localStorage.getItem("krishinova_language") as SupportedLanguage;
      if (storedLang && TRANSLATIONS[storedLang]) {
        setLanguageState(storedLang);
      }
    } catch (e) {
      console.warn("Storage sync failed", e);
    }
  }, []);

  const setActiveHub = (hub: AgriculturalHub) => {
    setActiveHubState(hub);
    try {
      localStorage.setItem("krishinova_active_hub", hub.id);
      document.cookie = `krishinova_location=${encodeURIComponent(hub.district)}; path=/; max-age=2592000; SameSite=Lax`;
    } catch (e) {
      console.warn("Could not persist hub", e);
    }
  };

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("krishinova_language", lang);
      document.cookie = `krishinova_language=${lang}; path=/; max-age=2592000; SameSite=Lax`;
    } catch (e) {
      console.warn("Could not persist language", e);
    }
  };

  const t = (key: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.EN;
    return dict[key] || TRANSLATIONS.EN[key] || key;
  };

  return (
    <LocationLanguageContext.Provider
      value={{
        activeHub,
        setActiveHub,
        language,
        setLanguage,
        isLocationModalOpen,
        setIsLocationModalOpen,
        t,
      }}
    >
      {children}
    </LocationLanguageContext.Provider>
  );
}

export function useLocationLanguage() {
  const context = useContext(LocationLanguageContext);
  if (!context) {
    throw new Error("useLocationLanguage must be used within LocationLanguageProvider");
  }
  return context;
}
