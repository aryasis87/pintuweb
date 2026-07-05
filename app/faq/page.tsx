import type { Metadata } from 'next'
import FaqPageContent from './FaqPageContent'

export const metadata: Metadata = {
  title: 'FAQ – Pertanyaan Umum tentang Layanan Pintu Web',
  description:
    'Temukan jawaban lengkap tentang biaya pembuatan website, durasi pengerjaan, sistem kerja, revisi, dan dukungan dari tim Pintu Web.',
  keywords: [
    'FAQ Pintu Web',
    'Pertanyaan umum jasa website',
    'Biaya pembuatan website',
    'Lama pengerjaan website',
    'Revisi website',
    'Jasa pembuatan website UMKM',
    'Support website setelah launching'
  ],
  alternates: {
    canonical: 'https://pintuweb.id/faq',
  },
  openGraph: {
    title: 'FAQ – Pintu Web',
    description:
      'Temukan jawaban atas pertanyaan umum seputar layanan pembuatan website profesional dari Pintu Web.',
    url: 'https://pintuweb.id/faq',
    siteName: 'Pintu Web',
    images: [
      {
        url: 'https://pintuweb.id/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Banner FAQ Pintu Web',
      },
    ],
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ – Pintu Web',
    description:
      'Jawaban lengkap seputar biaya, waktu pengerjaan, revisi, dan sistem kerja Pintu Web.',
    site: '@pintuweb', // Aktifkan jika tersedia
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Berapa lama proses pembuatan website di Pintu Web?',
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
    }),
  },
}

export default function FaqPage() {
  return <FaqPageContent />
}
