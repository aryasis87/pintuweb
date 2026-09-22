import type { Metadata } from 'next'
import PaketPageContent from './PaketPageContent'

export const metadata: Metadata = {
  title: 'Paket Website — Harga Jasa Pembuatan Website',
  description: 'Lihat pilihan paket website PintuWeb – mulai dari landing page, website UMKM, toko online, hingga website custom. Gratis domain & hosting!',
  keywords: [
    'jasa website murah',
    'paket website UMKM',
    'jasa buat website toko online',
    'jasa landing page',
    'harga pembuatan website',
  ],
  alternates: {
    canonical: 'https://pintuweb.com/paket',
  },
  openGraph: {
    title: 'Paket Website – PintuWeb',
    description: 'Mulai dari landing page hingga toko online lengkap – semua sudah termasuk domain, hosting, dan support.',
    url: 'https://pintuweb.com/paket',
    siteName: 'PintuWeb',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://pintuweb.com/images/og-pintuweb.png',
        width: 1200,
        height: 630,
        alt: 'Paket Jasa Pembuatan Website PintuWeb',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paket Website – PintuWeb',
    description: 'Pilih paket website sesuai kebutuhan – gratis domain & hosting.',
    images: ['https://pintuweb.com/images/og-pintuweb.png'],
  },
}

export default function PaketPage() {
  return <PaketPageContent />
}
