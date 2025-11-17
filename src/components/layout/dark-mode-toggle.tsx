"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Kbd, KbdGroup } from "../ui/kbd";
import { useUserAgent } from "@/hooks/use-user-agent";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { showInsetExpanded, isMobile } = useSidebar();
  const { platform } = useUserAgent();

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const handleThemeChange = () => {
      const newTheme = !isDark;
      setIsDark(newTheme);
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", newTheme ? "dark" : "light");
    };

    if (isMobile) {
      handleThemeChange();
      return;
    }

    await document.startViewTransition(() => {
      flushSync(handleThemeChange);
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 400,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }, [isDark, isMobile]);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "m" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleTheme();
      }
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
    };
  }, [toggleTheme]);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={showInsetExpanded ? "ghost" : "glass"}
            size="icon"
            ref={buttonRef}
            disabled={false}
            onClick={toggleTheme}
            className="z-40 fixed top-4 md:top-2.5 right-5 size-8"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle dark mode</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="pt-2">
          Toggle dark mode{" "}
          <KbdGroup className="ml-1">
            <Kbd>{platform === "macOS" ? "⌘" : "^"}</Kbd>
            <Kbd>M</Kbd>
          </KbdGroup>
        </TooltipContent>
      </Tooltip>

      <AnimatePresence>
        {showInsetExpanded && (
          <motion.svg
            className={cn(
              "absolute h-9 z-30 origin-top-left skew-x-30 overflow-visible ease-snappy -top-[1.5px] -right-12 transform-gpu transition-transform duration-300 translate-x-1",
            )}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 128 32"
            xmlSpace="preserve"
            exit={{ top: -50 }}
            initial={{ top: -50 }}
            animate={{ top: 0, transition: { delay: 0.05 } }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          >
            <line
              stroke="var(--sidebar)"
              strokeWidth="2px"
              shapeRendering="optimizeQuality"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeMiterlimit="10"
              x1="1"
              y1="0"
              x2="128"
              y2="0"
            ></line>
            <path
              className="translate-y-[0.5px]"
              fill="var(--sidebar)"
              shapeRendering="optimizeQuality"
              strokeWidth="1px"
              strokeLinecap="round"
              strokeMiterlimit="10"
              vectorEffect="non-scaling-stroke"
              d="M0,0c5.9,0,10.7,4.8,10.7,10.7v10.7c0,5.9,4.8,10.7,10.7,10.7H128V0"
              stroke="var(--sidebar-border)"
            ></path>
          </motion.svg>
        )}
      </AnimatePresence>
    </>
  );
}
