"use client";

import { useEffect } from "react";
import { AlertOctagon } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-(--color-base) px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-ember)/10 text-(--color-ember)">
        <AlertOctagon size={22} aria-hidden />
      </div>
      <h1 className="font-display text-lg font-semibold text-(--color-text-primary)">
        Dashboard failed to load
      </h1>
      <p className="max-w-sm text-sm text-(--color-text-muted)">
        Something went wrong while loading your data. This shouldn&apos;t
        usually happen — try again, and if it persists, check your Supabase
        connection.
      </p>
      <button
        onClick={reset}
        className="mt-2 rounded-xl border border-(--color-border) bg-(--color-panel-raised) px-4 py-2 text-sm font-medium text-(--color-text-primary) transition-colors hover:border-(--color-violet)"
      >
        Try again
      </button>
    </div>
  );
}
