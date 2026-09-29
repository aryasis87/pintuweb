// app/page.tsx
import Hero from './components/Hero'
import AudienceSection from './components/AudienceSection'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import WhyUs from './components/WhyUs'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import { faqItems } from './lib/faqData'

// Semua pertanyaan dirender di bagian FAQ (sebagian tersembunyi di balik tab), jadi schema cocok dengan isi.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

// Urutan: bukti dulu (karya nyata), lalu untuk siapa, cara kerja, alasan, harga, FAQ. Ajakan penutup ada di footer.
export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <section id="hero" aria-label="Beranda"><Hero /></section>
        <section id="portfolio"><Portfolio /></section>
        <AudienceSection />
        <Process />
        <WhyUs />
        <section id="pricing"><Pricing /></section>
        <section id="faq"><FAQ /></section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}
