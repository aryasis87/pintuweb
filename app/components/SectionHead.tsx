import type { ReactNode } from 'react'

type Props = {
  /** Nomor "pintu" bagian ini di beranda, mis. "01". */
  no: string
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  id?: string
  tone?: 'light' | 'dark'
  /** true = judul & pengantar selalu bertumpuk (untuk kolom sempit). */
  stacked?: boolean
}

// Kepala bagian khas PintuWeb: tiap bagian beranda adalah satu "pintu" bernomor.
// Judul rata kiri, pengantar di kolom kanan pada desktop — sengaja tidak seragam tengah semua.
export default function SectionHead({ no, eyebrow, title, lead, id, tone = 'light', stacked = false }: Props) {
  const dark = tone === 'dark'
  return (
    <div className={`grid gap-5 ${stacked ? '' : 'lg:grid-cols-12 lg:items-end lg:gap-10'}`}>
      <div className={stacked ? '' : 'lg:col-span-7'}>
        <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.18em] ${dark ? 'text-[color:var(--accent-200)]' : 'text-[color:var(--primary-700)]'}`}>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rotate-45 rounded-[2px] bg-[color:var(--accent-300)]" aria-hidden="true" />
            Pintu {no}
          </span>
          <span className={`h-px w-8 ${dark ? 'bg-white/25' : 'bg-[color:var(--border-medium)]'}`} aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 id={id} className={`mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl ${dark ? 'text-white' : 'text-[color:var(--text-primary)]'}`}>
          {title}
        </h2>
      </div>
      {lead && (
        <p className={`text-base leading-relaxed sm:text-lg ${stacked ? '' : 'lg:col-span-5 lg:pb-1'} ${dark ? 'text-white/70' : 'text-[color:var(--text-tertiary)]'}`}>
          {lead}
        </p>
      )}
    </div>
  )
}
