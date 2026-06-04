"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { BentoTile } from "../ui/BentoTile";
import { Activity } from "lucide-react";

function generateActivity() {
  return Array.from({ length: 70 }, (_, i) => ({
    id: i,
    level: Math.random() > 0.5 ? Math.floor(Math.random() * 4) + 1 : 0,
  }));
}

const levelColors = [
  "bg-white/5",
  "bg-accent-cyan/20",
  "bg-accent-cyan/40",
  "bg-accent-cyan/65",
  "bg-accent-cyan",
];

const days   = ["M", "W", "F"];
const months = ["Jun", "Jul", "Aug", "Sep", "Oct"];

export function ActivityTile() {
  // useMemo — client-only, stable random values, no hydration mismatch
  const activityData = useMemo(() => generateActivity(), []);

  return (
    <BentoTile
      className="p-5 col-span-full lg:col-span-2"
      glowColor="rgba(0,212,255,0.06)"
      index={1}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-accent-cyan" aria-hidden="true" />
            <h3 className="font-display font-semibold text-white text-sm">
              Learning Activity
            </h3>
          </div>
          <span className="text-white/30 text-xs">Last 10 weeks</span>
        </div>

        {/* Month labels */}
        <div className="flex gap-1 mb-1 ml-6" aria-hidden="true">
          {months.map((m) => (
            <span
              key={m}
              className="text-[10px] text-white/25 w-[calc((100%-24px)/5)] text-left"
            >
              {m}
            </span>
          ))}
        </div>

        <div className="flex gap-1">
          {/* Day labels */}
          <div className="flex flex-col gap-1 mr-1" aria-hidden="true">
            {days.map((d) => (
              <span key={d} className="text-[10px] text-white/25 h-[14px] leading-[14px]">
                {d}
              </span>
            ))}
          </div>

          {/* Contribution grid */}
          <div
            role="img"
            aria-label="Learning activity contribution graph"
            className="grid grid-flow-col gap-1"
            style={{ gridTemplateRows: "repeat(7, 14px)" }}
          >
            {activityData.map((cell, i) => (
              <motion.div
                key={cell.id}
                // FIX: ALL cells use spring — removed wrong i%7===0 tween condition
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.3 + i * 0.004,
                }}
                title={`Activity level ${cell.level}`}
                className={`w-[14px] h-[14px] rounded-sm ${levelColors[cell.level]}
                  cursor-pointer hover:ring-1 hover:ring-accent-cyan/50`}
                style={{ willChange: "transform, opacity" }}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-3 justify-end" aria-hidden="true">
          <span className="text-[10px] text-white/25">Less</span>
          {levelColors.map((c, i) => (
            <div key={i} className={`w-[10px] h-[10px] rounded-sm ${c}`} />
          ))}
          <span className="text-[10px] text-white/25">More</span>
        </div>
      </div>
    </BentoTile>
  );
}
