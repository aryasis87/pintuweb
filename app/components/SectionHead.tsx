import type { ReactNode } from 'react'

type Props = {
  /** Nomor bagian di beranda, mis. "01". */
  no?: string
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  id?: string
  tone?: 'light' | 'dark'
  /** true = semua bertumpuk satu kolom (untuk kolom sempit). */
  stacked?: boolean
}

// Kepala bagian bergaya halaman majalah: garis tegas di atas, nomor & label di kolom tepi,
// judul serif dan pengantar di kolom utama.
export default function SectionHead({ no, eyebrow, title, lead, id, tone = 'light', stacked = false }: Props) {
  const dark = tone === 'dark'
  return (
    <div className={`grid grid-cols-1 gap-x-10 gap-y-5 border-t pt-5 ${dark ? 'border-white/40' : 'border-[color:var(--rule)]'} ${stacked ? '' : 'lg:grid-cols-12'}`}>
      <p className={`kicker flex gap-3 ${stacked ? '' : 'lg:col-span-3'} ${dark ? 'text-[color:var(--accent-200)]' : 'text-[color:var(--text-tertiary)]'}`}>
        {no && <span className={dark ? 'text-white' : 'text-[color:var(--primary-700)]'}>{no}</span>}
        <span>{eyebrow}</span>
      </p>
      <div className={stacked ? '' : 'lg:col-span-9'}>
        <h2 id={id} className={`text-[2.25rem] leading-[1.06] sm:text-5xl lg:text-[3.4rem] ${dark ? 'text-white' : 'text-[color:var(--text-primary)]'}`}>
          {title}
        </h2>
        {lead && (
          <p className={`mt-5 max-w-2xl text-[1.0625rem] leading-relaxed sm:text-lg ${dark ? 'text-white/75' : 'text-[color:var(--text-tertiary)]'}`}>
            {lead}
          </p>
        )}
      </div>
    </div>
  )
}
