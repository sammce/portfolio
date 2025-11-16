"use client";

import { createContext, useCallback, useEffect, useRef, useState } from "react";
import type { Technology } from "@/constants/tech-stacks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [techFilter, setTechFilter] = useState<Technology[]>(
    (searchParams.get("filter")?.split(",") || []) as Technology[],
  );

  useEffect(() => {
    const paramStr = techFilter.join("%2C");

    if (paramStr.length === 0) {
      return;
    }

    router.replace(`${pathname}?filter=${paramStr}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const addTechToSearchParams = useCallback(
    (tech: Technology) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      const currentTech = newSearchParams.get("filter");

      newSearchParams.set(
        "filter",
        currentTech ? `${currentTech},${tech}` : tech,
      );

      router.replace(`?${newSearchParams.toString()}`, {
        scroll: false,
      });
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

      router.replace(`?${newSearchParams.toString()}`, {
        scroll: false,
      });
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
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete("filter");
    router.replace(`${window.location.hash}?${newSearchParams.toString()}`, {
      scroll: false,
    });
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
