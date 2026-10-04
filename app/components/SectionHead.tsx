import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  id?: string
  tone?: 'light' | 'dark'
  /** rata tengah (untuk bagian penutup / yang berdiri sendiri) */
  center?: boolean
}

// Kepala bagian yang lapang: label kecil, judul serif, satu paragraf pengantar.
export default function SectionHead({ eyebrow, title, lead, id, tone = 'light', center = false }: Props) {
  const dark = tone === 'dark'
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className={`kicker ${dark ? 'text-[color:var(--accent-200)]' : 'text-[color:var(--primary-700)]'}`}>{eyebrow}</p>
      <h2 id={id} className={`mt-3 text-[2.1rem] leading-[1.1] sm:text-[2.6rem] lg:text-[3rem] ${dark ? 'text-white' : 'text-[color:var(--text-primary)]'}`}>
        {title}
      </h2>
      {lead && (
        <p className={`mt-5 text-[1.0625rem] leading-relaxed sm:text-lg ${center ? 'mx-auto max-w-2xl' : 'max-w-2xl'} ${dark ? 'text-white/75' : 'text-[color:var(--text-tertiary)]'}`}>
          {lead}
        </p>
      )}
    </div>
  )
}
