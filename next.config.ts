import type { NextConfig } from "next";
import { PORTALS } from "./app/lib/portals";
import { routingRules } from "./app/i18n/routes";

// Header keamanan dasar untuk semua halaman. HSTS sudah dipasang Vercel.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://wa.me mailto:; object-src 'none'" },
];

const { rewrites: langRewrites, redirects: langRedirects } = routingRules();

// Path yang TIDAK ditulis ulang ke /id. Berkas public/ & rute statis sudah dilayani sebelum
// afterFiles; daftar ini menjaga bahasa lain, aset Next, dan API.
const notId = ["_next", "_vercel", "api", "id(?:/|$)", "en(?:/|$)", "ms(?:/|$)"].join("|");

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Versi Indonesia tidak berawalan: /id/... adalah URL internal.
      { source: "/id", destination: "/", permanent: true },
      { source: "/id/:path*", destination: "/:path*", permanent: true },
      ...langRedirects,
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Portal katalog (multi-zone).
        ...PORTALS.flatMap(({ path, origin }) => [
          { source: `/${path}`, destination: `${origin}/${path}` },
          { source: `/${path}/:rest+`, destination: `${origin}/${path}/:rest+` },
        ]),
        // Segmen berbahasa Inggris/Melayu -> folder internal.
        ...langRewrites,
      ],
      // Bahasa Indonesia tanpa awalan -> app/[lang] dengan lang = id
      // (setelah berkas public/ & rute statis, sebelum rute dinamis).
      afterFiles: [
        { source: "/", destination: "/id" },
        { source: `/:path((?!${notId}).+)`, destination: "/id/:path" },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
