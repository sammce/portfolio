"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import GithubOriginal from "devicons-react/icons/GithubOriginal";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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
        "bg-footer min-h-footer flex flex-col gap-4 items-center justify-center text-muted-foreground fixed bottom-0 left-0 right-0",
      )}
    >
      <span>&copy; Sam McElligott, {currentYear}</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="https://github.com/sammce/portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubOriginal className="ml-2 dark:invert" size={28} />
          </Link>
        </TooltipTrigger>

        <TooltipContent>View source code</TooltipContent>
      </Tooltip>
    </motion.footer>
  );
};
