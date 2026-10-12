import id from './dict/id'
import en from './dict/en'
import ms from './dict/ms'
import es from './dict/es'
import pId from './pages/id'
import pEn from './pages/en'
import pMs from './pages/ms'
import pEs from './pages/es'
import { isBase, type Lang } from './config'
import type { Dict } from './dict/id'
import type { Pages } from './pages/id'
import { pack } from './x'
import { DEMOS, DEMO_CATEGORIES, type Demo, type DemoCategory } from '../lib/demos'
import { DEMO_CATEGORY_TEXT, DEMO_TEXT } from '../content/demos-text'

export { LANGS, DEFAULT_LANG, LANG_INFO, isLang, type Lang } from './config'

// Bahasa tambahan: impor dict/<kode>.ts dan pages/<kode>.ts di atas, lalu daftarkan di dua objek ini.
const DICTS: Record<Lang, Dict> = { id, en, ms, es }
const PAGES: Record<Lang, Pages> = { id: pId, en: pEn, ms: pMs, es: pEs }

export const getDict = (lang: Lang) => DICTS[lang]
export const getPages = (lang: Lang) => PAGES[lang]

/** Demo dengan nama/tagline sesuai bahasa (situsnya sendiri tetap berbahasa Indonesia). */
export function demosFor(lang: Lang): Demo[] {
  if (lang === 'id') return DEMOS
  return DEMOS.map((d) => {
    const t = (isBase(lang) ? DEMO_TEXT[lang] : pack(lang).demos)[d.slug]
    return t ? { ...d, name: t.name ?? d.name, tagline: t.tagline } : d
  })
}

export function categoriesFor(lang: Lang): { id: DemoCategory; label: string }[] {
  if (lang === 'id') return DEMO_CATEGORIES
  const text = isBase(lang) ? DEMO_CATEGORY_TEXT[lang] : pack(lang).demoCategories
  return DEMO_CATEGORIES.map((c) => ({ id: c.id, label: text[c.id] }))
}
