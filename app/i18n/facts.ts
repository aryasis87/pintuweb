// Kalimat fakta bisnis per bahasa. Angka & kontak tetap dari lib/site.ts dan lib/packages.ts
// (satu-satunya sumber); di sini hanya cara menuliskannya.
import { CLOSES, GUARANTEE_DAYS, HOURS, LOCATION, OPENS, PERF_TARGET, RESPONSE, dotTime } from '../lib/site'
import { DEMOS } from '../lib/demos'
import { ADDONS, PACKAGES, PAYMENT_SUMMARY, RENEWAL_BIO_PER_YEAR, RENEWAL_PER_YEAR, RENEWAL_SUMMARY, type Paket, type Waktu } from '../lib/packages'
import { LANG_INFO, type Lang } from './config'
import { ADDON_TEXT, PACKAGE_TEXT } from '../content/packages-text'

type Facts = {
  hours: string
  hoursDays: string
  hoursTime: string
  response: string
  location: string
  serves: string
  payment: string
  renewal: string
  guarantee: string
}

const FACTS: Record<Lang, Facts> = {
  id: {
    hours: HOURS,
    hoursDays: HOURS.split(', ')[0],
    hoursTime: HOURS.split(', ')[1],
    response: RESPONSE,
    location: LOCATION,
    serves: 'Melayani seluruh Indonesia',
    payment: PAYMENT_SUMMARY,
    renewal: RENEWAL_SUMMARY,
    guarantee: `Bug dan masalah teknis diperbaiki gratis selama ${GUARANTEE_DAYS} hari setelah website online. Setelah itu maintenance mengikuti paket (1–6 bulan) dan bisa diperpanjang.`,
  },
  en: {
    hours: `Monday – Saturday, ${OPENS} – ${CLOSES} WIB (UTC+7)`,
    hoursDays: 'Monday – Saturday',
    hoursTime: `${OPENS} – ${CLOSES} WIB (UTC+7)`,
    response: 'We reply on working days, within 24 hours',
    location: 'Trenggalek, East Java, Indonesia',
    serves: 'Working with clients remotely',
    payment:
      'Every package: a 50% deposit to start, and the remaining 50% once the website is finished and you have approved it. ' +
      'We accept Indonesian bank transfer, e-wallets (OVO, GoPay, DANA) and QRIS. The invoice is sent before you pay.',
    renewal:
      'The domain and hosting included in a package cover the first year. From the second year, renewal costs roughly ' +
      `${money('en', RENEWAL_PER_YEAR.min)}–${money('en', RENEWAL_PER_YEAR.max).replace('IDR ', '')} per year for websites and ` +
      `${money('en', RENEWAL_BIO_PER_YEAR.min)}–${money('en', RENEWAL_BIO_PER_YEAR.max).replace('IDR ', '')} for link-in-bio pages; ` +
      'for systems and web apps with a database, the cost is stated in the quote. Digital invitations stay active for 12 months ' +
      'with no renewal fee. We remind you before anything is due.',
    guarantee: `Bugs and technical issues are fixed free of charge for ${GUARANTEE_DAYS} days after launch. After that, maintenance follows your package (1–6 months) and can be extended.`,
  },
  ms: {
    hours: `Isnin – Sabtu, ${dotTime(OPENS)} – ${dotTime(CLOSES)} WIB (UTC+7)`,
    hoursDays: 'Isnin – Sabtu',
    hoursTime: `${dotTime(OPENS)} – ${dotTime(CLOSES)} WIB (UTC+7)`,
    response: 'Kami membalas pada hari bekerja, dalam masa 24 jam',
    location: 'Trenggalek, Jawa Timur, Indonesia',
    serves: 'Bekerja dengan pelanggan secara jarak jauh',
    payment:
      'Semua pakej: deposit 50% untuk bermula, baki 50% selepas laman web siap dan anda luluskan. ' +
      'Kami menerima pindahan bank Indonesia, e-dompet (OVO, GoPay, DANA) dan QRIS. Invois dihantar sebelum pembayaran.',
    renewal:
      'Domain dan hosting dalam pakej sah untuk tahun pertama. Mulai tahun kedua, kos pembaharuan sekitar ' +
      `${money('ms', RENEWAL_PER_YEAR.min)}–${money('ms', RENEWAL_PER_YEAR.max).replace('IDR ', '')} setahun untuk laman web dan ` +
      `${money('ms', RENEWAL_BIO_PER_YEAR.min)}–${money('ms', RENEWAL_BIO_PER_YEAR.max).replace('IDR ', '')} untuk link in bio; ` +
      'untuk sistem & aplikasi web dengan pangkalan data, kosnya dinyatakan dalam sebut harga. Kad jemputan digital aktif 12 bulan ' +
      'tanpa kos pembaharuan. Kami maklumkan sebelum tarikh luput.',
    guarantee: `Pepijat dan masalah teknikal dibaiki secara percuma selama ${GUARANTEE_DAYS} hari selepas laman web dilancarkan. Selepas itu penyelenggaraan mengikut pakej (1–6 bulan) dan boleh dilanjutkan.`,
  },
}

