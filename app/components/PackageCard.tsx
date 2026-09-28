import { Check, Zap, Award, Sparkles, Code2, ShoppingCart, UserRound, ArrowRight, Clock } from 'lucide-react'
import { formatRupiah, priceRange, waLink, type Paket } from '../lib/packages'

const ICONS: Record<string, React.ReactNode> = {
  'landing-page': <Zap className="h-5 w-5" aria-hidden="true" />,
  'standar-umkm': <Award className="h-5 w-5" aria-hidden="true" />,
  'toko-online-simple': <Sparkles className="h-5 w-5" aria-hidden="true" />,
  'website-custom': <Code2 className="h-5 w-5" aria-hidden="true" />,
  'toko-online-full': <ShoppingCart className="h-5 w-5" aria-hidden="true" />,
  portofolio: <UserRound className="h-5 w-5" aria-hidden="true" />,
}

type Props = {
  p: Paket
  /** jumlah fitur yang ditampilkan; undefined = semua */
  maxFeatures?: number
  /** tingkat judul kartu (h2 di /paket, h3 di beranda) */
  as?: 'h2' | 'h3'
}

/** Kartu paket bersama untuk beranda & /paket — satu desain, satu sumber data. */
export default function PackageCard({ p, maxFeatures, as: Heading = 'h3' }: Props) {
  const features = maxFeatures ? p.features.slice(0, maxFeatures) : p.features
  return (
    <div className="relative flex h-full flex-col">
      {p.badge && (
        <span className={`absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold shadow-sm ${p.recommended ? 'bg-[color:var(--primary-700)] text-white' : 'bg-[color:var(--accent-300)] text-[color:var(--text-primary)]'}`}>
          {p.badge}
        </span>
      )}
      <div className={`flex h-full flex-col rounded-3xl bg-white p-6 sm:p-8 ${p.recommended ? 'border-2 border-[color:var(--primary-700)] shadow-[0_20px_50px_-20px_rgba(43,57,212,0.4)]' : 'border border-[color:var(--border-light)] shadow-sm'}`}>
        <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${p.recommended ? 'bg-[color:var(--primary-100)] text-[color:var(--primary-700)]' : 'bg-[color:var(--neutral-100)] text-[color:var(--text-tertiary)]'}`}>{ICONS[p.slug]}</span>
        <Heading className="mt-4 text-xl font-bold text-[color:var(--text-primary)]">{p.title}</Heading>
        <p className="mt-1 text-sm text-[color:var(--text-tertiary)]">{p.subtitle}</p>
        <div className="mt-5">
          <span className="text-sm text-[color:var(--text-tertiary)]">mulai </span>
          <span className="text-4xl font-extrabold text-[color:var(--text-primary)]">{formatRupiah(p.minPrice)}</span>
          <p className="mt-1 text-xs text-[color:var(--text-muted)]">Kisaran {priceRange(p)} · DP 50%: {formatRupiah(Math.round(p.minPrice / 2))}</p>
        </div>
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-[color:var(--text-secondary)]">
          <Clock size={15} className="text-[color:var(--primary-700)]" aria-hidden="true" /> Pengerjaan {p.duration}
        </p>
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold text-[color:var(--text-secondary)]">Cocok untuk:</p>
          <div className="flex flex-wrap gap-2">
            {p.highlights.map((h) => (
              <span key={h} className="rounded-md bg-[color:var(--surface-primary)] px-2.5 py-1 text-xs text-[color:var(--text-secondary)]">{h}</span>
            ))}
          </div>
        </div>
        <ul className="mt-6 flex-1 space-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-[color:var(--text-secondary)]">
              <Check size={17} strokeWidth={2.5} aria-hidden="true" className={`mt-0.5 shrink-0 ${p.recommended ? 'text-[color:var(--primary-700)]' : 'text-[color:var(--success-700)]'}`} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <a
          href={waLink(p.title)}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${p.recommended ? 'btn-primary shadow-md hover:shadow-lg' : 'bg-[color:var(--text-primary)] text-white hover:bg-[color:var(--neutral-800)]'}`}
        >
          {p.title.length > 22 ? 'Pilih paket ini' : `Pilih ${p.title}`} <ArrowRight size={15} aria-hidden="true" />
        </a>
        <p className="mt-3 text-center text-xs text-[color:var(--text-muted)]">Konsultasi gratis lewat WhatsApp</p>
      </div>
    </div>
  )
}
