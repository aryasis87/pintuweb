import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PACKAGES } from '../lib/packages'
import { getDict } from '../i18n'
import { path } from '../i18n/routes'
import type { Lang } from '../i18n/config'
import SectionHead from './SectionHead'
import { HlText } from './Bits'
import PriceMap from './PriceMap'

// Bagian harga di beranda: peta harga semua paket (komponen PriceMap, juga dipakai di halaman harga),
// lalu ringkasan cara bayar dan tautan ke rincian paket.
export default function Pricing({ lang }: { lang: Lang }) {
  const t = getDict(lang).pricing

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead eyebrow={t.eyebrow} id="pricing-title" title={<HlText parts={t.title} />} lead={t.lead} />

        <PriceMap lang={lang} base={`${path(lang, 'pricing')}#`} className="mt-12 lg:mt-14" />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:items-center lg:gap-10">
          <p className="leading-relaxed text-[color:var(--text-tertiary)]">
            <span className="block font-semibold text-[color:var(--text-primary)]">{t.depositTitle}</span>
            {t.depositBody}
          </p>
          <p className="leading-relaxed text-[color:var(--text-tertiary)]">
            <span className="block font-semibold text-[color:var(--text-primary)]">{t.maintTitle}</span>
            {t.maintBody}
          </p>
          <Link href={path(lang, 'pricing')} className="btn btn-solid justify-self-start sm:col-span-2 lg:col-span-1 lg:justify-self-end">
            {t.seeAll(PACKAGES.length)} <ArrowRight size={17} className="arw" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
