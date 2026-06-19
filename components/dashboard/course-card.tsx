import { createElement } from "react";
import { BentoTile } from "@/components/ui/bento-tile";
import { AnimatedProgressBar } from "@/components/ui/animated-progress-bar";
import { resolveCourseIcon } from "@/lib/icon-map";
import type { CourseRow } from "@/lib/types";

export function CourseCard({ course }: { course: CourseRow }) {
  const isNearlyDone = course.progress >= 90;

  return (
    <BentoTile glow={isNearlyDone ? "teal" : "violet"} className="bg-grain-mesh">
      <div className="relative flex h-full flex-col justify-between gap-4">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--color-border) bg-(--color-panel-raised) text-(--color-violet)">
            {createElement(resolveCourseIcon(course.icon_name), {
              size: 18,
              strokeWidth: 1.75,
              "aria-hidden": true,
            })}
          </div>
          <span className="font-mono-ui text-xs text-(--color-text-faint)">
            {String(course.progress).padStart(2, "0")}%
          </span>
        </div>

        <div>
          <h3 className="font-display text-[15px] font-medium leading-snug text-(--color-text-primary)">
            {course.title}
          </h3>
        </div>

        <AnimatedProgressBar
          value={course.progress}
          colorVar={isNearlyDone ? "teal" : "violet"}
        />
      </div>
    </BentoTile>
  );
}
