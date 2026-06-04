"use client";

import { motion } from "framer-motion";
import { BentoTile } from "../ui/BentoTile";
import { TrendingUp, Award, Target } from "lucide-react";

const stats = [
  { icon: TrendingUp, label: "Rank",         value: "#12",  sub: "of 840 students", color: "#00D4FF" },
  { icon: Award,      label: "Certificates", value: "4",    sub: "earned so far",   color: "#A78BFA" },
  { icon: Target,     label: "Completion",   value: "78%",  sub: "avg course rate", color: "#10B981" },
];

export function StatsTile() {
  return (
    <BentoTile className="p-5" glowColor="rgba(124,58,237,0.08)" index={2}>
      <div className="relative z-10 space-y-4">
        <h3 className="font-display font-semibold text-white text-sm mb-5">Your Stats</h3>

        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            // FIX: was x: -12 which causes layout shift — use opacity + translateX via transform only
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.4 + i * 0.1,
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex items-center gap-3"
            style={{ willChange: "transform, opacity" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${stat.color}18` }}
              aria-hidden="true"
            >
              <stat.icon size={15} style={{ color: stat.color }} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white/40 text-xs">{stat.label}</p>
              <p className="font-display font-bold text-white text-lg leading-tight">
                {stat.value}
              </p>
            </div>

            <span className="text-white/25 text-[10px] text-right shrink-0">{stat.sub}</span>
          </motion.div>
        ))}
      </div>
    </BentoTile>
  );
}
