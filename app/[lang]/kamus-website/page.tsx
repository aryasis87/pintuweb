import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '../../components/PageHero'
import { Breadcrumbs, HlText, JsonLd } from '../../components/Bits'
import { TERMS } from '../../content/glossary'
import { getDict, getPages, isLang, LANG_INFO, type Lang } from '../../i18n'
import { langsOf, path, pathOf, urlOf } from '../../i18n/routes'
import { SERVICES } from '../../content/services'
import { articlesIn } from '../../content/articles'
import { pageGraph, pageMeta } from '../../i18n/seo'

type Params = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const p = getPages(lang).glossary
  return pageMeta({ lang, ref: { key: 'glossary' }, title: p.title, description: p.description })
}

export default async function GlossaryPage({ params }: Params) {
  const lang = (await params).lang as Lang
  const d = getDict(lang)
  const p = getPages(lang).glossary
  const terms = [...TERMS].sort((a, b) => a.term[lang].localeCompare(b.term[lang], LANG_INFO[lang].intl))
  const letters = Array.from(new Set(terms.map((t) => t.term[lang][0].toUpperCase())))
  const articles = articlesIn(lang)
  const url = urlOf(lang, { key: 'glossary' })

  // Judul tautan "lihat juga": nama layanan atau judul artikel, hanya bila versi bahasa itu ada.
  const seeLabel = (ref: NonNullable<(typeof TERMS)[number]['see']>) => {
    if (!langsOf(ref).includes(lang)) return null
    if (ref.key === 'services' && ref.service) return SERVICES.find((s) => s.key === ref.service)!.text[lang].name
    if (ref.key === 'articles' && ref.article) return articles.find((a) => a.key === ref.article)?.title ?? null
    return null
  }

  const termSet = {
    '@type': 'DefinedTermSet',
    '@id': `${url}#terms`,
    name: p.title,
    inLanguage: LANG_INFO[lang].htmlLang,
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `${url}#${t.id}`,
      name: t.term[lang],
      description: t.def[lang],
      url: `${url}#${t.id}`,
      inDefinedTermSet: { '@id': `${url}#terms` },
    })),
  }

  return (
    <main id="main-content">
      <Breadcrumbs label={d.common.breadcrumb} items={[{ name: d.common.home, href: path(lang, 'home') }, { name: p.eyebrow }]} />
      <PageHero tight eyebrow={p.eyebrow} title={<HlText parts={p.h1} />} lead={p.lead}>
        <nav aria-label={p.jump} className="flex flex-wrap justify-center gap-1.5">
          {letters.map((l) => (
            <a key={l} href={`#huruf-${l}`} className="grid h-9 min-w-9 place-items-center rounded-lg border border-[color:var(--border-light)] bg-white px-2 text-sm font-bold text-[color:var(--primary-700)] hover:border-[color:var(--primary-300)]">
              {l}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {letters.map((l) => (
            <div key={l} id={`huruf-${l}`} className="scroll-mt-28">
              <h2 className="mt-10 border-b border-[color:var(--border-medium)] pb-2 text-2xl font-extrabold text-[color:var(--primary-700)]">{l}</h2>
              <dl className="divide-y divide-[color:var(--border-light)]">
                {terms
                  .filter((t) => t.term[lang][0].toUpperCase() === l)
                  .map((t) => {
                    const see = t.see ? seeLabel(t.see) : null
                    return (
                      <div key={t.id} id={t.id} className="scroll-mt-28 py-5">
                        <dt className="text-lg font-bold text-[color:var(--text-primary)]">
                          <dfn className="not-italic">{t.term[lang]}</dfn>
                        </dt>
                        <dd className="mt-1.5 leading-relaxed text-[color:var(--text-secondary)]">
                          {t.def[lang]}
                          {see && t.see && (
                            <Link href={pathOf(lang, t.see)} className="mt-2 flex w-fit items-center gap-1.5 text-sm font-semibold text-[color:var(--primary-700)] underline-offset-4 hover:underline">
                              {p.related}: {see} <ArrowRight size={14} aria-hidden="true" />
                            </Link>
                          )}
                        </dd>
                      </div>
                    )
                  })}
              </dl>
            </div>
          ))}
        </div>
      </section>

      <JsonLd
        data={pageGraph({
          lang,
          ref: { key: 'glossary' },
          name: p.title,
          description: p.description,
          crumbs: [
            { name: d.common.home, url: urlOf(lang, { key: 'home' }) },
            { name: p.eyebrow, url },
          ],
          extra: [termSet],
        })}
      />
    </main>
  )
}
