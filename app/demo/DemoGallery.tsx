'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, LayoutGrid } from 'lucide-react'
import { DEMOS, DEMO_CATEGORIES, demoImage, type DemoCategory } from '../lib/demos'

type Filter = 'semua' | DemoCategory

const LABEL = Object.fromEntries(DEMO_CATEGORIES.map((c) => [c.id, c.label])) as Record<DemoCategory, string>

export default function DemoGallery() {
  const [filter, setFilter] = useState<Filter>('semua')
  const [failed, setFailed] = useState<Set<string>>(() => new Set())
  const markFailed = (slug: string) => setFailed((prev) => new Set(prev).add(slug))

  // Gambar yang sudah gagal sebelum hydration tidak memicu onError — tangkap di sini.
  useEffect(() => {
    document.querySelectorAll<HTMLImageElement>('img[data-demo]').forEach((img) => {
      if (img.complete && img.naturalWidth === 0) markFailed(img.dataset.demo!)
    })
  }, [])

  const counts = useMemo(() => {
    const c = {} as Record<DemoCategory, number>
    for (const d of DEMOS) c[d.category] = (c[d.category] ?? 0) + 1
    return c
  }, [])

  const shown = filter === 'semua' ? DEMOS : DEMOS.filter((d) => d.category === filter)

  const chip = (active: boolean) =>
    `inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
      active
        ? 'border-[color:var(--primary-700)] bg-[color:var(--primary-700)] text-white'
        : 'border-[color:var(--border-light)] bg-white text-[color:var(--text-secondary)] hover:border-[color:var(--primary-700)] hover:text-[color:var(--primary-700)]'
    }`

  return (
    <main id="main-content" className="relative overflow-hidden pb-20 pt-28 sm:pt-32" style={{ backgroundColor: 'var(--surface-primary)' }}>
      <div className="pointer-events-none absolute inset-0 u-grid u-grid-fade opacity-60" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-light)] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--primary-700)]">
            <LayoutGrid size={14} /> Galeri Demo
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl lg:text-5xl">
            {DEMOS.length} website nyata. <span className="text-[color:var(--primary-700)]">Silakan dicoba.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[color:var(--text-tertiary)] sm:text-lg">
            Semua di bawah ini online dan bisa dibuka sekarang juga — bukan mockup. Pilih yang paling dekat dengan kebutuhanmu, lalu kami sesuaikan dengan brand-mu.
          </p>
        </div>

        {/* Filter */}
        <div role="group" aria-label="Saring berdasarkan kategori" className="mt-10 flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => setFilter('semua')} aria-pressed={filter === 'semua'} className={chip(filter === 'semua')}>
            Semua <span className="opacity-70">{DEMOS.length}</span>
          </button>
          {DEMO_CATEGORIES.map((c) => (
            <button key={c.id} type="button" onClick={() => setFilter(c.id)} aria-pressed={filter === c.id} className={chip(filter === c.id)}>
              {c.label} <span className="opacity-70">{counts[c.id]}</span>
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          Menampilkan {shown.length} demo{filter === 'semua' ? '' : ` kategori ${LABEL[filter]}`}
        </p>

        {/* Grid */}
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((d) => (
            <li key={d.slug}>
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--border-light)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--card-shadow-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary-700)]"
                aria-label={`Buka demo ${d.name} di tab baru`}
              >
                <div className="relative aspect-[1200/630] overflow-hidden bg-[color:var(--neutral-100)]">
                  {failed.has(d.slug) ? (
                    // Cadangan bila gambar situs demo gagal dimuat (situsnya lambat/terblokir)
                    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[color:var(--primary-700)] to-[color:var(--primary-500)] p-6 text-center">
                      <span className="text-2xl font-extrabold text-white">{d.name}</span>
                    </div>
                  ) : (
                    <>
                      {/* Gambar dari domain demo masing-masing; tidak dilewatkan ke optimizer Next. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={demoImage(d)}
                        alt={`Tampilan ${d.name}`}
                        width={1200}
                        height={630}
                        loading="lazy"
                        decoding="async"
                        data-demo={d.slug}
                        onError={() => markFailed(d.slug)}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[color:var(--primary-700)] shadow-sm">
                    {LABEL[d.category]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="flex items-start justify-between gap-2 text-base font-bold text-[color:var(--text-primary)]">
                    {d.name}
                    <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-[color:var(--text-muted)] transition-colors group-hover:text-[color:var(--primary-700)]" />
                  </h2>
                  {d.tagline && <p className="mt-1 text-sm leading-snug text-[color:var(--text-tertiary)]">{d.tagline}</p>}
                  <p className="mt-auto pt-4 text-xs text-[color:var(--text-muted)]">{d.url.replace('https://', '')}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-3xl border border-[color:var(--border-light)] bg-white p-7 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-lg font-bold text-[color:var(--text-primary)]">Suka salah satunya?</h2>
            <p className="mt-1 text-sm text-[color:var(--text-tertiary)]">Sebutkan nama demonya saat menghubungi kami — kami buatkan versi untuk bisnismu.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href="/kontak"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--border-light)] bg-white px-6 py-3.5 text-sm font-semibold text-[color:var(--primary-700)] transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              Hubungi kami
            </Link>
            <Link
              href="/paket"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Lihat paket & harga <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
