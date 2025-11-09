"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "../ui/sidebar";
import { AnimatePresence, motion, Transition } from "motion/react";

type MainWrapperProps = {
  children: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transition: Transition<any> = {
  duration: 0.15,
  ease: "easeOut",
};

const motionProps = {
  exit: { top: -30, transition: { duration: 0.1 } },
  initial: { top: -30 },
  animate: { top: 0, transition: { delay: 0.05 } },
  transition,
};

export function MainWrapper({ children }: MainWrapperProps) {
  const { showInsetExpanded, showInsetCollapsed } = useSidebar();
  return (
    <>
      {/* Inset on top of the page. A little bit hacky, but it works. */}
      <AnimatePresence>
        {showInsetExpanded && (
          <>
            <motion.div
              {...motionProps}
              className="fixed top-0 h-2.5 bg-sidebar z-20 right-0 left-(--sidebar-width)"
            ></motion.div>
            <motion.div
              {...motionProps}
              className="fixed top-2.5 h-0 z-20 right-10 left-[calc(var(--sidebar-width)+20px)] bg-background border-t border-sidebar-border"
              animate={{ ...motionProps.animate, top: "10px" }}
            ></motion.div>
            <motion.div
              {...motionProps}
              className="fixed top-2.5 bg-background size-5 left-(--sidebar-width) z-50 rounded-tl-xl border-t border-l border-sidebar-border"
              animate={{ ...motionProps.animate, top: "10px" }}
            ></motion.div>
            <motion.div
              {...motionProps}
              className="fixed bg-sidebar size-5 left-(--sidebar-width) z-40"
            ></motion.div>
          </>
        )}
      </AnimatePresence>
      <main
        className={cn(
          "z-10 h-full w-full relative bg-background border-l border-b border-sidebar-border rounded-bl-xl md:inset-y-2.5 mb-footer md:mt-2.5 px-4",
          { "inset-y-0 rounded-bl-none": showInsetCollapsed },
        )}
      >
        {children}
      </main>
    </>
  );
}
