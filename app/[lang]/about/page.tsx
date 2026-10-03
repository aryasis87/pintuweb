import type { Metadata } from 'next'
import Link from 'next/link'
import { Rocket, Target, Compass, Users, Sparkles, ShieldCheck, Gauge, Timer, Wallet, LifeBuoy, MessageCircle, ArrowRight } from 'lucide-react'
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
  const beliefIcons = [Rocket, Target, Compass]
  const valueIcons = [Users, Sparkles, ShieldCheck]
  const whyIcons = [Gauge, Timer, Wallet, LifeBuoy]

  return (
    <main id="main-content">
      <Breadcrumbs label={d.common.breadcrumb} items={[{ name: d.common.home, href: path(lang, 'home') }, { name: p.eyebrow }]} />
      <PageHero tight eyebrow={p.eyebrow} title={<HlText parts={p.h1} />} lead={p.lead}>
        <dl className="mx-auto grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-[color:var(--text-tertiary)]">{s.l}</dt>
              <dd className="text-3xl font-extrabold text-[color:var(--primary-700)]" style={{ fontFamily: 'var(--font-display)' }}>{s.v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Cerita */}
      <section aria-labelledby="story-title" className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 id="story-title" className="text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">{p.storyTitle}</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-[color:var(--text-tertiary)]">
              {p.story(n).map((s) => (
                <p key={s}>{s}</p>
              ))}
            </div>
          </div>
          <ol className="relative space-y-6 border-l-2 border-[color:var(--border-light)] pl-8">
            {p.timeline(n).map((t) => (
              <li key={t.year} className="relative">
                <span className="absolute -left-[2.6rem] top-1 grid h-8 w-8 place-items-center rounded-full bg-[color:var(--primary-700)] text-[10px] font-bold text-white">{t.year === p.now ? '•' : t.year.slice(2)}</span>
                <div className="rounded-2xl border border-[color:var(--border-light)] bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-[color:var(--primary-700)]">{t.year}</p>
                  <h3 className="mt-1 text-lg font-bold text-[color:var(--text-primary)]">{t.title}</h3>
                  <p className="mt-1 text-[color:var(--text-tertiary)]">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Visi, misi, fokus + nilai */}
      <section aria-labelledby="belief-title" className="relative overflow-hidden py-16 sm:py-20" style={{ backgroundColor: 'var(--surface-primary)' }}>
        <div className="pointer-events-none absolute inset-0 u-grid opacity-60" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="belief-title" className="text-center text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">
            <HlText parts={p.beliefTitle} />
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {p.beliefs.map((b, i) => {
              const Icon = beliefIcons[i]
              return (
                <div key={b.title} className="rounded-2xl border border-[color:var(--border-light)] bg-white p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--primary-100)]"><Icon size={20} className="text-[color:var(--primary-700)]" aria-hidden="true" /></span>
                  <h3 className="mt-4 text-lg font-bold text-[color:var(--text-primary)]">{b.title}</h3>
                  <p className="mt-2 leading-relaxed text-[color:var(--text-tertiary)]">{b.body}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {p.values.map((v, i) => {
              const Icon = valueIcons[i]
              return (
                <div key={v.title} className="flex gap-4 rounded-2xl border border-[color:var(--border-light)] bg-white/70 p-6">
                  <Icon size={22} className="mt-0.5 shrink-0 text-[color:var(--accent-600)]" aria-hidden="true" />
                  <div>
                    <h3 className="font-bold text-[color:var(--text-primary)]">{v.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[color:var(--text-tertiary)]">{v.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mengapa */}
      <section aria-labelledby="why-title" className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 id="why-title" className="text-center text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">{p.whyTitle}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {p.why(landing, business, f.response).map((w, i) => {
              const Icon = whyIcons[i]
              return (
                <div key={w.title} className="flex gap-4 rounded-2xl border border-[color:var(--border-light)] bg-white p-6 shadow-sm">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--primary-100)]"><Icon size={20} className="text-[color:var(--primary-700)]" aria-hidden="true" /></span>
                  <div>
                    <h3 className="font-bold text-[color:var(--text-primary)]">{w.title}</h3>
                    <p className="mt-1 text-[color:var(--text-tertiary)]">{w.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Ajakan */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-brand px-6 py-14 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute inset-0 u-grid opacity-[0.08]" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold sm:text-4xl">{p.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">{p.ctaLead}</p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a href={wa(p.ctaWa)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-[color:var(--primary-800)] shadow-lg transition hover:-translate-y-0.5">
                <MessageCircle size={18} aria-hidden="true" /> {d.common.consultFree}
              </a>
              <Link href={path(lang, 'demo')} className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 px-7 py-4 font-semibold text-white transition hover:bg-white/10">
                {p.ctaDemos(n)} <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
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
