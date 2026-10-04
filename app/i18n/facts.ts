// Kalimat fakta bisnis per bahasa. Angka & kontak tetap dari lib/site.ts dan lib/packages.ts
// (satu-satunya sumber); di sini hanya cara menuliskannya.
import { GUARANTEE_DAYS, HOURS, LOCATION, PERF_TARGET, RESPONSE } from '../lib/site'
import { DEMOS } from '../lib/demos'
import { ADDONS, PACKAGES, PAYMENT_SUMMARY, RENEWAL_BIO_PER_YEAR, RENEWAL_PER_YEAR, RENEWAL_SUMMARY, type Paket } from '../lib/packages'
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
    hours: 'Monday – Saturday, 09:00 – 17:00 WIB (UTC+7)',
    hoursDays: 'Monday – Saturday',
    hoursTime: '09:00 – 17:00 WIB (UTC+7)',
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
    hours: 'Isnin – Sabtu, 09.00 – 17.00 WIB (UTC+7)',
    hoursDays: 'Isnin – Sabtu',
    hoursTime: '09.00 – 17.00 WIB (UTC+7)',
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

/** Angka ringkas untuk papan harga: "600 rb" / "1,2 jt" (id), "600k" / "1.2M" (en), "600 ribu" / "1.2 juta" (ms). */
function compact(lang: Lang, n: number) {
  const fmt = (v: number) => new Intl.NumberFormat(LANG_INFO[lang].intl, { maximumFractionDigits: 1 }).format(v)
  const big = n >= 1_000_000
  const v = fmt(big ? n / 1_000_000 : n / 1_000)
  if (lang === 'id') return `${v} ${big ? 'jt' : 'rb'}`
  if (lang === 'en') return `${v}${big ? 'M' : 'k'}`
  return `${v} ${big ? 'juta' : 'ribu'}`
}

/** "Rp600 rb – 1,2 jt" (id) / "IDR 600k – 1.2M" (en) — mata uang sekali saja di depan. */
export const moneyShort = (lang: Lang, p: Pick<Paket, 'minPrice' | 'maxPrice' | 'openEnded'>) =>
  `${lang === 'id' ? 'Rp' : 'IDR '}${compact(lang, p.minPrice)} – ${compact(lang, p.maxPrice)}${p.openEnded ? '+' : ''}`

/** Paket dengan teks sesuai bahasa; angka selalu dari PACKAGES. */
export type LocalPaket = Paket & { priceFrom: string; priceRange: string; deposit: string }

export function packagesFor(lang: Lang): LocalPaket[] {
  return PACKAGES.map((p) => {
    const t = lang === 'id' ? null : PACKAGE_TEXT[lang][p.slug]
    const base: Paket = t ? { ...p, ...t } : p
    return {
      ...base,
      priceFrom: money(lang, p.minPrice),
      priceRange: moneyRange(lang, p),
      deposit: money(lang, Math.round(p.minPrice / 2)),
    }
  })
}

export const minPrice = () => Math.min(...PACKAGES.map((p) => p.minPrice))

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
