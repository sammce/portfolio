import { createContext } from "react";

export type Settings = {
  shouldRush: boolean | null;
};

type SettingsContextType = Settings & {
  startRushing: () => void;
  stopRushing: () => void;
  resetRushing: () => void;
};

export const SettingsContext = createContext<SettingsContextType>({
  shouldRush: null,
  startRushing: () => {},
  stopRushing: () => {},
  resetRushing: () => {},
});
