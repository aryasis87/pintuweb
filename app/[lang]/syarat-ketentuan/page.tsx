import type { Metadata } from 'next'
import PageHero from '../../components/PageHero'
import { Breadcrumbs, JsonLd } from '../../components/Bits'
import { LEGAL_UPDATED, LEGAL_UPDATED_ISO, TermsBody } from '../../content/legal'
import { getDict, getPages, isLang, type Lang } from '../../i18n'
import { path, urlOf } from '../../i18n/routes'
import { pageGraph, pageMeta } from '../../i18n/seo'

type Params = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const p = getPages(lang).legal
  return pageMeta({ lang, ref: { key: 'terms' }, title: p.termsTitle, description: p.termsDescription })
}

export default async function TermsPage({ params }: Params) {
  const lang = (await params).lang as Lang
  const d = getDict(lang)
  const p = getPages(lang).legal
  return (
    <main id="main-content">
      <Breadcrumbs label={d.common.breadcrumb} items={[{ name: d.common.home, href: path(lang, 'home') }, { name: p.termsTitle }]} />
      <PageHero tight eyebrow={p.eyebrow} title={p.termsTitle} lead={p.since(LEGAL_UPDATED[lang])} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <article className="legal max-w-3xl pb-20 pt-12 lg:ml-[25%] lg:pl-2">
        <TermsBody lang={lang} />
      </article>
      </div>
      <JsonLd
        data={pageGraph({
          lang,
          ref: { key: 'terms' },
          name: p.termsTitle,
          description: p.termsDescription,
          crumbs: [
            { name: d.common.home, url: urlOf(lang, { key: 'home' }) },
            { name: p.termsTitle, url: urlOf(lang, { key: 'terms' }) },
          ],
          dates: { modified: LEGAL_UPDATED_ISO },
        })}
      />
    </main>
  )
}
