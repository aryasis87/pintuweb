// app/layout.tsx
import './globals.css'
import { PACKAGES } from './lib/packages'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Bricolage_Grotesque } from 'next/font/google'
import dynamic from 'next/dynamic'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['600', '700', '800'],
})

const Header = dynamic(() => import('./components/Header'))
const Footer = dynamic(() => import('./components/Footer'))

const SITE = 'https://pintuweb.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'PintuWeb — Jasa Pembuatan Website Profesional & Cepat',
    template: '%s | PintuWeb',
  },
  description:
    'PintuWeb adalah pintu menuju website impianmu. Jasa pembuatan website profesional, cepat, SEO-friendly, dan berperforma tinggi untuk UMKM, startup, dan personal brand. Lihat 65+ demo langsung.',
  applicationName: 'PintuWeb',
  authors: [{ name: 'PintuWeb' }],
  creator: 'PintuWeb',
  publisher: 'PintuWeb',
  keywords: [
    'jasa pembuatan website',
    'jasa website profesional',
    'bikin website murah',
    'website UMKM',
    'landing page',
    'company profile',
    'undangan digital',
    'link in bio',
    'web developer Trenggalek',
    'PintuWeb',
  ],
  category: 'technology',
  openGraph: {
    title: 'PintuWeb — Jasa Pembuatan Website Profesional & Cepat',
    description:
      'Pintu menuju website impianmu. Website modern, cepat, dan SEO-friendly untuk UMKM, startup, hingga personal brand. Lihat 65+ demo langsung.',
    url: SITE,
    siteName: 'PintuWeb',
    locale: 'id_ID',
    images: [
      { url: '/images/og-pintuweb.png', width: 1200, height: 630, alt: 'PintuWeb — Jasa Pembuatan Website Profesional' },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PintuWeb — Jasa Pembuatan Website Profesional',
    description: 'Pintu menuju website impianmu. Website cepat, modern, dan SEO-friendly. Lihat 65+ demo langsung.',
    images: ['/images/og-pintuweb.png'],
  },
  icons: {
    icon: [
      { url: '/images/favicon.ico' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/images/favicon.ico',
    apple: '/images/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: SITE,
    languages: { 'id-ID': SITE },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export const viewport: Viewport = {
  themeColor: '#2b39d4',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'PintuWeb',
      url: SITE,
      logo: `${SITE}/images/logo.webp`,
      description: 'Jasa pembuatan website profesional, cepat, dan SEO-friendly.',
      areaServed: 'ID',
      address: { '@type': 'PostalAddress', addressRegion: 'Jawa Timur', addressLocality: 'Trenggalek', addressCountry: 'ID' },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+62-813-3990-8765',
        contactType: 'sales',
        availableLanguage: ['id'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: SITE,
      name: 'PintuWeb',
      inLanguage: 'id-ID',
      publisher: { '@id': `${SITE}/#organization` },
    },
    {
      '@type': 'Service',
      serviceType: 'Jasa Pembuatan Website',
      provider: { '@id': `${SITE}/#organization` },
      areaServed: 'Indonesia',
      offers: PACKAGES.map((p) => ({
        '@type': 'Offer',
        name: `Paket ${p.title}`,
        url: `${SITE}/paket`,
        priceCurrency: 'IDR',
        price: p.minPrice,
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'IDR',
          minPrice: p.minPrice,
          ...(p.openEnded ? {} : { maxPrice: p.maxPrice }),
        },
      })),
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${bricolage.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">Lewati ke konten</a>
        <Header />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  )
}
