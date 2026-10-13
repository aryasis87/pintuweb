// Daftar paket bahasa tambahan. Tiap kode di X_LANGS (i18n/config.ts) wajib punya paketnya di sini.
import type { Lang, XLang } from '../config'
import type { Pack } from './types'
import es from './es'
import fr from './fr'
import pt from './pt'
import ru from './ru'
import zh from './zh'
import hi from './hi'
import bn from './bn'
import ar from './ar'

export const X: Record<XLang, Pack> = { es, fr, pt, ru, zh, hi, bn, ar }

/** Paket bahasa tambahan. Panggil hanya untuk bahasa di luar BASE_LANGS (cek dengan isBase()). */
export const pack = (lang: Lang): Pack => {
  const p = (X as Record<string, Pack | undefined>)[lang]
  if (!p) throw new Error(`Bahasa ${lang} belum punya paket di i18n/x/`)
  return p
}
