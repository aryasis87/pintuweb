import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Rss } from 'lucide-react'
import PageHero from '../../components/PageHero'
import { Breadcrumbs, HlText, JsonLd } from '../../components/Bits'
import { articlesIn } from '../../content/articles'
import { ARTICLE_LANGS } from '../../i18n/config'
import { getDict, getPages, isLang, LANG_INFO, type Lang } from '../../i18n'
import { path, pathOf, urlOf } from '../../i18n/routes'
import { FOUNDER_ID, ORG_ID, pageGraph, pageMeta } from '../../i18n/seo'

type Params = { params: Promise<{ lang: string }> }

const fmtDate = (lang: Lang, iso: string) =>
  new Intl.DateTimeFormat(LANG_INFO[lang].intl, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang) || !ARTICLE_LANGS.includes(lang)) return {}
  const p = getPages(lang).articles
  return pageMeta({ lang, ref: { key: 'articles' }, title: p.title, description: p.description })
}

export default async function ArticlesPage({ params }: Params) {
  const lang = (await params).lang as Lang
  if (!ARTICLE_LANGS.includes(lang)) notFound()
  const d = getDict(lang)
  const p = getPages(lang).articles
  const list = articlesIn(lang)
  const url = urlOf(lang, { key: 'articles' })

  return (
    <main id="main-content">
      <Breadcrumbs label={d.common.breadcrumb} items={[{ name: d.common.home, href: path(lang, 'home') }, { name: p.eyebrow }]} />
      <PageHero tight eyebrow={p.eyebrow} title={<HlText parts={p.h1} mode="italic" tone="primary" />} lead={p.lead}>
        <a href={`${path(lang, 'articles')}/rss`} className="link mt-2 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold">
          <Rss size={15} aria-hidden="true" /> {p.rss}
        </a>
      </PageHero>

      <section className="py-12 sm:py-16">
        <ul className="mx-auto max-w-6xl px-4 sm:px-6">
          {list.map((a) => (
            <li key={a.key} className="border-b border-[color:var(--border-medium)]">
              <article className="grid grid-cols-1 gap-x-10 gap-y-3 py-8 lg:grid-cols-12">
                <p className="mono text-xs text-[color:var(--text-tertiary)] lg:col-span-2 lg:pt-2">
                  <time dateTime={a.updated}>{fmtDate(lang, a.updated)}</time>
                  <span className="block">{p.read(a.minutes)}</span>
                </p>
                <div className="lg:col-span-7">
                  <h2 className="text-[1.75rem] leading-tight text-[color:var(--text-primary)] sm:text-[2.1rem]">
                    <Link href={pathOf(lang, { key: 'articles', article: a.key })} className="hover:text-[color:var(--primary-700)]">{a.title}</Link>
                  </h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-[color:var(--text-tertiary)]">{a.description}</p>
                </div>
                <div className="flex items-baseline justify-between gap-4 lg:col-span-3 lg:flex-col lg:items-end lg:pt-2">
                  <p className="kicker text-[color:var(--primary-700)] lg:text-right">{a.tags.slice(0, 2).join(' · ')}</p>
                  <Link href={pathOf(lang, { key: 'articles', article: a.key })} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[color:var(--primary-700)]" aria-label={`${d.common.readMore}: ${a.title}`}>
                    {d.common.readMore} <ArrowRight size={15} className="arw" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <JsonLd
        data={pageGraph({
          lang,
          ref: { key: 'articles' },
          name: p.title,
          description: p.description,
          type: 'CollectionPage',
          crumbs: [
            { name: d.common.home, url: urlOf(lang, { key: 'home' }) },
            { name: p.eyebrow, url },
          ],
          extra: [
            {
              '@type': 'Blog',
              '@id': `${url}#blog`,
              name: p.title,
              url,
              inLanguage: LANG_INFO[lang].htmlLang,
              publisher: { '@id': ORG_ID },
              blogPost: list.map((a) => ({
                '@type': 'BlogPosting',
                headline: a.title,
                url: urlOf(lang, { key: 'articles', article: a.key }),
                datePublished: a.date,
                dateModified: a.updated,
                author: { '@id': FOUNDER_ID },
              })),
            },
          ],
        })}
      />
    </main>
  )
}
