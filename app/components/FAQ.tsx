'use client'

import { useMemo, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, ArrowUpRight } from 'lucide-react'
import SectionHead from './SectionHead'
import { HlText } from './Bits'
import { LogoMark } from './Logo'
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
  /** janji waktu balas (dari lib/site.ts) */
  note: string
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

/** Menandai potongan teks yang cocok dengan kata yang dicari. */
function mark(text: string, q: string): ReactNode {
  if (q.length < 2) return text
  const lower = text.toLowerCase()
  const out: ReactNode[] = []
  let from = 0
  for (let at = lower.indexOf(q); at !== -1; at = lower.indexOf(q, from)) {
    if (at > from) out.push(text.slice(from, at))
    out.push(
      <mark key={at} className="rounded-[3px] bg-[color:var(--accent-200)] px-0.5 text-inherit">
        {text.slice(at, at + q.length)}
      </mark>,
    )
    from = at + q.length
  }
  if (from < text.length) out.push(text.slice(from))
  return out
}

/**
 * Semua pertanyaan & jawaban selalu ada di HTML (<details>), sehingga JSON-LD FAQPage
 * cocok dengan isi yang terlihat. Kategori & pencarian hanya menyembunyikan item.
 * Jawaban tampil seperti balasan obrolan dari PintuWeb (logo + gelembung).
 */
