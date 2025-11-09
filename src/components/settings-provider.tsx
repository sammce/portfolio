"use client";

import { type Settings, SettingsContext } from "@/context/settings";
import { useEffect, useState } from "react";

export const settingsLocalStorageKey = "settings";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({
    shouldRush: null,
  });

  useEffect(() => {
    const storedSettings = localStorage.getItem(settingsLocalStorageKey);
    if (storedSettings) {
      // eslint-disable-next-line
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  const saveSettings = (newSettings: Settings) => {
    localStorage.setItem(settingsLocalStorageKey, JSON.stringify(newSettings));
  };

  const updateShouldRush = (shouldRush: boolean | null) => {
    setSettings((prev) => ({
      ...prev,
      shouldRush,
    }));

    saveSettings({
      ...settings,
      shouldRush,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        startRushing: () => updateShouldRush(true),
        stopRushing: () => updateShouldRush(false),
        resetRushing: () => updateShouldRush(null),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
