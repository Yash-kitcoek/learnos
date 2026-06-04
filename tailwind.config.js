/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      colors: {
        bg: {
          base:    "#080B11",
          surface: "#0E1117",
          card:    "#111827",
          muted:   "#1A2030",
        },
        accent: {
          cyan:   "#00D4FF",
          violet: "#7C3AED",
          amber:  "#F59E0B",
          green:  "#10B981",
        },
        border: {
          dim:    "rgba(255,255,255,0.06)",
          bright: "rgba(255,255,255,0.12)",
        },
      },
      backgroundImage: {
        "glow-cyan":   "radial-gradient(ellipse at top, rgba(0,212,255,0.15) 0%, transparent 60%)",
        "glow-violet": "radial-gradient(ellipse at bottom right, rgba(124,58,237,0.2) 0%, transparent 60%)",
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.4" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
      },
      animation: {
        "pulse-slow": "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
        shimmer:      "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};
