"use client";

import { Check, Copy } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { motion, useAnimation } from "motion/react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type LinkableHeadingProps = {
  className?: string;
  children?: React.ReactNode;
  href: string;
  iconSize?: number;
  noPrefix?: boolean;
  tooltipNoun?: string;
  ref?: React.RefObject<HTMLHeadingElement | null>;
  id?: string;
  isSubheading?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export function LinkableHeading({
  className,
  children,
  href,
  iconSize = 20,
  noPrefix = false,
  tooltipNoun = "link",
  ref,
  id,
  as: Tag = "h1",
  isSubheading,
}: LinkableHeadingProps) {
  const controls = useAnimation();
  const pathname = usePathname();

  const handleClick = () => {
    controls.start({
      opacity: [0, 1, 0],
      scale: [0.95, 1],
      y: [0, -25],
      transition: { duration: 1.2, ease: "easeOut" },
    });
  };

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn(
        "font-bold text-2xl tracking-tight flex items-center gap-4 scroll-mt-12",
        className,
      )}
    >
      {children}
      <Tooltip>
        <TooltipTrigger
          className="cursor-pointer relative"
          onPointerDown={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(
              noPrefix ? href : `https://www.sammce.dev${pathname}${href}`,
            );
            handleClick();
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
            className={cn(
              "bg-foreground text-background pointer-events-none px-2 w-22 py-1.5 -left-9 rounded-md absolute bottom-4 text-xs font-code font-medium flex items-center gap-2 z-20 max-h-8",
            )}
          >
            <Check size={16} className="text-green-300 dark:text-green-600" />{" "}
            <p>Copied!</p>
          </motion.div>
          <Copy size={iconSize} />
        </TooltipTrigger>
        <TooltipContent side="right">Copy {tooltipNoun}</TooltipContent>
      </Tooltip>
    </Tag>
  );
}
