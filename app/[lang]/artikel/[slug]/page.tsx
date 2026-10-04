import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Breadcrumbs, JsonLd } from '../../../components/Bits'
import { articlesIn, getArticle } from '../../../content/articles'
import { faqJsonLd } from '../../../content/faq'
import { ARTICLE_LANGS } from '../../../i18n/config'
import { ARTICLE_SLUGS, articleKeyBySlug } from '../../../i18n/slugs'
import { getDict, getPages, isLang, LANG_INFO, type Lang } from '../../../i18n'
import { langsOf, path, pathOf, urlOf } from '../../../i18n/routes'
import { FOUNDER_ID, ORG_ID, ogImage, pageGraph, pageMeta } from '../../../i18n/seo'
import { wa } from '../../../lib/site'

type Params = { params: Promise<{ lang: string; slug: string }> }

export const dynamicParams = false
export function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!isLang(params.lang)) return []
  // Bahasa tanpa artikel tetap diberi daftar (hasilnya 404 saat dirender) — daftar kosong untuk satu
  // bahasa membuat Next tidak membangun artikel bahasa lain sama sekali.
  const lang = ARTICLE_LANGS.includes(params.lang) ? params.lang : ARTICLE_LANGS[0]
  return Object.values(ARTICLE_SLUGS)
    .map((s) => (s as Partial<Record<Lang, string>>)[lang])
    .filter((s): s is string => Boolean(s))
    .map((slug) => ({ slug }))
}

function resolve(lang: string, slug: string) {
  if (!isLang(lang) || !ARTICLE_LANGS.includes(lang)) return null
  const key = articleKeyBySlug(lang, slug)
  return key ? getArticle(lang, key) : null
}

const fmtDate = (lang: Lang, iso: string) =>
  new Intl.DateTimeFormat(LANG_INFO[lang].intl, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params
  const a = resolve(lang, slug)
  if (!a) return {}
  return pageMeta({
    lang: a.lang,
    ref: { key: 'articles', article: a.key },
    title: a.title,
    description: a.description,
    type: 'article',
    published: a.date,
    modified: a.updated,
  })
}

