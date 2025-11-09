import { SettingsContext } from "@/context/settings";
import { useContext } from "react";

export function useSettings() {
  return useContext(SettingsContext);
}
