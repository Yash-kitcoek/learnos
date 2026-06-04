"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoTileProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  index?: number;
}

export function BentoTile({
  children,
  className = "",
  glowColor = "rgba(0,212,255,0.08)",
  index = 0,
}: BentoTileProps) {
  // FIX: derive border glow — regex replaces ONLY the last decimal+closing paren
  // e.g. "rgba(0,212,255,0.08)" → "rgba(0,212,255,0.25)"
  // Previous regex /[\d.]+\)$/ was fragile — could corrupt the color values
  const glowBorder = glowColor.replace(/,[\d.]+\)$/, ",0.25)");

  return (
    // article — semantic HTML for self-contained bento tile content
    <motion.article
      // Staggered entrance: opacity 0→1 + translateY 24→0 (transform only, zero layout shift)
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      // Hover elevates 1.5% — spring physics as spec requires
      whileHover={{
        scale: 1.015,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
      className={`relative overflow-hidden rounded-2xl border border-border-dim grain
        bg-bg-card group cursor-default ${className}`}
      style={{ willChange: "transform, opacity" }}
    >
      {/* Hover gradient glow — Framer animate prop, GPU composited, no CSS transition conflict */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Hover border glow — inset box-shadow causes zero layout shift */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${glowBorder}`,
        }}
      />

      {children}
    </motion.article>
  );
}
