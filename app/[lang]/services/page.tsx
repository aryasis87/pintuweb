import type { Metadata } from 'next'
import Link from 'next/link'
import { Search, LifeBuoy, ArrowRight, MessageCircle } from 'lucide-react'
import PageHero from '../../components/PageHero'
import { Breadcrumbs, HlText, JsonLd } from '../../components/Bits'
import { SERVICES } from '../../content/services'
import { SERVICE_ICONS as ICONS, serviceFrom } from '../../content/service-utils'
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
  const incIcons = [Search, LifeBuoy]

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
      <PageHero tight eyebrow={p.eyebrow} title={<HlText parts={p.h1} />} lead={p.lead} />

      <section aria-label={p.listAria} className="pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon]
            const from = serviceFrom(lang, s)
            const href = pathOf(lang, { key: 'services', service: s.key })
            return (
              <article key={s.key} className="flex flex-col rounded-3xl border border-[color:var(--border-light)] bg-white p-6 shadow-sm sm:p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--primary-100)]">
                  <Icon size={22} className="text-[color:var(--primary-700)]" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-[color:var(--text-primary)]">
                  <Link href={href} className="hover:text-[color:var(--primary-700)]">{s.text[lang].name}</Link>
                </h2>
                <p className="mt-2 flex-1 leading-relaxed text-[color:var(--text-tertiary)]">{s.text[lang].short}</p>
                <p className="mt-5 text-sm text-[color:var(--text-secondary)]">
                  {from ? (
                    <>
                      {p.from} <strong className="text-[color:var(--text-primary)]">{from.price}</strong> · {from.duration}
                    </>
                  ) : (
                    p.priceOnRequest
                  )}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                  <Link href={href} className="inline-flex items-center gap-1.5 text-[color:var(--primary-700)] underline-offset-4 hover:underline">
                    {p.seeDetail} <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            )
          })}

          {/* Selalu termasuk */}
          <article className="flex flex-col rounded-3xl bg-[color:var(--text-primary)] p-6 text-white sm:p-7">
            <h2 className="text-xl font-bold">{p.includedTitle}</h2>
            <ul className="mt-4 space-y-4">
              {p.included.map((i, n) => {
                const Icon = incIcons[n]
                return (
                  <li key={i.title} className="flex gap-3">
                    <Icon size={20} className="mt-0.5 shrink-0 text-[color:var(--accent-200)]" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">{i.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[color:var(--text-on-dark)]">{i.body}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </article>
        </div>
      </section>

      {/* Tabel perbandingan — mudah dikutip mesin pencari & asisten AI */}
      <section aria-labelledby="compare-title" className="relative overflow-hidden py-16 sm:py-20" style={{ backgroundColor: 'var(--surface-primary)' }}>
        <div className="pointer-events-none absolute inset-0 u-grid opacity-60" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <h2 id="compare-title" className="text-center text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">
            <HlText parts={p.compareTitle} />
          </h2>
          <div className="table-wrap mt-10 rounded-3xl border border-[color:var(--border-light)] bg-white shadow-sm" role="region" tabIndex={0} aria-labelledby="compare-title">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">{p.compareCaption}</caption>
              <thead className="bg-[color:var(--surface-primary)] text-[color:var(--text-secondary)]">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold">{p.colService}</th>
                  <th scope="col" className="px-5 py-4 font-semibold">{p.colFor}</th>
                  <th scope="col" className="px-5 py-4 font-semibold">{p.colPrice}</th>
                  <th scope="col" className="px-5 py-4 font-semibold">{p.colTime}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[color:var(--border-light)]">
                {SERVICES.map((s) => {
                  const from = serviceFrom(lang, s)
                  return (
                    <tr key={s.key}>
                      <th scope="row" className="px-5 py-4 font-semibold text-[color:var(--text-primary)]">
                        <Link href={pathOf(lang, { key: 'services', service: s.key })} className="underline-offset-4 hover:text-[color:var(--primary-700)] hover:underline">{s.text[lang].name}</Link>
                      </th>
                      <td className="px-5 py-4 text-[color:var(--text-secondary)]">{s.text[lang].suits}</td>
                      <td className="px-5 py-4 font-semibold text-[color:var(--text-primary)]">{from ? from.price : '—'}</td>
                      <td className="px-5 py-4 text-[color:var(--text-secondary)]">{from ? from.duration : '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {d.common.priceNote && <p className="mt-4 text-center text-xs text-[color:var(--text-tertiary)]">{d.common.priceNote}</p>}
          <p className="mt-6 text-center">
            <Link href={path(lang, 'pricing')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--primary-700)] underline-offset-4 hover:underline">
              {p.seePackages} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-brand px-6 py-14 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute inset-0 u-grid opacity-[0.08]" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold sm:text-4xl">{p.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">{p.ctaLead}</p>
            <a
              href={wa(p.ctaWa)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-[color:var(--primary-800)] shadow-lg transition hover:-translate-y-0.5"
            >
              <MessageCircle size={18} aria-hidden="true" /> {d.common.consultFree}
            </a>
          </div>
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
