/**
 * Shape of a row in the Supabase `courses` table.
 * Mirrors the schema specified in the challenge brief.
 */
export interface CourseRow {
  id: string;
  title: string;
  progress: number; // 0-100
  icon_name: string; // Lucide icon key, e.g. "Code2"
  created_at: string;
}

/**
 * Shape of a row in the optional `activity` table used to drive
 * the contribution-style heatmap on the Activity tile.
 * If this table doesn't exist yet, the dashboard falls back to
 * deterministic mock activity so the UI never breaks.
 */
export interface ActivityRow {
  id: string;
  activity_date: string; // ISO date (yyyy-mm-dd)
  minutes: number;
}

export interface StudentProfile {
  name: string;
  streak: number;
}
