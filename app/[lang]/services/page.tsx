import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import PageHero from '../../components/PageHero'
import { Breadcrumbs, HlText, JsonLd } from '../../components/Bits'
import { SERVICES } from '../../content/services'
import { serviceFrom } from '../../content/service-utils'
import { getDict, getPages, isLang, type Lang } from '../../i18n'
import { path, pathOf, urlOf } from '../../i18n/routes'
import { ORG_ID, pageGraph, pageMeta } from '../../i18n/seo'
import { wa } from '../../lib/site'

type Params = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const p = getPages(lang).services
  return pageMeta({ lang, ref: { key: 'services' }, title: p.title, description: p.description, ogTitle: p.ogTitle, ogDescription: p.ogDescription })
}

export default async function ServicesPage({ params }: Params) {
  const lang = (await params).lang as Lang
  const d = getDict(lang)
  const p = getPages(lang).services

  const jsonLd = {
    '@type': 'Service',
    '@id': `${urlOf(lang, { key: 'services' })}#service`,
    serviceType: p.title,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Indonesia' },
    url: urlOf(lang, { key: 'services' }),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: p.ogTitle,
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        url: urlOf(lang, { key: 'services', service: s.key }),
        itemOffered: { '@type': 'Service', name: s.text[lang].name, description: s.text[lang].short },
      })),
    },
  }

  return (
    <main id="main-content">
      <Breadcrumbs label={d.common.breadcrumb} items={[{ name: d.common.home, href: path(lang, 'home') }, { name: p.eyebrow }]} />
      <PageHero tight eyebrow={p.eyebrow} title={<HlText parts={p.h1} mode="italic" tone="primary" />} lead={p.lead} />

      {/* Indeks layanan: nomor · nama · ringkasan · harga mulai */}
      <section aria-label={p.listAria} className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ol>
            {SERVICES.map((s, i) => {
              const from = serviceFrom(lang, s)
              const href = pathOf(lang, { key: 'services', service: s.key })
              return (
                <li key={s.key} className="border-b border-[color:var(--border-medium)]">
                  <Link href={href} className="group grid grid-cols-1 gap-x-8 gap-y-2 py-7 sm:grid-cols-12 sm:items-baseline">
                    <span className="mono text-xs text-[color:var(--primary-700)] sm:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                    <h2 className="text-[1.6rem] leading-tight text-[color:var(--text-primary)] group-hover:text-[color:var(--primary-700)] sm:col-span-5 sm:text-[1.85rem]">{s.text[lang].name}</h2>
                    <span className="text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)] sm:col-span-4">{s.text[lang].short}</span>
                    <span className="flex items-baseline justify-between gap-3 sm:col-span-2 sm:flex-col sm:items-end sm:gap-1">
                      <span className="mono text-xs text-[color:var(--text-secondary)] sm:text-right">
                        {from ? (
                          <>
                            {p.from} <span className="text-[color:var(--text-primary)]">{from.price}</span>
                          </>
                        ) : (
                          p.priceOnRequest
                        )}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--primary-700)]">
                        {p.seeDetail} <ArrowRight size={15} className="arw" aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ol>

          {/* Selalu termasuk */}
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
            <h2 className="kicker text-[color:var(--text-primary)] lg:col-span-3">{p.includedTitle}</h2>
            {p.included.map((i, n) => (
              <div key={i.title} className="border-t border-[color:var(--border-medium)] pt-5 lg:col-span-4">
                <p className="mono text-xs text-[color:var(--primary-700)]">{String(n + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-[1.4rem] leading-snug text-[color:var(--text-primary)]">{i.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)]">{i.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabel perbandingan — mudah dikutip mesin pencari & asisten AI */}
      <section aria-labelledby="compare-title" className="bg-[color:var(--surface-primary)] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="kicker text-[color:var(--primary-700)]">{p.colPrice}</p>
            <h2 id="compare-title" className="mt-3 text-[2rem] leading-tight text-[color:var(--text-primary)] sm:text-[2.25rem]">
              <HlText parts={p.compareTitle} />
            </h2>
          </div>
          <div className="table-wrap mt-10" role="region" tabIndex={0} aria-labelledby="compare-title">
            <table className="w-full min-w-[40rem] text-left">
              <caption className="sr-only">{p.compareCaption}</caption>
              <thead>
                <tr className="kicker border-b border-[color:var(--rule)] text-[color:var(--text-tertiary)]">
                  <th scope="col" className="py-3 pr-4 font-medium">{p.colService}</th>
                  <th scope="col" className="px-4 py-3 font-medium">{p.colFor}</th>
                  <th scope="col" className="px-4 py-3 font-medium">{p.colPrice}</th>
                  <th scope="col" className="py-3 pl-4 font-medium">{p.colTime}</th>
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((s) => {
                  const from = serviceFrom(lang, s)
                  return (
                    <tr key={s.key} className="border-b border-[color:var(--border-medium)]">
                      <th scope="row" className="py-4 pr-4 font-medium">
                        <Link href={pathOf(lang, { key: 'services', service: s.key })} className="display text-[1.2rem] text-[color:var(--text-primary)] underline-offset-4 hover:text-[color:var(--primary-700)] hover:underline">{s.text[lang].name}</Link>
                      </th>
                      <td className="px-4 py-4 text-[0.9375rem] text-[color:var(--text-secondary)]">{s.text[lang].suits}</td>
                      <td className="px-4 py-4 font-semibold text-[color:var(--text-primary)]">{from ? from.price : '—'}</td>
                      <td className="py-4 pl-4 text-[0.9375rem] text-[color:var(--text-secondary)]">{from ? from.duration : '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {d.common.priceNote && <p className="mt-4 text-xs text-[color:var(--text-tertiary)]">{d.common.priceNote}</p>}
          <p className="mt-8">
            <Link href={path(lang, 'pricing')} className="link inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold">
              {p.seePackages} <ArrowRight size={15} className="arw" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-[color:var(--primary-700)] py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[2.2rem] leading-[1.08] sm:text-5xl">{p.ctaTitle}</h2>
            <p className="mt-4 text-lg text-white/85">{p.ctaLead}</p>
          </div>
          <a href={wa(p.ctaWa)} target="_blank" rel="noopener noreferrer" className="btn btn-white shrink-0">
            {d.common.consultFree} <ArrowUpRight size={17} className="arw arw-ne" aria-hidden="true" />
          </a>
        </div>
      </section>

      <JsonLd
        data={pageGraph({
          lang,
          ref: { key: 'services' },
          name: p.title,
          description: p.description,
          type: 'CollectionPage',
          crumbs: [
            { name: d.common.home, url: urlOf(lang, { key: 'home' }) },
            { name: p.eyebrow, url: urlOf(lang, { key: 'services' }) },
          ],
          extra: [jsonLd],
        })}
      />
    </main>
  )
}
