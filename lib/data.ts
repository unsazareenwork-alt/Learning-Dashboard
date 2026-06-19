import "server-only";
import { createSupabaseServerClient, isSupabaseConfigured } from "./supabase/server";
import { MOCK_COURSES, MOCK_STUDENT, generateMockActivity } from "./mock-data";
import type { ActivityRow, CourseRow } from "./types";

export interface CoursesResult {
  courses: CourseRow[];
  source: "supabase" | "mock";
  error?: string;
}

/**
 * Fetches the active courses for the dashboard from Supabase.
 *
 * Server Component data fetching, per the brief: this never runs in
 * the browser, so the Supabase anon key never ships to the client
 * bundle. Falls back to mock data if Supabase isn't configured yet,
 * or if the query fails for any reason — the dashboard should never
 * show a hard error screen for a missing table during evaluation.
 */
export async function getCourses(): Promise<CoursesResult> {
  if (!isSupabaseConfigured) {
    return { courses: MOCK_COURSES, source: "mock" };
  }

  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return { courses: MOCK_COURSES, source: "mock" };
    }

    const { data, error } = await supabase
      .from("courses")
      .select("id, title, progress, icon_name, created_at")
      .order("created_at", { ascending: true });

    if (error) {
      return {
        courses: MOCK_COURSES,
        source: "mock",
        error: error.message,
      };
    }

    if (!data || data.length === 0) {
      return { courses: MOCK_COURSES, source: "mock" };
    }

    return { courses: data as CourseRow[], source: "supabase" };
  } catch (err) {
    return {
      courses: MOCK_COURSES,
      source: "mock",
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export interface ActivityResult {
  activity: ActivityRow[];
  source: "supabase" | "mock";
}

/** Fetches recent learning activity for the contribution heatmap. */
export async function getActivity(): Promise<ActivityResult> {
  if (!isSupabaseConfigured) {
    return { activity: generateMockActivity(), source: "mock" };
  }

  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return { activity: generateMockActivity(), source: "mock" };
    }

    const { data, error } = await supabase
      .from("activity")
      .select("id, activity_date, minutes")
      .order("activity_date", { ascending: true })
      .limit(126);

    if (error || !data || data.length === 0) {
      return { activity: generateMockActivity(), source: "mock" };
    }

    return { activity: data as ActivityRow[], source: "supabase" };
  } catch {
    return { activity: generateMockActivity(), source: "mock" };
  }
}

/**
 * Student profile + streak. Hardcoded for this prototype since the
 * brief doesn't specify an auth/profile table — wiring this to a
 * real `profiles` table + Supabase Auth would be the natural next
 * step (see README "Future work").
 */
export async function getStudentProfile() {
  return MOCK_STUDENT;
}
