"use client";

import { useSidebarLinks } from "@/context/sidebar-links";
import { cn, slugify } from "@/lib/utils";
import { useInView } from "motion/react";
import { useEffect, useRef } from "react";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id: string;
  flash?: boolean;
};

export function Section({
  children,
  className,
  id,
  flash = false,
}: SectionProps) {
  const { lastNavigation, setInView } = useSidebarLinks();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px -70% 0px" });

  const wasLastNavigation = lastNavigation === id;

  useEffect(() => {
    if (id && inView) {
      setInView(slugify(id));
    }
  }, [inView, id, setInView]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (wasLastNavigation && flash) {
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
  }, [wasLastNavigation, flash]);

  return (
    <div
      className={cn(
        "w-full flex flex-col gap-2 scroll-mt-14 mb-8 flashable",
        className,
      )}
      ref={ref}
      id={slugify(id)}
    >
      <div className="flashable-target"></div>
      {children}
    </div>
  );
}
