"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, Trophy, Settings } from "lucide-react";

const NAV_ITEMS = [
  { key: "dashboard", label: "Home", icon: LayoutDashboard },
  { key: "courses", label: "Courses", icon: BookOpen },
  { key: "achievements", label: "Wins", icon: Trophy },
  { key: "settings", label: "Settings", icon: Settings },
];

export function MobileBottomNav() {
  const [active, setActive] = useState("dashboard");

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-around border-t border-(--color-border) bg-(--color-panel)/95 px-2 py-2 backdrop-blur-md md:hidden">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.key;
        return (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            aria-current={isActive ? "page" : undefined}
            className="relative flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px]"
          >
            {isActive && (
              <motion.span
                layoutId="mobile-nav-highlight"
                className="absolute inset-x-3 inset-y-0 rounded-xl bg-(--color-panel-raised)"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <Icon
              size={18}
              strokeWidth={1.75}
              className={`relative z-10 ${
                isActive ? "text-(--color-violet)" : "text-(--color-text-muted)"
              }`}
              aria-hidden
            />
            <span
              className={`relative z-10 ${
                isActive ? "text-(--color-text-primary)" : "text-(--color-text-muted)"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
