import type { ActivityRow, CourseRow } from "./types";

/**
 * Fallback course data. Used when Supabase environment variables are
 * absent, or when the live query fails, so the dashboard always has
 * something meaningful to render instead of breaking the preview.
 */
export const MOCK_COURSES: CourseRow[] = [
  {
    id: "c1f1f6b0-0001-4a3e-9c2a-000000000001",
    title: "Advanced React Patterns",
    progress: 78,
    icon_name: "Atom",
    created_at: "2026-04-02T10:00:00Z",
  },
  {
    id: "c1f1f6b0-0002-4a3e-9c2a-000000000002",
    title: "Systems Design Fundamentals",
    progress: 42,
    icon_name: "Network",
    created_at: "2026-04-10T10:00:00Z",
  },
  {
    id: "c1f1f6b0-0003-4a3e-9c2a-000000000003",
    title: "TypeScript Deep Dive",
    progress: 95,
    icon_name: "FileCode2",
    created_at: "2026-05-01T10:00:00Z",
  },
  {
    id: "c1f1f6b0-0004-4a3e-9c2a-000000000004",
    title: "Applied Statistics",
    progress: 16,
    icon_name: "BarChart3",
    created_at: "2026-05-20T10:00:00Z",
  },
];

/**
 * Deterministic mock activity for the contribution heatmap —
 * generated from a seeded pattern so it looks intentional rather
 * than randomly noisy on every render.
 */
export function generateMockActivity(weeks = 18): ActivityRow[] {
  const days: ActivityRow[] = [];
  const today = new Date();
  const totalDays = weeks * 7;

  for (let i = totalDays - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const seed = (i * 37 + (i % 11) * 13) % 100;
    let minutes = 0;
    if (seed > 80) minutes = 90 + (seed % 30);
    else if (seed > 55) minutes = 40 + (seed % 40);
    else if (seed > 30) minutes = 10 + (seed % 25);

    days.push({
      id: `mock-${i}`,
      activity_date: date.toISOString().slice(0, 10),
      minutes,
    });
  }
  return days;
}

export const MOCK_STUDENT = {
  name: "Maya",
  streak: 12,
};
