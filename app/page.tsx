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
import Testimonials from './components/Testimonials'
import CTABand from './components/CTABand'
import FAQ from './components/FAQ'
import { faqItems } from './lib/faqData'

const SITE = 'https://pintuweb.com'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Beranda', item: SITE },
    { '@type': 'ListItem', position: 2, name: 'Harga & Paket', item: `${SITE}/paket` },
    { '@type': 'ListItem', position: 3, name: 'Layanan', item: `${SITE}/services` },
  ],
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
        <Testimonials />
        <CTABand />
        <section id="faq"><FAQ /></section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  )
}
