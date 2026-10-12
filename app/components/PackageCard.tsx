import { ArrowUpRight, Check, Clock } from 'lucide-react'

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

/**
 * Kartu paket bersama untuk halaman harga & halaman layanan: lencana + lama pengerjaan, nama, panel harga,
 * "cocok untuk", daftar isi paket, lalu tombol pilih. Paket yang direkomendasikan diberi bingkai biru.
 */
export default function PackageCard({ p, labels, maxFeatures, as: Heading = 'h3' }: Props) {
  const features = maxFeatures ? p.features.slice(0, maxFeatures) : p.features
  const rec = p.recommended
  return (
    <article
      className={`flex h-full flex-col rounded-[1.5rem] bg-white p-5 sm:p-6 ${
        rec ? 'shadow-[0_26px_50px_-34px_rgb(38_70_156/0.6)] ring-2 ring-[color:var(--primary-700)]' : 'ring-1 ring-[color:var(--border-light)]'
      }`}
    >
      <div className="flex min-h-7 items-center justify-between gap-3">
        {p.badge ? (
          <span className={`rounded-full px-3 py-1 text-[0.8125rem] font-semibold leading-tight ${rec ? 'bg-[color:var(--primary-700)] text-white' : 'bg-[color:var(--primary-50)] text-[color:var(--primary-700)]'}`}>{p.badge}</span>
        ) : (
          <span />
        )}
        <span className="inline-flex items-center gap-1.5 text-right text-[0.8125rem] leading-tight text-[color:var(--text-tertiary)]">
          <Clock size={14} className="shrink-0" aria-hidden="true" />
          <span>
            <span className="sr-only">{labels.duration}: </span>
            {p.duration}
          </span>
        </span>
      </div>

      <Heading className="mt-4 text-[1.5rem] leading-tight text-[color:var(--text-primary)]">{p.title}</Heading>
      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)]">{p.subtitle}</p>

      {/* Harga */}
      <div className={`mt-5 rounded-[1.125rem] p-4 sm:p-5 ${rec ? 'bg-[color:var(--primary-50)]' : 'bg-[color:var(--surface-soft)]'}`}>
        <p className="text-[0.8125rem] font-semibold text-[color:var(--text-tertiary)]">{labels.from}</p>
        <p className="display mt-0.5 text-[2rem] font-semibold leading-none tracking-tight text-[color:var(--text-primary)]">{p.priceFrom}</p>
        <dl className="mt-3 space-y-1 text-[0.8125rem] leading-snug text-[color:var(--text-tertiary)]">
          <div className="flex flex-wrap justify-between gap-x-3">
            <dt>{labels.range}</dt>
            <dd className="font-semibold text-[color:var(--text-secondary)]">{p.priceRange}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-x-3">
            <dt>{labels.deposit}</dt>
            <dd className="font-semibold text-[color:var(--text-secondary)]">{p.deposit}</dd>
          </div>
        </dl>
      </div>

      {p.highlights.length > 0 && (
        <div className="mt-5">
          <p className="text-[0.8125rem] font-semibold text-[color:var(--text-primary)]">{labels.suits}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {p.highlights.map((h) => (
              <li key={h} className="rounded-full bg-[color:var(--surface-soft)] px-2.5 py-1 text-[0.8125rem] leading-tight text-[color:var(--text-secondary)] ring-1 ring-[color:var(--border-light)]">
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul className="mt-5 flex-1 space-y-2.5 border-t border-[color:var(--rule)] pt-5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-[color:var(--text-secondary)]">
            <Check size={16} strokeWidth={2.4} className="mt-[0.15em] shrink-0 text-[color:var(--primary-700)]" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a href={p.waHref} target="_blank" rel="noopener noreferrer" className={`btn mt-6 w-full ${rec ? 'btn-solid' : 'btn-line'}`}>
        {p.choose} <ArrowUpRight size={16} className="arw arw-ne" aria-hidden="true" />
      </a>
      <p className="mt-3 text-center text-[0.8125rem] text-[color:var(--text-tertiary)]">{labels.free}</p>
    </article>
  )
}
