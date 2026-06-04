// Skeleton components — shown via Suspense/loading.tsx while data fetches
// Each skeleton MUST match the col-span of its real counterpart exactly

export function SkeletonCourse() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-dim bg-bg-card p-5">
      <div className="skeleton w-10 h-10 rounded-xl mb-4" />
      <div className="skeleton h-4 w-3/4 rounded mb-2" />
      <div className="skeleton h-3 w-1/2 rounded mb-5" />
      <div className="skeleton h-1 w-full rounded mb-2" />
      <div className="skeleton h-3 w-10 rounded" />
    </div>
  );
}

// FIX: must match HeroTile — col-span-full on mobile, lg:col-span-2
export function SkeletonHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-dim bg-bg-card p-8 col-span-full lg:col-span-2">
      <div className="skeleton h-4 w-1/4 rounded mb-3" />
      <div className="skeleton h-10 w-2/3 rounded mb-6" />
      <div className="flex gap-2 flex-wrap">
        <div className="skeleton h-8 w-28 rounded-full" />
        <div className="skeleton h-8 w-24 rounded-full" />
        <div className="skeleton h-8 w-32 rounded-full" />
      </div>
    </div>
  );
}

// FIX: must match ActivityTile — col-span-full on mobile, lg:col-span-2
export function SkeletonActivity() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-dim bg-bg-card p-5 col-span-full lg:col-span-2">
      <div className="skeleton h-4 w-1/3 rounded mb-5" />
      <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(10, 14px)", gridTemplateRows: "repeat(7, 14px)" }}>
        {Array.from({ length: 70 }).map((_, i) => (
          <div key={i} className="skeleton w-[14px] h-[14px] rounded-sm" />
        ))}
      </div>
    </div>
  );
}

// Matches StatsTile — 1 col
export function SkeletonStats() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-dim bg-bg-card p-5">
      <div className="skeleton h-4 w-1/3 rounded mb-5" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 mb-4">
          <div className="skeleton w-8 h-8 rounded-lg shrink-0" />
          <div className="flex-1">
            <div className="skeleton h-3 w-1/3 rounded mb-1" />
            <div className="skeleton h-5 w-1/4 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
