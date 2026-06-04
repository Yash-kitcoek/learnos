import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-base">
      <div className="text-center">
        <p className="font-display text-8xl font-bold text-white/5 mb-4">404</p>
        <h2 className="font-display text-xl font-bold text-white mb-2">Page not found</h2>
        <p className="text-white/40 text-sm mb-6">This page doesn't exist in LearnOS.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-sm font-medium hover:bg-accent-cyan/20 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
