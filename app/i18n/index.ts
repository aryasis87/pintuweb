import id from './dict/id'
import en from './dict/en'
import ms from './dict/ms'
import es from './dict/es'
import fr from './dict/fr'
import pt from './dict/pt'
import ru from './dict/ru'
import zh from './dict/zh'
import hi from './dict/hi'
import bn from './dict/bn'
import ar from './dict/ar'
import pId from './pages/id'
import pEn from './pages/en'
import pMs from './pages/ms'
import pEs from './pages/es'
import pFr from './pages/fr'
import pPt from './pages/pt'
import pRu from './pages/ru'
import pZh from './pages/zh'
import pHi from './pages/hi'
import pBn from './pages/bn'
import pAr from './pages/ar'
import { isBase, type Lang } from './config'
import type { Dict } from './dict/id'
import type { Pages } from './pages/id'
import { pack } from './x'
import { DEMOS, DEMO_CATEGORIES, type Demo, type DemoCategory } from '../lib/demos'
import { DEMO_CATEGORY_TEXT, DEMO_TEXT } from '../content/demos-text'

export { LANGS, DEFAULT_LANG, LANG_INFO, isLang, type Lang } from './config'

// Bahasa tambahan: impor dict/<kode>.ts dan pages/<kode>.ts di atas, lalu daftarkan di dua objek ini.
const DICTS: Record<Lang, Dict> = { id, en, ms, es, fr, pt, ru, zh, hi, bn, ar }
const PAGES: Record<Lang, Pages> = { id: pId, en: pEn, ms: pMs, es: pEs, fr: pFr, pt: pPt, ru: pRu, zh: pZh, hi: pHi, bn: pBn, ar: pAr }

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
