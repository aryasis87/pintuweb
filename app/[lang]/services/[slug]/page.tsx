import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, ArrowRight, ArrowUpRight, MessageCircle, ChevronDown } from 'lucide-react'
import PageHero from '../../../components/PageHero'
import { Breadcrumbs, HlText, JsonLd } from '../../../components/Bits'
import { SERVICES, serviceOf } from '../../../content/services'
import { SERVICE_ICONS, serviceFrom } from '../../../content/service-utils'
import { articlesIn } from '../../../content/articles'
import { faqJsonLd } from '../../../content/faq'
import { categoriesFor, demosFor, getDict, getPages, isLang, LANG_INFO, type Lang } from '../../../i18n'
import { SERVICE_SLUGS, serviceKeyBySlug } from '../../../i18n/slugs'
import { path, pathOf, urlOf } from '../../../i18n/routes'
import { ORG_ID, pageGraph, pageMeta } from '../../../i18n/seo'
import { PACKAGES } from '../../../lib/packages'
import { portalOf } from '../../../lib/portals'
import { DEMOS } from '../../../lib/demos'
import { wa } from '../../../lib/site'

type Params = { params: Promise<{ lang: string; slug: string }> }

export const dynamicParams = false
export function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!isLang(params.lang)) return []
  const lang = params.lang
  return SERVICES.map((s) => ({ slug: SERVICE_SLUGS[s.key][lang] }))
}

function resolve(lang: string, slug: string) {
  if (!isLang(lang)) return null
  const key = serviceKeyBySlug(lang, slug)
  return key ? { lang, service: serviceOf(key) } : null
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params
  const r = resolve(lang, slug)
  if (!r) return {}
  const t = r.service.text[r.lang]
  return pageMeta({ lang: r.lang, ref: { key: 'services', service: r.service.key }, title: t.title, description: t.description })
}

