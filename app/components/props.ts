// Merakit props (string saja) untuk komponen klien dari kamus server, supaya kamus 3 bahasa
// tidak ikut terkirim ke browser.
import { getDict } from '../i18n'
import { path } from '../i18n/routes'
import { faqFor } from '../content/faq'
import { wa } from '../lib/site'
import type { Lang } from '../i18n/config'
import type { FaqText } from './FAQ'

export function faqProps(lang: Lang, variant: 'home' | 'page') {
  const t = getDict(lang).faqUi
  const { items, categories } = faqFor(lang)
  const text: FaqText = {
    eyebrow: t.eyebrow,
    title: t.title,
    lead: t.lead,
    search: t.search,
    searchPh: t.searchPh,
    categories: t.categories,
    all: t.all,
    none: t.none,
    unanswered: t.unanswered,
    askLead: t.askLead,
    allN: t.allN(items.length),
    askWa: t.askWa,
  }
  return { items, categories, t: text, waHref: wa(t.waText), faqHref: path(lang, 'faq'), variant }
}

