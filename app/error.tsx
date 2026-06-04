"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Dashboard Error]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-base px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full rounded-2xl border border-red-500/20 bg-bg-card p-10 text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center">
            <AlertTriangle size={28} className="text-red-400" />
          </div>
        </div>
        <h2 className="font-display text-xl font-bold text-white mb-2">
          Something went wrong
        </h2>
        <p className="text-white/40 text-sm mb-6 leading-relaxed">
          {error.message || "An unexpected error occurred loading the dashboard."}
        </p>
        <motion.button
          onClick={reset}
          whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-sm font-medium"
        >
          <RefreshCw size={14} />
          Try again
        </motion.button>
      </motion.div>
    </div>
  );
}
