import type { Metadata } from 'next'
import DemoGallery, { type DemoGalleryText } from './DemoGallery'
import { JsonLd } from '../../components/Bits'
import { categoriesFor, demosFor, getDict, getPages, isLang, type Lang } from '../../i18n'
import { path, urlOf } from '../../i18n/routes'
import { pageGraph, pageMeta } from '../../i18n/seo'
import { packagesFor } from '../../i18n/facts'
import { PACKAGE_FOR_CATEGORY } from '../../lib/portals'
import type { DemoCategory } from '../../lib/demos'

type Params = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const p = getPages(lang).demo
  const n = demosFor(lang).length
  return pageMeta({ lang, ref: { key: 'demo' }, title: p.title(n), description: p.description(n), ogTitle: p.ogTitle(n), ogDescription: p.ogDescription })
}

export default async function DemoPage({ params }: Params) {
  const lang = (await params).lang as Lang
  const d = getDict(lang)
  const p = getPages(lang).demo
  const demos = demosFor(lang)
  const n = demos.length
  const pk = packagesFor(lang)
  const fromByCat = Object.fromEntries(Object.entries(PACKAGE_FOR_CATEGORY).map(([c, slug]) => [c, pk.find((x) => x.slug === slug)!.priceFrom])) as Record<DemoCategory, string>

  // Templat {n}/{cat}/{name} diisi di klien, supaya fungsi kamus tidak perlu dikirim ke browser.
  const t: DemoGalleryText = {
    badge: p.badge,
    from: d.common.from,
    h1: p.h1(n),
    lead: p.lead,
    note: d.common.demoLangNote,
    filterAria: p.filterAria,
    all: p.all,
    showingAll: p.showing(999, null).replace('999', '{n}'),
    showingCat: p.showing(999, '§').replace('999', '{n}').replace('§', '{cat}'),
    imgAlt: p.imgAlt('§').replace('§', '{name}'),
    newTab: d.common.newTab,
    ctaTitle: p.ctaTitle,
    ctaLead: p.ctaLead,
    contact: p.contact,
    seePricing: p.seePricing,
  }

  const jsonLd = pageGraph({
    lang,
    ref: { key: 'demo' },
    name: p.title(n),
    description: p.description(n),
    type: 'CollectionPage',
    crumbs: [
      { name: d.common.home, url: urlOf(lang, { key: 'home' }) },
      { name: p.badge, url: urlOf(lang, { key: 'demo' }) },
    ],
    extra: [
      {
        '@type': 'ItemList',
        name: p.listName,
        numberOfItems: n,
        itemListElement: demos.map((dm, i) => ({ '@type': 'ListItem', position: i + 1, name: `${dm.name} — ${dm.tagline}`, url: dm.url })),
      },
    ],
  })

  return (
    <>
      <JsonLd data={jsonLd} />
      <DemoGallery demos={demos} categories={categoriesFor(lang)} t={t} contactHref={path(lang, 'contact')} pricingHref={path(lang, 'pricing')} fromByCat={fromByCat} />
    </>
  )
}
