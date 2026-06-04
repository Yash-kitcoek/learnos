"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;   // 0–100
  color?: string;
  delay?: number;
}

export function ProgressBar({
  value,
  color = "#00D4FF",
  delay = 0,
}: ProgressBarProps) {
  // FIX: spec requires "transform and opacity EXCLUSIVELY — zero layout shifts"
  // width animation causes layout reflow. Use scaleX(0→1) with transform-origin: left
  // The track has overflow:hidden so clipping works correctly.
  return (
    <div className="progress-track w-full">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: value / 100 }}
        transition={{
          duration: 1.2,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          height: "100%",
          width: "100%",           // full width — scaleX clips it
          borderRadius: "2px",
          transformOrigin: "left", // scale from left edge → right
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          boxShadow: `0 0 8px ${color}55`,
          willChange: "transform",
        }}
      />
    </div>
  );
}
