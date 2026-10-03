import type { Metadata } from 'next'
import PageHero from '../../components/PageHero'
import { Breadcrumbs, JsonLd } from '../../components/Bits'
import { LEGAL_UPDATED, LEGAL_UPDATED_ISO, PrivacyBody } from '../../content/legal'
import { getDict, getPages, isLang, type Lang } from '../../i18n'
import { path, urlOf } from '../../i18n/routes'
import { pageGraph, pageMeta } from '../../i18n/seo'

type Params = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const p = getPages(lang).legal
  return pageMeta({ lang, ref: { key: 'privacy' }, title: p.privacyTitle, description: p.privacyDescription })
}

export default async function PrivacyPage({ params }: Params) {
  const lang = (await params).lang as Lang
  const d = getDict(lang)
  const p = getPages(lang).legal
  return (
    <main id="main-content">
      <Breadcrumbs label={d.common.breadcrumb} items={[{ name: d.common.home, href: path(lang, 'home') }, { name: p.privacyTitle }]} />
      <PageHero tight eyebrow={p.eyebrow} title={p.privacyTitle} lead={p.since(LEGAL_UPDATED[lang])} />
      <article className="legal mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <PrivacyBody lang={lang} />
      </article>
      <JsonLd
        data={pageGraph({
          lang,
          ref: { key: 'privacy' },
          name: p.privacyTitle,
          description: p.privacyDescription,
          crumbs: [
            { name: d.common.home, url: urlOf(lang, { key: 'home' }) },
            { name: p.privacyTitle, url: urlOf(lang, { key: 'privacy' }) },
          ],
          dates: { modified: LEGAL_UPDATED_ISO },
        })}
      />
    </main>
  )
}
