"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
  ChevronLeft,
  Zap,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: BookOpen,        label: "Courses",   id: "courses"   },
  { icon: BarChart3,       label: "Progress",  id: "progress"  },
  { icon: Trophy,          label: "Badges",    id: "badges"    },
  { icon: Settings,        label: "Settings",  id: "settings"  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId]   = useState("dashboard");
  // FIX: removed unused mobileOpen state — was declared but never read or used

  return (
    <>
      {/* ── Desktop Sidebar (lg+) ──────────────────────────── */}
      <motion.nav
        aria-label="Main navigation"
        animate={{ width: collapsed ? 72 : 220 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden lg:flex flex-col h-screen sticky top-0 bg-bg-surface
          border-r border-border-dim overflow-hidden shrink-0 z-20"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-border-dim">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-violet
            flex items-center justify-center shrink-0" aria-hidden="true">
            <Zap size={16} className="text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="font-display font-bold text-base tracking-tight text-white whitespace-nowrap"
              >
                LearnOS
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              aria-current={activeId === item.id ? "page" : undefined}
              className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left group"
            >
              {/* layoutId — snaps highlight between nav items via layout animation */}
              {activeId === item.id && (
                <motion.div
                  layoutId="sidebar-highlight"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r
                    from-accent-cyan/10 to-accent-violet/10 border border-accent-cyan/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon
                size={18}
                aria-hidden="true"
                className={`relative z-10 shrink-0 transition-colors ${
                  activeId === item.id
                    ? "text-accent-cyan"
                    : "text-white/40 group-hover:text-white/70"
                }`}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.12 }}
                    className={`relative z-10 text-sm font-medium whitespace-nowrap ${
                      activeId === item.id
                        ? "text-white"
                        : "text-white/50 group-hover:text-white/80"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="px-2 pb-5">
          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg
              text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
          >
            <motion.div
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <ChevronLeft size={16} />
            </motion.div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs whitespace-nowrap"
                >
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* ── Tablet Sidebar (md, icons only) ───────────────── */}
      <nav
        aria-label="Main navigation"
        className="hidden md:flex lg:hidden flex-col h-screen sticky top-0
          w-[72px] bg-bg-surface border-r border-border-dim shrink-0 z-20"
      >
        <div className="flex items-center justify-center py-5 border-b border-border-dim">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-violet
            flex items-center justify-center" aria-hidden="true">
            <Zap size={16} className="text-white" />
          </div>
        </div>
        <div className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              title={item.label}
              aria-label={item.label}
              aria-current={activeId === item.id ? "page" : undefined}
              className="relative w-full flex items-center justify-center py-2.5 rounded-lg group"
            >
              {activeId === item.id && (
                <motion.div
                  layoutId="tablet-highlight"
                  className="absolute inset-0 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon
                size={18}
                aria-hidden="true"
                className={`relative z-10 transition-colors ${
                  activeId === item.id
                    ? "text-accent-cyan"
                    : "text-white/40 group-hover:text-white/70"
                }`}
              />
            </button>
          ))}
        </div>
      </nav>

      {/* ── Mobile Bottom Nav (<md) ────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-surface/95
          backdrop-blur-xl border-t border-border-dim px-2 py-2
          flex items-center justify-around"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveId(item.id)}
            aria-label={item.label}
            aria-current={activeId === item.id ? "page" : undefined}
            className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg"
          >
            {activeId === item.id && (
              <motion.div
                layoutId="mobile-highlight"
                className="absolute inset-0 rounded-lg bg-accent-cyan/10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <item.icon
              size={20}
              aria-hidden="true"
              className={`relative z-10 transition-colors ${
                activeId === item.id ? "text-accent-cyan" : "text-white/40"
              }`}
            />
            <span
              className={`relative z-10 text-[10px] font-medium ${
                activeId === item.id ? "text-accent-cyan" : "text-white/30"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </>
  );
}
