import type { Metadata } from 'next'
import ContactForm from './ContactForm'

const SITE = 'https://pintuweb.com'

export const metadata: Metadata = {
  title: 'Kontak — Konsultasi Website Gratis',
  description: 'Hubungi PintuWeb untuk konsultasi pembuatan website gratis. Kirim kebutuhanmu lewat WhatsApp atau email, kami balas di jam kerja.',
  alternates: { canonical: `${SITE}/kontak` },
  openGraph: {
    title: 'Kontak PintuWeb — Konsultasi Website Gratis',
    description: 'Ceritakan website yang kamu butuhkan. Kirim lewat WhatsApp atau email.',
    url: `${SITE}/kontak`,
    siteName: 'PintuWeb',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: `${SITE}/images/og-pintuweb.png`, width: 1200, height: 630, alt: 'Kontak PintuWeb' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Kontak PintuWeb',
  url: `${SITE}/kontak`,
  about: { '@id': `${SITE}/#organization` },
}

export default function KontakPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactForm />
    </>
  )
}
