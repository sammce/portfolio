"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { motion } from "motion/react";
import {} from "lucide-react";
import Link from "next/link";

const menuItems = [
  {
    title: "About",
    href: "#about",
  },
];

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar variant="inset" className="p-0">
      <SidebarHeader className="w-full flex items-center justify-center overflow-hidden mt-1.5">
        <Link href="/">
          <motion.h1 className="text-2xl tracking-tight font-semibold">
            <span>s</span>
            {state === "expanded" && (
              <>
                ammce<span className="text-primary">.dev</span>
              </>
            )}
          </motion.h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
