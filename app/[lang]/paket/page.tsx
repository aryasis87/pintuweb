import type { Metadata } from 'next'
import Link from 'next/link'
import { Wallet, CalendarClock, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react'
import PageHero from '../../components/PageHero'
import PackageCard from '../../components/PackageCard'
import { Breadcrumbs, HlText, JsonLd } from '../../components/Bits'
import { cardsFor } from '../../components/cards'
import { facts, minPrice, money } from '../../i18n/facts'
import { getDict, getPages, isLang, type Lang } from '../../i18n'
import { path, urlOf } from '../../i18n/routes'
import { ORG_ID, pageGraph, pageMeta } from '../../i18n/seo'
import { PACKAGES } from '../../lib/packages'
import { wa } from '../../lib/site'

type Params = { params: Promise<{ lang: string }> }

/** Tanggal harga terakhir ditinjau (tampil di halaman & dateModified). */
const PRICES_REVIEWED = '2026-10-03'

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const p = getPages(lang).pricing
  const min = money(lang, minPrice())
  return pageMeta({ lang, ref: { key: 'pricing' }, title: p.title, description: p.description(min), ogTitle: p.ogTitle, ogDescription: p.ogDescription(min) })
}

export default async function PaketPage({ params }: Params) {
  const lang = (await params).lang as Lang
  const d = getDict(lang)
  const p = getPages(lang).pricing
  const f = facts(lang)
  const min = money(lang, minPrice())
  const { cards, labels } = cardsFor(lang)
  const reviewed = new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : lang === 'ms' ? 'ms-MY' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(PRICES_REVIEWED))

  const info = [
    { icon: Wallet, title: p.payment, body: f.payment },
    { icon: CalendarClock, title: p.afterYear, body: f.renewal },
    { icon: ShieldCheck, title: p.guarantee, body: f.guarantee },
  ]

  const offers = {
    '@type': 'OfferCatalog',
    '@id': `${urlOf(lang, { key: 'pricing' })}#offers`,
    name: p.title,
    itemListElement: cards.map((c) => {
      const raw = PACKAGES.find((x) => x.slug === c.slug)!
      return {
        '@type': 'Offer',
        name: c.title,
        description: c.subtitle,
        url: urlOf(lang, { key: 'pricing' }),
        seller: { '@id': ORG_ID },
        priceCurrency: 'IDR',
        price: raw.minPrice,
        priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'IDR', minPrice: raw.minPrice, ...(raw.openEnded ? {} : { maxPrice: raw.maxPrice }) },
      }
    }),
  }

  return (
    <main id="main-content">
      <Breadcrumbs label={d.common.breadcrumb} items={[{ name: d.common.home, href: path(lang, 'home') }, { name: d.nav.pricing }]} />
      <PageHero tight eyebrow={p.eyebrow} title={<HlText parts={p.h1} />} lead={p.lead(min)}>
        <p className="text-xs text-[color:var(--text-tertiary)]">
          {p.updated} {reviewed}
          {d.common.priceNote ? ` · ${d.common.priceNote}` : ''}
        </p>
      </PageHero>

      <section aria-label={p.listAria} className="relative pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-6xl gap-x-6 gap-y-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {cards.map((c) => (
            <PackageCard key={c.slug} p={c} labels={labels} as="h2" />
          ))}
        </div>
      </section>

      <section aria-labelledby="info-title" className="relative overflow-hidden py-16 sm:py-20" style={{ backgroundColor: 'var(--surface-primary)' }}>
        <div className="pointer-events-none absolute inset-0 u-grid opacity-60" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="info-title" className="text-center text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">
            <HlText parts={p.infoTitle} />
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {info.map((i) => (
              <div key={i.title} className="rounded-2xl border border-[color:var(--border-light)] bg-white p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--primary-100)]">
                  <i.icon size={20} className="text-[color:var(--primary-700)]" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold text-[color:var(--text-primary)]">{i.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-tertiary)]">{i.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a href={wa(p.ctaWa)} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-md">
              <MessageCircle size={17} aria-hidden="true" /> {p.ctaConsult}
            </a>
            <Link href={path(lang, 'faq')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--border-medium)] bg-white px-6 py-3.5 text-sm font-semibold text-[color:var(--text-secondary)] transition hover:border-[color:var(--primary-700)] hover:text-[color:var(--primary-700)]">
              {p.readFaq} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <JsonLd
        data={pageGraph({
          lang,
          ref: { key: 'pricing' },
          name: p.title,
          description: p.description(min),
          crumbs: [
            { name: d.common.home, url: urlOf(lang, { key: 'home' }) },
            { name: d.nav.pricing, url: urlOf(lang, { key: 'pricing' }) },
          ],
          dates: { modified: PRICES_REVIEWED },
          extra: [offers],
        })}
      />
    </main>
  )
}