export default async function ArticlePage({ params }: Params) {
  const { lang: rawLang, slug } = await params
  const a = resolve(rawLang, slug)
  if (!a) notFound()
  const lang = a.lang
  const d = getDict(lang)
  const p = getPages(lang).articles
  const ref = { key: 'articles' as const, article: a.key }
  const url = urlOf(lang, ref)
  const others = langsOf(ref).filter((l) => l !== lang)
  const related = articlesIn(lang).filter((x) => x.key !== a.key).slice(0, 3)

  const posting = {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: a.title,
    description: a.description,
    image: ogImage(lang, a.title),
    datePublished: a.date,
    dateModified: a.updated,
    inLanguage: LANG_INFO[lang].htmlLang,
    author: { '@id': FOUNDER_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@id': `${url}#webpage` },
    wordCount: a.words,
    timeRequired: `PT${a.minutes}M`,
    keywords: a.tags.join(', '),
    abstract: a.takeaways.join(' '),
    ...(a.sources.length ? { citation: a.sources.map((s) => ({ '@type': 'CreativeWork', name: s.title, url: s.url })) } : {}),
    ...(others.length ? { workTranslation: others.map((l) => ({ '@type': 'BlogPosting', url: urlOf(l, ref), inLanguage: LANG_INFO[l].htmlLang })) } : {}),
  }

  return (
    <main id="main-content">
      <Breadcrumbs
        label={d.common.breadcrumb}
        items={[{ name: d.common.home, href: path(lang, 'home') }, { name: p.eyebrow, href: path(lang, 'articles') }, { name: a.title }]}
      />

      <article className="pb-16 pt-8 sm:pt-10">
        <header className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="border-b border-[color:var(--rule)] pb-8">
            <p className="kicker text-[color:var(--primary-700)]">{a.tags.join(' · ')}</p>
            <h1 className="mt-5 max-w-4xl text-[2.2rem] leading-[1.1] text-[color:var(--text-primary)] sm:text-[2.9rem] lg:text-[3.25rem]">{a.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[color:var(--text-tertiary)] lg:text-[1.2rem]">{a.description}</p>
          </div>
          <div className="mono flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[color:var(--border-light)] py-3 text-xs text-[color:var(--text-tertiary)]">
            <span>
              {p.by}{' '}
              <Link href={path(lang, 'founder')} rel="author" className="text-[color:var(--text-primary)] underline underline-offset-4">Sanzy</Link>
            </span>
            <span>
              {p.published} <time dateTime={a.date}>{fmtDate(lang, a.date)}</time>
            </span>
            {a.updated !== a.date && (
              <span>
                {p.updated} <time dateTime={a.updated}>{fmtDate(lang, a.updated)}</time>
              </span>
            )}
            <span>{p.read(a.minutes)}</span>
            {others.length > 0 && (
              <span>
                {p.alsoIn}{' '}
                {others.map((l, i) => (
                  <span key={l}>
                    {i > 0 && ', '}
                    <a href={pathOf(l, ref)} hrefLang={LANG_INFO[l].hreflang} lang={LANG_INFO[l].htmlLang} className="text-[color:var(--primary-700)] underline underline-offset-4">
                      {LANG_INFO[l].name}
                    </a>
                  </span>
                ))}
              </span>
            )}
          </div>
        </header>

        <div className="mx-auto mt-10 grid grid-cols-1 max-w-6xl gap-x-10 px-4 sm:px-6 lg:grid-cols-12">
          {/* Kolom tepi: daftar isi (desktop menempel saat digulir) */}
          <div className="lg:col-span-3">
            {a.toc.length > 2 && (
              <nav aria-labelledby="toc-title" className="mb-10 lg:sticky lg:top-28">
                <h2 id="toc-title" className="kicker border-b border-[color:var(--rule)] pb-2 text-[color:var(--text-primary)]">{p.toc}</h2>
                <ol className="mt-1">
                  {a.toc.map((h, i) => (
                    <li key={h.id} className="border-b border-[color:var(--border-light)]">
                      <a href={`#${h.id}`} className="flex gap-3 py-2.5 text-sm leading-snug text-[color:var(--text-secondary)] hover:text-[color:var(--primary-700)]">
                        <span className="mono text-[0.6875rem] text-[color:var(--text-tertiary)]">{String(i + 1).padStart(2, '0')}</span>
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>

          <div className="min-w-0 lg:col-span-8 lg:col-start-5">
            {/* Ringkasan di awal — mudah dibaca manusia & dikutip mesin jawaban */}
            {a.takeaways.length > 0 && (
              <aside aria-labelledby="takeaways-title" className="border-l-2 border-[color:var(--primary-700)] bg-[color:var(--surface-primary)] px-6 py-6 sm:px-7">
                <h2 id="takeaways-title" className="kicker text-[color:var(--primary-700)]">{p.takeaways}</h2>
                <ul className="mt-4 space-y-3">
                  {a.takeaways.map((t) => (
                    <li key={t} className="flex gap-3 leading-relaxed text-[color:var(--text-secondary)]">
                      <span className="mt-[0.65em] h-[5px] w-[5px] shrink-0 bg-[color:var(--primary-700)]" aria-hidden="true" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            <div className="prose-article mt-10" dangerouslySetInnerHTML={{ __html: a.html }} />

            {a.sources.length > 0 && (
              <section aria-labelledby="sources-title" className="mt-14 border-t border-[color:var(--rule)] pt-6">
                <h2 id="sources-title" className="kicker text-[color:var(--text-primary)]">{p.sources}</h2>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-[color:var(--text-secondary)] marker:text-[color:var(--text-tertiary)]">
                  {a.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[color:var(--primary-700)] underline underline-offset-2">{s.title}</a>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>
        </div>
      </article>

      {/* Ajakan */}
      <section className="bg-[color:var(--primary-700)] py-14 text-white sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[2rem] leading-[1.1] sm:text-[2.25rem]">{p.ctaTitle}</h2>
            <p className="mt-3 text-white/85">{p.ctaLead}</p>
          </div>
          <a href={wa(p.ctaWa(a.title))} target="_blank" rel="noopener noreferrer" className="btn btn-white shrink-0">
            {d.common.consultFree} <ArrowUpRight size={17} className="arw arw-ne" aria-hidden="true" />
          </a>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex items-end justify-between gap-4 border-b border-[color:var(--rule)] pb-3">
              <h2 id="related-title" className="kicker text-[color:var(--text-primary)]">{p.related}</h2>
              <Link href={path(lang, 'articles')} className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--primary-700)]">
                {p.all} <ArrowRight size={15} className="arw" aria-hidden="true" />
              </Link>
            </div>
            <ul className="grid grid-cols-1 gap-x-10 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.key} className="border-b border-[color:var(--border-light)]">
                  <Link href={pathOf(lang, { key: 'articles', article: r.key })} className="group block py-5">
                    <span className="display block text-[1.3rem] leading-snug text-[color:var(--text-primary)] group-hover:text-[color:var(--primary-700)]">{r.title}</span>
                    <span className="mono mt-2 block text-xs text-[color:var(--text-tertiary)]">{p.read(r.minutes)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {a.faq.length > 0 && <JsonLd data={faqJsonLd(a.faq, LANG_INFO[lang].htmlLang)} />}
      <JsonLd
        data={pageGraph({
          lang,
          ref,
          name: a.title,
          description: a.description,
          crumbs: [
            { name: d.common.home, url: urlOf(lang, { key: 'home' }) },
            { name: p.eyebrow, url: urlOf(lang, { key: 'articles' }) },
            { name: a.title, url },
          ],
          dates: { published: a.date, modified: a.updated },
          extra: [posting],
        })}
      />
    </main>
  )
}

