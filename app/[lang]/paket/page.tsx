import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
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
    { title: p.payment, body: f.payment },
    { title: p.afterYear, body: f.renewal },
    { title: p.guarantee, body: f.guarantee },
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
      <PageHero
        tight
        eyebrow={p.eyebrow}
        title={<HlText parts={p.h1} mode="italic" tone="primary" />}
        lead={p.lead(min)}
        aside={
          <>
            {p.updated} {reviewed}
            {d.common.priceNote ? ` · ${d.common.priceNote}` : ''}
          </>
        }
      >
        <nav aria-label={p.groupsNav} className="-mb-2 mt-4">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {groups.map((g, i) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="group inline-flex items-baseline gap-2 py-1 text-[0.9375rem] text-[color:var(--text-secondary)] hover:text-[color:var(--primary-700)]">
                  <span className="mono text-[0.6875rem] text-[color:var(--text-tertiary)]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="underline decoration-[color:var(--neutral-300)] underline-offset-4 group-hover:decoration-current">{g.title}</span>
                  <span className="mono text-[0.6875rem] text-[color:var(--text-tertiary)]">({g.cards.length})</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {groups.map((g, gi) => (
        <section key={g.id} id={g.id} aria-labelledby={`grup-${g.id}`} className="scroll-mt-24 py-14 sm:py-20">
          <div className="mx-auto grid grid-cols-1 max-w-6xl gap-x-10 gap-y-8 px-4 sm:px-6 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="kicker text-[color:var(--primary-700)]">{String(gi + 1).padStart(2, '0')} · {p.count(g.cards.length)}</p>
                <h2 id={`grup-${g.id}`} className="mt-3 text-[2rem] leading-tight text-[color:var(--text-primary)] sm:text-[2.4rem]">{g.title}</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)]">{g.lead}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-9">
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
      <section aria-labelledby="addons-title" className="bg-[color:var(--surface-primary)] py-16 sm:py-24">
        <div className="mx-auto grid grid-cols-1 max-w-6xl gap-x-10 gap-y-8 px-4 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h2 id="addons-title" className="text-[2rem] leading-tight text-[color:var(--text-primary)] sm:text-[2.4rem]">
              <HlText parts={p.addonsTitle} />
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)]">{p.addonsLead}</p>
          </div>
          <div className="table-wrap lg:col-span-9" role="region" tabIndex={0} aria-labelledby="addons-title">
            <table className="w-full min-w-[28rem] text-left">
              <thead>
                <tr className="kicker border-b border-[color:var(--rule)] text-[color:var(--text-tertiary)]">
                  <th scope="col" className="py-3 pr-4 font-medium">{p.colItem}</th>
                  <th scope="col" className="px-4 py-3 font-medium">{p.colRange}</th>
                  <th scope="col" className="py-3 pl-4 font-medium">{p.colUnit}</th>
                </tr>
              </thead>
              <tbody>
                {addons.map((a) => (
                  <tr key={a.slug} className="border-b border-[color:var(--border-medium)]">
                    <th scope="row" className="serif py-5 pr-4 text-[1.3rem] font-medium text-[color:var(--text-primary)]">{a.title}</th>
                    <td className="px-4 py-5 font-semibold text-[color:var(--text-primary)]">{a.range}</td>
                    <td className="py-5 pl-4 text-[color:var(--text-tertiary)]">{a.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="info-title" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 id="info-title" className="text-[2rem] leading-tight text-[color:var(--text-primary)] sm:text-[2.6rem]">
              <HlText parts={p.infoTitle} />
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
            {info.map((i, n) => (
              <div key={i.title} className="border-t border-[color:var(--border-medium)] pt-5">
                <p className="mono text-xs text-[color:var(--primary-700)]">{String(n + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-[1.4rem] leading-snug text-[color:var(--text-primary)]">{i.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)]">{i.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <a href={wa(p.ctaWa)} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              {p.ctaConsult} <ArrowUpRight size={17} className="arw arw-ne" aria-hidden="true" />
            </a>
            <Link href={path(lang, 'faq')} className="btn btn-line">
              {p.readFaq} <ArrowRight size={17} className="arw" aria-hidden="true" />
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
