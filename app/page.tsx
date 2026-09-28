// app/page.tsx
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import Services from './components/Services'
import AudienceSection from './components/AudienceSection'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import WhyUs from './components/WhyUs'
import StatsBand from './components/StatsBand'
import Pricing from './components/Pricing'
import CTABand from './components/CTABand'
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

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <section id="hero" aria-label="Beranda"><Hero /></section>
        <TechMarquee />
        <section id="services"><Services /></section>
        <AudienceSection />
        <Process />
        <section id="portfolio"><Portfolio /></section>
        <WhyUs />
        <StatsBand />
        <section id="pricing"><Pricing /></section>
        <CTABand />
        <section id="faq"><FAQ /></section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}
