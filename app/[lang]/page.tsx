import type { Metadata } from 'next'
import Hero from '../components/Hero'
import AudienceSection from '../components/AudienceSection'
import Process from '../components/Process'
import Portfolio from '../components/Portfolio'
import WhyUs from '../components/WhyUs'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import { JsonLd } from '../components/Bits'
import { faqProps, pricingProps } from '../components/props'
import { faqJsonLd } from '../content/faq'
import { DEMOS } from '../lib/demos'
import { LANG_INFO, getDict, isLang, type Lang } from '../i18n'
import { ogHome, pageGraph, pageMeta } from '../i18n/seo'
import { urlOf } from '../i18n/routes'

type Params = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = getDict(lang).meta
  return pageMeta({
    lang,
    ref: { key: 'home' },
    title: t.homeTitle,
    absoluteTitle: true,
    description: t.homeDescription(DEMOS.length),
    ogDescription: t.ogHomeDescription(DEMOS.length),
    image: ogHome(lang),
  })
}

// Urutan: bukti dulu (karya nyata), lalu untuk siapa, cara kerja, alasan, harga, FAQ. Ajakan penutup ada di footer.
export default async function HomePage({ params }: Params) {
  const lang = (await params).lang as Lang
  const t = getDict(lang)
  const faq = faqProps(lang, 'home')
  return (
    <>
      <main id="main-content">
        <section id="hero" aria-label={t.common.home}><Hero lang={lang} /></section>
        <section id="portfolio"><Portfolio lang={lang} /></section>
        <AudienceSection lang={lang} />
        <Process lang={lang} />
        <WhyUs lang={lang} />
        <section id="pricing"><Pricing {...pricingProps(lang)} /></section>
        <section id="faq"><FAQ {...faq} /></section>
      </main>
      {/* Semua pertanyaan dirender di bagian FAQ (sebagian tersembunyi di balik tab), jadi schema cocok dengan isi. */}
      <JsonLd data={faqJsonLd(faq.items, LANG_INFO[lang].htmlLang)} />
      <JsonLd
        data={pageGraph({
          lang,
          ref: { key: 'home' },
          name: t.meta.homeTitle,
          description: t.meta.homeDescription(DEMOS.length),
          crumbs: [{ name: t.common.home, url: urlOf(lang, { key: 'home' }) }],
        })}
      />
    </>
  )
}
