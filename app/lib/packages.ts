// Satu-satunya sumber data paket & harga.
// Dipakai /paket, bagian harga di beranda, dan JSON-LD di layout —
// ubah harga di sini saja supaya ketiganya tidak pernah berselisih.

export type Paket = {
  slug: string
  title: string
  minPrice: number
  maxPrice: number
  /** true bila batas atas bisa lebih (ditampilkan dengan "+") */
  openEnded?: boolean
  badge?: string
  badgeColor?: 'green' | 'blue' | 'red' | 'purple'
  /** tampil di ringkasan beranda */
  featured?: boolean
  recommended?: boolean
  subtitle: string
  highlights: string[]
  features: string[]
}

export const PACKAGES: Paket[] = [
  {
    slug: 'landing-page',
    title: 'Landing Page',
    minPrice: 600000,
    maxPrice: 1200000,
    badge: 'Starter',
    badgeColor: 'green',
    featured: true,
    subtitle: 'Satu halaman promosi yang fokus konversi',
    highlights: ['Promosi produk', 'Event', 'Kampanye iklan'],
    features: [
      '1 halaman promosi yang fokus konversi',
      'Desain modern & mobile-friendly',
      'Free domain .com/.xyz + SSL 1 tahun',
      'Optimasi kecepatan & SEO dasar',
      'Form kontak + tombol WhatsApp',
      'Waktu pengerjaan cepat: 1–3 hari',
      'Bonus: CDN & maintenance 1 bulan',
    ],
  },
  {
    slug: 'standar-umkm',
    title: 'Standar UMKM',
    minPrice: 1500000,
    maxPrice: 2500000,
    badge: 'Bisnis',
    badgeColor: 'blue',
    featured: true,
    recommended: true,
    subtitle: 'Pilihan terpopuler untuk bisnis',
    highlights: ['Company profile', 'Jasa & layanan', 'UMKM'],
    features: [
      '3–5 halaman lengkap (Home, Profil, Layanan, Blog, Kontak)',
      'Desain profesional & responsif',
      'Domain .com + hosting + SSL',
      'Form kontak, WhatsApp & Google Maps',
      'Basic copywriting & setup SEO on-page',
      '2× revisi desain',
      'Maintenance & security support 1–3 bulan',
    ],
  },
  {
    slug: 'toko-online-simple',
    title: 'Toko Online Simple',
    minPrice: 2500000,
    maxPrice: 3500000,
    badge: 'Premium',
    badgeColor: 'red',
    featured: true,
    subtitle: 'Mulai jualan online tanpa ribet',
    highlights: ['Katalog produk', 'Order via WhatsApp', 'Toko ritel'],
    features: [
      'Katalog produk hingga 20 item',
      'Checkout via WhatsApp (langsung order)',
      'Kategori produk & banner promo',
      'Desain responsif + performa cepat',
      'CMS ringan – mudah update produk',
      '2× revisi tampilan/konten',
      'Domain + hosting + SSL sudah termasuk',
    ],
  },
  {
    slug: 'website-custom',
    title: 'Website Custom',
    minPrice: 3500000,
    maxPrice: 6000000,
    openEnded: true,
    badge: 'Custom',
    badgeColor: 'purple',
    subtitle: 'Desain & fitur sepenuhnya sesuai kebutuhan',
    highlights: ['Startup', 'Instansi', 'Sistem khusus'],
    features: [
      'Desain & layout full custom',
      'Jumlah halaman & fitur fleksibel',
      'Integrasi API, booking, formulir kompleks',
      'Framework modern (Next.js, Tailwind, dsb.)',
      'UX consultation & optimasi performa',
      'Maintenance & support teknis 3 bulan',
      'Cocok untuk startup & instansi',
    ],
  },
  {
    slug: 'toko-online-full',
    title: 'Toko Online Full',
    minPrice: 4500000,
    maxPrice: 7500000,
    subtitle: 'Toko online lengkap dengan dashboard admin',
    highlights: ['E-commerce', 'Ongkir otomatis', 'Kelola pesanan'],
    features: [
      'Keranjang belanja & sistem checkout lengkap',
      'Integrasi payment gateway',
      'Ongkir otomatis (via RajaOngkir)',
      'Dashboard admin – kelola produk & pesanan',
      'Desain mobile-first, loading cepat & SEO-ready',
      'Maintenance & support 3–6 bulan',
      'Domain + hosting + SSL premium',
    ],
  },
  {
    slug: 'portofolio',
    title: 'Portofolio / Personal Branding',
    minPrice: 1500000,
    maxPrice: 2500000,
    subtitle: 'Etalase karya untuk freelancer & kreator',
    highlights: ['Freelancer', 'Kreator', 'Profesional'],
    features: [
      'Halaman Tentang, Karya, Blog & Kontak',
      'Desain clean & profesional',
      'CTA ke WhatsApp, LinkedIn, IG, dsb.',
      'SEO dasar & struktur heading rapi',
      'Domain + hosting + SSL 1 tahun',
      'Ideal untuk freelancer & kreator',
    ],
  },
]

export const formatRupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
    .format(n)
    .replace(/\s/g, '')

/** "Rp600.000 – Rp1.200.000", atau "... – Rp6.000.000+" bila openEnded */
export const priceRange = (p: Paket) =>
  `${formatRupiah(p.minPrice)} – ${formatRupiah(p.maxPrice)}${p.openEnded ? '+' : ''}`

export const WA_NUMBER = '6281339908765'

export const waLink = (paket: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Halo PintuWeb, saya tertarik dengan paket "${paket}". Boleh minta info lebih lanjut?`
  )}`

/** Kalimat ringkas harga untuk FAQ — selalu mengikuti PACKAGES. */
export const PRICE_SUMMARY =
  `Harga mulai ${PACKAGES.map((p) => `${formatRupiah(p.minPrice)} untuk ${p.title}`).join(', ')}. ` +
  'Rincian fitur tiap paket ada di halaman Paket. Semua harga sudah termasuk desain, development, dan SEO dasar.'

export const PAYMENT_SUMMARY =
  'Semua paket: DP 50% untuk memulai, pelunasan 50% setelah website selesai dan Anda setujui. ' +
  'Kami terima transfer bank, e-wallet (OVO, GoPay, DANA), atau QRIS. Invoice dikirim sebelum pembayaran.'

