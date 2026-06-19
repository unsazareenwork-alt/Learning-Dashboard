import {
  Atom,
  Network,
  FileCode2,
  BarChart3,
  BookOpen,
  Code2,
  Database,
  Globe,
  Layers,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps the `icon_name` string stored in Supabase to an actual Lucide
 * icon component. Keeping this as an explicit allow-list (rather than
 * dynamically indexing into the full lucide-react export) means a bad
 * or unexpected value from the database can never crash the render —
 * it just falls back to a sensible default icon.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  Atom,
  Network,
  FileCode2,
  BarChart3,
  BookOpen,
  Code2,
  Database,
  Globe,
  Layers,
  Sparkles,
};

export function resolveCourseIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName] ?? BookOpen;
}
