import { Suspense } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileBottomNav } from "@/components/dashboard/mobile-bottom-nav";
import { DashboardData } from "@/components/dashboard/dashboard-data";
import { DashboardGridSkeleton } from "@/components/dashboard/skeletons";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-(--color-base)">
      <Sidebar />

      <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 md:px-8 md:pb-10 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-(--color-text-faint)">
                Overview
              </p>
              <h1 className="font-display text-lg font-semibold text-(--color-text-primary)">
                Your dashboard
              </h1>
            </div>
          </header>

          <Suspense fallback={<DashboardGridSkeleton />}>
            <DashboardData />
          </Suspense>
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
}
