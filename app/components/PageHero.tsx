import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  children?: ReactNode
}

/** Pembuka halaman dalam: grid cetak biru + lengkung gerbang, selaras dengan Hero beranda. */
export default function PageHero({ eyebrow, title, lead, children }: Props) {
  return (
    <section className="relative overflow-hidden pb-14 pt-28 sm:pb-16 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 u-grid u-grid-fade" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[color:var(--primary-200)] opacity-40 blur-3xl" aria-hidden="true" />
      {/* Lengkung gerbang sebagai tanda tangan halaman */}
      <div
        className="pointer-events-none absolute left-1/2 top-16 h-[26rem] w-[22rem] -translate-x-1/2 pintu-frame opacity-40"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-light)] bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--primary-700)] backdrop-blur">
          {eyebrow}
        </span>
        <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-[color:var(--text-primary)] sm:text-5xl">
          {title}
        </h1>
        {lead && <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--text-tertiary)]">{lead}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}
