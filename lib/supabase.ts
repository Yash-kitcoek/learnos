// Using @supabase/supabase-js directly for server-side fetching
// @supabase/ssr is for auth/cookie sessions — not needed for simple DB reads
import { createClient } from "@supabase/supabase-js";
import type { Course } from "@/types";

// SERVER-SIDE ONLY — this file must never be imported by client components
// SUPABASE_SERVICE_ROLE_KEY is never exposed to the browser
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Typed query — all DB calls go through here
export async function fetchCourses(): Promise<{
  data: Course[];
  error: string | null;
}> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("courses")
      .select("id, title, progress, icon_name, created_at")
      .order("created_at", { ascending: true });

    if (error) return { data: [], error: error.message };
    return { data: data ?? [], error: null };
  } catch (err) {
    return {
      data: [],
      error: err instanceof Error ? err.message : "Unknown database error",
    };
  }
}