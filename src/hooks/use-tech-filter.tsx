import { TechFilterContext } from "@/context/tech-filter";
import { useContext } from "react";

export function useTechFilter() {
  return useContext(TechFilterContext);
}
