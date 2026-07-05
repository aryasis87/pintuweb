import type { Metadata } from 'next'
import OwnerPageContent from './OwnerPageContent'

export const metadata: Metadata = {
  title: 'Profil Founder – PintuWeb',
  description:
    'Kenalan dengan Sanzy, programmer di balik PintuWeb. Bangun solusi digital untuk UMKM & startup dengan desain modern dan teknologi terkini.',
  keywords: [
    'founder PintuWeb',
    'profil owner website',
    'pengembang website Indonesia',
    'jasa web UMKM',
    'pengalaman developer web',
  ],
  openGraph: {
    title: 'Profil Founder – PintuWeb',
    description:
      'Sanzy adalah programmer & pendiri PintuWeb, fokus pada solusi web berkualitas tinggi untuk bisnis lokal.',
    url: 'https://pintuweb.com/owner',
    siteName: 'PintuWeb',
    images: [
      {
        url: '/images/owner-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Foto Owner PintuWeb',
      },
    ],
    type: 'profile',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profil Founder – PintuWeb',
    description:
      'Bangun kredibilitas digital Anda bersama Sanzy, developer di balik PintuWeb.',
    site: '@pintuweb',
  },
  alternates: {
    canonical: 'https://pintuweb.com/owner',
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Sanzy',
      jobTitle: 'Founder & Developer',
      worksFor: {
        '@type': 'Organization',
        name: 'PintuWeb',
        url: 'https://pintuweb.com',
      },
      url: 'https://pintuweb.com/owner',
      sameAs: [
        'https://linkedin.com/in/namalinkedin',
        'https://github.com/yourgithub',
      ],
    }),
  },
}

export default function OwnerPage() {
  return <OwnerPageContent />
}
