"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { scrollY } = useScroll();

  const isBrowser = typeof window !== "undefined";
  const scrollHeight = isBrowser
    ? document.documentElement.scrollHeight -
      document.documentElement.clientHeight
    : 0;

  const translateY = useTransform(
    scrollY,
    [scrollHeight - 300, scrollHeight],
    [100, 0],
  );

  return (
    <motion.footer
      initial={{ y: 0 }}
      style={{ y: translateY }}
      className={cn(
        "bg-footer min-h-footer flex items-center justify-center text-muted-foreground fixed bottom-0 left-0 right-0 z-0",
      )}
    >
      &copy; Sam McElligott, {currentYear}
    </motion.footer>
  );
};
