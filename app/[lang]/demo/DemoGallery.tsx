'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
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
  /** mis. 'mulai' — diikuti harga mulai kategori demo */
  from: string
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

export default function DemoGallery({ demos, categories, t, contactHref, pricingHref, fromByCat }: { demos: Demo[]; categories: { id: DemoCategory; label: string }[]; t: DemoGalleryText; contactHref: string; pricingHref: string; fromByCat: Record<DemoCategory, string> }) {
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

  const tab = (active: boolean) =>
    `inline-flex min-h-11 items-baseline gap-1.5 whitespace-nowrap px-2.5 py-2.5 text-[0.9375rem] transition-colors first:pl-0 ${
      active
        ? 'font-semibold text-[color:var(--text-primary)] underline decoration-[color:var(--primary-700)] decoration-2 underline-offset-[9px]'
        : 'text-[color:var(--text-secondary)] hover:text-[color:var(--primary-700)]'
    }`

  return (
    <main id="main-content" className="pb-20 pt-28 sm:pb-28 sm:pt-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Kepala halaman */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 border-b border-[color:var(--rule)] pb-10 lg:grid-cols-12">
          <p className="kicker text-[color:var(--primary-700)] lg:col-span-12">{t.badge}</p>
          <h1 className="text-[2.4rem] leading-[1.06] text-[color:var(--text-primary)] sm:text-[3.25rem] lg:col-span-10 lg:text-[3.75rem]">
            {t.h1[0]}
            <em className="text-[color:var(--primary-700)]">{t.h1[1]}</em>
            {t.h1[2] ?? ''}
          </h1>
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-[color:var(--text-tertiary)] lg:text-[1.2rem]">{t.lead}</p>
            {t.note && <p className="kicker mt-3 text-[color:var(--text-tertiary)]">{t.note}</p>}
          </div>
        </div>

        {/* Filter — ponsel: satu baris yang bisa digeser; layar lebar: membungkus */}
        <div className="scrollbar-hide -mx-4 mt-6 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
          <div role="group" aria-label={t.filterAria} className="flex w-max gap-x-1 sm:w-auto sm:flex-wrap">
            <button type="button" onClick={() => setFilter('semua')} aria-pressed={filter === 'semua'} className={tab(filter === 'semua')}>
              {t.all} <span className="mono text-[0.6875rem] text-[color:var(--text-tertiary)]">{demos.length}</span>
            </button>
            {categories.map((c) => (
              <button key={c.id} type="button" onClick={() => setFilter(c.id)} aria-pressed={filter === c.id} className={tab(filter === c.id)}>
                {c.label} <span className="mono text-[0.6875rem] text-[color:var(--text-tertiary)]">{counts[c.id]}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {filter === 'semua' ? fill(t.showingAll, { n: shown.length }) : fill(t.showingCat, { n: shown.length, cat: label[filter] })}
        </p>

        {/* Grid */}
        <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((d) => (
            <li key={d.slug}>
              <a href={d.url} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative aspect-[1200/630] overflow-hidden border border-[color:var(--border-light)] bg-[color:var(--neutral-100)]">
                  {failed.has(d.slug) ? (
                    // Cadangan bila gambar situs demo gagal dimuat (situsnya lambat/terblokir)
                    <div className="grid h-full w-full place-items-center bg-[color:var(--navy)] p-6 text-center">
                      <span className="display text-2xl text-white">{d.name}</span>
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
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="mt-4">
                  <p className="kicker text-[color:var(--text-tertiary)]">{label[d.category]}</p>
                  <h2 className="mt-1.5 flex items-start justify-between gap-3 text-[1.45rem] leading-tight text-[color:var(--text-primary)] group-hover:text-[color:var(--primary-700)]">
                    {d.name}
                    <ArrowUpRight size={17} className="arw-ne mt-1 shrink-0 text-[color:var(--primary-700)] transition-transform" aria-hidden="true" />
                  </h2>
                  {d.tagline && <p className="mt-1 text-[0.9375rem] leading-snug text-[color:var(--text-tertiary)]">{d.tagline}</p>}
                  <span className="sr-only">{t.newTab}</span>
                  <p className="mono mt-3 flex flex-wrap gap-x-3 border-t border-[color:var(--border-light)] pt-3 text-[0.6875rem] text-[color:var(--text-tertiary)]">
                    <span className="text-[color:var(--text-primary)]">{t.from} {fromByCat[d.category]}</span>
                    <span>{d.url.replace('https://', '')}</span>
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {/* Ajakan */}
        <div className="mt-20 grid grid-cols-1 gap-6 border-t border-[color:var(--rule)] pt-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="text-[2rem] leading-tight text-[color:var(--text-primary)] sm:text-[2.1rem]">{t.ctaTitle}</h2>
            <p className="mt-3 text-[color:var(--text-tertiary)]">{t.ctaLead}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Link href={contactHref} className="btn btn-line">
              {t.contact}
            </Link>
            <Link href={pricingHref} className="btn btn-solid">
              {t.seePricing} <ArrowRight size={17} className="arw" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