export const facts = (lang: Lang) => FACTS[lang]

/** Rp600.000 (id) / IDR 600,000 (en, ms). */
export function money(lang: Lang, n: number) {
  if (lang === 'id') {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n).replace(/\s/g, '')
  }
  return `IDR ${new Intl.NumberFormat(LANG_INFO[lang].intl, { maximumFractionDigits: 0 }).format(n)}`
}

export const moneyRange = (lang: Lang, p: Paket) =>
  `${money(lang, p.minPrice)} – ${money(lang, p.maxPrice)}${p.openEnded ? '+' : ''}`

/** Angka ringkas untuk papan harga: "300 rb" / "1,25 jt" (id), "300k" / "1.25M" (en), "300 ribu" / "1.25 juta" (ms). */
function compact(lang: Lang, n: number) {
  const fmt = (v: number) => new Intl.NumberFormat(LANG_INFO[lang].intl, { maximumFractionDigits: 2 }).format(v)
  const big = n >= 1_000_000
  const v = fmt(big ? n / 1_000_000 : n / 1_000)
  if (lang === 'id') return `${v} ${big ? 'jt' : 'rb'}`
  if (lang === 'en') return `${v}${big ? 'M' : 'k'}`
  return `${v} ${big ? 'juta' : 'ribu'}`
}

/** Angka ringkas tanpa mata uang, untuk label sumbu peta harga: "1 jt" / "1M" / "1 juta". */
export const moneyCompact = compact
/** Kode mata uang yang dipakai moneyShort: "Rp" (id) / "IDR" (en, ms). */
export const currencyCode = (lang: Lang) => (lang === 'id' ? 'Rp' : 'IDR')

/** "Rp600 rb – 1,2 jt" (id) / "IDR 600k – 1.2M" (en) — mata uang sekali saja di depan. */
export const moneyShort = (lang: Lang, p: Pick<Paket, 'minPrice' | 'maxPrice' | 'openEnded'>) =>
  `${lang === 'id' ? 'Rp' : 'IDR '}${compact(lang, p.minPrice)} – ${compact(lang, p.maxPrice)}${p.openEnded ? '+' : ''}`

/** Paket dengan teks sesuai bahasa; angka selalu dari PACKAGES. */
export type LocalPaket = Paket & { priceFrom: string; priceRange: string; deposit: string }

/** Perkiraan waktu pengerjaan dalam bahasa pengunjung, mis. "1–2 working days" / "1–3 minggu, bergantung pada ciri". */
export function durationText(lang: Lang, w: Waktu): string {
  const n = w.min === w.max ? `${w.min}` : `${w.min}–${w.max}`
  const one = w.max === 1
  if (lang === 'en') return `${n} ${w.unit === 'hari' ? (one ? 'working day' : 'working days') : one ? 'week' : 'weeks'}${w.flex ? ', depending on features' : ''}`
  if (lang === 'ms') return `${n} ${w.unit === 'hari' ? 'hari bekerja' : 'minggu'}${w.flex ? ', bergantung pada ciri' : ''}`
  return `${n} ${w.unit === 'hari' ? 'hari kerja' : 'minggu'}${w.flex ? ', tergantung fitur' : ''}`
}

export function packagesFor(lang: Lang): LocalPaket[] {
  return PACKAGES.map((p) => {
    const t = lang === 'id' ? null : PACKAGE_TEXT[lang][p.slug]
    const base: Paket = t ? { ...p, ...t } : p
    return {
      ...base,
      duration: durationText(lang, p.time),
      priceFrom: money(lang, p.minPrice),
      priceRange: moneyRange(lang, p),
      deposit: money(lang, Math.round(p.minPrice / 2)),
    }
  })
}

