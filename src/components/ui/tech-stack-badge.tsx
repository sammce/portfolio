"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { technologies, type Technology } from "@/constants/tech-stacks";
import { useTechFilter } from "@/hooks/use-tech-filter";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { useCallback } from "react";

export type TechStackBadgeProps = {
  technology: Technology;
  iconSize?: number;
  showFilterTooltip?: boolean;
};

export function TechStackBadge({
  technology,
  iconSize = 20,
  showFilterTooltip = true,
}: TechStackBadgeProps) {
  const Icon = technologies[technology].icon;

  const { techFilter, addTechToFilter, removeTechFromFilter } = useTechFilter();

  const isInFilter = techFilter.includes(technology);

  const handleClick = useCallback(() => {
    if (isInFilter) {
      removeTechFromFilter(technology);
    } else {
      addTechToFilter(technology);
    }
  }, [addTechToFilter, isInFilter, removeTechFromFilter, technology]);

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          "flex items-center space-x-1.5 hover:bg-primary/15 bg-card px-2.5 py-1.5 rounded-full border border-input cursor-pointer transition-colors",
          {
            "bg-primary/20 dark:bg-primary/20 border-primary shadow-md shadow-primary/15":
              isInFilter,
          },
        )}
        onClick={handleClick}
      >
        <Icon size={iconSize} />
        <span className="text-sm tracking-tight font-semibold dark:font-bold">
          {technology}
        </span>
      </TooltipTrigger>
      <TooltipContent
        hidden={!showFilterTooltip}
        className={cn(
          "flex items-center gap-2",
          {
            "bg-red-50 dark:bg-[#290e0c] border border-red-600/50 dark:border-red-400/30 text-destructive":
              isInFilter,
          },
          {
            "bg-green-50 dark:bg-[#0f1d13] border border-green-600/50 dark:border-green-400/30 text-primary":
              !isInFilter,
          },
        )}
      >
        {isInFilter ? (
          <>
            <X className="text-destructive" size={16} /> Remove from
          </>
        ) : (
          <>
            <Plus className="text-primary" size={16} />
            Add to
          </>
        )}{" "}
        filter
      </TooltipContent>
    </Tooltip>
  );
}