export default async function ServicePage({ params }: Params) {
  const { lang: rawLang, slug } = await params
  const r = resolve(rawLang, slug)
  if (!r) notFound()
  const lang: Lang = r.lang
  const s = r.service
  const t = s.text[lang]
  const d = getDict(lang)
  const p = getPages(lang).service
  const Icon = SERVICE_ICONS[s.icon]
  const from = serviceFrom(lang, s)
  const ref = { key: 'services' as const, service: s.key }
  const url = urlOf(lang, ref)

  // Fitur: dari paket (packages.ts) bila ada, selain itu dari daftar khusus layanan.
  const features = from ? Array.from(new Set(from.list.flatMap((pk) => pk.features))) : t.includes ?? []

  // Contoh demo: slug pilihan, atau semua demo pada kategori layanan (maks. 6).
  const demos = demosFor(lang)
  const catLabel = Object.fromEntries(categoriesFor(lang).map((c) => [c.id, c.label]))
  const shown = (s.demoSlugs ? s.demoSlugs.map((x) => demos.find((dm) => dm.slug === x)!).filter(Boolean) : demos.filter((dm) => s.demoCategories.includes(dm.category))).slice(0, 6)
  const portals = s.demoCategories.map((c) => ({ c, portal: portalOf(c), n: DEMOS.filter((dm) => dm.category === c).length })).filter((x) => x.portal)

  const related = articlesIn(lang).filter((a) => s.articles.includes(a.key))
  const others = SERVICES.filter((o) => o.key !== s.key)
  const faq = t.faq.map((f) => ({ question: f.q, answer: f.a }))

  const serviceLd: Record<string, unknown> = {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: t.name,
    serviceType: t.title,
    description: t.lead,
    url,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Indonesia' },
    availableLanguage: LANG_INFO[lang].htmlLang,
    ...(from
      ? {
          offers: from.list.map((pk) => {
            const raw = PACKAGES.find((x) => x.slug === pk.slug)!
            return {
              '@type': 'Offer',
              name: pk.title,
              url: urlOf(lang, { key: 'pricing' }),
              priceCurrency: 'IDR',
              price: raw.minPrice,
              priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'IDR', minPrice: raw.minPrice, ...(raw.openEnded ? {} : { maxPrice: raw.maxPrice }) },
            }
          }),
        }
      : {}),
  }

  return (
    <main id="main-content">
      <Breadcrumbs
        label={d.common.breadcrumb}
        items={[{ name: d.common.home, href: path(lang, 'home') }, { name: p.breadcrumbServices, href: path(lang, 'services') }, { name: t.name }]}
      />
      <PageHero tight eyebrow={t.name} title={<HlText parts={t.h1} />} lead={t.lead}>
        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a href={wa(p.ctaWa(t.name))} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-md">
            <MessageCircle size={17} aria-hidden="true" /> {d.common.consultFree}
          </a>
          {from && (
            <span className="text-sm text-[color:var(--text-secondary)]">
              {getPages(lang).services.from} <strong className="text-[color:var(--text-primary)]">{from.price}</strong> · {from.duration}
            </span>
          )}
        </div>
      </PageHero>

      {/* Pengantar + untuk siapa */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-12">
          <div className="space-y-4 text-lg leading-relaxed text-[color:var(--text-tertiary)] lg:col-span-7">
            {t.intro.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <div className="rounded-3xl border border-[color:var(--border-light)] bg-white p-6 shadow-sm lg:col-span-5 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--primary-100)]">
                <Icon size={20} className="text-[color:var(--primary-700)]" aria-hidden="true" />
              </span>
              <h2 className="text-lg font-bold text-[color:var(--text-primary)]">{p.forWho}</h2>
            </div>
            <ul className="mt-5 space-y-3">
              {t.forWho.map((w) => (
                <li key={w} className="flex items-start gap-2.5 text-[color:var(--text-secondary)]">
                  <Check size={17} strokeWidth={2.5} className="mt-1 shrink-0 text-[color:var(--success-700)]" aria-hidden="true" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Yang didapat + harga */}
      <section aria-labelledby="included-title" className="relative overflow-hidden py-16 sm:py-20" style={{ backgroundColor: 'var(--surface-primary)' }}>
        <div className="pointer-events-none absolute inset-0 u-grid opacity-60" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 id="included-title" className="text-2xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-3xl">{p.included}</h2>
            <ul className="mt-6 grid gap-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 rounded-2xl border border-[color:var(--border-light)] bg-white px-4 py-3 text-[color:var(--text-secondary)]">
                  <Check size={17} strokeWidth={2.5} className="mt-0.5 shrink-0 text-[color:var(--primary-700)]" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-3xl">{p.pricing}</h2>
            {from ? (
              <>
                <div className="table-wrap mt-6 rounded-3xl border border-[color:var(--border-light)] bg-white shadow-sm" role="region" tabIndex={0} aria-label={p.pricingCaption(t.name)}>
                  <table className="w-full min-w-[30rem] text-left text-sm">
                    <caption className="sr-only">{p.pricingCaption(t.name)}</caption>
                    <thead className="bg-[color:var(--surface-primary)] text-[color:var(--text-secondary)]">
                      <tr>
                        <th scope="col" className="px-5 py-4 font-semibold">{p.colPackage}</th>
                        <th scope="col" className="px-5 py-4 font-semibold">{p.colRange}</th>
                        <th scope="col" className="px-5 py-4 font-semibold">{p.colDeposit}</th>
                        <th scope="col" className="px-5 py-4 font-semibold">{p.colTime}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[color:var(--border-light)]">
                      {from.list.map((pk) => (
                        <tr key={pk.slug}>
                          <th scope="row" className="px-5 py-4 font-semibold text-[color:var(--text-primary)]">{pk.title}</th>
                          <td className="px-5 py-4 text-[color:var(--text-primary)]">{pk.priceRange}</td>
                          <td className="px-5 py-4 text-[color:var(--text-secondary)]">{pk.deposit}</td>
                          <td className="px-5 py-4 text-[color:var(--text-secondary)]">{pk.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {d.common.priceNote && <p className="mt-3 text-xs text-[color:var(--text-tertiary)]">{d.common.priceNote}</p>}
                <Link href={path(lang, 'pricing')} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--primary-700)] underline-offset-4 hover:underline">
                  {p.seePricing} <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </>
            ) : (
              <div className="mt-6 rounded-3xl border border-[color:var(--border-light)] bg-white p-6 shadow-sm">
                <p className="leading-relaxed text-[color:var(--text-secondary)]">{p.priceOnRequest}</p>
                <a href={wa(p.ctaWa(t.name))} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-sm">
                  <MessageCircle size={17} aria-hidden="true" /> {d.common.consultFree}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cara kerja ringkas */}
      <section aria-labelledby="how-title" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="how-title" className="text-2xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-3xl">{p.process}</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.process.steps.map((st, i) => (
              <li key={st.title} className="rounded-2xl border border-[color:var(--border-light)] bg-white p-5">
                <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[color:var(--accent-500)]" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-bold text-[color:var(--text-primary)]">{st.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[color:var(--text-tertiary)]">{st.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contoh demo */}
      {shown.length > 0 && (
        <section aria-labelledby="demos-title" className="relative overflow-hidden py-16 sm:py-20" style={{ backgroundColor: 'var(--surface-primary)' }}>
          <div className="pointer-events-none absolute inset-0 u-grid opacity-60" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="demos-title" className="text-2xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-3xl">{p.demos}</h2>
            <p className="mt-2 max-w-2xl text-[color:var(--text-tertiary)]">{p.demosLead}</p>
            {d.common.demoLangNote && <p className="mt-1 text-sm text-[color:var(--text-tertiary)]">{d.common.demoLangNote}</p>}
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {shown.map((dm) => (
                <li key={dm.slug}>
                  <a href={dm.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--border-light)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--card-shadow-hover)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/demos/${dm.slug}.webp`} alt="" width={720} height={378} loading="lazy" decoding="async" className="aspect-[1200/630] w-full object-cover object-top" />
                    <span className="flex flex-1 flex-col p-3 sm:p-4">
                      <span className="flex items-start justify-between gap-2 text-sm font-bold text-[color:var(--text-primary)] sm:text-base">
                        {dm.name}
                        <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-[color:var(--text-muted)] group-hover:text-[color:var(--primary-700)]" aria-hidden="true" />
                      </span>
                      <span className="mt-1 line-clamp-2 text-xs text-[color:var(--text-tertiary)] sm:text-sm">{dm.tagline}</span>
                      <span className="sr-only">{d.common.newTab}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            {portals.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-3">
                {portals.map(({ c, portal, n }) => (
                  <li key={c}>
                    <a href={`/${portal!.path}`} hrefLang="id" className="inline-flex items-center gap-1.5 rounded-xl border border-[color:var(--border-light)] bg-white px-4 py-2.5 text-sm font-semibold text-[color:var(--primary-700)] transition hover:-translate-y-0.5 hover:shadow-md">
                      {p.portal(n, catLabel[c])} <ArrowRight size={15} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* FAQ layanan */}
      <section aria-labelledby="sfaq-title" className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 id="sfaq-title" className="text-2xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-3xl">{p.faq}</h2>
          <div className="mt-8 space-y-3">
            {t.faq.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-[color:var(--border-light)] bg-white shadow-sm open:border-[color:var(--primary-200)] open:bg-[color:var(--primary-50)]">
                <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-4 text-left sm:px-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="flex-1 font-semibold leading-snug text-[color:var(--text-primary)]">{f.q}</h3>
                  <ChevronDown size={20} className="mt-0.5 shrink-0 text-[color:var(--text-muted)] transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="border-t border-[color:var(--primary-200)] px-5 pb-5 pt-4 leading-relaxed text-[color:var(--text-secondary)] sm:px-6">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bacaan terkait + layanan lain */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          {related.length > 0 && (
            <div>
              <h2 className="text-xl font-extrabold text-[color:var(--text-primary)]">{p.readArticles}</h2>
              <ul className="mt-5 space-y-3">
                {related.map((a) => (
                  <li key={a.key}>
                    <Link href={pathOf(lang, { key: 'articles', article: a.key })} className="block rounded-2xl border border-[color:var(--border-light)] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                      <span className="font-semibold text-[color:var(--text-primary)]">{a.title}</span>
                      <span className="mt-1 block text-sm text-[color:var(--text-tertiary)]">{a.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h2 className="text-xl font-extrabold text-[color:var(--text-primary)]">{p.other}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {others.map((o) => (
                <li key={o.key}>
                  <Link href={pathOf(lang, { key: 'services', service: o.key })} className="flex h-full items-center justify-between gap-3 rounded-2xl border border-[color:var(--border-light)] bg-white px-4 py-3 text-sm font-semibold text-[color:var(--text-secondary)] transition hover:border-[color:var(--primary-300)] hover:text-[color:var(--primary-700)]">
                    {o.text[lang].name} <ArrowRight size={15} aria-hidden="true" className="shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Ajakan */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-brand px-6 py-14 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute inset-0 u-grid opacity-[0.08]" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold sm:text-4xl">{p.ctaTitle(t.name)}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">{p.ctaLead}</p>
            <a href={wa(p.ctaWa(t.name))} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-[color:var(--primary-800)] shadow-lg transition hover:-translate-y-0.5">
              <MessageCircle size={18} aria-hidden="true" /> {d.common.consultFree}
            </a>
          </div>
        </div>
      </section>

      <JsonLd data={faqJsonLd(faq, LANG_INFO[lang].htmlLang)} />
      <JsonLd
        data={pageGraph({
          lang,
          ref,
          name: t.title,
          description: t.description,
          crumbs: [
            { name: d.common.home, url: urlOf(lang, { key: 'home' }) },
            { name: p.breadcrumbServices, url: urlOf(lang, { key: 'services' }) },
            { name: t.name, url },
          ],
          extra: [serviceLd],
        })}
      />
    </main>
  )
}
