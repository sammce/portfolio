"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { motion } from "motion/react";
import Link from "next/link";
import { SidebarLinks } from "@/context/sidebar-links";
import { FilterDropdown } from "./filter-dropdown";

export function AppSidebar() {
  return (
    <Sidebar variant="inset" className="p-0">
      <SidebarHeader className="w-full flex items-center justify-center overflow-hidden mt-1.5">
        <Link href="/">
          <motion.h1 className="text-2xl tracking-tight font-semibold text-primary">
            {"{"}
            <span className="text-foreground">sammce</span>
            {"}"}
          </motion.h1>
        </Link>
      </SidebarHeader>
      <SidebarSeparator className=" mt-3 ml-0" />
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent className="pb-20">
            <FilterDropdown />
            <p className="text-muted-foreground mt-4">On this page</p>
            <SidebarMenu className="space-y-2 mt-4 relative">
              <SidebarLinks />
            </SidebarMenu>
            <div className="fixed hidden md:block z-50 w-(--sidebar-width) left-0 bottom-[calc(var(--spacing)*40+1rem)] h-20 bg-linear-to-t from-footer to-80% to-transparent pointer-events-none"></div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
