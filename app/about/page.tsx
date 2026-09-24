import type { Metadata } from 'next'
import AboutPageContent from './AboutPageContent'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description:
    'Kenali PintuWeb, studio digital yang membantu UMKM dan startup membangun website profesional, cepat, dan kredibel. Temui tim di balik kesuksesan Anda.',
  keywords: [
    'tentang PintuWeb',
    'tim jasa website',
    'jasa website UMKM',
    'studio digital Indonesia',
    'profil perusahaan digital',
    'desain web profesional',
    'developer website Indonesia',
  ],
  openGraph: {
    title: 'Tentang Kami',
    description:
      'PintuWeb adalah mitra digital terpercaya untuk UMKM dan startup. Fokus pada desain elegan, performa cepat, dan solusi berbasis kebutuhan bisnis.',
    url: 'https://pintuweb.com/about',
    siteName: 'PintuWeb',
    images: [
      {
        url: 'https://pintuweb.com/images/og-pintuweb.png',
        width: 1200,
        height: 630,
        alt: 'Tentang Tim PintuWeb',
      },
    ],
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tentang Kami',
    description:
      'Kenali siapa kami – tim di balik PintuWeb yang membangun website cepat, modern, dan mobile-first untuk bisnis Anda.',
    site: '@pintuweb', // Aktifkan jika akun Twitter tersedia
  },
  alternates: {
    canonical: 'https://pintuweb.com/about',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PintuWeb',
  url: 'https://pintuweb.com',
  logo: 'https://pintuweb.com/images/logo.webp',
  description:
    'PintuWeb adalah studio digital asal Indonesia yang berfokus pada jasa pembuatan website profesional untuk UMKM dan startup.',
  foundingDate: '2024',
  founder: {
    '@type': 'Person',
    name: 'Tim PintuWeb',
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
    url: 'https://pintuweb.com/contact',
  },
  sameAs: [
    'https://pintuweb.com',
    'https://wa.me/6281339908765'
  ],
}

export default function AboutPage() {
  return (
<>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
  <AboutPageContent />
</>
  )
}
