"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const MotionImage = motion.create(Image);

type ExpandableImageProps = React.ComponentProps<typeof MotionImage>;

export function ExpandableImage({ className, ...props }: ExpandableImageProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" || e.key === "Enter") {
      setOpen(false);
    }
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleOpen = () => {
    document.addEventListener("keydown", handleKeyDown);
    setOpen(!isMobile);
  };

  const handleClose = () => {
    document.removeEventListener("keydown", handleKeyDown);
    setOpen(false);
  };

  return (
    <span>
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
        onClick={handleOpen}
        className={cn("cursor-pointer", className)}
      />
    </span>
  );
}
