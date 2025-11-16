"use client";

import { sidebarItems } from "@/constants/sidebar-links";
import { useSidebarLinks } from "@/context/sidebar-links";
import { useEffect, useRef } from "react";

export function SidebarLinksListener() {
  const didMount = useRef(false);
  const { setSidebarLinks } = useSidebarLinks();

  useEffect(() => {
    if (!didMount.current) {
      setSidebarLinks(sidebarItems);
      didMount.current = true;
    }
  }, [setSidebarLinks]);

  return null;
}
