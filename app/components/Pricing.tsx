'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Check, Zap, Award, Sparkles, ArrowRight, ShieldCheck, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { PACKAGES, formatRupiah, priceRange, waLink, type Paket } from '../lib/packages'

const ICONS: Record<string, React.ReactNode> = {
  'landing-page': <Zap className="h-5 w-5" />,
  'standar-umkm': <Award className="h-5 w-5" />,
  'toko-online-simple': <Sparkles className="h-5 w-5" />,
}

const packages = PACKAGES.filter((p) => p.featured)

const TRUST = [
  { icon: ShieldCheck, label: 'Garansi bug 30 hari' },
  { icon: Clock, label: 'Respon di hari kerja' },
]

function Card({ p }: { p: Paket }) {
  return (
    <div className="relative flex h-full flex-col">
      {p.badge && (
        <span className={`absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold shadow-sm ${p.recommended ? 'bg-[color:var(--primary-700)] text-white' : 'bg-[color:var(--accent-400)] text-[color:var(--text-primary)]'}`}>
          {p.badge}
        </span>
      )}
      <div className={`flex h-full flex-col rounded-3xl bg-white p-6 sm:p-8 ${p.recommended ? 'border-2 border-[color:var(--primary-700)] shadow-[0_20px_50px_-20px_rgba(43,57,212,0.4)]' : 'border border-[color:var(--border-light)] shadow-sm'}`}>
        <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${p.recommended ? 'bg-[color:var(--primary-100)] text-[color:var(--primary-700)]' : 'bg-[color:var(--neutral-100)] text-[color:var(--text-tertiary)]'}`}>{ICONS[p.slug]}</span>
        <h3 className="mt-4 text-xl font-bold text-[color:var(--text-primary)]">{p.title}</h3>
        <p className="mt-1 text-sm text-[color:var(--text-tertiary)]">{p.subtitle}</p>
        <div className="mt-5">
          <span className="text-sm text-[color:var(--text-tertiary)]">mulai </span>
          <span className="text-4xl font-extrabold text-[color:var(--text-primary)]">{formatRupiah(p.minPrice)}</span>
          <p className="mt-1 text-xs text-[color:var(--text-muted)]">Kisaran {priceRange(p)} · termasuk domain & SSL</p>
        </div>
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold text-[color:var(--text-secondary)]">Cocok untuk:</p>
          <div className="flex flex-wrap gap-2">
            {p.highlights.map((h) => (
              <span key={h} className="rounded-md bg-[color:var(--surface-primary)] px-2.5 py-1 text-xs text-[color:var(--text-secondary)]">{h}</span>
            ))}
          </div>
        </div>
        <ul className="mt-6 flex-1 space-y-3">
          {p.features.slice(0, 6).map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-[color:var(--text-secondary)]">
              <Check size={17} strokeWidth={2.5} className={`mt-0.5 shrink-0 ${p.recommended ? 'text-[color:var(--primary-700)]' : 'text-[color:var(--success-600)]'}`} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <a
          href={waLink(p.title)}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${p.recommended ? 'btn-primary shadow-md hover:shadow-lg' : 'bg-[color:var(--text-primary)] text-white hover:bg-[color:var(--neutral-800)]'}`}
        >
          Pilih {p.title} <ArrowRight size={15} />
        </a>
        <p className="mt-3 text-center text-xs text-[color:var(--text-muted)]">Konsultasi gratis • Respon cepat</p>
      </div>
    </div>
  )
}

export default function Pricing() {
  const [slide, setSlide] = useState(0)
  const [tsX, setTsX] = useState(0)
  const next = () => setSlide((s) => (s + 1) % packages.length)
  const prev = () => setSlide((s) => (s - 1 + packages.length) % packages.length)

  return (
    <section aria-labelledby="pricing-title" className="relative overflow-hidden py-16 sm:py-20 lg:py-24" style={{ backgroundColor: 'var(--surface-primary)' }}>
      <div className="pointer-events-none absolute inset-0 u-grid opacity-60" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-light)] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--primary-700)]">
            Harga Transparan
          </span>
          <h2 id="pricing-title" className="mt-5 text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl lg:text-5xl">
            Pilih paket yang <span className="text-[color:var(--primary-700)]">tepat</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[color:var(--text-tertiary)] sm:text-lg">
            Semua paket sudah termasuk desain profesional, performa optimal, dan tanpa biaya tersembunyi.
          </p>
        </div>

        {/* Trust row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {TRUST.map((t) => (
            <span key={t.label} className="inline-flex items-center gap-2 text-sm text-[color:var(--text-tertiary)]">
              <t.icon size={16} className="text-[color:var(--primary-700)]" /> {t.label}
            </span>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="mt-14 hidden gap-6 lg:grid lg:grid-cols-3 lg:items-stretch">
          {packages.map((p) => (
            <div key={p.title} className={p.recommended ? 'lg:-mt-3' : ''}>
              <Card p={p} />
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="mt-12 lg:hidden">
          <div
            className="relative overflow-hidden pt-4"
            onTouchStart={(e) => setTsX(e.touches[0].clientX)}
            onTouchEnd={(e) => { const d = tsX - e.changedTouches[0].clientX; if (d > 60) next(); if (d < -60) prev() }}
          >
            <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${slide * 100}%)` }}>
              {packages.map((p) => (
                <div key={p.title} className="w-full shrink-0 px-1">
                  <Card p={p} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={prev} aria-label="Paket sebelumnya" className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--border-light)] bg-white text-[color:var(--text-secondary)] shadow-sm">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {packages.map((_, i) => (
                <button key={i} onClick={() => setSlide(i)} aria-label={`Paket ${i + 1}`} className={`h-2 rounded-full transition-all ${i === slide ? 'w-7 bg-[color:var(--primary-700)]' : 'w-2 bg-[color:var(--neutral-300)]'}`} />
              ))}
            </div>
            <button onClick={next} aria-label="Paket berikutnya" className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--border-light)] bg-white text-[color:var(--text-secondary)] shadow-sm">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/paket"
            className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border-light)] bg-white px-6 py-3 text-sm font-semibold text-[color:var(--primary-700)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Lihat semua {PACKAGES.length} paket <ArrowRight size={15} />
          </Link>
        </div>

        {/* Guarantees */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-start gap-4 rounded-2xl border border-[color:var(--border-light)] bg-white p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--success-100)]"><ShieldCheck size={20} className="text-[color:var(--success-700)]" /></span>
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">Bayar 50% di awal saja</h3>
              <p className="mt-1 text-sm text-[color:var(--text-tertiary)]">Pelunasan 50% baru dibayar setelah website selesai dan Anda setujui.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-2xl border border-[color:var(--border-light)] bg-white p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--primary-100)]"><Clock size={20} className="text-[color:var(--primary-700)]" /></span>
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">Maintenance sesuai paket</h3>
              <p className="mt-1 text-sm text-[color:var(--text-tertiary)]">Maintenance 1–6 bulan sesuai paket, plus garansi perbaikan bug gratis 30 hari setelah website live.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
