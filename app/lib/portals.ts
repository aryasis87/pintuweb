// Portal katalog yang tayang di bawah domain ini (multi-zone). Tiap portal tetap project Vercel
// sendiri dengan basePath = path di sini; next.config.ts meneruskan permintaannya. Isinya berbahasa Indonesia.
import type { DemoCategory } from './demos'

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
