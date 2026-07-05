import type { Metadata } from 'next'
import ServicesPageContent from './ServicesPageContent'

export const metadata: Metadata = {
  title: 'Layanan',
  description:
    'Jelajahi berbagai layanan pembuatan website profesional dari PintuWeb: company profile, landing page, SEO, dan perawatan rutin. Cocok untuk UMKM, startup, dan instansi.',
  keywords: [
    'layanan pembuatan website',
    'jasa website UMKM',
    'landing page profesional',
    'SEO website',
    'perawatan website',
    'jasa website cepat',
    'PintuWeb',
    'studio digital Indonesia',
  ],
  openGraph: {
    title: 'Layanan',
    description:
      'PintuWeb menyediakan layanan pembuatan website yang elegan, cepat, dan kredibel. Cocok untuk UMKM, startup, dan instansi di seluruh Indonesia.',
    url: 'https://pintuweb.id/services',
    siteName: 'PintuWeb',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Layanan PintuWeb',
      },
    ],
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Layanan',
    description:
      'Beragam layanan website dari PintuWeb: desain premium, performa cepat, SEO-friendly, dan dukungan jangka panjang.',
    site: '@pintuweb',
  },
  alternates: {
    canonical: 'https://pintuweb.id/services',
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Jasa Pembuatan Website Profesional',
      provider: {
        '@type': 'Organization',
        name: 'PintuWeb',
        url: 'https://pintuweb.id',
        logo: 'https://pintuweb.id/logo.png',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Indonesia',
      },
      description:
        'PintuWeb menawarkan layanan pembuatan website elegan dan cepat untuk UMKM, startup, dan instansi di Indonesia. Termasuk SEO, landing page, dan support rutin.',
      url: 'https://pintuweb.id/services',
    }),
  },
}

export default function ServicesPage() {
  return <ServicesPageContent />
}
