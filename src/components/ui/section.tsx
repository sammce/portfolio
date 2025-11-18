"use client";

import { useSidebarLinks } from "@/context/sidebar-links";
import { cn, slugify } from "@/lib/utils";
import { useInView } from "motion/react";
import { useEffect, useRef } from "react";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id: string;
};

export function Section({ children, className, id }: SectionProps) {
  const { setInView } = useSidebarLinks();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px -70% 0px" });

  useEffect(() => {
    if (inView) {
      setInView(slugify(id));
    }
    // eslint-disable-next-line
  }, [inView]);

  return (
    <div
      className={cn("w-full flex flex-col gap-2 scroll-mt-14 mb-8", className)}
      ref={ref}
      id={slugify(id)}
    >
      {children}
    </div>
  );
}
