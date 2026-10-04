import { ArrowUpRight } from 'lucide-react'

export type { CardData, CardLabels } from './cards'
import type { CardData, CardLabels } from './cards'

type Props = {
  p: CardData
  labels: CardLabels
  /** jumlah fitur yang ditampilkan; undefined = semua */
  maxFeatures?: number
  /** tingkat judul kartu (h3 di halaman paket, h4 di halaman layanan) */
  as?: 'h2' | 'h3' | 'h4'
}

/** Kartu paket bersama untuk halaman paket & layanan — lembar spesifikasi bergaris rambut. */
export default function PackageCard({ p, labels, maxFeatures, as: Heading = 'h3' }: Props) {
  const features = maxFeatures ? p.features.slice(0, maxFeatures) : p.features
  const rec = p.recommended
  return (
    <article className={`flex h-full flex-col rounded-[var(--radius)] border bg-white p-6 sm:p-7 ${rec ? 'border-[color:var(--primary-700)] shadow-[inset_0_3px_0_var(--primary-700)]' : 'border-[color:var(--border-light)]'}`}>
      <div className="kicker flex items-baseline justify-between gap-3">
        <span className={rec ? 'text-[color:var(--primary-700)]' : 'text-[color:var(--text-tertiary)]'}>{p.badge ?? ' '}</span>
        <span className="text-right normal-case tracking-normal text-[color:var(--text-tertiary)]">{p.duration}</span>
      </div>

      <Heading className="mt-4 text-[1.75rem] leading-tight text-[color:var(--text-primary)]">{p.title}</Heading>
      <p className="mt-1.5 text-[0.9375rem] text-[color:var(--text-tertiary)]">{p.subtitle}</p>

      <div className="mt-6 border-t border-[color:var(--border-light)] pt-5">
        <p className="flex items-baseline gap-2">
          <span className="kicker text-[color:var(--text-tertiary)]">{labels.from}</span>
          <span className="serif text-[2.4rem] leading-none text-[color:var(--text-primary)]">{p.priceFrom}</span>
        </p>
        <p className="mono mt-2 text-[0.6875rem] leading-relaxed text-[color:var(--text-tertiary)]">
          {labels.range} {p.priceRange}
          <br />
          {labels.deposit}: {p.deposit}
        </p>
      </div>

      {p.highlights.length > 0 && (
        <p className="mt-5 text-sm text-[color:var(--text-secondary)]">
          <span className="font-semibold text-[color:var(--text-primary)]">{labels.suits}</span> {p.highlights.join(' · ')}
        </p>
      )}

      <ul className="mt-5 flex-1 space-y-2.5 border-t border-[color:var(--border-light)] pt-5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-[color:var(--text-secondary)]">
            <span className="mt-[0.55em] h-[5px] w-[5px] shrink-0 bg-[color:var(--primary-700)]" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a href={p.waHref} target="_blank" rel="noopener noreferrer" className={`btn mt-7 w-full ${rec ? 'btn-solid' : 'btn-line'}`}>
        {p.choose} <ArrowUpRight size={16} className="arw arw-ne" aria-hidden="true" />
      </a>
      <p className="mt-3 text-center text-xs text-[color:var(--text-tertiary)]">{labels.free}</p>
    </article>
  )
}
