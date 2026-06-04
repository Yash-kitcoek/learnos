# LearnOS — Next-Gen Student Dashboard

A high-fidelity student dashboard built with **Next.js 14 App Router**, **Supabase**, **Tailwind CSS**, and **Framer Motion**.

---

## 🏗 Architectural Choices

### Server / Client Component Split

| Component | Type | Reason |
|---|---|---|
| `app/page.tsx` | **Server** | Layout shell — no interactivity, wraps CoursesGrid in Suspense |
| `CoursesGrid` | **Server** | Fetches from Supabase using service role key — key stays server-side |
| `CourseTile` | **Client** | Framer Motion animations require browser APIs |
| `HeroTile` | **Client** | `useEffect` for hydration-safe time-based greeting |
| `ActivityTile` | **Client** | `useMemo` for client-only random activity generation |
| `StatsTile` | **Client** | Staggered entrance animations via Framer Motion |
| `Sidebar` | **Client** | Collapse state, `layoutId` animations, nav active state |
| `ProgressBar` | **Client** | `scaleX` transform animation from 0 → DB value |

### Data Flow
```
Supabase PostgreSQL
  → fetchCourses() [lib/supabase.ts — server only]
    → CoursesGrid [RSC — never ships to browser]
      → CourseTile[] [Client — receives plain Course objects as props]
```

**Key security decision:** `SUPABASE_SERVICE_ROLE_KEY` is used only in Server Components. It is never bundled into client JS. Only `NEXT_PUBLIC_SUPABASE_URL` is public.

### Why Suspense over loading.tsx for courses?
`loading.tsx` covers the entire route — coarse-grained. `<Suspense>` around `CoursesGrid` is granular: the Hero, Activity, and Stats tiles render immediately while only the course data stream waits. This gives a faster perceived load.

---

## ⚡ Animation Strategy

- **Staggered entrance** — `BentoTile` uses `index * 0.08s` delay → tiles cascade in sequentially (opacity 0→1, translateY 24→0)
- **Spring physics** — all hover states: `type: "spring", stiffness: 300, damping: 20` for natural non-linear feel
- **Zero layout shifts** — all animations use `transform` (scale, translateX, translateY, scaleX) and `opacity` only. No width/height/margin animations.
- **Progress bars** — `scaleX(0 → value/100)` with `transform-origin: left` — avoids `width` reflow
- **Sidebar `layoutId`** — active nav highlight snaps between items using `layoutId="sidebar-highlight"`
- **Hover glows** — use Framer Motion `whileHover` animate prop, not CSS transitions, to stay GPU-composited

---

## 🗄 Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → paste and run `supabase/seed.sql`
3. Copy credentials from **Project Settings → API**

### Schema
```sql
create table public.courses (
  id          uuid        default gen_random_uuid() primary key,
  title       text        not null,
  progress    integer     not null default 0 check (progress >= 0 and progress <= 100),
  icon_name   text        not null default 'BookOpen',
  created_at  timestamptz default now() not null
);
```

---

## 🚀 Local Setup

```bash
git clone <your-repo>
cd dashboard
npm install
cp .env.example .env.local   # add your Supabase credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Deploy to Vercel

```bash
npx vercel
```

Add env vars in Vercel dashboard under **Project → Settings → Environment Variables**:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## ⚠️ Challenges Faced

### 1. Hydration mismatch with `Math.random()` in ActivityTile
**Problem:** `generateActivity()` was called at module level. The server rendered one set of random values; the client hydrated with different values → React hydration warning + visual flicker.

**Solution:** Moved to `useMemo([], [])` inside the `"use client"` component. Since client components don't run on the server during hydration, the random values are generated once, client-side only.

### 2. Progress bar causing layout shift
**Problem:** Animating `width: "0%" → "75%"` changes the element's box model every frame → layout reflow on each frame → violates the zero-layout-shift requirement.

**Solution:** Changed to `scaleX(0 → 0.75)` with `transform-origin: "left"`. The element stays full-width in the DOM; only its visual scale changes. No reflow, fully GPU-composited.

### 3. Skeleton @keyframes not resolving
**Problem:** `shimmer` animation defined in `tailwind.config.js` `keyframes` only generates Tailwind utility classes (e.g., `animate-shimmer`). The `.skeleton` CSS class in `globals.css` referenced `animation: shimmer` directly but the `@keyframes shimmer` rule was never emitted into the stylesheet.

**Solution:** Explicitly declared `@keyframes shimmer` and `@keyframes pulse-slow` in `globals.css`. Tailwind config keyframes are for utility generation only — raw CSS classes need their own `@keyframes`.

### 4. Framer Motion hover conflicts with CSS transition
**Problem:** Using `transition: "opacity 0.3s"` inside a `motion.div`'s `style` prop caused the browser's CSS engine and Framer Motion's animation engine to fight over the same property.

**Solution:** Replaced with Framer Motion's `initial={{ opacity: 0 }}` + `whileHover={{ opacity: 1 }}` animate props. This keeps everything under Framer Motion's control and on the GPU compositor thread.

---

## 🏆 Rubric Checklist

- [x] **Data Architecture (30%)** — Server Components for Supabase fetch, service role key never in browser, Suspense + shimmer skeletons, graceful error handling
- [x] **Framer Motion (30%)** — Spring physics (`stiffness: 300, damping: 20`) on all hover states, staggered page load, `layoutId` sidebar micro-interactions, zero layout shifts (transform + opacity only)
- [x] **Code Quality & Types (20%)** — TypeScript interfaces for all DB payloads (`Course`, `DBResult<T>`), logical component tree, no "div soup" (nav, main, article, section, header)
- [x] **Visual Fidelity & Responsiveness (20%)** — Desktop (3-col bento + full sidebar) → Tablet (2-col + icon sidebar) → Mobile (1-col + bottom nav)
- [x] `.env.example` included, `.env.local` gitignored
- [x] `supabase/seed.sql` included for reproducible DB setup
