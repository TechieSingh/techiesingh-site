import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // GoalForge is a static app in public/learn; serve its page at /learn.
  async rewrites() {
    return [{ source: "/learn", destination: "/learn/index.html" }];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // The learning app is per-person; never cache its page at the edge.
      { source: "/learn", headers: [{ key: "Cache-Control", value: "private, no-store" }] },
    ];
  },
};

export default nextConfig;
