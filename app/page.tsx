import { Suspense } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { HeroTile } from "@/components/tiles/HeroTile";
import { ActivityTile } from "@/components/tiles/ActivityTile";
import { StatsTile } from "@/components/tiles/StatsTile";
import { CoursesGrid } from "@/components/tiles/CoursesGrid";
import { CoursesLoading } from "@/components/tiles/CoursesLoading";

// Server Component — layout shell, no client state needed here
export default function DashboardPage() {
  return (
    // Semantic: outermost shell uses flex, no meaningless div wrapper
    <div className="flex min-h-screen bg-bg-base">

      {/* Sidebar — client component handles collapse/nav state */}
      <Sidebar />

      {/* main — semantic landmark for primary content */}
      <main className="flex-1 min-w-0 pb-24 md:pb-8 px-4 md:px-6 lg:px-8 py-6 lg:py-8 overflow-y-auto">

        {/* section — wraps the dashboard overview region */}
        <section aria-label="Student dashboard overview">

          {/* Header row */}
          <header className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white/30 text-xs font-medium tracking-widest uppercase mb-1">
                Overview
              </p>
              <h2 className="font-display text-xl font-bold text-white">
                Student Dashboard
              </h2>
            </div>
            {/* Live status indicator */}
            <div
              role="status"
              aria-label="Live data"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-surface border border-border-dim"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse-slow" />
              <span className="text-white/40 text-xs">Live</span>
            </div>
          </header>

          {/* Bento grid — CSS Grid with responsive breakpoints */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Hero tile: lg = spans 2 cols */}
            <HeroTile name="Alex" streak={14} />

            {/* Activity tile: lg = spans 2 cols */}
            <ActivityTile />

            {/* Stats tile: lg = 1 col */}
            <StatsTile />

            {/* Active Courses section label */}
            <div className="col-span-full mt-4 mb-1">
              <h3 className="font-display font-semibold text-white/40 text-xs uppercase tracking-widest">
                Active Courses
              </h3>
            </div>

            {/* Course tiles — RSC fetches from Supabase, Suspense shows skeletons */}
            <Suspense fallback={<CoursesLoading />}>
              <CoursesGrid />
            </Suspense>

          </div>
        </section>
      </main>
    </div>
  );
}
