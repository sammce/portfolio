"use client";

import { Settings, ArrowRight, TimerReset } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/hooks/use-settings";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Separator } from "../ui/separator";

export function SettingsDropdown({ className }: { className?: string }) {
  const { shouldRush, resetRushing } = useSettings();

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild className={className}>
            <Button variant="outline" size="icon">
              <Settings className="w-[1.2rem] h-[1.2rem]" />
              <span className="sr-only">Change settings</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Change settings</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="p-2 space-y-2">
        <DropdownMenuItem>
          <ArrowRight /> I&apos;m bored, take me to the end
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem variant="destructive" onClick={resetRushing}>
          <TimerReset />
          Reset experience
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
