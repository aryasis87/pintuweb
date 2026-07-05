import type { Metadata } from 'next'
import PaketPageContent from './PaketPageContent'

export const metadata: Metadata = {
  title: 'Paket Website – Jasa Pembuatan Website UMKM, Toko Online, Custom',
  description: 'Lihat pilihan paket website kami – mulai dari landing page, website UMKM, toko online, hingga website custom. Gratis domain & hosting!',
  keywords: [
    'jasa website murah',
    'paket website UMKM',
    'jasa buat website toko online',
    'jasa landing page',
    'website custom nextjs tailwind',
  ],
  openGraph: {
    title: 'Paket Website – Jasa Profesional untuk UMKM & Toko Online',
    description: 'Mulai dari landing page hingga toko online lengkap – semua sudah termasuk domain, hosting, dan support.',
    url: 'https://yourdomain.com/paket',
    siteName: 'SanzyDev',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://yourdomain.com/og-image-paket.jpg', // ganti dengan OG image
        width: 1200,
        height: 630,
        alt: 'Paket Jasa Pembuatan Website',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paket Website – SanzyDev',
    description: 'Pilih paket website sesuai kebutuhan – gratis domain & hosting.',
    images: ['https://yourdomain.com/og-image-paket.jpg'],
  },
  metadataBase: new URL('https://yourdomain.com'),
}

export default function PaketPage() {
  return <PaketPageContent />
}
