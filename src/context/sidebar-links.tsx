"use client";

import { createContext, useCallback, useContext, useState } from "react";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn, slugify } from "@/lib/utils";
import { motion } from "motion/react";
import { type SidebarItem, sidebarItems } from "@/constants/sidebar-links";
import { SidebarHighlight } from "@/components/layout/sidebar-highlight";
import { enterExitAnimationNoY } from "@/constants/exit-animation";
import { useSearchParams } from "next/navigation";

type SidebarLinksContextType = {
  inView: string;
  setInView: React.Dispatch<React.SetStateAction<string>>;
  lastNavigation: string | null;
  setLastNavigation: React.Dispatch<React.SetStateAction<string | null>>;
  sidebarLinks: SidebarItem[];
  setSidebarLinks: (sidebarLinks: SidebarItem[]) => void;
};

export const SidebarLinksContext = createContext<SidebarLinksContextType>({
  inView: "about",
  setInView: () => {},
  lastNavigation: "about",
  setLastNavigation: () => {},
  sidebarLinks: sidebarItems,
  setSidebarLinks: () => {},
});

export function useSidebarLinks() {
  return useContext(SidebarLinksContext);
}

const MotionSidebarMenuItem = motion.create(SidebarMenuItem);

export function SidebarLinks() {
  const { isMobile, setOpenMobile } = useSidebar();
  const { setLastNavigation, sidebarLinks } = useSidebarLinks();

  const searchParams = useSearchParams();
  const searchParamsStr = searchParams.toString();
  const searchParamsFmt =
    searchParamsStr.length > 0 ? `?${searchParamsStr}` : "";

  const handleClick = (id: string) => () => {
    if (isMobile) {
      setOpenMobile(false);
    }

    setLastNavigation(id);
  };

  return (
    <>
      <SidebarHighlight />
      {sidebarLinks.map((item) => (
        <MotionSidebarMenuItem key={item.title} {...enterExitAnimationNoY}>
          <SidebarMenuButton
            tabIndex={0}
            asChild
            className={cn(
              "h-10 px-4 transition-colors hover:bg-primary/25 dark:hover:bg-primary/15  active:bg-primary/15 dark:active:bg-primary/10",
              { "pl-8": item.isSubheading },
            )}
            // Remove the hash from the href
            onClick={handleClick(item.href.slice(1, item.href.length))}
          >
            <Link href={searchParamsFmt + item.href}>
              {item.icon && <item.icon className="mr-2" />}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </MotionSidebarMenuItem>
      ))}
    </>
  );
}

export function SidebarLinksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inView, setInView] = useState("about");
  const [lastNavigation, setLastNavigation] = useState<string | null>(null);
  const [sidebarLinks, setSidebarLinks] = useState(sidebarItems);

  const handleSidebarLinks = useCallback((sidebarLinks: SidebarItem[]) => {
    setSidebarLinks(sidebarLinks);
    setInView(slugify(sidebarLinks[0].title));
  }, []);

  return (
    <SidebarLinksContext.Provider
      value={{
        inView: inView,
        lastNavigation: lastNavigation,
        setInView,
        setLastNavigation,
        sidebarLinks,
        setSidebarLinks: handleSidebarLinks,
      }}
    >
      {children}
    </SidebarLinksContext.Provider>
  );
}
