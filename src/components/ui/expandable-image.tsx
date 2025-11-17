"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const MotionImage = motion.create(Image);

type ExpandableImageProps = React.ComponentProps<typeof MotionImage>;

export function ExpandableImage({ className, ...props }: ExpandableImageProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleOpen = () => {
    if (isMobile) return;

    document.documentElement.classList.add("overflow-y-hidden");
    setOpen(true);
  };

  const handleClose = () => {
    document.documentElement.classList.remove("overflow-y-hidden");
    setOpen(false);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" || e.key === "Enter") {
      handleClose();
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleKeyDown]);

  return (
    <div
      className="rounded-lg bg-primary/40 group cursor-pointer"
      onClick={open ? handleClose : handleOpen}
    >
      {typeof document !== "undefined" &&
        !isMobile &&
        createPortal(
          <AnimatePresence mode="wait">
            {open && (
              <motion.span
                className={cn(
                  "fixed flex top-0 left-0 w-screen h-screen items-center justify-center z-50 px-8 bg-black/80",
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
              >
                <span className="relative rounded-lg">
                  <MotionImage
                    {...props}
                    className="rounded-lg max-h-[90vh] max-w-[90vw] z-10"
                    width={1200}
                    height={1200}
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                </span>
              </motion.span>
            )}
          </AnimatePresence>,
          document.body,
        )}
      <MotionImage
        {...props}
        className={cn(
          "rounded-lg border group-hover:translate-x-4 group-hover:shadow-xl group-hover:-translate-y-4 transition-transform bg-transparent",
          className,
        )}
      />
    </div>
  );
}
