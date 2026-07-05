import Image from 'next/image'
import { ArrowUpRight, LayoutGrid, Gauge, Smartphone, SearchCheck } from 'lucide-react'

type Gateway = {
  title: string
  tagline: string
  count: string
  href: string
  image: string
}

// Galeri live — setiap "pintu" membuka puluhan demo asli (screenshot & tautan nyata)
const GATEWAYS: Gateway[] = [
  { title: 'Landing Page', tagline: 'Halaman yang menjual — webinar, sales, promo', count: '17 demo', href: 'https://portal-landing.vercel.app', image: '/images/portal-landing.jpg' },
  { title: 'Link in Bio', tagline: 'Satu tautan untuk semua kanalmu', count: '12 demo', href: 'https://portal-bio-neon.vercel.app', image: '/images/portal-bio.jpg' },
  { title: 'Kontes Desain', tagline: 'Beragam konsep untuk satu brief', count: '9 entri', href: 'https://portal-kontes.vercel.app', image: '/images/portal-kontes.jpg' },
  { title: 'Undangan Digital', tagline: 'Undangan online elegan untuk momen spesial', count: '8 tema', href: 'https://portal-undangan.vercel.app', image: '/images/portal-undangan.jpg' },
  { title: 'Portfolio Pribadi', tagline: 'Personal branding yang berkesan', count: '7 varian', href: 'https://portal-porto.vercel.app', image: '/images/portal-porto.jpg' },
  { title: 'Reservasi & Booking', tagline: 'Sistem pemesanan online multi-industri', count: '5 sistem', href: 'https://portal-reservasi-nu.vercel.app', image: '/images/portal-reservasi.jpg' },
  { title: 'Properti', tagline: 'Marketplace & katalog properti', count: '4 varian', href: 'https://portal-properti.vercel.app', image: '/images/portal-properti.jpg' },
  { title: 'To-Do & Produktivitas', tagline: 'Aplikasi web untuk kelola tugas', count: '3 aplikasi', href: 'https://portal-todo.vercel.app', image: '/images/portal-todo.jpg' },
]

const STATS = [
  { icon: LayoutGrid, v: '65+', l: 'Demo Live' },
  { icon: Gauge, v: '95+', l: 'Skor Performa' },
  { icon: Smartphone, v: '100%', l: 'Mobile Ready' },
  { icon: SearchCheck, v: 'SEO', l: 'Optimized' },
]

export default function Portfolio() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24" style={{ backgroundColor: 'var(--surface-primary)' }}>
      <div className="pointer-events-none absolute inset-0 u-grid opacity-60" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-light)] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--primary-700)]">
            Showcase
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl lg:text-5xl">
            8 galeri. Puluhan demo. <span className="text-[color:var(--primary-700)]">Semua nyata.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[color:var(--text-tertiary)] sm:text-lg">
            Kami tidak hanya bercerita — kami tunjukkan. Buka tiap pintu di bawah untuk menjelajahi website yang benar-benar sudah kami buat dan online.
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="rounded-2xl border border-[color:var(--border-light)] bg-white p-4 text-center">
              <s.icon size={20} className="mx-auto text-[color:var(--primary-700)]" />
              <p className="mt-2 text-xl font-extrabold text-[color:var(--text-primary)]">{s.v}</p>
              <p className="text-xs text-[color:var(--text-tertiary)]">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Gateway grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GATEWAYS.map((g) => (
            <a
              key={g.title}
              href={g.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col focus:outline-none"
              aria-label={`Buka galeri ${g.title} (${g.count})`}
            >
              {/* Arch-framed preview */}
              <div className="pintu-frame relative overflow-hidden bg-white p-1.5 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[var(--card-shadow-hover)] group-focus-visible:-translate-y-1.5">
                <div className="arch-top relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={g.image}
                    alt={`Pratinjau galeri ${g.title}`}
                    fill
                    sizes="(max-width:640px) 100vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,19,15,0.72)] via-[rgba(20,19,15,0.12)] to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[color:var(--primary-700)] shadow-sm">
                    {g.count}
                  </span>
                  <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-[color:var(--primary-700)] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    Buka <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
              {/* Label */}
              <div className="mt-4 px-1">
                <h3 className="flex items-center justify-between gap-2 text-base font-bold text-[color:var(--text-primary)]">
                  {g.title}
                  <ArrowUpRight size={16} className="shrink-0 text-[color:var(--text-muted)] transition-colors group-hover:text-[color:var(--primary-700)]" />
                </h3>
                <p className="mt-1 text-sm leading-snug text-[color:var(--text-tertiary)]">{g.tagline}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Footnote CTA */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-3xl border border-[color:var(--border-light)] bg-white p-7 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-[color:var(--text-primary)]">Mau website seperti ini untuk bisnismu?</h3>
            <p className="mt-1 text-sm text-[color:var(--text-tertiary)]">Pilih gaya yang kamu suka, kami sesuaikan dengan brand-mu.</p>
          </div>
          <a
            href="/paket"
            className="btn-primary inline-flex shrink-0 items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Mulai dari Rp200rb <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