export default function FAQ({ items, categories, t, waHref, faqHref, variant = 'home' }: Props) {
  const [category, setCategory] = useState<FaqCategoryId | 'all'>(variant === 'page' ? 'all' : 'general')
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  const state = useMemo(
    () =>
      items.map((item) => {
        const inQuestion = item.question.toLowerCase().includes(q)
        const inAnswer = item.answer.toLowerCase().includes(q)
        return {
          show: (category === 'all' || item.category === category) && (!q || inQuestion || inAnswer),
          // cocoknya hanya di jawaban: buka jawabannya supaya terlihat kenapa item ini muncul
          reveal: q.length >= 2 && !inQuestion && inAnswer,
        }
      }),
    [items, category, q],
  )
  const count = state.filter((s) => s.show).length

  const tabs = [{ id: 'all' as const, name: t.all, n: items.length }, ...categories.map((c) => ({ ...c, n: items.filter((i) => i.category === c.id).length }))]
  // Di beranda pertanyaan berada di bawah h2 bagian FAQ; di halaman FAQ langsung di bawah h1.
  const Q = variant === 'page' ? 'h2' : 'h3'
  const home = variant === 'home'

  // Kartu "belum terjawab": di beranda menempel di kolom kiri (desktop) atau setelah daftar (ponsel).
  const contact = (
    <div className={`rounded-[1.5rem] bg-white p-6 ring-1 ring-[color:var(--border-light)] ${home ? '' : 'sm:flex sm:items-center sm:justify-between sm:gap-8'}`}>
      <div className="min-w-0">
        <p className="display text-[1.125rem] font-semibold leading-snug text-[color:var(--text-primary)]">{t.unanswered}</p>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)]">
          {t.askLead} {t.note}.
        </p>
      </div>
      <div className={`mt-5 flex flex-col gap-2.5 sm:flex-row ${home ? 'lg:flex-col' : 'sm:mt-0 sm:shrink-0'}`}>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-solid btn-sm">
          {t.askWa} <ArrowUpRight size={15} className="arw arw-ne" aria-hidden="true" />
        </a>
        {home && (
          <Link href={faqHref} className="btn btn-line btn-sm">
            {t.allN} <ArrowRight size={15} className="arw" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  )

  return (
    <section id={home ? 'faq' : undefined} aria-labelledby={home ? 'faq-title' : undefined} className={home ? 'bg-[color:var(--surface-soft)] py-24 sm:py-32' : 'pb-20 pt-10 sm:pb-28'}>
      <div className="mx-auto flex max-w-6xl flex-col px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-12">
        {home ? (
          // Ponsel: judul, daftar, lalu kartu (urutan lewat order). Desktop: judul + kartu menempel di kiri.
          <div className="contents lg:sticky lg:top-24 lg:col-span-4 lg:block lg:self-start">
            <div className="order-1 mb-10 lg:mb-0">
              <SectionHead eyebrow={t.eyebrow} id="faq-title" title={<HlText parts={t.title} />} lead={t.lead} />
            </div>
            <div className="order-3 mt-8 lg:mt-9">{contact}</div>
          </div>
        ) : (
          <div className="hidden lg:col-span-3 lg:block" aria-hidden="true" />
        )}

        <div className={`order-2 ${home ? 'lg:col-span-8' : 'lg:col-span-9'}`}>
          {/* Pencarian */}
          <div className="relative">
            <Search size={18} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]" aria-hidden="true" />
            <label htmlFor={`faq-search-${variant}`} className="sr-only">
              {t.search}
            </label>
            <input
              id={`faq-search-${variant}`}
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                // mencari berarti mencari di semua kategori
                if (e.target.value.trim()) setCategory('all')
              }}
              placeholder={t.searchPh}
              className="h-[3.25rem] w-full rounded-full border-0 bg-white pl-[3.25rem] pr-5 text-base text-[color:var(--text-primary)] outline-none ring-1 ring-[color:var(--border-light)] transition-shadow placeholder:text-[color:var(--text-muted)] focus:ring-2 focus:ring-[color:var(--primary-700)]"
            />
          </div>

          {/* Kategori */}
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={t.categories}>
            {tabs.map((tab) => {
              const active = category === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategory(tab.id)}
                  aria-pressed={active}
                  className={`inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[0.9375rem] transition-colors ${
                    active
                      ? 'bg-[color:var(--primary-700)] font-semibold text-white'
                      : 'bg-white text-[color:var(--text-secondary)] ring-1 ring-[color:var(--border-light)] hover:text-[color:var(--primary-700)] hover:ring-[color:var(--primary-300)]'
                  }`}
                >
                  {tab.name}
                  <span className={`text-[0.8125rem] font-medium ${active ? 'text-white/80' : 'text-[color:var(--text-muted)]'}`}>{tab.n}</span>
                </button>
              )
            })}
          </div>

          {/* Daftar: semua item selalu dirender */}
          <div className="mt-6 flex flex-col gap-2.5">
            {items.map((item, i) => (
              <details
                key={item.question}
                hidden={!state[i].show}
                open={state[i].reveal || undefined}
                className="faq-item group rounded-[1.25rem] bg-white ring-1 ring-[color:var(--border-light)] transition-shadow duration-300 open:shadow-[0_18px_34px_-26px_rgb(38_70_156/0.55)] open:ring-[color:var(--primary-300)]"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 rounded-[1.25rem] px-5 py-4 text-left sm:px-6 sm:py-[1.125rem] [&::-webkit-details-marker]:hidden">
                  <Q className="flex-1 text-[1.0625rem] leading-snug text-[color:var(--text-primary)] transition-colors group-open:text-[color:var(--primary-700)] sm:text-[1.125rem]">{mark(item.question, q)}</Q>
                  <span
                    aria-hidden="true"
                    className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[color:var(--surface-soft)] text-[color:var(--text-secondary)] transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-[color:var(--primary-700)] group-open:text-white"
                  >
                    <span className="absolute h-[1.5px] w-3 rounded-full bg-current" />
                    <span className="absolute h-3 w-[1.5px] rounded-full bg-current" />
                  </span>
                </summary>
                {/* Jawaban sebagai balasan obrolan dari PintuWeb */}
                <div className="faq-answer flex items-start gap-3 px-5 pb-5 sm:px-6 sm:pb-6">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white ring-1 ring-[color:var(--border-light)]" aria-hidden="true">
                    <LogoMark className="h-[1.125rem] w-auto" />
                  </span>
                  <p className="min-w-0 max-w-2xl rounded-[1.125rem] rounded-tl-md bg-[color:var(--primary-50)] px-4 py-3 text-[0.9375rem] leading-relaxed text-[color:var(--text-secondary)] sm:text-base">{mark(item.answer, q)}</p>
                </div>
              </details>
            ))}
          </div>

          {count === 0 && (
            <p className="rounded-[1.25rem] bg-white px-6 py-8 text-[color:var(--text-tertiary)] ring-1 ring-[color:var(--border-light)]" role="status">
              {t.none}
            </p>
          )}

          {!home && <div className="mt-8">{contact}</div>}
        </div>
      </div>
    </section>
  )
}
