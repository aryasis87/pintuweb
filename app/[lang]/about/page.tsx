import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import PageHero from '../../components/PageHero'
import { Breadcrumbs, HlText, JsonLd } from '../../components/Bits'
import { DEMOS } from '../../lib/demos'
import { CATEGORY_COUNT, CLIENT_PROJECTS, FOUNDED_YEAR, wa } from '../../lib/site'
import { facts, packagesFor } from '../../i18n/facts'
import { getDict, getPages, isLang, type Lang } from '../../i18n'
import { path, urlOf } from '../../i18n/routes'
import { FOUNDER_ID, ORG_ID, pageGraph, pageMeta } from '../../i18n/seo'

type Params = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const p = getPages(lang).about
  return pageMeta({ lang, ref: { key: 'about' }, title: p.title, description: p.description, ogTitle: p.ogTitle, ogDescription: p.ogDescription(DEMOS.length) })
}

export default async function AboutPage({ params }: Params) {
  const lang = (await params).lang as Lang
  const d = getDict(lang)
  const p = getPages(lang).about
  const f = facts(lang)
  const pk = packagesFor(lang)
  const landing = pk.find((x) => x.slug === 'landing-page')!.duration
  const business = pk.find((x) => x.slug === 'standar-umkm')!.duration
  const n = DEMOS.length

  const stats = [
    { v: CLIENT_PROJECTS, l: p.stats.projects },
    { v: `${n}`, l: p.stats.demos },
    { v: `${FOUNDED_YEAR}`, l: p.stats.since },
    { v: `${CATEGORY_COUNT}`, l: p.stats.categories },
  ]

  return (
    <main id="main-content">
      <Breadcrumbs label={d.common.breadcrumb} items={[{ name: d.common.home, href: path(lang, 'home') }, { name: p.eyebrow }]} />
      <PageHero tight eyebrow={p.eyebrow} title={<HlText parts={p.h1} mode="italic" tone="primary" />} lead={p.lead}>
        <dl className="mt-4 grid grid-cols-2 border-t border-[color:var(--border-light)] sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="flex flex-col-reverse border-b border-[color:var(--border-light)] py-4 pr-4 sm:border-b-0 sm:border-r sm:pl-5 sm:first:pl-0 sm:last:border-r-0">
              <dt className="kicker mt-1 text-[color:var(--text-tertiary)]">{s.l}</dt>
              <dd className="serif text-[2.6rem] leading-none text-[color:var(--text-primary)]">{s.v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Cerita + linimasa */}
      <section aria-labelledby="story-title" className="py-16 sm:py-24">
        <div className="mx-auto grid grid-cols-1 max-w-6xl items-start gap-x-10 gap-y-12 px-4 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="story-title" className="text-[2rem] leading-tight text-[color:var(--text-primary)] sm:text-[2.6rem]">{p.storyTitle}</h2>
            <div className="mt-6 space-y-5 text-[1.0625rem] leading-relaxed text-[color:var(--text-secondary)]">
              {p.story(n).map((s, i) => (
                <p key={s} className={i === 0 ? 'serif text-[1.4rem] leading-snug text-[color:var(--text-primary)]' : undefined}>{s}</p>
              ))}
            </div>
          </div>
          <ol className="border-t border-[color:var(--rule)] lg:col-span-5 lg:col-start-8">
            {p.timeline(n).map((t) => (
              <li key={t.year} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-[color:var(--border-light)] py-5">
                <p className="mono pt-1 text-xs text-[color:var(--primary-700)]">{t.year}</p>
                <div>
                  <h3 className="text-[1.3rem] leading-snug text-[color:var(--text-primary)]">{t.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)]">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Visi, misi, fokus + nilai */}
      <section aria-labelledby="belief-title" className="bg-[color:var(--surface-primary)] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-x-10 gap-y-4 border-t border-[color:var(--rule)] pt-5 lg:grid-cols-12">
            <p className="kicker text-[color:var(--text-tertiary)] lg:col-span-3">{p.eyebrow}</p>
            <h2 id="belief-title" className="text-[2rem] leading-tight text-[color:var(--text-primary)] sm:text-[2.6rem] lg:col-span-9">
              <HlText parts={p.beliefTitle} />
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
            {p.beliefs.map((b, i) => (
              <div key={b.title} className="border-t border-[color:var(--border-medium)] pt-5">
                <p className="mono text-xs text-[color:var(--primary-700)]">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-[1.5rem] leading-snug text-[color:var(--text-primary)]">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-[color:var(--text-tertiary)]">{b.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
            {p.values.map((v) => (
              <div key={v.title} className="border-l border-[color:var(--primary-700)] pl-5">
                <h3 className="kicker text-[color:var(--text-primary)]">{v.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mengapa */}
      <section aria-labelledby="why-title" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-x-10 gap-y-4 border-t border-[color:var(--rule)] pt-5 lg:grid-cols-12">
            <p className="kicker text-[color:var(--text-tertiary)] lg:col-span-3">PintuWeb</p>
            <h2 id="why-title" className="text-[2rem] leading-tight text-[color:var(--text-primary)] sm:text-[2.6rem] lg:col-span-9">{p.whyTitle}</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:ml-[calc(25%+0.6rem)]">
            {p.why(landing, business, f.response).map((w, i) => (
              <div key={w.title} className="border-t border-[color:var(--border-medium)] py-6">
                <p className="mono text-xs text-[color:var(--primary-700)]">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-[1.4rem] leading-snug text-[color:var(--text-primary)]">{w.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)]">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ajakan */}
      <section className="bg-[color:var(--primary-700)] py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[2.2rem] leading-[1.08] sm:text-5xl">{p.ctaTitle}</h2>
            <p className="mt-4 text-lg text-white/85">{p.ctaLead}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <a href={wa(p.ctaWa)} target="_blank" rel="noopener noreferrer" className="btn btn-white">
              {d.common.consultFree} <ArrowUpRight size={17} className="arw arw-ne" aria-hidden="true" />
            </a>
            <Link href={path(lang, 'demo')} className="btn btn-ghost-dark">
              {p.ctaDemos(n)} <ArrowRight size={17} className="arw" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <JsonLd
        data={pageGraph({
          lang,
          ref: { key: 'about' },
          name: p.title,
          description: p.description,
          type: 'AboutPage',
          crumbs: [
            { name: d.common.home, url: urlOf(lang, { key: 'home' }) },
            { name: p.eyebrow, url: urlOf(lang, { key: 'about' }) },
          ],
          extra: [{ '@id': ORG_ID, founder: { '@id': FOUNDER_ID } }],
        })}
      />
    </main>
  )
}
