"use client";

import { createContext, useContext, useState } from "react";

import { Box, BriefcaseBusiness, Code, User } from "lucide-react";

export const sidebarItems = [
  {
    title: "About",
    href: "#about",
    icon: User,
  },
  {
    title: "Projects",
    href: "#projects",
    icon: Code,
  },
  {
    title: "Experience",
    href: "#experience",
    icon: BriefcaseBusiness,
  },
  {
    title: "Technologies",
    href: "#technologies",
    icon: Box,
  },
];

type SidebarLinksContextType = {
  inView: string;
  setInView: React.Dispatch<React.SetStateAction<string>>;
  lastNavigation: string | null;
  setLastNavigation: React.Dispatch<React.SetStateAction<string | null>>;
};

export const SidebarLinksContext = createContext<SidebarLinksContextType>({
  inView: "about",
  setInView: () => {},
  lastNavigation: "about",
  setLastNavigation: () => {},
});

export function useSidebarLinks() {
  return useContext(SidebarLinksContext);
}

export function SidebarLinksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inView, setInView] = useState("about");
  const [lastNavigation, setLastNavigation] = useState<string | null>(null);

  return (
    <SidebarLinksContext.Provider
      value={{
        inView: inView,
        lastNavigation: lastNavigation,
        setInView,
        setLastNavigation,
      }}
    >
      {children}
    </SidebarLinksContext.Provider>
  );
}
