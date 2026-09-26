"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserSession {
  userId: string;
  fullName: string;
  email: string;
  state: string;
  district: string;
  role: "farmer" | "agronomist" | "admin";
  token: string;
}

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string, 
    password?: string, 
    profileData?: { fullName?: string; state?: string; district?: string }
  ) => Promise<boolean>;
  demoLogin: () => void;
  logout: () => void;
}

const DEFAULT_DEMO_USER: UserSession = {
  userId: "usr_farmer_001",
  fullName: "Ramesh Patil",
  email: "ramesh.patil@krishinova.in",
  state: "Maharashtra",
  district: "Nashik",
  role: "farmer",
  token: "demo_jwt_token_krishinova_2026",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from cookie / localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("krishinova_session");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch (e) {
      console.warn("Could not read auth session from storage", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (
    email: string, 
    password?: string, 
    profileData?: { fullName?: string; state?: string; district?: string }
  ): Promise<boolean> => {
    setIsLoading(true);
    // Simulate authentication verification
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // In preview/hackathon mode, allow any valid email + 6 char password
    const newUser: UserSession = {
      userId: `usr_${Date.now()}`,
      fullName: profileData?.fullName?.trim() || email.split("@")[0].replace(".", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      state: profileData?.state || "Maharashtra",
      district: profileData?.district || "Nashik",
      role: "farmer",
      token: `jwt_${Date.now()}`,
    };

    setUser(newUser);
    try {
      localStorage.setItem("krishinova_session", JSON.stringify(newUser));
      document.cookie = `krishinova_session=${newUser.token}; path=/; max-age=604800; SameSite=Lax`;
    } catch (e) {
      console.warn("Could not persist session", e);
    }
    setIsLoading(false);
    return true;
  };

  const demoLogin = () => {
    setUser(DEFAULT_DEMO_USER);
    try {
      localStorage.setItem("krishinova_session", JSON.stringify(DEFAULT_DEMO_USER));
      document.cookie = `krishinova_session=${DEFAULT_DEMO_USER.token}; path=/; max-age=604800; SameSite=Lax`;
    } catch (e) {
      console.warn("Could not persist demo session", e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("krishinova_session");
      document.cookie = "krishinova_session=; path=/; max-age=0; SameSite=Lax";
    } catch (e) {
      console.warn("Could not clear session", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        demoLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
