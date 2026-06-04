"use client";

import { BentoTile } from "../ui/BentoTile";
import { ProgressBar } from "../ui/ProgressBar";
import { DynamicIcon } from "../ui/DynamicIcon";
import type { Course } from "@/types";

interface CourseTileProps {
  course: Course;
  index: number;
}

const courseColors = [
  { icon: "#00D4FF", glow: "rgba(0,212,255,0.08)",  bar: "#00D4FF", bg: "from-cyan-500/10 to-transparent"    },
  { icon: "#7C3AED", glow: "rgba(124,58,237,0.08)", bar: "#A78BFA", bg: "from-violet-500/10 to-transparent"  },
  { icon: "#10B981", glow: "rgba(16,185,129,0.08)", bar: "#10B981", bg: "from-emerald-500/10 to-transparent" },
  { icon: "#F59E0B", glow: "rgba(245,158,11,0.08)", bar: "#FCD34D", bg: "from-amber-500/10 to-transparent"   },
];

export function CourseTile({ course, index }: CourseTileProps) {
  const color = courseColors[index % courseColors.length];

  return (
    // FIX: index + 3 so course tiles stagger AFTER Hero(0), Activity(1), Stats(2)
    <BentoTile className="p-5" glowColor={color.glow} index={index + 3}>
      {/* Subtle per-card gradient mesh — sits behind content */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-br ${color.bg} pointer-events-none rounded-2xl`}
      />

      <div className="relative z-10">
        {/* Icon — dynamically rendered from icon_name DB field */}
        <div
          aria-hidden="true"
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{ background: `${color.icon}18`, border: `1px solid ${color.icon}30` }}
        >
          <DynamicIcon name={course.icon_name} size={20} style={{ color: color.icon }} />
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-white text-base mb-1 leading-snug">
          {course.title}
        </h3>
        <p className="text-white/30 text-xs mb-5">In progress</p>

        {/* Animated progress bar — animates scaleX from 0 → progress value on load */}
        <div className="space-y-2">
          <ProgressBar
            value={course.progress}
            color={color.bar}
            delay={index * 0.1 + 0.5}
          />
          <div className="flex justify-between items-center">
            <span className="text-white/30 text-xs">Progress</span>
            <span
              className="text-xs font-medium"
              style={{ color: color.bar }}
              aria-label={`${course.progress}% complete`}
            >
              {course.progress}%
            </span>
          </div>
        </div>
      </div>
    </BentoTile>
  );
}
