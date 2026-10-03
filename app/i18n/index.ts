import id from './dict/id'
import en from './dict/en'
import ms from './dict/ms'
import pId from './pages/id'
import pEn from './pages/en'
import pMs from './pages/ms'
import type { Lang } from './config'
import { DEMOS, DEMO_CATEGORIES, type Demo, type DemoCategory } from '../lib/demos'
import { DEMO_CATEGORY_TEXT, DEMO_TEXT } from '../content/demos-text'

export { LANGS, DEFAULT_LANG, LANG_INFO, isLang, type Lang } from './config'

const DICTS = { id, en, ms }
const PAGES = { id: pId, en: pEn, ms: pMs }

export const getDict = (lang: Lang) => DICTS[lang]
export const getPages = (lang: Lang) => PAGES[lang]

/** Demo dengan nama/tagline sesuai bahasa (situsnya sendiri tetap berbahasa Indonesia). */
export function demosFor(lang: Lang): Demo[] {
  if (lang === 'id') return DEMOS
  return DEMOS.map((d) => {
    const t = DEMO_TEXT[lang][d.slug]
    return t ? { ...d, name: t.name ?? d.name, tagline: t.tagline } : d
  })
}

export function categoriesFor(lang: Lang): { id: DemoCategory; label: string }[] {
  if (lang === 'id') return DEMO_CATEGORIES
  return DEMO_CATEGORIES.map((c) => ({ id: c.id, label: DEMO_CATEGORY_TEXT[lang][c.id] }))
}
