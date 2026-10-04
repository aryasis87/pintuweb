import type { Metadata } from 'next'
import FAQ from '../../components/FAQ'
import PageHero from '../../components/PageHero'
import { Breadcrumbs, HlText, JsonLd } from '../../components/Bits'
import { faqProps } from '../../components/props'
import { faqJsonLd } from '../../content/faq'
import { LANG_INFO, getDict, getPages, isLang, type Lang } from '../../i18n'
import { path, urlOf } from '../../i18n/routes'
import { pageGraph, pageMeta } from '../../i18n/seo'

type Params = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const p = getPages(lang).faq
  return pageMeta({ lang, ref: { key: 'faq' }, title: p.title, description: p.description, ogTitle: p.ogTitle, ogDescription: p.ogDescription })
}

export default async function FaqPage({ params }: Params) {
  const lang = (await params).lang as Lang
  const d = getDict(lang)
  const p = getPages(lang).faq
  const faq = faqProps(lang, 'page')
  return (
    <main id="main-content">
      <Breadcrumbs label={d.common.breadcrumb} items={[{ name: d.common.home, href: path(lang, 'home') }, { name: d.nav.faq }]} />
      <PageHero tight eyebrow={p.eyebrow} title={<HlText parts={p.h1} mode="italic" tone="primary" />} lead={p.lead} />
      <FAQ {...faq} />
      {/* Dibangun dari data yang sama dengan yang tampil di halaman, jadi schema selalu cocok dengan isi. */}
      <JsonLd data={faqJsonLd(faq.items, LANG_INFO[lang].htmlLang)} />
      <JsonLd
        data={pageGraph({
          lang,
          ref: { key: 'faq' },
          name: p.title,
          description: p.description,
          crumbs: [
            { name: d.common.home, url: urlOf(lang, { key: 'home' }) },
            { name: d.nav.faq, url: urlOf(lang, { key: 'faq' }) },
          ],
        })}
      />
    </main>
  )
}
