"use client";

import { SidebarItem } from "@/constants/sidebar-links";
import { useSidebarLinks } from "@/context/sidebar-links";
import { slugify } from "@/lib/utils";
import { Children, useEffect } from "react";

export function OnThisPage({ children }: { children: React.ReactNode }) {
  const { setSidebarLinks } = useSidebarLinks();

  useEffect(() => {
    const links: SidebarItem[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Children.forEach<any>(children, (child) => {
      if (!child?.props?.id || !child?.props?.href) return;

      links.push({
        title: child?.props?.children,
        href: `#${slugify(child?.props?.children)}`,
        isSubheading: child?.props?.isSubheading,
      });
    });

    setSidebarLinks(links);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSidebarLinks]);

  return <>{children}</>;
}
