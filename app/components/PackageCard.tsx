import { Check, Zap, Award, Sparkles, Code2, ShoppingCart, UserRound, ArrowRight, Clock, Link2, Mail, CalendarRange, CalendarCheck, Home, Building2, LayoutDashboard, Palette } from 'lucide-react'

const ICONS: Record<string, React.ReactNode> = {
  'landing-page': <Zap className="h-5 w-5" aria-hidden="true" />,
  'standar-umkm': <Award className="h-5 w-5" aria-hidden="true" />,
  'toko-online-simple': <Sparkles className="h-5 w-5" aria-hidden="true" />,
  'website-custom': <Code2 className="h-5 w-5" aria-hidden="true" />,
  'toko-online-full': <ShoppingCart className="h-5 w-5" aria-hidden="true" />,
  portofolio: <UserRound className="h-5 w-5" aria-hidden="true" />,
  'link-in-bio': <Link2 className="h-5 w-5" aria-hidden="true" />,
  'undangan-digital': <Mail className="h-5 w-5" aria-hidden="true" />,
  'situs-acara': <CalendarRange className="h-5 w-5" aria-hidden="true" />,
  'sistem-reservasi': <CalendarCheck className="h-5 w-5" aria-hidden="true" />,
  'website-properti': <Home className="h-5 w-5" aria-hidden="true" />,
  'marketplace-properti': <Building2 className="h-5 w-5" aria-hidden="true" />,
  'aplikasi-web': <LayoutDashboard className="h-5 w-5" aria-hidden="true" />,
  'konsep-desain': <Palette className="h-5 w-5" aria-hidden="true" />,
}

export type { CardData, CardLabels } from './cards'
import type { CardData, CardLabels } from './cards'

type Props = {
  p: CardData
  labels: CardLabels
  /** jumlah fitur yang ditampilkan; undefined = semua */
  maxFeatures?: number
  /** tingkat judul kartu (h3 di halaman paket & beranda, h4 di halaman layanan) */
  as?: 'h2' | 'h3' | 'h4'
}

/** Kartu paket bersama untuk beranda & halaman paket — satu desain, satu sumber data. */
export default function PackageCard({ p, labels, maxFeatures, as: Heading = 'h3' }: Props) {
  const features = maxFeatures ? p.features.slice(0, maxFeatures) : p.features
  return (
    <div className="relative flex h-full flex-col">
      {p.badge && (
        <span className={`absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold shadow-sm ${p.recommended ? 'bg-[color:var(--primary-700)] text-white' : 'bg-[color:var(--accent-300)] text-[color:var(--text-primary)]'}`}>
          {p.badge}
        </span>
      )}
      <div className={`flex h-full flex-col rounded-3xl bg-white p-6 sm:p-8 ${p.recommended ? 'border-2 border-[color:var(--primary-700)] shadow-[0_20px_50px_-20px_rgba(38,70,156,0.35)]' : 'border border-[color:var(--border-light)] shadow-sm'}`}>
        <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${p.recommended ? 'bg-[color:var(--primary-100)] text-[color:var(--primary-700)]' : 'bg-[color:var(--neutral-100)] text-[color:var(--text-tertiary)]'}`}>{ICONS[p.slug]}</span>
        <Heading className="mt-4 text-xl font-bold text-[color:var(--text-primary)]">{p.title}</Heading>
        <p className="mt-1 text-sm text-[color:var(--text-tertiary)]">{p.subtitle}</p>
        <div className="mt-5">
          <span className="text-sm text-[color:var(--text-tertiary)]">{labels.from} </span>
          <span className="text-4xl font-extrabold text-[color:var(--text-primary)]">{p.priceFrom}</span>
          <p className="mt-1 text-xs text-[color:var(--text-muted)]">{labels.range} {p.priceRange} · {labels.deposit}: {p.deposit}</p>
        </div>
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-[color:var(--text-secondary)]">
          <Clock size={15} className="text-[color:var(--primary-700)]" aria-hidden="true" /> {labels.duration} {p.duration}
        </p>
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold text-[color:var(--text-secondary)]">{labels.suits}</p>
          <div className="flex flex-wrap gap-2">
            {p.highlights.map((h) => (
              <span key={h} className="rounded-md bg-[color:var(--surface-primary)] px-2.5 py-1 text-xs text-[color:var(--text-secondary)]">{h}</span>
            ))}
          </div>
        </div>
        <ul className="mt-6 flex-1 space-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-[color:var(--text-secondary)]">
              <Check size={17} strokeWidth={2.5} aria-hidden="true" className={`mt-0.5 shrink-0 ${p.recommended ? 'text-[color:var(--primary-700)]' : 'text-[color:var(--primary-600)]'}`} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <a
          href={p.waHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${p.recommended ? 'btn-primary shadow-md hover:shadow-lg' : 'bg-[color:var(--text-primary)] text-white hover:bg-[color:var(--neutral-800)]'}`}
        >
          {p.choose} <ArrowRight size={15} aria-hidden="true" />
        </a>
        <p className="mt-3 text-center text-xs text-[color:var(--text-muted)]">{labels.free}</p>
      </div>
    </div>
  )
}
