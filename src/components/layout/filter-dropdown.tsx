"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { technologies, Technology } from "@/constants/tech-stacks";
import { AnimatePresence, motion } from "motion/react";
import { useTechFilter } from "@/hooks/use-tech-filter";
import { TechStackBadge } from "../ui/tech-stack-badge";
import { enterExitAnimationNoY } from "@/constants/exit-animation";

export function FilterDropdown() {
  const [open, setOpen] = React.useState(false);
  const { techFilter, resetTechFilter, addTechToFilter, removeTechFromFilter } =
    useTechFilter();

  const handleSelect = (currentValue: string) => {
    if (techFilter.includes(currentValue as Technology)) {
      removeTechFromFilter(currentValue as Technology);
    } else {
      addTechToFilter(currentValue as Technology);
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between mt-2 mb-4"
          >
            Highlight technologies
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <motion.div className="flex items-center flex-wrap pb-2" layout>
          <AnimatePresence>
            {techFilter.map((tech) => (
              <motion.div
                key={tech}
                layoutId={tech}
                {...enterExitAnimationNoY}
                initial={{
                  ...enterExitAnimationNoY.initial,
                  height: 0,
                }}
                animate={{
                  ...enterExitAnimationNoY.animate,
                  height: "auto",
                }}
                exit={{ ...enterExitAnimationNoY.exit, height: 0 }}
              >
                <TechStackBadge technology={tech} className="mr-2" />
                <div className="h-2"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {techFilter.length > 0 && (
            <motion.div
              {...enterExitAnimationNoY}
              initial={{ ...enterExitAnimationNoY.initial, height: 0 }}
              animate={{ ...enterExitAnimationNoY.animate, height: "auto" }}
              exit={{ ...enterExitAnimationNoY.exit, height: 0 }}
              onClick={resetTechFilter}
            >
              <div className="flex items-center gap-2 cursor-pointer bg-destructive/10 rounded-lg border border-destructive/70 text-destructive px-2.5 py-1.5 hover:bg-destructive/20 hover:border-destructive/80 transition-colors">
                <X size={20} /> Clear
              </div>
              <div className="w-full bg-transparent h-4"></div>
            </motion.div>
          )}
        </AnimatePresence>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search technology" className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {Object.entries(technologies).map(([tech, Icon]) => (
                  <CommandItem
                    key={tech}
                    value={tech}
                    onSelect={handleSelect}
                    className={cn("cursor-pointer")}
                  >
                    <Icon />
                    {tech}
                    <Check
                      className={cn(
                        "ml-auto",
                        techFilter.includes(tech as Technology)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
