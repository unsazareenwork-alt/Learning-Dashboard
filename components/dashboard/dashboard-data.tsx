import { getActivity, getCourses, getStudentProfile } from "@/lib/data";
import { HeroTile } from "@/components/dashboard/hero-tile";
import { CourseCard } from "@/components/dashboard/course-card";
import { ActivityTile } from "@/components/dashboard/activity-tile";
import { StaggerGrid } from "@/components/ui/stagger-grid";
import { AlertTriangle } from "lucide-react";


export async function DashboardData() {
  const [profile, coursesResult, activityResult] = await Promise.all([
    getStudentProfile(),
    getCourses(),
    getActivity(),
  ]);

  return (
    <div className="space-y-4">
      {coursesResult.error && (
        <div className="flex items-center gap-2 rounded-xl border border-(--color-ember)/30 bg-(--color-ember)/10 px-4 py-3 text-sm text-(--color-ember)">
          <AlertTriangle size={16} className="shrink-0" aria-hidden />
          <p>
            Couldn&apos;t reach Supabase ({coursesResult.error}). Showing
            sample data instead.
          </p>
        </div>
      )}

      <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <HeroTile name={profile.name} streak={profile.streak} />

        {coursesResult.courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}

        <ActivityTile activity={activityResult.activity} />
      </StaggerGrid>
    </div>
  );
}
