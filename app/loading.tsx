// Route-level loading — shown by Next.js App Router during page navigation
// Uses same grid layout as page.tsx so there's no visual shift on load
import { SkeletonHero, SkeletonActivity, SkeletonStats, SkeletonCourse } from "@/components/ui/Skeletons";

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-bg-base">
      {/* Sidebar placeholder — matches real sidebar width */}
      <div className="hidden lg:block w-[220px] shrink-0 bg-bg-surface border-r border-border-dim" />

      <main className="flex-1 px-4 md:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Row 1: Hero (2 col) + Stats (1 col) */}
          <SkeletonHero />
          <SkeletonStats />

          {/* Row 2: Activity (2 col) spans correctly */}
          <SkeletonActivity />

          {/* Course skeletons */}
          <div className="col-span-full mt-4 mb-1">
            <div className="skeleton h-3 w-24 rounded" />
          </div>
          <SkeletonCourse />
          <SkeletonCourse />
          <SkeletonCourse />
          <SkeletonCourse />
        </div>
      </main>
    </div>
  );
}
