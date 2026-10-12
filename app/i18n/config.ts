// Bahasa situs. Indonesia = bahasa utama tanpa awalan (/paket); bahasa lain berawalan (/en/pricing, /ms/harga, /fr/pricing).
// Secara internal semua halaman hidup di app/[lang]/…; next.config.ts menulis ulang URL publik ke sana.
//
// Dua lapis bahasa:
// - BAHASA DASAR (id, en, ms): seluruh isi situs ditulis tangan, termasuk dokumen legal; id & en juga punya artikel.
// - BAHASA TAMBAHAN (X_LANGS): terjemahan dari versi Inggris, disimpan sebagai "paket" di app/i18n/x/<kode>.ts
//   (+ dict/<kode>.ts dan pages/<kode>.ts). URL-nya memakai segmen Inggris (/fr/pricing). Halaman yang belum
//   diterjemahkan untuk suatu bahasa tidak dibuat; tautan ke sana otomatis menuju versi Inggris (lihat routes.ts).
//
// Menambah bahasa: tulis dict, pages, dan paket x-nya, daftarkan di i18n/index.ts dan i18n/x/index.ts, lalu
// tambahkan kodenya ke X_LANGS dan LANG_INFO di bawah. TypeScript akan menunjukkan bila ada yang terlewat.

export const BASE_LANGS = ['id', 'en', 'ms'] as const
export const X_LANGS = [] as const
export const LANGS = [...BASE_LANGS, ...X_LANGS] as const

export type BaseLang = (typeof BASE_LANGS)[number]
export type XLang = (typeof X_LANGS)[number]
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG: Lang = 'id'

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v)
export const isBase = (v: Lang): v is BaseLang => (BASE_LANGS as readonly string[]).includes(v)

type Info = {
  /** nama bahasa dalam bahasa itu sendiri */
  name: string
  short: string
  htmlLang: string
  hreflang: string
  ogLocale: string
  /** locale untuk Intl (angka, tanggal, pengurutan); "-u-nu-latn" memaksa angka Latin supaya seragam dengan teksnya */
  intl: string
  dir: 'ltr' | 'rtl'
  /** false bila aksaranya tidak ada di huruf gambar OG (Inter): gambar OG memakai kartu merek berbahasa Inggris */
  ogText: boolean
}

export const LANG_INFO: Record<Lang, Info> = {
  id: { name: 'Bahasa Indonesia', short: 'ID', htmlLang: 'id', hreflang: 'id', ogLocale: 'id_ID', intl: 'id-ID', dir: 'ltr', ogText: true },
  en: { name: 'English', short: 'EN', htmlLang: 'en', hreflang: 'en', ogLocale: 'en_US', intl: 'en-US', dir: 'ltr', ogText: true },
  ms: { name: 'Bahasa Melayu', short: 'MS', htmlLang: 'ms', hreflang: 'ms', ogLocale: 'ms_MY', intl: 'ms-MY', dir: 'ltr', ogText: true },
}

/** Artikel hanya ditulis dalam bahasa ini (keputusan pemilik, 3 Okt 2026). */
export const ARTICLE_LANGS: Lang[] = ['id', 'en']
