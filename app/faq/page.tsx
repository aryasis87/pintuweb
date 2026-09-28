import type { Metadata } from 'next'
import FAQ from '../components/FAQ'
import PageHero from '../components/PageHero'
import { faqItems } from '../lib/faqData'
import { SITE } from '../lib/site'

export const metadata: Metadata = {
  title: 'FAQ — Pertanyaan Umum',
  description:
    'Jawaban soal biaya, lama pengerjaan, pembayaran, revisi, garansi, dan dukungan setelah website online dari PintuWeb.',
  alternates: { canonical: `${SITE}/faq` },
  openGraph: {
    title: 'FAQ — PintuWeb',
    description: 'Jawaban atas pertanyaan umum seputar jasa pembuatan website PintuWeb.',
    url: `${SITE}/faq`,
    siteName: 'PintuWeb',
    images: [{ url: '/images/og-pintuweb.png', width: 1200, height: 630, alt: 'PintuWeb — FAQ' }],
    type: 'website',
    locale: 'id_ID',
  },
}

// Dibangun dari data yang sama dengan yang tampil di halaman, jadi schema selalu cocok dengan isi.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

export default function FaqPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Pertanyaan Umum"
        title={<>Semua yang perlu Anda tahu <span className="text-[color:var(--primary-700)]">sebelum memesan.</span></>}
        lead="Biaya, lama pengerjaan, pembayaran, revisi, garansi, dan dukungan setelah website online."
      />
      <FAQ variant="page" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  )
}
