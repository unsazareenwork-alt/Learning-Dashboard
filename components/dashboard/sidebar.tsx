"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Settings,
  ChevronsLeft,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "courses", label: "Courses", icon: BookOpen },
  { key: "achievements", label: "Achievements", icon: Trophy },
  { key: "settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [userOverride, setUserOverride] = useState(false);
  const [active, setActive] = useState("dashboard");

  // Auto-collapse to icons-only between 768px and 1024px (tablet), per
  // the responsive spec, unless the person has manually toggled it.
  useEffect(() => {
    const tabletQuery = window.matchMedia(
      "(min-width: 768px) and (max-width: 1024px)"
    );

    const applyDefault = () => {
      if (!userOverride) {
        setCollapsed(tabletQuery.matches);
      }
    };

    applyDefault();
    tabletQuery.addEventListener("change", applyDefault);
    return () => tabletQuery.removeEventListener("change", applyDefault);
  }, [userOverride]);

  const toggleCollapsed = () => {
    setUserOverride(true);
    setCollapsed((c) => !c);
  };

  return (
    <motion.nav
      initial={false}
      animate={{ width: collapsed ? 76 : 232 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className="sticky top-0 hidden h-screen shrink-0 flex-col border-r border-(--color-border) bg-(--color-panel) px-3 py-5 md:flex"
    >
      <div
        className={clsx(
          "mb-8 flex items-center gap-2 px-2",
          collapsed && "justify-center px-0"
        )}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-violet)/15 text-(--color-violet)">
          <Sparkles size={16} strokeWidth={2} aria-hidden />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-display text-sm font-semibold text-(--color-text-primary)"
            >
              Pace
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <ul className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <li key={item.key} className="relative">
              <button
                onClick={() => setActive(item.key)}
                aria-current={isActive ? "page" : undefined}
                className={clsx(
                  "relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  collapsed && "justify-center px-0",
                  isActive
                    ? "text-(--color-text-primary)"
                    : "text-(--color-text-muted) hover:text-(--color-text-primary)"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-highlight"
                    className="absolute inset-0 rounded-xl bg-(--color-panel-raised)"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon
                  size={18}
                  strokeWidth={1.75}
                  className="relative z-10 shrink-0"
                  aria-hidden
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative z-10"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ul>

      <button
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={clsx(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-(--color-text-muted) transition-colors hover:text-(--color-text-primary)",
          collapsed && "justify-center px-0"
        )}
      >
        <motion.span
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="flex shrink-0"
        >
          <ChevronsLeft size={18} strokeWidth={1.75} aria-hidden />
        </motion.span>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Collapse
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.nav>
  );
}
