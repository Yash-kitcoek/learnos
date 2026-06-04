"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Star, Clock } from "lucide-react";
import { BentoTile } from "../ui/BentoTile";

interface HeroTileProps {
  name: string;
  streak: number;
}

export function HeroTile({ name, streak }: HeroTileProps) {
  // Hydration-safe: greeting computed client-side only
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(
      h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"
    );
  }, []);

  const badges = [
    {
      icon: Flame,
      label: `${streak} day streak`,
      color: "#F97316",
      bg: "rgba(249,115,22,0.1)",
      border: "rgba(249,115,22,0.25)",
    },
    {
      icon: Star,
      label: "2,840 XP",
      color: "#A78BFA",
      bg: "rgba(167,139,250,0.1)",
      border: "rgba(167,139,250,0.25)",
    },
    {
      icon: Clock,
      label: "42h this month",
      color: "#00D4FF",
      bg: "rgba(0,212,255,0.1)",
      border: "rgba(0,212,255,0.25)",
    },
  ];

  return (
    <BentoTile
      className="col-span-full lg:col-span-2 p-8 min-h-[200px]"
      glowColor="rgba(0,212,255,0.10)"
      index={0}
    >
      {/* Decorative — no layout impact */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-violet/10 pointer-events-none rounded-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-72 h-72 bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10">
        {greeting && (
          <p className="text-white/40 text-sm mb-1 tracking-wide">
            {greeting} ✦
          </p>
        )}

        <h1 className="font-display text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-accent-cyan to-accent-violet bg-clip-text text-transparent">
            {name}
          </span>
        </h1>

        <div className="flex flex-wrap gap-3" role="list" aria-label="Learning stats">
          {badges.map((badge) => (
            <motion.div
              key={badge.label}
              role="listitem"
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              // FIX: removed duplicate style prop — merged into single style object
              style={{
                background: badge.bg,
                border: `1px solid ${badge.border}`,
                willChange: "transform",
              }}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
            >
              <badge.icon size={15} style={{ color: badge.color }} aria-hidden="true" />
              <span className="text-sm font-medium" style={{ color: badge.color }}>
                {badge.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </BentoTile>
  );
}
