"use client";

import { motion } from "framer-motion";

interface AnimatedProgressBarProps {
  value: number; // 0-100
  colorVar?: "violet" | "teal";
}

export function AnimatedProgressBar({
  value,
  colorVar = "violet",
}: AnimatedProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const barColor =
    colorVar === "teal" ? "var(--color-teal)" : "var(--color-violet)";

  return (
    <div className="w-full">
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-(--color-panel-raised)"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: barColor }}
          initial={{ width: "0%" }}
          animate={{ width: `${clamped}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.3 }}
        />
      </div>
    </div>
  );
}
