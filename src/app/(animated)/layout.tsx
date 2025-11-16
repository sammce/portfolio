"use client";

import { AnimatePresence, motion } from "motion/react";

export default function AnimatedLayout({ children }: LayoutProps<"/">) {
  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col gap-2 max-w-[600px] 2xl:max-w-[750px] min-h-screen mx-auto text-sm mb-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
