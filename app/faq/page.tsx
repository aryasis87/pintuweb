import type { Metadata } from 'next'
import FaqPageContent from './FaqPageContent'

export const metadata: Metadata = {
  title: 'FAQ — Pertanyaan Umum',
  description:
    'Temukan jawaban lengkap tentang biaya pembuatan website, durasi pengerjaan, sistem kerja, revisi, dan dukungan dari tim PintuWeb.',
  keywords: [
    'FAQ PintuWeb',
    'Pertanyaan umum jasa website',
    'Biaya pembuatan website',
    'Lama pengerjaan website',
    'Revisi website',
    'Jasa pembuatan website UMKM',
    'Support website setelah launching'
  ],
  alternates: {
    canonical: 'https://pintuweb.com/faq',
  },
  openGraph: {
    title: 'FAQ – PintuWeb',
    description:
      'Temukan jawaban atas pertanyaan umum seputar layanan pembuatan website profesional dari PintuWeb.',
    url: 'https://pintuweb.com/faq',
    siteName: 'PintuWeb',
    images: [
      {
        url: 'https://pintuweb.com/images/og-pintuweb.png',
        width: 1200,
        height: 630,
        alt: 'Banner FAQ PintuWeb',
      },
    ],
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ – PintuWeb',
    description:
      'Jawaban lengkap seputar biaya, waktu pengerjaan, revisi, dan sistem kerja PintuWeb.',
    site: '@pintuweb', // Aktifkan jika tersedia
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Berapa lama proses pembuatan website di PintuWeb?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rata-rata durasi pengerjaan website adalah 2–4 minggu, tergantung kompleksitas dan kesiapan konten.',
      },
    },
    {
      '@type': 'Question',
      name: 'Apakah ada revisi selama proses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ya, kami menyediakan revisi pada tahap desain dan konten sebelum website diluncurkan.',
      },
    },
    {
      '@type': 'Question',
      name: 'Berapa biaya jasa pembuatan website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Biaya tergantung pada fitur dan tingkat customisasi. Hubungi kami untuk konsultasi dan estimasi gratis.',
      },
    },
    {
      '@type': 'Question',
      name: 'Apakah ada dukungan pasca launching?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Kami menyediakan support dan maintenance selama 30 hari setelah website live.',
      },
    },
  ],
}

export default function FaqPage() {
  return (
<>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
  <FaqPageContent />
</>
  )
}
