import { BentoTile } from "@/components/ui/bento-tile";
import type { ActivityRow } from "@/lib/types";

function intensityClass(minutes: number) {
  if (minutes === 0) return "bg-(--color-panel-raised)";
  if (minutes < 25) return "bg-(--color-teal-dim)/40";
  if (minutes < 50) return "bg-(--color-teal-dim)/70";
  if (minutes < 90) return "bg-(--color-teal)/80";
  return "bg-(--color-teal)";
}


function toWeeks(activity: ActivityRow[]) {
  const weeks: ActivityRow[][] = [];
  for (let i = 0; i < activity.length; i += 7) {
    weeks.push(activity.slice(i, i + 7));
  }
  return weeks;
}

export function ActivityTile({ activity }: { activity: ActivityRow[] }) {
  const weeks = toWeeks(activity);
  const totalMinutesThisWeek = activity
    .slice(-7)
    .reduce((sum, day) => sum + day.minutes, 0);

  return (
    <BentoTile span="wide" glow="teal">
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-sm font-medium text-(--color-text-primary)">
            Learning activity
          </h2>
          <p className="font-mono-ui text-xs text-(--color-text-muted)">
            {Math.round(totalMinutesThisWeek / 60)}h this week
          </p>
        </div>

        <div className="flex flex-1 items-end gap-[3px] overflow-x-auto pb-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <div
                  key={day.id}
                  title={`${day.activity_date}: ${day.minutes} min`}
                  className={`h-[10px] w-[10px] rounded-[3px] ${intensityClass(
                    day.minutes
                  )} transition-colors`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-1.5 text-[11px] text-(--color-text-faint)">
          <span>Less</span>
          <span className="h-[10px] w-[10px] rounded-[3px] bg-(--color-panel-raised)" />
          <span className="h-[10px] w-[10px] rounded-[3px] bg-(--color-teal-dim)/40" />
          <span className="h-[10px] w-[10px] rounded-[3px] bg-(--color-teal-dim)/70" />
          <span className="h-[10px] w-[10px] rounded-[3px] bg-(--color-teal)" />
          <span>More</span>
        </div>
      </div>
    </BentoTile>
  );
}
