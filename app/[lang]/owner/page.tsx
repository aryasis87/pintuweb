import type { Metadata } from 'next'
import Link from 'next/link'
import { Github, ArrowRight, ArrowUpRight } from 'lucide-react'
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
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
        <div className="grid grid-cols-1 items-end gap-x-10 gap-y-12 border-b border-[color:var(--rule)] pb-14 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="kicker text-[color:var(--primary-700)]">{p.badge}</p>
            <h1 className="mt-5 text-[2.4rem] leading-[1.06] text-[color:var(--text-primary)] sm:text-[3.25rem] lg:text-[3.75rem]">
              {p.h1[0]}
              <em className="text-[color:var(--primary-700)]">{p.h1[1]}</em>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--text-tertiary)]">{p.lead}</p>
            <a href="https://github.com/aryasis87" target="_blank" rel="noopener noreferrer me" className="link mt-6 inline-flex items-center gap-2 font-semibold">
              <Github size={18} aria-hidden="true" /> {p.github}
            </a>
          </div>
          <div className="md:col-span-4">
            <div className="pintu-frame mx-auto w-full max-w-[260px] bg-white p-[3px] md:ml-auto md:mr-0">
              <div role="img" aria-label={p.monogram} className="arch-top grid aspect-[4/5] w-full place-items-center bg-[color:var(--navy)]">
                <span className="display select-none text-[120px] leading-none text-white">S</span>
              </div>
            </div>
            <div className="mx-auto h-[3px] max-w-[260px] bg-[color:var(--rule)] md:ml-auto md:mr-0" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Perjalanan */}
      <section aria-labelledby="journey-title" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="journey-title" className="text-[2rem] leading-tight text-[color:var(--text-primary)] sm:text-[2.25rem]">{p.journeyTitle}</h2>
          <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
            {p.timeline(n).map((t) => (
              <li key={t.year} className="border-t border-[color:var(--rule)] pt-5">
                <p className="mono text-xs text-[color:var(--primary-700)]">{t.year}</p>
                <h3 className="mt-2 text-[1.4rem] leading-snug text-[color:var(--text-primary)]">{t.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)]">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Keahlian + prinsip */}
      <section aria-labelledby="skills-title" className="bg-[color:var(--surface-primary)] py-16 sm:py-24">
        <div className="mx-auto grid grid-cols-1 max-w-6xl gap-x-10 gap-y-12 px-4 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="skills-title" className="text-[2rem] leading-tight text-[color:var(--text-primary)] sm:text-[2.25rem]">{p.skillsTitle}</h2>
            <ul className="mt-6 border-t border-[color:var(--rule)]">
              {p.skills.map((s) => (
                <li key={s} className="flex items-start gap-3 border-b border-[color:var(--border-medium)] py-3 text-[0.9375rem] text-[color:var(--text-secondary)]">
                  <span className="mt-[0.55em] h-[5px] w-[5px] shrink-0 bg-[color:var(--primary-700)]" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <figure className="self-center lg:col-span-6 lg:col-start-7">
            <blockquote className="display border-l-2 border-[color:var(--primary-700)] pl-6 text-[1.8rem] leading-snug text-[color:var(--text-primary)] sm:text-[2.2rem]">“{p.quote}”</blockquote>
            <figcaption className="kicker mt-5 pl-6 text-[color:var(--text-tertiary)]">{p.quoteBy}</figcaption>
          </figure>
        </div>
      </section>

      {/* Tulisan — sinyal keahlian (E-E-A-T) */}
      {writing.length > 0 && (
        <section aria-labelledby="writing-title" className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="writing-title" className="kicker border-b border-[color:var(--rule)] pb-3 text-[color:var(--text-primary)]">{p.writing}</h2>
            <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {writing.map((a) => (
                <li key={a.key} className="border-b border-[color:var(--border-light)]">
                  <Link href={pathOf(lang, { key: 'articles', article: a.key })} className="display block py-4 text-[1.2rem] leading-snug text-[color:var(--text-primary)] hover:text-[color:var(--primary-700)]">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

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
