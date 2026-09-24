import type { Metadata } from 'next'
import DemoGallery from './DemoGallery'
import { DEMOS } from '../lib/demos'

const SITE = 'https://pintuweb.com'

export const metadata: Metadata = {
  title: `Galeri Demo — ${DEMOS.length} Website Nyata`,
  description: `Coba langsung ${DEMOS.length} website buatan PintuWeb: landing page, undangan digital, link in bio, portfolio, reservasi online, marketplace properti, dan lainnya.`,
  alternates: { canonical: `${SITE}/demo` },
  openGraph: {
    title: `Galeri Demo PintuWeb — ${DEMOS.length} Website Nyata`,
    description: 'Semua demo online dan bisa dibuka sekarang juga. Pilih gaya yang kamu suka, kami sesuaikan dengan brand-mu.',
    url: `${SITE}/demo`,
    siteName: 'PintuWeb',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: `${SITE}/images/og-pintuweb.png`, width: 1200, height: 630, alt: 'Galeri demo PintuWeb' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Galeri Demo PintuWeb — ${DEMOS.length} Website Nyata`,
    images: [`${SITE}/images/og-pintuweb.png`],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Galeri Demo PintuWeb',
  url: `${SITE}/demo`,
  isPartOf: { '@id': `${SITE}/#website` },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: DEMOS.length,
    itemListElement: DEMOS.map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: d.name,
      url: d.url,
    })),
  },
}

export default function DemoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DemoGallery />
    </>
  )
}
