"use client";

import { createContext, useCallback, useState } from "react";
import type { Technology } from "@/constants/tech-stacks";
import { useRouter, useSearchParams } from "next/navigation";

type TechFilterContextType = {
  techFilter: Technology[];
  addTechToFilter: (tech: Technology) => void;
  removeTechFromFilter: (tech: Technology) => void;
  resetTechFilter: () => void;
};

export const TechFilterContext = createContext<TechFilterContextType>({
  techFilter: [],
  addTechToFilter: () => {},
  removeTechFromFilter: () => {},
  resetTechFilter: () => {},
});

export const TechFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [techFilter, setTechFilter] = useState<Technology[]>(
    (searchParams.get("filter")?.split(",") || []) as Technology[],
  );

  const addTechToSearchParams = useCallback(
    (tech: Technology) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      const currentTech = newSearchParams.get("filter");

      newSearchParams.set(
        "filter",
        currentTech ? `${currentTech},${tech}` : tech,
      );

      router.replace(`?${newSearchParams.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  const removeTechFromSearchParams = useCallback(
    (tech: Technology) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      const filterWithoutTech = newSearchParams
        .get("filter")
        ?.split(",")
        .filter((t) => t !== tech);

      if (!filterWithoutTech || filterWithoutTech.length === 0) {
        newSearchParams.delete("filter");
      } else {
        newSearchParams.set("filter", filterWithoutTech.join(","));
      }

      router.replace(`?${newSearchParams.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  const addTechToFilter = (tech: Technology) => {
    setTechFilter([...techFilter, tech]);

    addTechToSearchParams(tech);
  };

  const removeTechFromFilter = (tech: Technology) => {
    setTechFilter(techFilter.filter((t) => t !== tech));

    removeTechFromSearchParams(tech);
  };

  const resetTechFilter = () => {
    setTechFilter([]);
  };

  return (
    <TechFilterContext.Provider
      value={{
        techFilter,
        addTechToFilter,
        removeTechFromFilter,
        resetTechFilter,
      }}
    >
      {children}
    </TechFilterContext.Provider>
  );
};
