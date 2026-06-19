"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";
import clsx from "clsx";

interface BentoTileProps {
  children: ReactNode;
  className?: string;
  /** Sets the grid span for desktop bento layout. */
  span?: "default" | "wide" | "tall";
  glow?: "violet" | "teal" | "none";
  as?: "article" | "section";
}

export const tileEntranceVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

const glowStyles: Record<NonNullable<BentoTileProps["glow"]>, string> = {
  violet: "hover:shadow-[0_0_0_1px_var(--color-violet),0_0_32px_-8px_var(--color-violet)]",
  teal: "hover:shadow-[0_0_0_1px_var(--color-teal),0_0_32px_-8px_var(--color-teal)]",
  none: "hover:shadow-[0_0_0_1px_var(--color-border-hover)]",
};

const spanStyles: Record<NonNullable<BentoTileProps["span"]>, string> = {
  default: "",
  wide: "sm:col-span-2",
  tall: "md:row-span-2",
};


export function BentoTile({
  children,
  className,
  span = "default",
  glow = "none",
  as = "article",
}: BentoTileProps) {
  const Component = motion[as];

  return (
    <Component
      variants={tileEntranceVariants}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={clsx(
        "relative overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-panel) p-5 transition-shadow duration-300 will-change-transform",
        glowStyles[glow],
        spanStyles[span],
        className
      )}
    >
      {children}
    </Component>
  );
}
