import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { DEMOS, type DemoCategory } from '../lib/demos'
import { PACKAGE_FOR_CATEGORY, PORTALS } from '../lib/portals'
import { getDict } from '../i18n'
import { minPrice, money, packagesFor } from '../i18n/facts'
import { path } from '../i18n/routes'
import type { Lang } from '../i18n/config'
import SectionHead from './SectionHead'
import { HlText } from './Bits'

// Jumlah per galeri dihitung dari lib/demos.ts supaya selalu sama dengan halaman demo.
const n = (c: DemoCategory) => DEMOS.filter((d) => d.category === c).length

// Galeri live — setiap "pintu" membuka portal katalog di pintuweb.com/<path> (zona Next terpisah, berbahasa Indonesia).
export default function Portfolio({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const t = d.portfolio
  const pk = packagesFor(lang)
  const fromOf = (c: DemoCategory) => pk.find((x) => x.slug === PACKAGE_FOR_CATEGORY[c])!.priceFrom
  return (
    <section aria-labelledby="showcase-title" className="relative overflow-hidden py-16 sm:py-20 lg:py-24" style={{ backgroundColor: 'var(--surface-primary)' }}>
      <div className="pointer-events-none absolute inset-0 u-grid opacity-60" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead no="01" eyebrow={t.eyebrow} id="showcase-title" title={<HlText parts={t.title} />} lead={t.lead(DEMOS.length)} />

        {/* Gateway grid */}
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4">
          {PORTALS.map((p) => {
            const g = t.galleries[p.category]
            return (
              // Portal = zona Next terpisah: tautan biasa, bukan navigasi klien.
              <a key={p.path} href={`/${p.path}`} hrefLang="id" className="group flex flex-col focus:outline-none">
                {/* Arch-framed preview */}
                <div className="pintu-frame relative overflow-hidden bg-white p-1.5 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[var(--card-shadow-hover)] group-focus-visible:-translate-y-1.5">
                  <div className="arch-top relative aspect-[4/5] overflow-hidden">
                    <Image src={p.image} alt={t.previewAlt(g.title)} fill sizes="(min-width: 1024px) 270px, 50vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,24,52,0.72)] via-[rgba(12,24,52,0.12)] to-transparent" />
                    <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[color:var(--primary-700)] shadow-sm sm:bottom-3 sm:left-3">
                      {n(p.category)} {t.unit[p.category]}
                    </span>
                    <span aria-hidden="true" className="absolute bottom-3 right-3 hidden items-center gap-1.5 rounded-full bg-[color:var(--primary-700)] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:flex">
                      {t.open} <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
                {/* Label */}
                <div className="mt-3 px-1 sm:mt-4">
                  <h3 className="flex items-center justify-between gap-2 text-sm font-bold text-[color:var(--text-primary)] sm:text-base">
                    {g.title}
                    <ArrowUpRight size={16} className="shrink-0 text-[color:var(--text-muted)] transition-colors group-hover:text-[color:var(--primary-700)]" />
                  </h3>
                  <p className="mt-1 hidden text-sm leading-snug text-[color:var(--text-tertiary)] sm:block">{g.tagline}</p>
                  <p className="mt-1.5 text-xs font-semibold text-[color:var(--primary-700)] sm:text-sm">{d.common.from} {fromOf(p.category)}</p>
                </div>
              </a>
            )
          })}
        </div>
        {t.galleryLang && <p className="mt-6 text-center text-xs text-[color:var(--text-tertiary)]">{t.galleryLang}</p>}

        {/* Footnote CTA */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl border border-[color:var(--border-light)] bg-white p-7 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-[color:var(--text-primary)]">{t.ctaTitle}</h3>
            <p className="mt-1 text-sm text-[color:var(--text-tertiary)]">{t.ctaLead}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href={path(lang, 'demo')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--border-light)] bg-white px-6 py-3.5 text-sm font-semibold text-[color:var(--primary-700)] transition-all hover:-translate-y-0.5 hover:shadow-md">
              {t.ctaDemos(DEMOS.length)} <ArrowUpRight size={16} />
            </Link>
            <Link href={path(lang, 'pricing')} className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
              {t.ctaFrom(money(lang, minPrice()))} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
