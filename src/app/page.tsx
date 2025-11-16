"use client";

import { About } from "@/components/atoms/about";
import { Projects } from "@/components/atoms/projects";
import { WorkExperience } from "@/components/atoms/work-experience";
import { sidebarItems } from "@/constants/sidebar-links";
import { useSidebarLinks } from "@/context/sidebar-links";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

export default function LandingPage() {
  const didMount = useRef(false);
  const { setSidebarLinks } = useSidebarLinks();

  useEffect(() => {
    if (!didMount.current) {
      setSidebarLinks(sidebarItems);
      didMount.current = true;
    }
  }, [setSidebarLinks]);

  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col gap-2 max-w-[600px] 2xl:max-w-[750px] min-h-screen mx-auto text-sm mb-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <About />
        <Projects />
        <WorkExperience />
      </motion.div>
    </AnimatePresence>
  );
}
