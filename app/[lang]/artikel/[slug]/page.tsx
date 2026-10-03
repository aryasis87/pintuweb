import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, BookOpen, CheckCircle2, Clock, MessageCircle, UserRound } from 'lucide-react'
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

      <article className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--primary-700)]">{a.tags.join(' · ')}</p>
          <h1 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-[color:var(--text-primary)] sm:text-5xl">{a.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-[color:var(--text-tertiary)]">{a.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-[color:var(--border-light)] py-4 text-sm text-[color:var(--text-tertiary)]">
            <span className="inline-flex items-center gap-1.5">
              <UserRound size={15} aria-hidden="true" /> {p.by}{' '}
              <Link href={path(lang, 'founder')} rel="author" className="font-semibold text-[color:var(--text-primary)] underline-offset-4 hover:underline">Sanzy</Link>
            </span>
            <span>
              {p.published} <time dateTime={a.date}>{fmtDate(lang, a.date)}</time>
            </span>
            {a.updated !== a.date && (
              <span>
                {p.updated} <time dateTime={a.updated}>{fmtDate(lang, a.updated)}</time>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock size={15} aria-hidden="true" /> {p.read(a.minutes)}
            </span>
          </div>
          {others.length > 0 && (
            <p className="mt-3 text-sm text-[color:var(--text-tertiary)]">
              {p.alsoIn}{' '}
              {others.map((l, i) => (
                <span key={l}>
                  {i > 0 && ', '}
                  <a href={pathOf(l, ref)} hrefLang={LANG_INFO[l].hreflang} lang={LANG_INFO[l].htmlLang} className="font-semibold text-[color:var(--primary-700)] underline-offset-4 hover:underline">
                    {LANG_INFO[l].name}
                  </a>
                </span>
              ))}
            </p>
          )}
        </header>

        {/* Ringkasan di awal — mudah dibaca manusia & dikutip mesin jawaban */}
        {a.takeaways.length > 0 && (
          <aside aria-labelledby="takeaways-title" className="mt-8 rounded-3xl border border-[color:var(--primary-200)] bg-[color:var(--primary-50)] p-6 sm:p-7">
            <h2 id="takeaways-title" className="flex items-center gap-2 text-lg font-bold text-[color:var(--text-primary)]">
              <CheckCircle2 size={20} className="text-[color:var(--primary-700)]" aria-hidden="true" /> {p.takeaways}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {a.takeaways.map((t) => (
                <li key={t} className="flex gap-2.5 leading-relaxed text-[color:var(--text-secondary)]">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--primary-700)]" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Daftar isi */}
        {a.toc.length > 2 && (
          <nav aria-labelledby="toc-title" className="mt-8 rounded-2xl border border-[color:var(--border-light)] bg-white p-5">
            <h2 id="toc-title" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[color:var(--text-secondary)]">
              <BookOpen size={16} aria-hidden="true" /> {p.toc}
            </h2>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[color:var(--text-secondary)] marker:text-[color:var(--primary-700)]">
              {a.toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="underline-offset-4 hover:text-[color:var(--primary-700)] hover:underline">{h.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="prose-article mt-10" dangerouslySetInnerHTML={{ __html: a.html }} />

        {a.sources.length > 0 && (
          <section aria-labelledby="sources-title" className="mt-12 border-t border-[color:var(--border-light)] pt-8">
            <h2 id="sources-title" className="text-lg font-bold text-[color:var(--text-primary)]">{p.sources}</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-[color:var(--text-secondary)]">
              {a.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[color:var(--primary-700)] underline underline-offset-2">{s.title}</a>
                </li>
              ))}
            </ol>
          </section>
        )}
      </article>

      {/* Ajakan */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-brand px-6 py-12 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute inset-0 u-grid opacity-[0.08]" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-2xl font-extrabold sm:text-3xl">{p.ctaTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">{p.ctaLead}</p>
            <a href={wa(p.ctaWa(a.title))} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-[color:var(--primary-800)] shadow-lg transition hover:-translate-y-0.5">
              <MessageCircle size={18} aria-hidden="true" /> {d.common.consultFree}
            </a>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex items-end justify-between gap-4">
              <h2 id="related-title" className="text-2xl font-extrabold text-[color:var(--text-primary)]">{p.related}</h2>
              <Link href={path(lang, 'articles')} className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--primary-700)]">
                {p.all} <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.key}>
                  <Link href={pathOf(lang, { key: 'articles', article: r.key })} className="flex h-full flex-col rounded-2xl border border-[color:var(--border-light)] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                    <span className="font-semibold leading-snug text-[color:var(--text-primary)]">{r.title}</span>
                    <span className="mt-2 text-sm text-[color:var(--text-tertiary)]">{p.read(r.minutes)}</span>
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

