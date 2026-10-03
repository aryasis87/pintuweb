// Bahasa situs. Indonesia = bahasa utama tanpa awalan (/paket); bahasa lain berawalan (/en/pricing, /ms/harga).
// Secara internal semua halaman hidup di app/[lang]/…; next.config.ts menulis ulang URL publik ke sana.

export const LANGS = ['id', 'en', 'ms'] as const
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG: Lang = 'id'

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v)

export const LANG_INFO: Record<Lang, { name: string; short: string; htmlLang: string; hreflang: string; ogLocale: string; intl: string }> = {
  id: { name: 'Bahasa Indonesia', short: 'ID', htmlLang: 'id', hreflang: 'id', ogLocale: 'id_ID', intl: 'id-ID' },
  en: { name: 'English', short: 'EN', htmlLang: 'en', hreflang: 'en', ogLocale: 'en_US', intl: 'en-US' },
  ms: { name: 'Bahasa Melayu', short: 'MS', htmlLang: 'ms', hreflang: 'ms', ogLocale: 'ms_MY', intl: 'ms-MY' },
}

/** Artikel hanya ditulis dalam bahasa ini (keputusan pemilik, 3 Okt 2026). */
export const ARTICLE_LANGS: Lang[] = ['id', 'en']
