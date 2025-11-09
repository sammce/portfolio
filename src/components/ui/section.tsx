"use client";

import { useSidebarLinks } from "@/context/sidebar-links";
import { cn } from "@/lib/utils";
import { useInView } from "motion/react";
import { useEffect, useRef } from "react";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id: string;
  viewRef?: React.RefObject<HTMLElement | null>;
};

export function Section({ children, className, id, viewRef }: SectionProps) {
  const { lastNavigation, setInView } = useSidebarLinks();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(viewRef || ref, { margin: "-20% 0px -75% 0px" });

  const wasLastNavigation = lastNavigation === id;

  useEffect(() => {
    if (id && inView) {
      setInView(id);
    }
  }, [inView, id, setInView]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (wasLastNavigation) {
      ref.current?.setAttribute("data-flash", "true");

      timeout = setTimeout(() => {
        ref.current?.removeAttribute("data-flash");
      }, 600);
    }

    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [wasLastNavigation]);

  return (
    <div
      className={cn(
        "w-full flex flex-col gap-2 scroll-mt-48 mb-8 flashable",
        className,
      )}
      ref={ref}
      id={id}
    >
      <div className="flashable-target"></div>
      {children}
    </div>
  );
}
