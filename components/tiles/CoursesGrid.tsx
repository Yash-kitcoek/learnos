import { fetchCourses } from "@/lib/supabase";
import { CourseTile } from "./CourseTile";
import { ErrorTile } from "../ui/ErrorTile";

export const dynamic = "force-dynamic";

// RSC — runs on the server, never ships DB credentials to the browser
export async function CoursesGrid() {
  const { data: courses, error } = await fetchCourses();

  if (error) {
    return <ErrorTile message={`Database error: ${error}`} />;
  }

  if (courses.length === 0) {
    return (
      <div className="col-span-full rounded-2xl border border-border-dim bg-bg-card p-10 text-center">
        <p className="text-white/30 text-sm">
          No courses found. Run{" "}
          <code className="text-accent-cyan/60 text-xs px-1 py-0.5 bg-white/5 rounded">
            supabase/seed.sql
          </code>{" "}
          in your Supabase SQL editor to add courses.
        </p>
      </div>
    );
  }

  return (
    <>
      {courses.map((course, i) => (
        <CourseTile key={course.id} course={course} index={i} />
      ))}
    </>
  );
}
