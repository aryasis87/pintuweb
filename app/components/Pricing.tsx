import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PACKAGES, PACKAGE_GROUPS } from '../lib/packages'
import { PACKAGE_GROUP_TEXT } from '../content/packages-text'
import { getDict } from '../i18n'
import { moneyShort, packagesFor } from '../i18n/facts'
import { path } from '../i18n/routes'
import type { Lang } from '../i18n/config'
import SectionHead from './SectionHead'
import { HlText } from './Bits'

// Papan harga bergaya daftar menu: semua 14 paket, nama ...... kisaran harga. Server component
// (tanpa JavaScript), setiap baris menaut ke kartu paketnya di halaman harga.
export default function Pricing({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const t = d.pricing
  const pk = packagesFor(lang)
  const base = `${path(lang, 'pricing')}#`
  const groups = PACKAGE_GROUPS.map((g) => ({ id: g, title: PACKAGE_GROUP_TEXT[lang][g].title, items: pk.filter((p) => p.group === g) }))

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="bg-[color:var(--surface-primary)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead no="05" eyebrow={t.eyebrow} id="pricing-title" title={<HlText parts={t.title} />} lead={t.lead} />

        <div className="mt-14 gap-x-14 lg:mt-16 lg:columns-2">
          {groups.map((g) => (
            <div key={g.id} className="mb-10 break-inside-avoid">
              <h3 className="kicker flex items-baseline justify-between border-b border-[color:var(--rule)] pb-2 text-[color:var(--primary-700)]">
                <span>{g.title}</span>
                <span className="text-[color:var(--text-tertiary)]" aria-hidden="true">{t.colPrice}</span>
              </h3>
              <ul>
                {g.items.map((p) => (
                  <li key={p.slug} className="border-b border-[color:var(--border-light)]">
                    <Link href={base + p.slug} className="group block py-3.5">
                      <span className="flex items-baseline gap-3">
                        <span className="serif text-[1.3rem] leading-snug text-[color:var(--text-primary)] group-hover:text-[color:var(--primary-700)]">{p.title}</span>
                        <span className="leader" aria-hidden="true" />
                        <span className="shrink-0 text-[0.9375rem] font-semibold text-[color:var(--text-primary)]">{moneyShort(lang, p)}</span>
                      </span>
                      <span className="mono mt-1 block text-[0.6875rem] text-[color:var(--text-tertiary)]">{p.duration}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 border-t border-[color:var(--rule)] pt-8 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 className="kicker text-[color:var(--text-primary)]">{t.depositTitle}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)]">{t.depositBody}</p>
          </div>
          <div className="lg:col-span-4">
            <h3 className="kicker text-[color:var(--text-primary)]">{t.maintTitle}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)]">{t.maintBody}</p>
          </div>
          <div className="sm:col-span-2 lg:col-span-4 lg:text-right">
            <Link href={path(lang, 'pricing')} className="btn btn-line w-full sm:w-auto">
              {t.seeAll(PACKAGES.length)} <ArrowRight size={17} className="arw" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
