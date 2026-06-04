/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure framer-motion works correctly with App Router
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
