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
  "landing-page": "https://portal-landing-seven.vercel.app",
  "link-in-bio": "https://portal-bio-neon.vercel.app",
  "kontes-desain": "https://portal-kontes.vercel.app",
  "undangan-digital": "https://portal-undangan-eta.vercel.app",
  "website-portofolio": "https://portal-porto-neon.vercel.app",
  "website-reservasi": "https://portal-reservasi-nu.vercel.app",
  "website-properti": "https://portal-properti-nu.vercel.app",
  "aplikasi-to-do": "https://portal-todo.vercel.app",
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
