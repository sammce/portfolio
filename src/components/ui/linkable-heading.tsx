"use client";

import { Check, Copy } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { useRef } from "react";
import { motion, useAnimation } from "motion/react";
import { cn } from "@/lib/utils";

type LinkableHeadingProps = {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  iconSize?: number;
};
export function LinkableHeading({
  className,
  children,
  id,
  iconSize = 20,
}: LinkableHeadingProps) {
  const controls = useAnimation();

  const handleClick = () => {
    controls.start({
      opacity: [0, 1, 0],
      y: [0, -25],
      transition: { duration: 1.2, ease: "easeOut" },
    });
  };

  return (
    <h1
      className={`font-bold text-2xl tracking-tight flex items-center gap-4 ${className}`}
      id={id}
    >
      <span>{children}</span>
      <Tooltip>
        <TooltipTrigger
          className="cursor-pointer relative"
          onPointerDown={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(`https://www.sammce.dev/#${id}`);
            handleClick();
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
            className={cn(
              "bg-foreground text-background pointer-events-none pl-2 w-22 py-1 -left-9 rounded-md absolute bottom-4 text-xs font-medium flex items-center gap-2 z-20",
            )}
          >
            <Check size={16} className="text-green-300 dark:text-green-600" />{" "}
            <p>Copied!</p>
          </motion.div>
          <Copy size={iconSize} />
        </TooltipTrigger>
        <TooltipContent side="right">Copy link</TooltipContent>
      </Tooltip>
    </h1>
  );
}
