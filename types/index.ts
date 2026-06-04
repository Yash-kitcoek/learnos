import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

// ── Supabase table types ───────────────────────────────────────

export interface Course {
  id: string;
  title: string;
  progress: number;       // 0–100 integer
  icon_name: string;      // must match a key in DynamicIcon's iconMap
  created_at: string;     // ISO 8601 timestamp string from Postgres
}

// ── Component prop types ───────────────────────────────────────

export interface Student {
  name: string;
  streak: number;
  avatar?: string;
}

// FIX: import ComponentType from react explicitly — no bare React.FC reference
export interface NavItem {
  id: string;
  label: string;
  icon: ComponentType<LucideProps>;
}

// ── API response shape ─────────────────────────────────────────

export interface DBResult<T> {
  data: T;
  error: string | null;
}
