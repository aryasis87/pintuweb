'use client'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, MapPin, Star, Zap, LayoutGrid } from 'lucide-react'

const FEATURES = [
  'Responsif & mobile-friendly',
  'SEO-ready untuk ranking Google',
  'Loading cepat & aman',
  'Garansi + maintenance',
]

const STATS = [
  { v: '65+', l: 'Demo Live' },
  { v: '8', l: 'Kategori' },
  { v: '1–3', l: 'Hari Kerja' },
  { v: '100%', l: 'Kepuasan' },
]

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
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-[color:var(--accent-400)]" fill="currentColor" />
              ))}
            </span>
            <span className="text-xs font-medium text-[color:var(--text-secondary)]">Terpercaya sejak 2023 • Trenggalek</span>
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
            PintuWeb membuat website profesional yang <strong className="font-semibold text-[color:var(--text-secondary)]">cepat, rapi, dan SEO-ready</strong> — untuk UMKM, startup, hingga personal brand. Buktikan lewat 65+ demo yang bisa kamu buka langsung.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/paket" className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-base font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
              Lihat Harga &amp; Paket <ArrowRight size={18} />
            </a>
            <a href="#portfolio" className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[color:var(--border-medium)] px-7 py-4 text-base font-semibold text-[color:var(--text-secondary)] transition-all hover:border-[color:var(--primary-700)] hover:text-[color:var(--primary-700)]">
              <LayoutGrid size={18} /> Jelajahi 65+ Demo
            </a>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-4 gap-3 border-t border-[color:var(--border-light)] pt-6">
            {STATS.map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-extrabold text-[color:var(--text-primary)] sm:text-3xl">{s.v}</div>
                <p className="mt-0.5 text-xs text-[color:var(--text-tertiary)]">{s.l}</p>
              </div>
            ))}
          </div>

          {/* Feature chips */}
          <ul className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-[color:var(--text-secondary)]">
                <CheckCircle2 size={18} className="shrink-0 text-[color:var(--success-600)]" /> {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 inline-flex items-center gap-2.5 rounded-xl border border-[color:var(--border-light)] bg-[color:var(--surface-primary)] px-4 py-3">
            <MapPin size={16} className="shrink-0 text-[color:var(--primary-700)]" />
            <span className="text-sm text-[color:var(--text-tertiary)]">
              <span className="font-semibold text-[color:var(--text-primary)]">Trenggalek, Jawa Timur</span> • Melayani seluruh Indonesia
            </span>
          </div>
        </div>

        {/* Visual — the "pintu" (gateway arch) */}
        <div className="relative hidden lg:block">
          <div className="relative mx-auto max-w-md">
            {/* Arch frame */}
            <div className="pintu-frame relative overflow-hidden bg-white p-2 shadow-[0_30px_60px_-24px_rgba(20,19,15,0.35)]">
              <div className="arch-top overflow-hidden">
                <Image
                  src="/images/bg2.webp"
                  alt="Contoh website profesional buatan PintuWeb"
                  width={520}
                  height={620}
                  priority
                  className="h-[30rem] w-full object-cover"
                />
              </div>
            </div>

            {/* Floating proof — performance */}
            <div className="absolute -left-6 top-16 rounded-2xl border border-[color:var(--border-light)] bg-white/95 p-3.5 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--primary-100)]">
                  <Zap size={18} className="text-[color:var(--primary-700)]" />
                </span>
                <div>
                  <p className="text-xs text-[color:var(--text-tertiary)]">Performance</p>
                  <p className="text-xl font-extrabold text-[color:var(--primary-700)]">95+</p>
                </div>
              </div>
            </div>

            {/* Floating proof — satisfaction */}
            <div className="absolute -right-5 bottom-14 rounded-2xl border border-[color:var(--border-light)] bg-white/95 p-3.5 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--success-400)] opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[color:var(--success-500)]" />
                </span>
                <div>
                  <p className="text-xs text-[color:var(--text-tertiary)]">Kepuasan Klien</p>
                  <p className="text-xl font-extrabold text-[color:var(--success-600)]">100%</p>
                </div>
              </div>
            </div>

            {/* Keystone accent */}
            <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 rounded-sm bg-[color:var(--accent-300)] shadow" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
