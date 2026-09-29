import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Gauge, LayoutGrid, BadgeCheck } from 'lucide-react'
import { DEMOS, DEMO_CATEGORIES } from '../lib/demos'
import { CATEGORY_COUNT, CLIENT_PROJECTS, FOUNDED_YEAR, PERF_TARGET } from '../lib/site'

// Semua angka dari lib/site.ts & lib/demos.ts — fakta yang bisa dibuktikan, bukan klaim.
const STATS = [
  { v: CLIENT_PROJECTS, l: 'Proyek Klien' },
  { v: `${DEMOS.length}`, l: 'Demo Live' },
  { v: `${CATEGORY_COUNT}`, l: 'Kategori' },
  { v: `${FOUNDED_YEAR}`, l: 'Berdiri Sejak' },
]

const LABEL = Object.fromEntries(DEMO_CATEGORIES.map((c) => [c.id, c.label]))

// Isi "pintu" di hero: tangkapan layar demo yang benar-benar online, diambil dari situsnya sendiri.
const DOORS = ['cissycoffee', 'lumora', 'jajan', 'hotel'].map((slug) => {
  const d = DEMOS.find((x) => x.slug === slug)!
  return { slug, name: d.name, kind: LABEL[d.category], src: `/images/hero/${slug}.webp` }
})

// Server component: tidak ada interaksi di sini, jadi tidak perlu JavaScript di browser.
// Pergantian demo di dalam pintu murni CSS (.door-slide) dan berhenti bila pengguna memilih gerak dikurangi.
export default function Hero() {
  return (
    <section
      className="relative flex items-center overflow-hidden pt-24 pb-14 lg:min-h-screen lg:pt-28 lg:pb-16"
      aria-label="Perkenalan PintuWeb"
    >
      {/* Blueprint grid + soft glows */}
      <div className="pointer-events-none absolute inset-0 u-grid u-grid-fade" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[color:var(--primary-200)] opacity-40 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-[color:var(--accent-100)] opacity-50 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-light)] bg-white/70 px-4 py-1.5 backdrop-blur">
            <BadgeCheck size={14} className="text-[color:var(--primary-700)]" aria-hidden="true" />
            <span className="text-xs font-medium text-[color:var(--text-secondary)]">Sejak {FOUNDED_YEAR} • {CLIENT_PROJECTS} proyek klien</span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-[color:var(--text-primary)] sm:text-5xl lg:text-6xl">
            Pintu menuju
            <span className="relative mt-1 block text-[color:var(--primary-700)]">
              website impianmu.
              <svg className="absolute -bottom-2 left-0 h-3 w-56 text-[color:var(--accent-300)]" viewBox="0 0 220 12" fill="none" aria-hidden="true">
                <path d="M2 9C50 3 160 3 218 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[color:var(--text-tertiary)]">
            PintuWeb membuat website profesional yang <strong className="font-semibold text-[color:var(--text-secondary)]">cepat, rapi, dan SEO-ready</strong> — untuk UMKM, startup, hingga personal brand. Buktikan lewat {DEMOS.length} demo yang bisa kamu buka langsung.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/paket" className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-base font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
              Lihat Harga &amp; Paket <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/demo" className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[color:var(--border-medium)] bg-white/60 px-7 py-4 text-base font-semibold text-[color:var(--text-secondary)] transition-all hover:border-[color:var(--primary-700)] hover:text-[color:var(--primary-700)]">
              <LayoutGrid size={18} aria-hidden="true" /> Jelajahi {DEMOS.length} Demo
            </Link>
          </div>

          {/* Ponsel: deretan pintu kecil berisi demo asli (versi besar hanya di desktop) */}
          <Link href="/demo" className="group mt-9 block lg:hidden">
            <span className="grid grid-cols-3 gap-3" aria-hidden="true">
              {DOORS.slice(0, 3).map((d) => (
                <span key={d.slug} className="pintu-frame block bg-white p-1 shadow-sm">
                  <span className="arch-top relative block aspect-[4/5] overflow-hidden bg-[color:var(--neutral-100)]">
                    <Image src={d.src} alt="" fill sizes="(min-width: 1024px) 1px, 32vw" className="object-cover object-top" />
                  </span>
                </span>
              ))}
            </span>
            <span className="mt-3 flex items-center justify-between gap-3 text-sm">
              <span className="text-[color:var(--text-tertiary)]">
                {DOORS.slice(0, 3).map((d) => d.name).join(', ')} — dan {DEMOS.length - 3} demo lainnya
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-[color:var(--primary-700)]">
                Lihat <ArrowUpRight size={15} aria-hidden="true" />
              </span>
            </span>
          </Link>

          {/* Stats */}
          <dl className="mt-9 grid grid-cols-4 gap-3 border-t border-[color:var(--border-light)] pt-6">
            {STATS.map((s) => (
              <div key={s.l} className="flex flex-col-reverse">
                <dt className="mt-0.5 text-xs text-[color:var(--text-tertiary)]">{s.l}</dt>
                <dd className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[color:var(--text-primary)] sm:text-3xl">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual — pintu (arch) yang bergantian membuka demo asli */}
        <div className="relative hidden lg:block">
          <div className="relative mx-auto max-w-md">
            <div className="pintu-frame relative bg-white p-2 shadow-[0_30px_60px_-24px_rgba(20,19,15,0.35)]">
              <div className="arch-top relative h-[30rem] overflow-hidden bg-[color:var(--neutral-100)]">
                {DOORS.map((d, i) => (
                  <div
                    key={d.slug}
                    className={`absolute inset-0 ${i ? 'door-slide' : ''}`}
                    style={i ? { animationDelay: `${i * 4}s` } : undefined}
                  >
                    <Image
                      src={d.src}
                      alt={`Tampilan demo ${d.name}`}
                      fill
                      sizes="(min-width: 1024px) 432px, 1px"
                      loading={i === 0 ? 'eager' : 'lazy'}
                      fetchPriority={i === 0 ? 'high' : undefined}
                      className="object-cover object-top"
                    />
                  </div>
                ))}

                {/* Keterangan tidak ikut memudar: berganti seketika (visibility) agar kontras teks selalu penuh */}
                {DOORS.map((d, i) => (
                  <p
                    key={d.slug}
                    className="door-cap absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg"
                    style={{ animationDelay: `${i * 4 - 16}s` }}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-[color:var(--text-primary)]">{d.name}</span>
                      <span className="block text-xs text-[color:var(--text-tertiary)]">{d.kind} • demo live</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-[color:var(--primary-50)] px-2.5 py-1 text-[11px] font-bold text-[color:var(--primary-700)]">
                      {i + 1}/{DOORS.length}
                    </span>
                  </p>
                ))}
              </div>
            </div>

            {/* Floating fact — target performa */}
            <div className="absolute -left-8 top-20 rounded-2xl border border-[color:var(--border-light)] bg-white/95 p-3.5 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--primary-100)]">
                  <Gauge size={18} className="text-[color:var(--primary-700)]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-[color:var(--text-tertiary)]">Target PageSpeed</p>
                  <p className="text-xl font-extrabold text-[color:var(--primary-700)]">{PERF_TARGET}</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 top-44 inline-flex items-center gap-2 rounded-2xl border border-[color:var(--border-light)] bg-white/95 px-4 py-3 text-sm font-semibold text-[color:var(--text-primary)] shadow-lg backdrop-blur">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--success-400)] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[color:var(--success-500)]" />
              </span>
              {DEMOS.length} demo online
            </div>

            <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 rounded-sm bg-[color:var(--accent-300)] shadow" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
