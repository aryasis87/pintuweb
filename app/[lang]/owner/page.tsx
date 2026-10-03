import type { Metadata } from 'next'
import Link from 'next/link'
import { Github, MessageCircle, ArrowRight } from 'lucide-react'
import { Breadcrumbs, JsonLd } from '../../components/Bits'
import { articlesIn } from '../../content/articles'
import { DEMOS } from '../../lib/demos'
import { wa } from '../../lib/site'
import { getDict, getPages, isLang, type Lang } from '../../i18n'
import { path, pathOf, urlOf } from '../../i18n/routes'
import { FOUNDER_ID, ORG_ID, pageGraph, pageMeta } from '../../i18n/seo'

type Params = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const p = getPages(lang).founder
  return pageMeta({ lang, ref: { key: 'founder' }, title: p.title, description: p.description, ogTitle: p.ogTitle, ogDescription: p.ogDescription, type: 'profile' })
}

export default async function OwnerPage({ params }: Params) {
  const lang = (await params).lang as Lang
  const d = getDict(lang)
  const p = getPages(lang).founder
  const n = DEMOS.length
  const writing = articlesIn(lang)

  return (
    <main id="main-content">
      <Breadcrumbs label={d.common.breadcrumb} items={[{ name: d.common.home, href: path(lang, 'home') }, { name: p.title }]} />
      {/* Perkenalan */}
      <section className="relative overflow-hidden pb-16 pt-8 sm:pt-10">
        <div className="pointer-events-none absolute inset-0 u-grid u-grid-fade" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full border border-[color:var(--border-light)] bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--primary-700)]">{p.badge}</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-[color:var(--text-primary)] sm:text-5xl">
              {p.h1[0]}<span className="text-[color:var(--primary-700)]">{p.h1[1]}</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[color:var(--text-tertiary)]">{p.lead}</p>
            <a href="https://github.com/aryasis87" target="_blank" rel="noopener noreferrer me" className="mt-6 inline-flex items-center gap-2 font-semibold text-[color:var(--primary-700)] underline-offset-4 hover:underline">
              <Github size={20} aria-hidden="true" /> {p.github}
            </a>
          </div>
          <div className="flex justify-center">
            <div className="pintu-frame w-full max-w-[300px] bg-white p-2 shadow-[0_30px_60px_-24px_rgba(15,29,58,0.35)]">
              <div role="img" aria-label={p.monogram} className="arch-top grid aspect-[4/5] w-full place-items-center bg-gradient-brand">
                <span className="select-none text-[120px] font-extrabold leading-none text-white/95" style={{ fontFamily: 'var(--font-display)' }}>S</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perjalanan */}
      <section aria-labelledby="journey-title" className="relative overflow-hidden py-16 sm:py-20" style={{ backgroundColor: 'var(--surface-primary)' }}>
        <div className="pointer-events-none absolute inset-0 u-grid opacity-60" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <h2 id="journey-title" className="text-center text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">{p.journeyTitle}</h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {p.timeline(n).map((t) => (
              <li key={t.year} className="rounded-2xl border border-[color:var(--border-light)] bg-white p-6">
                <p className="text-sm font-bold text-[color:var(--primary-700)]">{t.year}</p>
                <h3 className="mt-1 text-lg font-bold text-[color:var(--text-primary)]">{t.title}</h3>
                <p className="mt-2 text-[color:var(--text-tertiary)]">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Keahlian + prinsip */}
      <section aria-labelledby="skills-title" className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 id="skills-title" className="text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">{p.skillsTitle}</h2>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {p.skills.map((s) => (
              <li key={s} className="rounded-full border border-[color:var(--border-light)] bg-white px-4 py-2 text-sm text-[color:var(--text-secondary)] shadow-sm">{s}</li>
            ))}
          </ul>
          <figure className="mx-auto mt-14 max-w-2xl">
            <blockquote className="text-2xl leading-snug text-[color:var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>“{p.quote}”</blockquote>
            <figcaption className="mt-4 text-[color:var(--text-tertiary)]">{p.quoteBy}</figcaption>
          </figure>
        </div>
      </section>

      {/* Tulisan — sinyal keahlian (E-E-A-T) */}
      {writing.length > 0 && (
        <section aria-labelledby="writing-title" className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 id="writing-title" className="text-2xl font-extrabold tracking-tight text-[color:var(--text-primary)]">{p.writing}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {writing.map((a) => (
                <li key={a.key}>
                  <Link href={pathOf(lang, { key: 'articles', article: a.key })} className="block h-full rounded-2xl border border-[color:var(--border-light)] bg-white p-4 font-semibold text-[color:var(--text-primary)] transition hover:-translate-y-0.5 hover:shadow-md">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Ajakan */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-brand px-6 py-14 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute inset-0 u-grid opacity-[0.08]" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold sm:text-4xl">{p.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">{p.ctaLead}</p>
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
          ref: { key: 'founder' },
          name: p.title,
          description: p.description,
          type: 'ProfilePage',
          crumbs: [
            { name: d.common.home, url: urlOf(lang, { key: 'home' }) },
            { name: p.title, url: urlOf(lang, { key: 'founder' }) },
          ],
          extra: [
            {
              '@type': 'Person',
              '@id': FOUNDER_ID,
              name: 'Sanzy',
              jobTitle: p.jobTitle,
              worksFor: { '@id': ORG_ID },
              knowsAbout: p.skills,
              sameAs: ['https://github.com/aryasis87'],
            },
          ],
        })}
      />
    </main>
  )
}
