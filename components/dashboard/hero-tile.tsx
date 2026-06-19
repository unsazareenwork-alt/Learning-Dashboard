"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { BentoTile } from "@/components/ui/bento-tile";

function greetingForHour(hour: number) {
  if (hour < 5) return "Still up,";
  if (hour < 12) return "Good morning,";
  if (hour < 18) return "Good afternoon,";
  return "Good evening,";
}

export function HeroTile({ name, streak }: { name: string; streak: number }) {
  const greeting = greetingForHour(new Date().getHours());

  return (
    <BentoTile span="wide" glow="violet" className="bg-(--color-panel)">
      <div className="flex h-full flex-col justify-between gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-(--color-text-muted)">{greeting}</p>
          <h1 className="font-display mt-1 text-2xl font-semibold tracking-tight text-(--color-text-primary) sm:text-3xl">
            {name}
          </h1>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-(--color-text-muted)">
            You&apos;re building real momentum. Keep the streak alive with
            one more session today.
          </p>
        </div>

        
        <div className="relative flex shrink-0 items-center gap-3 self-start rounded-2xl border border-(--color-border) bg-(--color-panel-raised) px-5 py-4 sm:self-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--color-ember) 28%, transparent), transparent 70%)",
            }}
          />
          <motion.div
            animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.06, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-ember) 55%, transparent), transparent 75%)",
            }}
          >
            <Flame
              size={20}
              className="text-(--color-ember)"
              fill="currentColor"
              fillOpacity={0.25}
              strokeWidth={1.75}
            />
          </motion.div>
          <div className="relative z-10">
            <p className="font-mono-ui text-2xl font-medium leading-none text-(--color-text-primary)">
              {streak}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-wide text-(--color-text-muted)">
              day streak
            </p>
          </div>
        </div>
      </div>
    </BentoTile>
  );
}
