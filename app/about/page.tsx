import type { Metadata } from 'next'
import AboutPageContent from './AboutPageContent'

export const metadata: Metadata = {
  title: 'Tentang Kami – Pintu Web',
  description:
    'Kenali Pintu Web, studio digital yang membantu UMKM dan startup membangun website profesional, cepat, dan kredibel. Temui tim di balik kesuksesan Anda.',
  keywords: [
    'tentang Pintu Web',
    'tim jasa website',
    'jasa website UMKM',
    'studio digital Indonesia',
    'profil perusahaan digital',
    'desain web profesional',
    'developer website Indonesia',
  ],
  openGraph: {
    title: 'Tentang Kami – Pintu Web',
    description:
      'Pintu Web adalah mitra digital terpercaya untuk UMKM dan startup. Fokus pada desain elegan, performa cepat, dan solusi berbasis kebutuhan bisnis.',
    url: 'https://pintuweb.id/about',
    siteName: 'Pintu Web',
    images: [
      {
        url: 'https://pintuweb.id/images/og/about.jpg',
        width: 1200,
        height: 630,
        alt: 'Tentang Tim Pintu Web',
      },
    ],
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tentang Kami – Pintu Web',
    description:
      'Kenali siapa kami – tim di balik Pintu Web yang membangun website cepat, modern, dan mobile-first untuk bisnis Anda.',
    site: '@pintuweb', // Aktifkan jika akun Twitter tersedia
  },
  alternates: {
    canonical: 'https://pintuweb.id/about',
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Pintu Web',
      url: 'https://pintuweb.id',
      logo: 'https://pintuweb.id/logo.png',
      description:
        'Pintu Web adalah studio digital asal Indonesia yang berfokus pada jasa pembuatan website profesional untuk UMKM dan startup.',
      foundingDate: '2024',
      founder: {
        '@type': 'Person',
        name: 'Tim Pintu Web',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Trenggalek',
        addressRegion: 'Jawa Timur',
        addressCountry: 'ID',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Support',
        telephone: '+62-813-3990-8765',
        url: 'https://pintuweb.id/contact',
      },
      sameAs: [
        'https://pintuweb.id',
        'https://wa.me/6281339908765'
      ],
    }),
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}
