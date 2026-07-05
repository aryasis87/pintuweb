'use client'
import { useState } from 'react'
import { Check, Zap, Award, Sparkles, ArrowRight, ShieldCheck, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react'

type Pkg = {
  title: string
  subtitle: string
  price: string
  originalPrice: string
  duration: string
  badge: string
  features: string[]
  highlights: string[]
  recommended: boolean
  icon: React.ReactNode
}

const packages: Pkg[] = [
  {
    title: 'Starter', subtitle: 'Sempurna untuk landing page',
    price: 'Rp200.000', originalPrice: 'Rp350.000', duration: 'sekali bayar', badge: 'Hemat 43%',
    features: ['1 halaman website premium', 'Desain modern & mobile responsive', 'Performance score 95+ (Google)', 'SEO optimized untuk ranking', 'Integrasi WhatsApp & sosial media', 'Loading speed < 3 detik', 'Proses super cepat: 1–2 hari'],
    highlights: ['UMKM', 'Portfolio', 'Landing produk'], recommended: false, icon: <Zap className="h-5 w-5" />,
  },
  {
    title: 'Business Pro', subtitle: 'Pilihan terpopuler untuk bisnis',
    price: 'Rp1.500.000', originalPrice: 'Rp2.500.000', duration: 'termasuk hosting 1 tahun', badge: 'Paling Populer',
    features: ['5+ halaman website profesional', 'Custom design sesuai brand', 'Advanced SEO & Google Analytics', 'Integrasi multi-platform', 'Contact form & Google Maps', 'SSL certificate & keamanan', 'GRATIS domain + hosting 1 tahun', 'Training kelola konten', '30 hari garansi & support'],
    highlights: ['Company profile', 'E-commerce basic', 'Jasa & layanan'], recommended: true, icon: <Award className="h-5 w-5" />,
  },
  {
    title: 'Enterprise', subtitle: 'Solusi lengkap bisnis besar',
    price: 'Rp3.500.000', originalPrice: 'Rp5.000.000', duration: 'paket lengkap', badge: 'Premium',
    features: ['Halaman unlimited & custom', 'Fitur & integrasi advanced', 'E-commerce + payment gateway', 'Dashboard admin & CMS', 'Integrasi API & tools pihak ketiga', 'Analytics & reporting lengkap', 'Priority support 24/7', 'Maintenance & manajemen server', '90 hari garansi penuh'],
    highlights: ['Startup scale-up', 'Website korporat', 'Sistem kompleks'], recommended: false, icon: <Sparkles className="h-5 w-5" />,
  },
]

const TRUST = [
  { icon: Star, label: '4.9/5 rating' },
  { icon: ShieldCheck, label: '100% garansi' },
  { icon: Clock, label: 'Support 24 jam' },
]

const wa = (t: string) => `https://wa.me/6281339908765?text=${encodeURIComponent(`Halo PintuWeb, saya tertarik Paket ${t}. Boleh info lebih lanjut?`)}`

function Card({ p }: { p: Pkg }) {
  return (
    <div className="relative flex h-full flex-col">
      {p.badge && (
        <span className={`absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold shadow-sm ${p.recommended ? 'bg-[color:var(--primary-700)] text-white' : 'bg-[color:var(--accent-400)] text-[color:var(--text-primary)]'}`}>
          {p.badge}
        </span>
      )}
      <div className={`flex h-full flex-col rounded-3xl bg-white p-6 sm:p-8 ${p.recommended ? 'border-2 border-[color:var(--primary-700)] shadow-[0_20px_50px_-20px_rgba(43,57,212,0.4)]' : 'border border-[color:var(--border-light)] shadow-sm'}`}>
        <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${p.recommended ? 'bg-[color:var(--primary-100)] text-[color:var(--primary-700)]' : 'bg-[color:var(--neutral-100)] text-[color:var(--text-tertiary)]'}`}>{p.icon}</span>
        <h3 className="mt-4 text-xl font-bold text-[color:var(--text-primary)]">{p.title}</h3>
        <p className="mt-1 text-sm text-[color:var(--text-tertiary)]">{p.subtitle}</p>
        <div className="mt-5">
          <span className="text-4xl font-extrabold text-[color:var(--text-primary)]">{p.price}</span>
          <span className="ml-2 text-base text-[color:var(--text-muted)] line-through">{p.originalPrice}</span>
          <p className="mt-1 text-xs text-[color:var(--text-muted)]">{p.duration}</p>
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
          {p.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-[color:var(--text-secondary)]">
              <Check size={17} strokeWidth={2.5} className={`mt-0.5 shrink-0 ${p.recommended ? 'text-[color:var(--primary-700)]' : 'text-[color:var(--success-600)]'}`} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <a
          href={wa(p.title)}
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

        {/* Guarantees */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-start gap-4 rounded-2xl border border-[color:var(--border-light)] bg-white p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--success-100)]"><ShieldCheck size={20} className="text-[color:var(--success-700)]" /></span>
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">Jaminan 100% uang kembali</h3>
              <p className="mt-1 text-sm text-[color:var(--text-tertiary)]">Tidak puas dengan hasilnya? Kami kembalikan 100% dalam 7 hari setelah website selesai.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-2xl border border-[color:var(--border-light)] bg-white p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--primary-100)]"><Clock size={20} className="text-[color:var(--primary-700)]" /></span>
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">Support seumur hidup</h3>
              <p className="mt-1 text-sm text-[color:var(--text-tertiary)]">Maintenance, update konten, dan troubleshooting kapan saja via WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
