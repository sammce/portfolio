"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserAgent } from "@/hooks/use-user-agent";
import { Kbd, KbdGroup } from "../ui/kbd";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";

export function SidebarToggle() {
  const { platform } = useUserAgent();
  const { showInsetExpanded } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger asChild tabIndex={0}>
        <SidebarTrigger
          className="left-6 p-4 top-4 fixed z-50"
          variant={showInsetExpanded ? "ghost" : "glass"}
        />
      </TooltipTrigger>
      <TooltipContent className="items-center space-x-1">
        <p>Toggle sidebar</p>
        <KbdGroup>
          <Kbd>{platform === "macOS" ? "⌘" : "^"}</Kbd>
          <Kbd>b</Kbd>
        </KbdGroup>
      </TooltipContent>
    </Tooltip>
  );
}
