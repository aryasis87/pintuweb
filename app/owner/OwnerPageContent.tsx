import type { Metadata } from 'next'
import OwnerPageContent from './OwnerPageContent'

export const metadata: Metadata = {
  title: 'Profil Founder – Pintu Web',
  description:
    'Kenalan dengan Sanzy, programmer di balik Pintu Web. Bangun solusi digital untuk UMKM & startup dengan desain modern dan teknologi terkini.',
  keywords: [
    'founder Pintu Web',
    'profil owner website',
    'pengembang website Indonesia',
    'jasa web UMKM',
    'pengalaman developer web',
  ],
  openGraph: {
    title: 'Profil Founder – Pintu Web',
    description:
      'Sanzy adalah programmer & pendiri Pintu Web, fokus pada solusi web berkualitas tinggi untuk bisnis lokal.',
    url: 'https://pintuweb.id/owner',
    siteName: 'Pintu Web',
    images: [
      {
        url: '/images/owner-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Foto Owner Pintu Web',
      },
    ],
    type: 'profile',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profil Founder – Pintu Web',
    description:
      'Bangun kredibilitas digital Anda bersama Sanzy, developer di balik Pintu Web.',
    site: '@pintuweb',
  },
  alternates: {
    canonical: 'https://pintuweb.id/owner',
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Sanzy',
      jobTitle: 'Founder & Developer',
      worksFor: {
        '@type': 'Organization',
        name: 'Pintu Web',
        url: 'https://pintuweb.id',
      },
      url: 'https://pintuweb.id/owner',
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
