'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, LayoutGrid } from 'lucide-react'
import type { Demo, DemoCategory } from '../../lib/demos'
import type { Hl } from '../../i18n/dict/id'

type Filter = 'semua' | DemoCategory

export type DemoGalleryText = {
  badge: string
  h1: Hl
  lead: string
  note: string
  filterAria: string
  all: string
  /** templat dengan {n} dan {cat} */
  showingAll: string
  showingCat: string
  imgAlt: string
  newTab: string
  ctaTitle: string
  ctaLead: string
  contact: string
  seePricing: string
}

const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ''))

export default function DemoGallery({ demos, categories, t, contactHref, pricingHref }: { demos: Demo[]; categories: { id: DemoCategory; label: string }[]; t: DemoGalleryText; contactHref: string; pricingHref: string }) {
  const label = Object.fromEntries(categories.map((c) => [c.id, c.label])) as Record<DemoCategory, string>
  const [filter, setFilterState] = useState<Filter>('semua')
  // Filter tercermin di hash URL (/demo#undangan) supaya halaman lain bisa menautkan ke kategori tertentu.
  const setFilter = (f: Filter) => {
    setFilterState(f)
    history.replaceState(null, '', f === 'semua' ? location.pathname : `#${f}`)
  }
  const [failed, setFailed] = useState<Set<string>>(() => new Set())
  const markFailed = (slug: string) => setFailed((prev) => new Set(prev).add(slug))

  // Gambar yang sudah gagal sebelum hydration tidak memicu onError — tangkap di sini.
  useEffect(() => {
    const h = location.hash.slice(1)
    if (categories.some((c) => c.id === h)) setFilterState(h as DemoCategory)
    document.querySelectorAll<HTMLImageElement>('img[data-demo]').forEach((img) => {
      if (img.complete && img.naturalWidth === 0) markFailed(img.dataset.demo!)
    })
  }, [categories])

  const counts = useMemo(() => {
    const c = {} as Record<DemoCategory, number>
    for (const d of demos) c[d.category] = (c[d.category] ?? 0) + 1
    return c
  }, [demos])

  const shown = filter === 'semua' ? demos : demos.filter((d) => d.category === filter)

  const chip = (active: boolean) =>
    `inline-flex min-h-10 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
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
            <LayoutGrid size={14} /> {t.badge}
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl lg:text-5xl">
            {t.h1[0]}<span className="text-[color:var(--primary-700)]">{t.h1[1]}</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[color:var(--text-tertiary)] sm:text-lg">{t.lead}</p>
          {t.note && <p className="mt-3 text-sm text-[color:var(--text-tertiary)]">{t.note}</p>}
        </div>

        {/* Filter — ponsel: satu baris yang bisa digeser; layar lebar: membungkus di tengah */}
        <div className="-mx-4 mt-10 overflow-x-auto px-4 pb-1 scrollbar-hide sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
          <div role="group" aria-label={t.filterAria} className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
            <button type="button" onClick={() => setFilter('semua')} aria-pressed={filter === 'semua'} className={chip(filter === 'semua')}>
              {t.all} <span className="font-normal">{demos.length}</span>
            </button>
            {categories.map((c) => (
              <button key={c.id} type="button" onClick={() => setFilter(c.id)} aria-pressed={filter === c.id} className={chip(filter === c.id)}>
                {c.label} <span className="font-normal">{counts[c.id]}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {filter === 'semua' ? fill(t.showingAll, { n: shown.length }) : fill(t.showingCat, { n: shown.length, cat: label[filter] })}
        </p>

        {/* Grid */}
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-3">
          {shown.map((d) => (
            <li key={d.slug}>
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-[color:var(--border-light)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--card-shadow-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary-700)] sm:rounded-2xl"
              >
                <div className="relative aspect-[1200/630] overflow-hidden bg-[color:var(--neutral-100)]">
                  {failed.has(d.slug) ? (
                    // Cadangan bila gambar situs demo gagal dimuat (situsnya lambat/terblokir)
                    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[color:var(--primary-700)] to-[color:var(--primary-500)] p-6 text-center">
                      <span className="text-base font-extrabold text-white sm:text-2xl">{d.name}</span>
                    </div>
                  ) : (
                    // Thumbnail lokal yang sudah diperkecil (lib/demos.ts); tidak perlu optimizer Next.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/demos/${d.slug}.webp`}
                      alt={fill(t.imgAlt, { name: d.name })}
                      width={720}
                      height={378}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      data-demo={d.slug}
                      onError={() => markFailed(d.slug)}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute left-2 top-2 hidden rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[color:var(--primary-700)] shadow-sm sm:left-3 sm:top-3 sm:block">
                    {label[d.category]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-5">
                  <h2 className="flex items-start justify-between gap-2 text-sm font-bold text-[color:var(--text-primary)] sm:text-base">
                    {d.name}
                    <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-[color:var(--text-muted)] transition-colors group-hover:text-[color:var(--primary-700)]" />
                  </h2>
                  {d.tagline && <p className="mt-1 line-clamp-2 text-xs leading-snug text-[color:var(--text-tertiary)] sm:text-sm">{d.tagline}</p>}
                  <span className="sr-only">{t.newTab}</span>
                  <p className="mt-auto hidden pt-4 text-xs text-[color:var(--text-muted)] sm:block">{d.url.replace('https://', '')}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-3xl border border-[color:var(--border-light)] bg-white p-7 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-lg font-bold text-[color:var(--text-primary)]">{t.ctaTitle}</h2>
            <p className="mt-1 text-sm text-[color:var(--text-tertiary)]">{t.ctaLead}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href={contactHref} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--border-light)] bg-white px-6 py-3.5 text-sm font-semibold text-[color:var(--primary-700)] transition-all hover:-translate-y-0.5 hover:shadow-md">
              {t.contact}
            </Link>
            <Link href={pricingHref} className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
              {t.seePricing} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
