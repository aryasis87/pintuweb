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

// Daftar harga ringkas semua 14 paket, dikelompokkan dalam panel lembut. Server component (tanpa
// JavaScript); setiap baris menaut ke kartu paketnya di halaman harga.
export default function Pricing({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const t = d.pricing
  const pk = packagesFor(lang)
  const base = `${path(lang, 'pricing')}#`
  const groups = PACKAGE_GROUPS.map((g) => ({ id: g, title: PACKAGE_GROUP_TEXT[lang][g].title, items: pk.filter((p) => p.group === g) }))

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead eyebrow={t.eyebrow} id="pricing-title" title={<HlText parts={t.title} />} lead={t.lead} />

        <div className="mt-14 gap-6 lg:columns-2">
          {groups.map((g) => (
            <div key={g.id} className="mb-6 break-inside-avoid rounded-[var(--radius)] bg-[color:var(--surface-soft)] p-6 sm:p-7">
              <h3 className="kicker text-[color:var(--primary-700)]">{g.title}</h3>
              <ul className="mt-3">
                {g.items.map((p) => (
                  <li key={p.slug}>
                    <Link href={base + p.slug} className="group -mx-3 flex items-start justify-between gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-white">
                      <span className="min-w-0">
                        <span className="block font-semibold text-[color:var(--text-primary)] group-hover:text-[color:var(--primary-700)]">{p.title}</span>
                        <span className="mt-0.5 block text-sm text-[color:var(--text-tertiary)]">{p.duration}</span>
                      </span>
                      <span className="mono shrink-0 pt-0.5 text-[0.9375rem] font-semibold text-[color:var(--text-primary)]">{moneyShort(lang, p)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl leading-relaxed text-[color:var(--text-tertiary)]">
            <span className="font-semibold text-[color:var(--text-primary)]">{t.depositTitle}:</span> {t.depositBody}{' '}
            <span className="font-semibold text-[color:var(--text-primary)]">{t.maintTitle}:</span> {t.maintBody}
          </p>
          <Link href={path(lang, 'pricing')} className="btn btn-solid shrink-0">
            {t.seeAll(PACKAGES.length)} <ArrowRight size={17} className="arw" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
