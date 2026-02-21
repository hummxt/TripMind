"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface ProfileData {
  homeLocation: string;
  defaultBudget: string;
  tastes: string[];
  special: string[];
  allergyDetails: string;
  interests: string[];
  languages: { language: string; level: string }[];
  visited: string[];
  wishlist: string[];
}

const DEFAULT_PROFILE: ProfileData = {
  homeLocation: "",
  defaultBudget: "",
  tastes: [],
  special: [],
  allergyDetails: "",
  interests: [],
  languages: [{ language: "English", level: "B1" }],
  visited: [],
  wishlist: [],
};

const STORAGE_KEY = "tripmind_profile";

interface ProfileContextType {
  profile: ProfileData;
  setProfile: (profile: ProfileData | ((prev: ProfileData) => ProfileData)) => void;
  updateProfile: (partial: Partial<ProfileData>) => void;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<ProfileData>(DEFAULT_PROFILE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<ProfileData>;
        setProfileState({ ...DEFAULT_PROFILE, ...parsed });
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile, loaded]);

  const setProfile = useCallback(
    (value: ProfileData | ((prev: ProfileData) => ProfileData)) => {
      setProfileState(value);
    },
    []
  );

  const updateProfile = useCallback((partial: Partial<ProfileData>) => {
    setProfileState((prev) => ({ ...prev, ...partial }));
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) return { profile: DEFAULT_PROFILE, setProfile: () => {}, updateProfile: () => {} };
  return ctx;
}
