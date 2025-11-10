"use client";

import { ArrowUp } from "lucide-react";
import { useScroll, motion } from "motion/react";
import { useState } from "react";

export function circlePath(cx: number, cy: number, r: number): string {
  if (r <= 0 || !isFinite(r)) {
    throw new Error("Radius must be a positive finite number.");
  }
  const startX = cx;
  const startY = cy - r;
  const midX = cx;
  const midY = cy + r;

  const move = `M ${startX} ${startY}`;
  const arc1 = `A ${r} ${r} 0 1 1 ${midX} ${midY}`;
  const arc2 = `A ${r} ${r} 0 1 1 ${startX} ${startY}`;

  return `${move} ${arc1} ${arc2}`;
}

export function ScrollToTop() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const height = 50;
  const width = 50;

  const r = width / 2;
  const cx = width / 2;
  const cy = height / 2;

  scrollYProgress.on("change", (latest) => {
    if (latest > 0.2 && !visible) {
      setVisible(true);
    } else if (latest <= 0.2 && visible) {
      setVisible(false);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={visible ? { opacity: 1, scale: 1 } : {}}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-14 right-14 z-10 flex items-center group justify-center active:scale-95 cursor-pointer bg-background-noise/50 backdrop-blur-sm rounded-full"
      style={{ width, height }}
    >
      <svg
        height={height}
        width={width}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible absolute z-30 rounded-full"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={circlePath(cx, cy, r)}
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          fill="none"
          strokeWidth="3"
          className="pointer-events-none stroke-primary/15"
        />
        <motion.path
          d={circlePath(cx, cy, r)}
          width={width}
          height={height}
          fill="none"
          style={{ pathLength: scrollYProgress }}
          strokeWidth="3"
          strokeLinecap="round"
          className="stroke-primary"
        />
      </svg>
      <ArrowUp className="text-primary z-20 group-hover:scale-110 group-active:scale-95 transition-transform" />
    </motion.div>
  );
}
