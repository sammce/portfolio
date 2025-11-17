"use client";

import { AnimatePresence, motion } from "motion/react";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="prose prose-sm xl:prose-base dark:prose-invert font-code min-h-[calc(100vh-var(--spacing-footer)-15px)] pt-20 max-w-[800px] mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
