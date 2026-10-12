import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import Glossary, { type GlossaryItem, type GlossaryTopic } from '../../components/Glossary'
import PageHero from '../../components/PageHero'
import { Breadcrumbs, HlText, JsonLd } from '../../components/Bits'
import { TERMS, TERM_TOPICS, type TermTopic } from '../../content/glossary'
import { getDict, getPages, isLang, LANG_INFO, type Lang } from '../../i18n'
import { langsOf, path, pathOf, urlOf } from '../../i18n/routes'
import { SERVICES } from '../../content/services'
import { articlesIn } from '../../content/articles'
import { pageGraph, pageMeta } from '../../i18n/seo'
import type { DemoCategory } from '../../lib/demos'
import { CATEGORY_COLOR } from '../../lib/portals'
import { wa } from '../../lib/site'

type Params = { params: Promise<{ lang: string }> }

// Warna tiap topik meminjam palet CATEGORY_COLOR (hanya soal palet).
const TOPIC_TONE: Record<TermTopic, DemoCategory> = { dasar: 'portfolio', jenis: 'landing', seo: 'kontes', bisnis: 'linkinbio' }

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
  const articles = articlesIn(lang)
  const url = urlOf(lang, { key: 'glossary' })

  // Judul tautan "lihat juga": nama layanan atau judul artikel, hanya bila versi bahasa itu ada.
  const seeLabel = (ref: NonNullable<(typeof TERMS)[number]['see']>) => {
    if (!langsOf(ref).includes(lang)) return null
    if (ref.key === 'services' && ref.service) return SERVICES.find((s) => s.key === ref.service)!.text[lang].name
    if (ref.key === 'articles' && ref.article) return articles.find((a) => a.key === ref.article)?.title ?? null
    return null
  }

  // String siap tampil untuk komponen klien (kamus tidak ikut terkirim ke browser)
  const items: GlossaryItem[] = terms.map((t) => {
    const label = t.see ? seeLabel(t.see) : null
    return {
      id: t.id,
      topic: t.topic,
      term: t.term[lang],
      def: t.def[lang],
      letter: t.term[lang][0].toUpperCase(),
      ...(label && t.see ? { see: { label, href: pathOf(lang, t.see) } } : {}),
    }
  })
  const topics: GlossaryTopic[] = TERM_TOPICS.map((id) => ({ id, label: p.topics[id], ...CATEGORY_COLOR[TOPIC_TONE[id]] }))

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
      <PageHero tight eyebrow={p.eyebrow} title={<HlText parts={p.h1} mode="italic" tone="primary" />} lead={p.lead} />

      <section className="mt-10 bg-[color:var(--surface-soft)] py-12 sm:mt-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Glossary
            items={items}
            topics={topics}
            t={{
              search: p.search,
              searchPh: p.searchPh,
              topicLabel: p.topicLabel,
              all: p.all,
              jump: p.jump,
              related: p.related,
              none: p.none,
              // pola dengan penanda supaya fungsi kamus tidak perlu dikirim ke klien
              count: p.count(111111).replace('111111', '{n}'),
              countOf: p.countOf(111111, 222222).replace('111111', '{n}').replace('222222', '{total}'),
              linkTo: p.linkTo('{term}'),
            }}
          />

          {/* Untuk istilah yang tidak ada di kamus */}
          <div className="mt-10 flex flex-col gap-5 rounded-[1.5rem] bg-white p-6 ring-1 ring-[color:var(--border-light)] sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8">
            <div className="min-w-0">
              <h2 className="text-[1.125rem] leading-snug text-[color:var(--text-primary)] sm:text-[1.25rem]">{p.missingTitle}</h2>
              <p className="mt-1.5 max-w-xl text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)]">{p.missingBody}</p>
            </div>
            <a href={wa(p.missingWa)} target="_blank" rel="noopener noreferrer" className="btn btn-solid shrink-0">
              {p.missingCta} <ArrowUpRight size={16} className="arw arw-ne" aria-hidden="true" />
              <span className="sr-only">{d.common.newTabShort}</span>
            </a>
          </div>
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