export const minPrice = () => Math.min(...PACKAGES.map((p) => p.minPrice))

/** Paket dengan perkiraan pengerjaan tercepat dan terlama (dari `time` di packages.ts; satu minggu = 5 hari kerja). */
export function durationSpan(lang: Lang) {
  const days = (n: number, p: Paket) => n * (p.time.unit === 'minggu' ? 5 : 1)
  const span = PACKAGES.map((p) => ({ slug: p.slug, lo: days(p.time.min, p), hi: days(p.time.max, p) }))
  const fast = span.reduce((a, b) => (b.lo < a.lo || (b.lo === a.lo && b.hi < a.hi) ? b : a))
  const slow = span.reduce((a, b) => (b.hi > a.hi ? b : a))
  const pk = packagesFor(lang)
  return { fastest: pk.find((p) => p.slug === fast.slug)!, slowest: pk.find((p) => p.slug === slow.slug)! }
}

/** Pesan WhatsApp untuk paket, dalam bahasa pengunjung (supaya kami tahu bahasa balasannya). */
export function waPackageText(lang: Lang, title: string) {
  if (lang === 'en') return `Hello PintuWeb, I'm interested in the "${title}" package. Could you tell me more?`
  if (lang === 'ms') return `Hai PintuWeb, saya berminat dengan pakej "${title}". Boleh kongsikan maklumat lanjut?`
  return `Halo PintuWeb, saya tertarik dengan paket "${title}". Boleh minta info lebih lanjut?`
}

/** Biaya tambahan per bahasa (angka dari ADDONS di packages.ts). */
export function addonsFor(lang: Lang) {
  return ADDONS.map((a) => {
    const t = ADDON_TEXT[lang][a.slug]
    return { ...a, title: t.title, unit: t.unit, range: `${money(lang, a.minPrice)} – ${money(lang, a.maxPrice)}` }
  })
}

/**
 * Mengisi penanda harga/fakta di teks (artikel, halaman layanan):
 * {{from:slug}} {{price:slug}} {{max:slug}} {{duration:slug}} {{renewal}} {{guarantee}} {{demos}} {{perf}} {{pricetable}}.
 * Penanda yang tidak dikenal menggagalkan build supaya tidak ada angka yang lolos tanpa sumber.
 */
export function fillFacts(lang: Lang, s: string): string {
  const pk = packagesFor(lang)
  const bySlug = (slug: string) => {
    const p = pk.find((x) => x.slug === slug)
    if (!p) throw new Error(`Paket tidak dikenal: ${slug}`)
    return p
  }
  const renewal =
    lang === 'id'
      ? `${money('id', RENEWAL_PER_YEAR.min)}–${money('id', RENEWAL_PER_YEAR.max)}`
      : `${money(lang, RENEWAL_PER_YEAR.min)}–${money(lang, RENEWAL_PER_YEAR.max).replace('IDR ', '')}`
  const head = lang === 'id' ? ['Paket', 'Kisaran harga', 'Pengerjaan', 'Cocok untuk'] : ['Package', 'Price range', 'Turnaround', 'Best for']
  const table = [
    `| ${head.join(' | ')} |`,
    `|${head.map(() => '---').join('|')}|`,
    ...pk.map((p) => `| ${p.title} | ${p.priceRange} | ${p.duration} | ${p.highlights.join(', ')} |`),
  ].join('\n')
  const out = s
    .replace(/\{\{pricetable\}\}/g, table)
    .replace(/\{\{from:([a-z-]+)\}\}/g, (_, slug) => bySlug(slug).priceFrom)
    .replace(/\{\{price:([a-z-]+)\}\}/g, (_, slug) => bySlug(slug).priceRange)
    .replace(/\{\{max:([a-z-]+)\}\}/g, (_, slug) => money(lang, bySlug(slug).maxPrice))
    .replace(/\{\{duration:([a-z-]+)\}\}/g, (_, slug) => bySlug(slug).duration)
    .replace(/\{\{renewal\}\}/g, renewal)
    .replace(/\{\{guarantee\}\}/g, String(GUARANTEE_DAYS))
    .replace(/\{\{demos\}\}/g, String(DEMOS.length))
    .replace(/\{\{perf\}\}/g, PERF_TARGET)
  const left = out.match(/\{\{[^}]+\}\}/)
  if (left) throw new Error(`Penanda tak dikenal: ${left[0]}`)
  return out
}
