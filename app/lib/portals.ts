// Portal katalog yang tayang di bawah domain ini (multi-zone). Tiap portal tetap project Vercel
// sendiri dengan basePath = path di sini; next.config.ts meneruskan permintaannya. Isinya berbahasa Indonesia.
import type { DemoCategory } from './demos'

/** Paket harga untuk tiap kategori demo/portal (slug di lib/packages.ts). */
export const PACKAGE_FOR_CATEGORY: Record<DemoCategory, string> = {
  landing: 'landing-page',
  linkinbio: 'link-in-bio',
  kontes: 'konsep-desain',
  undangan: 'undangan-digital',
  portfolio: 'portofolio',
  reservasi: 'sistem-reservasi',
  properti: 'website-properti',
  todo: 'aplikasi-web',
}

/**
 * Warna khas tiap jenis website (aksen di beranda; tema situs tetap biru-putih).
 * color = warna kuat (teks di latar muda & latar tombol berteks putih, kontras ≥ 4,5:1); tint = latar mudanya.
 */
export const CATEGORY_COLOR: Record<DemoCategory, { color: string; tint: string }> = {
  landing: { color: '#c2410c', tint: '#fff1e6' }, // jingga
  linkinbio: { color: '#6d28d9', tint: '#f1ebff' }, // ungu
  kontes: { color: '#047857', tint: '#e3f6ee' }, // hijau zamrud
  undangan: { color: '#be123c', tint: '#ffecef' }, // merah mawar
  portfolio: { color: '#1d4ed8', tint: '#e8f0ff' }, // biru
  reservasi: { color: '#92400e', tint: '#fdf1d3' }, // cokelat emas
  properti: { color: '#0e7490', tint: '#e2f5fa' }, // toska
  todo: { color: '#a21caf', tint: '#fbeafc' }, // magenta
}

export const PORTALS: { path: string; origin: string; category: DemoCategory; image: string }[] = [
  { path: 'landing-page', origin: 'https://portal-landing-seven.vercel.app', category: 'landing', image: '/images/galeri/landing.jpg' },
  { path: 'link-in-bio', origin: 'https://portal-bio-neon.vercel.app', category: 'linkinbio', image: '/images/galeri/bio.jpg' },
  { path: 'kontes-desain', origin: 'https://portal-kontes.vercel.app', category: 'kontes', image: '/images/galeri/kontes.jpg' },
  { path: 'undangan-digital', origin: 'https://portal-undangan-eta.vercel.app', category: 'undangan', image: '/images/galeri/undangan.jpg' },
  { path: 'website-portofolio', origin: 'https://portal-porto-neon.vercel.app', category: 'portfolio', image: '/images/galeri/porto.jpg' },
  { path: 'website-reservasi', origin: 'https://portal-reservasi-nu.vercel.app', category: 'reservasi', image: '/images/galeri/reservasi.jpg' },
  { path: 'website-properti', origin: 'https://portal-properti-nu.vercel.app', category: 'properti', image: '/images/galeri/properti.jpg' },
  { path: 'aplikasi-to-do', origin: 'https://portal-todo.vercel.app', category: 'todo', image: '/images/galeri/todo.jpg' },
]

export const portalOf = (c: DemoCategory) => PORTALS.find((p) => p.category === c)
