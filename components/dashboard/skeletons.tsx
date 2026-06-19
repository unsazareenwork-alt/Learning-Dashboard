function PulseBlock({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-(--color-panel-raised) ${className ?? ""}`}
    />
  );
}

export function HeroTileSkeleton() {
  return (
    <div className="sm:col-span-2 rounded-2xl border border-(--color-border) bg-(--color-panel) p-5">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div className="space-y-3">
          <PulseBlock className="h-3 w-24" />
          <PulseBlock className="h-7 w-40" />
          <PulseBlock className="h-3 w-64" />
        </div>
        <PulseBlock className="h-16 w-32 rounded-2xl" />
      </div>
    </div>
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="rounded-2xl border border-(--color-border) bg-(--color-panel) p-5">
      <div className="flex h-full flex-col justify-between gap-4">
        <div className="flex items-start justify-between">
          <PulseBlock className="h-10 w-10 rounded-xl" />
          <PulseBlock className="h-3 w-8" />
        </div>
        <PulseBlock className="h-4 w-3/4" />
        <PulseBlock className="h-1.5 w-full rounded-full" />
      </div>
    </div>
  );
}

export function ActivityTileSkeleton() {
  return (
    <div className="sm:col-span-2 rounded-2xl border border-(--color-border) bg-(--color-panel) p-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <PulseBlock className="h-3 w-32" />
          <PulseBlock className="h-3 w-16" />
        </div>
        <PulseBlock className="h-24 w-full" />
      </div>
    </div>
  );
}

export function DashboardGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <HeroTileSkeleton />
      <CourseCardSkeleton />
      <CourseCardSkeleton />
      <CourseCardSkeleton />
      <CourseCardSkeleton />
      <ActivityTileSkeleton />
    </div>
  );
}
