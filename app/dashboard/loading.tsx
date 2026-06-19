import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileBottomNav } from "@/components/dashboard/mobile-bottom-nav";
import { DashboardGridSkeleton } from "@/components/dashboard/skeletons";

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-(--color-base)">
      <Sidebar />
      <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 md:px-8 md:pb-10 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 h-10" />
          <DashboardGridSkeleton />
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
}
