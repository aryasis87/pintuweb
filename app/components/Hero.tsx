import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, MapPin, Gauge, LayoutGrid, BadgeCheck } from 'lucide-react'
import { DEMOS } from '../lib/demos'
import { CATEGORY_COUNT, CLIENT_PROJECTS, FOUNDED_YEAR, GUARANTEE_DAYS, LOCATION, PERF_TARGET } from '../lib/site'

const FEATURES = [
  'Responsif & mobile-friendly',
  'SEO-ready untuk ranking Google',
  'Loading cepat & aman',
  `Garansi ${GUARANTEE_DAYS} hari + maintenance`,
]

// Semua angka dari lib/site.ts & lib/demos.ts — fakta yang bisa dibuktikan, bukan klaim.
const STATS = [
  { v: CLIENT_PROJECTS, l: 'Proyek Klien' },
  { v: `${DEMOS.length}`, l: 'Demo Live' },
  { v: `${CATEGORY_COUNT}`, l: 'Kategori' },
  { v: `${FOUNDED_YEAR}`, l: 'Berdiri Sejak' },
]

// Server component: tidak ada interaksi di sini, jadi tidak perlu JavaScript di browser.
export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16 lg:pt-28"
      aria-label="Perkenalan PintuWeb"
    >
      {/* Blueprint grid + soft glows */}
      <div className="pointer-events-none absolute inset-0 u-grid u-grid-fade" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[color:var(--primary-200)] opacity-40 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-[color:var(--accent-100)] opacity-50 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
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
            <Link href="/demo" className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[color:var(--border-medium)] px-7 py-4 text-base font-semibold text-[color:var(--text-secondary)] transition-all hover:border-[color:var(--primary-700)] hover:text-[color:var(--primary-700)]">
              <LayoutGrid size={18} aria-hidden="true" /> Jelajahi {DEMOS.length} Demo
            </Link>
          </div>

          {/* Stats */}
          <dl className="mt-10 grid grid-cols-4 gap-3 border-t border-[color:var(--border-light)] pt-6">
            {STATS.map((s) => (
              <div key={s.l} className="flex flex-col-reverse">
                <dt className="mt-0.5 text-xs text-[color:var(--text-tertiary)]">{s.l}</dt>
                <dd className="text-2xl font-extrabold text-[color:var(--text-primary)] sm:text-3xl">{s.v}</dd>
              </div>
            ))}
          </dl>

          {/* Feature chips */}
          <ul className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-[color:var(--text-secondary)]">
                <CheckCircle2 size={18} className="shrink-0 text-[color:var(--success-600)]" aria-hidden="true" /> {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 inline-flex items-center gap-2.5 rounded-xl border border-[color:var(--border-light)] bg-[color:var(--surface-primary)] px-4 py-3">
            <MapPin size={16} className="shrink-0 text-[color:var(--primary-700)]" aria-hidden="true" />
            <span className="text-sm text-[color:var(--text-tertiary)]">
              <span className="font-semibold text-[color:var(--text-primary)]">{LOCATION}</span> • Melayani seluruh Indonesia
            </span>
          </div>
        </div>

        {/* Visual — the "pintu" (gateway arch) */}
        <div className="relative hidden lg:block">
          <div className="relative mx-auto max-w-md">
            <div className="pintu-frame relative overflow-hidden bg-white p-2 shadow-[0_30px_60px_-24px_rgba(20,19,15,0.35)]">
              <div className="arch-top overflow-hidden">
                <Image
                  src="/images/bg2.webp"
                  alt="Ilustrasi pengembang sedang membuat website"
                  width={520}
                  height={620}
                  priority
                  className="h-[30rem] w-full object-cover"
                />
              </div>
            </div>

            {/* Floating fact — target performa */}
            <div className="absolute -left-6 top-16 rounded-2xl border border-[color:var(--border-light)] bg-white/95 p-3.5 shadow-lg backdrop-blur">
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

            {/* Floating fact — proyek klien */}
            <div className="absolute -right-5 bottom-14 rounded-2xl border border-[color:var(--border-light)] bg-white/95 p-3.5 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--success-400)] opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[color:var(--success-500)]" />
                </span>
                <div>
                  <p className="text-xs text-[color:var(--text-tertiary)]">Proyek klien selesai</p>
                  <p className="text-xl font-extrabold text-[color:var(--success-700)]">{CLIENT_PROJECTS}</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 rounded-sm bg-[color:var(--accent-300)] shadow" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
