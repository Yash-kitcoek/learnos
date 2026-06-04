// Suspense fallback — shown while CoursesGrid RSC fetches from Supabase
// Must render inside the parent grid (col-span handled by each skeleton)
import { SkeletonCourse } from "../ui/Skeletons";

export function CoursesLoading() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCourse key={i} />
      ))}
    </>
  );
}
