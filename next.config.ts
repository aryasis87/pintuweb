import type { NextConfig } from "next";

// Header keamanan dasar untuk semua halaman. HSTS sudah dipasang Vercel.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://wa.me mailto:; object-src 'none'" },
];

// Portal katalog tayang di bawah domain ini (multi-zone). Tiap portal tetap project
// Vercel sendiri dengan basePath = path di sini; PintuWeb hanya meneruskan permintaannya.
const PORTALS: Record<string, string> = {
  "undangan-digital": "https://portal-undangan-eta.vercel.app",
};

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async rewrites() {
    return Object.entries(PORTALS).flatMap(([path, origin]) => [
      { source: `/${path}`, destination: `${origin}/${path}` },
      { source: `/${path}/:rest+`, destination: `${origin}/${path}/:rest+` },
    ]);
  },
};

export default nextConfig;
