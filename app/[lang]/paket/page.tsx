import type { Metadata } from 'next'
import Link from 'next/link'
import { Wallet, CalendarClock, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react'
import PageHero from '../../components/PageHero'
import PackageCard from '../../components/PackageCard'
import { Breadcrumbs, HlText, JsonLd } from '../../components/Bits'
import { cardsFor } from '../../components/cards'
import { PACKAGE_GROUP_TEXT } from '../../content/packages-text'
import { addonsFor, facts, minPrice, money } from '../../i18n/facts'
import { getDict, getPages, isLang, type Lang } from '../../i18n'
import { path, urlOf } from '../../i18n/routes'
import { ORG_ID, pageGraph, pageMeta } from '../../i18n/seo'
import { PACKAGES, PACKAGE_GROUPS } from '../../lib/packages'
import { wa } from '../../lib/site'

type Params = { params: Promise<{ lang: string }> }

/** Tanggal harga terakhir ditinjau (tampil di halaman & dateModified). */
const PRICES_REVIEWED = '2026-10-03'

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const p = getPages(lang).pricing
  const min = money(lang, minPrice())
  return pageMeta({ lang, ref: { key: 'pricing' }, title: p.title, description: p.description(min, PACKAGES.length), ogTitle: p.ogTitle, ogDescription: p.ogDescription(min) })
}

export default async function PaketPage({ params }: Params) {
  const lang = (await params).lang as Lang
  const d = getDict(lang)
  const p = getPages(lang).pricing
  const f = facts(lang)
  const min = money(lang, minPrice())
  const { cards, labels } = cardsFor(lang)
  const groups = PACKAGE_GROUPS.map((g) => ({ id: g, ...PACKAGE_GROUP_TEXT[lang][g], cards: cards.filter((c) => c.group === g) })).filter((g) => g.cards.length)
  const addons = addonsFor(lang)
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
    itemListElement: groups.map((g) => ({
      '@type': 'OfferCatalog',
      name: g.title,
      itemListElement: g.cards.map((c) => {
        const raw = PACKAGES.find((x) => x.slug === c.slug)!
        return {
          '@type': 'Offer',
          name: c.title,
          description: c.subtitle,
          url: `${urlOf(lang, { key: 'pricing' })}#${c.slug}`,
          seller: { '@id': ORG_ID },
          priceCurrency: 'IDR',
          price: raw.minPrice,
          priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'IDR', minPrice: raw.minPrice, ...(raw.openEnded ? {} : { maxPrice: raw.maxPrice }) },
        }
      }),
    })),
  }

  return (
    <main id="main-content">
      <Breadcrumbs label={d.common.breadcrumb} items={[{ name: d.common.home, href: path(lang, 'home') }, { name: d.nav.pricing }]} />
      <PageHero tight eyebrow={p.eyebrow} title={<HlText parts={p.h1} />} lead={p.lead(min)}>
        <nav aria-label={p.groupsNav} className="flex flex-wrap justify-center gap-2">
          {groups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border-light)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--text-secondary)] shadow-sm transition hover:border-[color:var(--primary-300)] hover:text-[color:var(--primary-700)]">
              {g.title} <span className="font-normal text-[color:var(--text-muted)]">{g.cards.length}</span>
            </a>
          ))}
        </nav>
        <p className="mt-5 text-xs text-[color:var(--text-tertiary)]">
          {p.updated} {reviewed}
          {d.common.priceNote ? ` · ${d.common.priceNote}` : ''}
        </p>
      </PageHero>

      {groups.map((g, gi) => (
        <section
          key={g.id}
          id={g.id}
          aria-labelledby={`grup-${g.id}`}
          className="relative scroll-mt-24 py-12 sm:py-16"
          style={gi % 2 ? { backgroundColor: 'var(--surface-primary)' } : undefined}
        >
          {gi % 2 ? <div className="pointer-events-none absolute inset-0 u-grid opacity-60" aria-hidden="true" /> : null}
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[color:var(--border-medium)] pb-4">
              <div>
                <h2 id={`grup-${g.id}`} className="text-2xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-3xl">{g.title}</h2>
                <p className="mt-1 text-[color:var(--text-tertiary)]">{g.lead}</p>
              </div>
              <span className="rounded-full bg-[color:var(--primary-50)] px-3 py-1 text-xs font-bold text-[color:var(--primary-700)]">{p.count(g.cards.length)}</span>
            </div>
            <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {g.cards.map((c) => (
                <div key={c.slug} id={c.slug} className="scroll-mt-28">
                  <PackageCard p={c} labels={labels} as="h3" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Biaya tambahan */}
      <section aria-labelledby="addons-title" className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 id="addons-title" className="text-center text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">
            <HlText parts={p.addonsTitle} />
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[color:var(--text-tertiary)]">{p.addonsLead}</p>
          <div className="table-wrap mt-8 rounded-3xl border border-[color:var(--border-light)] bg-white shadow-sm" role="region" tabIndex={0} aria-labelledby="addons-title">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <thead className="bg-[color:var(--surface-primary)] text-[color:var(--text-secondary)]">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold">{p.colItem}</th>
                  <th scope="col" className="px-5 py-4 font-semibold">{p.colRange}</th>
                  <th scope="col" className="px-5 py-4 font-semibold">{p.colUnit}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[color:var(--border-light)]">
                {addons.map((a) => (
                  <tr key={a.slug}>
                    <th scope="row" className="px-5 py-4 font-semibold text-[color:var(--text-primary)]">{a.title}</th>
                    <td className="px-5 py-4 text-[color:var(--text-primary)]">{a.range}</td>
                    <td className="px-5 py-4 text-[color:var(--text-secondary)]">{a.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          description: p.description(min, PACKAGES.length),
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
