'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, ArrowUpRight } from 'lucide-react'
import SectionHead from './SectionHead'
import { HlText } from './Bits'
import type { Hl } from '../i18n/dict/id'
import type { FaqCategoryId, FaqItem } from '../content/faq'

export type FaqText = {
  eyebrow: string
  title: Hl
  lead: string
  search: string
  searchPh: string
  categories: string
  all: string
  none: string
  unanswered: string
  askLead: string
  allN: string
  askWa: string
}

type Props = {
  items: FaqItem[]
  categories: { id: FaqCategoryId; name: string }[]
  t: FaqText
  waHref: string
  faqHref: string
  /** 'home' = bagian di beranda (judul h2 + tautan ke halaman FAQ); 'page' = isi halaman FAQ (judul h1 ada di halaman). */
  variant?: 'home' | 'page'
}

/**
 * Semua pertanyaan & jawaban selalu ada di HTML (<details>), sehingga JSON-LD FAQPage
 * cocok dengan isi yang terlihat. Kategori & pencarian hanya menyembunyikan item.
 */
export default function FAQ({ items, categories, t, waHref, faqHref, variant = 'home' }: Props) {
  const [category, setCategory] = useState<FaqCategoryId | 'all'>(variant === 'page' ? 'all' : 'general')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.map(
      (item) =>
        (category === 'all' || item.category === category) &&
        (!q || item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)),
    )
  }, [items, category, query])
  const count = visible.filter(Boolean).length

  const tabs = [{ id: 'all' as const, name: t.all }, ...categories]
  // Di beranda pertanyaan berada di bawah h2 bagian FAQ; di halaman FAQ langsung di bawah h1.
  const Q = variant === 'page' ? 'h2' : 'h3'
  const home = variant === 'home'

  return (
    <section id={home ? 'faq' : undefined} aria-labelledby={home ? 'faq-title' : undefined} className={home ? 'py-20 sm:py-28' : 'pb-20 pt-10 sm:pb-28'}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-10">
        {home ? (
          <div className="mb-12 lg:sticky lg:top-28 lg:col-span-4 lg:mb-0 lg:self-start">
            <SectionHead stacked no="06" eyebrow={t.eyebrow} id="faq-title" title={<HlText parts={t.title} />} lead={t.lead} />
          </div>
        ) : (
          <div className="hidden lg:col-span-3 lg:block" aria-hidden="true" />
        )}

        <div className={home ? 'lg:col-span-8' : 'lg:col-span-9'}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            {/* Kategori */}
            <div className="scrollbar-hide -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="group" aria-label={t.categories}>
              <div className="flex w-max gap-1">
                {tabs.map((tab) => {
                  const active = category === tab.id
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setCategory(tab.id)}
                      aria-pressed={active}
                      className={`min-h-11 whitespace-nowrap px-2.5 text-[0.9375rem] transition-colors first:pl-0 ${
                        active
                          ? 'font-semibold text-[color:var(--text-primary)] underline decoration-[color:var(--primary-700)] decoration-2 underline-offset-[9px]'
                          : 'text-[color:var(--text-tertiary)] hover:text-[color:var(--primary-700)]'
                      }`}
                    >
                      {tab.name}
                    </button>
                  )
                })}
              </div>
            </div>
            {/* Pencarian */}
            <div className="relative sm:w-60 sm:shrink-0">
              <Search size={16} className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]" aria-hidden="true" />
              <label htmlFor={`faq-search-${variant}`} className="sr-only">{t.search}</label>
              <input
                id={`faq-search-${variant}`}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPh}
                className="w-full border-0 border-b border-[color:var(--border-medium)] bg-transparent py-2.5 pl-7 pr-1 text-[0.9375rem] text-[color:var(--text-primary)] outline-none transition-colors placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--primary-700)]"
              />
            </div>
          </div>

          {/* Daftar — semua item selalu dirender */}
          <div className="mt-6 border-t border-[color:var(--rule)]">
            {items.map((item, i) => (
              <details key={item.question} hidden={!visible[i]} className="group border-b border-[color:var(--border-light)]">
                <summary className="flex cursor-pointer list-none items-start gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <Q className="flex-1 text-[1.25rem] leading-snug text-[color:var(--text-primary)] group-open:text-[color:var(--primary-700)] sm:text-[1.375rem]">{item.question}</Q>
                  <span aria-hidden="true" className="relative mt-2.5 h-3 w-3 shrink-0 text-[color:var(--text-tertiary)] transition-transform duration-300 group-open:rotate-45 group-open:text-[color:var(--primary-700)]">
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                    <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 pr-10 text-base leading-relaxed text-[color:var(--text-secondary)]">{item.answer}</p>
              </details>
            ))}
          </div>

          {count === 0 && (
            <p className="py-10 text-[color:var(--text-tertiary)]" role="status">
              {t.none}
            </p>
          )}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.9375rem] text-[color:var(--text-secondary)]">
              <span className="font-semibold text-[color:var(--text-primary)]">{t.unanswered}</span> {t.askLead}
            </p>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              {home && (
                <Link href={faqHref} className="btn btn-line btn-sm">
                  {t.allN} <ArrowRight size={15} className="arw" aria-hidden="true" />
                </Link>
              )}
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-solid btn-sm">
                {t.askWa} <ArrowUpRight size={15} className="arw arw-ne" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
