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
      <PageHero tight eyebrow={p.eyebrow} title={<HlText parts={p.h1} />} lead={p.lead}>
        <a href={`${path(lang, 'articles')}/rss`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--primary-700)] underline-offset-4 hover:underline">
          <Rss size={15} aria-hidden="true" /> {p.rss}
        </a>
      </PageHero>

      <section className="pb-20">
        <ul className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 md:grid-cols-2">
          {list.map((a) => (
            <li key={a.key}>
              <article className="flex h-full flex-col rounded-3xl border border-[color:var(--border-light)] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--primary-700)]">{a.tags.slice(0, 2).join(' · ')}</p>
                <h2 className="mt-3 text-xl font-bold leading-snug text-[color:var(--text-primary)]">
                  <Link href={pathOf(lang, { key: 'articles', article: a.key })} className="hover:text-[color:var(--primary-700)]">{a.title}</Link>
                </h2>
                <p className="mt-2 flex-1 leading-relaxed text-[color:var(--text-tertiary)]">{a.description}</p>
                <p className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-[color:var(--text-tertiary)]">
                  <span>
                    <time dateTime={a.updated}>{fmtDate(lang, a.updated)}</time> · {p.read(a.minutes)}
                  </span>
                  <Link href={pathOf(lang, { key: 'articles', article: a.key })} className="inline-flex items-center gap-1 font-semibold text-[color:var(--primary-700)]" aria-label={`${d.common.readMore}: ${a.title}`}>
                    {d.common.readMore} <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </p>
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
