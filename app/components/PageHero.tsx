import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  children?: ReactNode
  /** true bila ada jejak navigasi di atasnya (jarak atas lebih kecil) */
  tight?: boolean
  /** Catatan kecil di kolom tepi, mis. tanggal harga berlaku */
  aside?: ReactNode
}

/** Pembuka halaman dalam: rata kiri seperti halaman judul majalah, garis tegas di bawah. */
export default function PageHero({ eyebrow, title, lead, children, tight = false, aside }: Props) {
  return (
    <section className={`mx-auto max-w-6xl px-4 sm:px-6 ${tight ? 'pt-8 sm:pt-10' : 'pt-32 sm:pt-40'}`}>
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 pb-4 lg:grid-cols-12">
        <p className="kicker text-[color:var(--primary-700)] lg:col-span-12">{eyebrow}</p>
        <h1 className="text-[2.4rem] leading-[1.06] text-[color:var(--text-primary)] sm:text-[3.25rem] lg:col-span-10 lg:text-[3.75rem]">{title}</h1>
        {lead && <p className="max-w-2xl text-lg leading-relaxed text-[color:var(--text-tertiary)] lg:col-span-7 lg:text-[1.2rem]">{lead}</p>}
        {aside && <div className="kicker self-end text-[color:var(--text-tertiary)] lg:col-span-4 lg:col-start-9 lg:text-right">{aside}</div>}
        {children && <div className="lg:col-span-12">{children}</div>}
      </div>
    </section>
  )
}
