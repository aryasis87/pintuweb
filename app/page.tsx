// app/page.tsx
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'

export default function HomePage() {
  return (
    <>
      <main id="main-content" className="scroll-smooth">
        <div id="hero">
          <Hero />
        </div>
        <div id="services">
          <Services />
        </div>
        <div id="portfolio">
          <Portfolio />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
      </main>
    </>
  )
}
