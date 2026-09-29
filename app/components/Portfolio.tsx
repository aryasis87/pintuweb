import Image from 'next/image'
import Link from 'next/link'
import { PACKAGES, formatRupiah } from '../lib/packages'
import { DEMOS, type DemoCategory } from '../lib/demos'
import { ArrowUpRight } from 'lucide-react'
import SectionHead from './SectionHead'

type Gateway = {
  title: string
  tagline: string
  count: string
  href: string
  image: string
}

// Jumlah per galeri dihitung dari lib/demos.ts supaya selalu sama dengan halaman /demo.
const n = (c: DemoCategory) => DEMOS.filter((d) => d.category === c).length

// Galeri live — setiap "pintu" membuka puluhan demo asli (screenshot & tautan nyata)
const GATEWAYS: Gateway[] = [
  { title: 'Landing Page', tagline: 'Halaman yang menjual — webinar, sales, promo', count: `${n('landing')} demo`, href: 'https://portal-landing-seven.vercel.app', image: '/images/galeri/landing.jpg' },
  { title: 'Link in Bio', tagline: 'Satu tautan untuk semua kanalmu', count: `${n('linkinbio')} demo`, href: 'https://portal-bio-neon.vercel.app', image: '/images/galeri/bio.jpg' },
  { title: 'Kontes Desain', tagline: 'Beragam konsep untuk satu brief', count: `${n('kontes')} entri`, href: 'https://portal-kontes.vercel.app', image: '/images/galeri/kontes.jpg' },
  { title: 'Undangan Digital', tagline: 'Undangan online elegan untuk momen spesial', count: `${n('undangan')} tema`, href: 'https://portal-undangan-eta.vercel.app', image: '/images/galeri/undangan.jpg' },
  { title: 'Portfolio Pribadi', tagline: 'Personal branding yang berkesan', count: `${n('portfolio')} varian`, href: 'https://portal-porto-neon.vercel.app', image: '/images/galeri/porto.jpg' },
  { title: 'Reservasi & Booking', tagline: 'Sistem pemesanan online multi-industri', count: `${n('reservasi')} sistem`, href: 'https://portal-reservasi-nu.vercel.app', image: '/images/galeri/reservasi.jpg' },
  { title: 'Properti', tagline: 'Marketplace & katalog properti', count: `${n('properti')} varian`, href: 'https://portal-properti-nu.vercel.app', image: '/images/galeri/properti.jpg' },
  { title: 'To-Do & Produktivitas', tagline: 'Aplikasi web untuk kelola tugas', count: `${n('todo')} aplikasi`, href: 'https://portal-todo.vercel.app', image: '/images/galeri/todo.jpg' },
]

const MIN_PRICE = Math.min(...PACKAGES.map((p) => p.minPrice))

export default function Portfolio() {
  return (
    <section aria-labelledby="showcase-title" className="relative overflow-hidden py-16 sm:py-20 lg:py-24" style={{ backgroundColor: 'var(--surface-primary)' }}>
      <div className="pointer-events-none absolute inset-0 u-grid opacity-60" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          no="01"
          eyebrow="Karya nyata"
          id="showcase-title"
          title={<>8 galeri. Puluhan demo. <span className="text-[color:var(--primary-700)]">Semua nyata.</span></>}
          lead={<>Kami tidak hanya bercerita — kami tunjukkan. Buka tiap pintu di bawah untuk menjelajahi {DEMOS.length} website yang benar-benar sudah kami buat dan online.</>}
        />

        {/* Gateway grid */}
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4">
          {GATEWAYS.map((g) => (
            <a
              key={g.title}
              href={g.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col focus:outline-none"
            >
              {/* Arch-framed preview */}
              <div className="pintu-frame relative overflow-hidden bg-white p-1.5 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[var(--card-shadow-hover)] group-focus-visible:-translate-y-1.5">
                <div className="arch-top relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={g.image}
                    alt={`Pratinjau galeri ${g.title}`}
                    fill
                    sizes="(min-width: 1024px) 270px, 50vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,19,15,0.72)] via-[rgba(20,19,15,0.12)] to-transparent" />
                  <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold sm:bottom-3 sm:left-3 text-[color:var(--primary-700)] shadow-sm">
                    {g.count}
                  </span>
                  <span aria-hidden="true" className="absolute bottom-3 right-3 hidden items-center gap-1.5 sm:flex rounded-full bg-[color:var(--primary-700)] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    Buka <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
              {/* Label */}
              <div className="mt-3 px-1 sm:mt-4">
                <h3 className="flex items-center justify-between gap-2 text-sm font-bold sm:text-base text-[color:var(--text-primary)]">
                  {g.title}
                  <ArrowUpRight size={16} className="shrink-0 text-[color:var(--text-muted)] transition-colors group-hover:text-[color:var(--primary-700)]" />
                </h3>
                <p className="mt-1 hidden text-sm leading-snug text-[color:var(--text-tertiary)] sm:block">{g.tagline}</p>
                <span className="sr-only">(buka di tab baru)</span>
              </div>
            </a>
          ))}
        </div>

        {/* Footnote CTA */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl border border-[color:var(--border-light)] bg-white p-7 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-[color:var(--text-primary)]">Mau website seperti ini untuk bisnismu?</h3>
            <p className="mt-1 text-sm text-[color:var(--text-tertiary)]">Pilih gaya yang kamu suka, kami sesuaikan dengan brand-mu.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--border-light)] bg-white px-6 py-3.5 text-sm font-semibold text-[color:var(--primary-700)] transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              Lihat {DEMOS.length} demo <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/paket"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Mulai dari {formatRupiah(MIN_PRICE)} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
