'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Search, MessageCircle, ArrowRight } from 'lucide-react'
import { faqCategories, faqItems, type FaqCategoryId } from '../lib/faqData'
import { wa } from '../lib/site'

type Props = {
  /** 'home' = bagian di beranda (judul h2 + tautan ke /faq); 'page' = isi halaman /faq (judul h1 ada di halaman). */
  variant?: 'home' | 'page'
}

/**
 * Semua pertanyaan & jawaban selalu ada di HTML (<details>), sehingga JSON-LD FAQPage
 * cocok dengan isi yang terlihat. Kategori & pencarian hanya menyembunyikan item.
 */
export default function FAQ({ variant = 'home' }: Props) {
  const [category, setCategory] = useState<FaqCategoryId | 'all'>(variant === 'page' ? 'all' : 'general')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return faqItems.map(
      (item) =>
        (category === 'all' || item.category === category) &&
        (!q || item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)),
    )
  }, [category, query])
  const count = visible.filter(Boolean).length

  const tabs = [{ id: 'all' as const, name: 'Semua' }, ...faqCategories]
  // Di beranda pertanyaan berada di bawah h2 bagian FAQ; di /faq langsung di bawah h1.
  const Q = variant === 'page' ? 'h2' : 'h3'

  return (
    <section
      aria-labelledby={variant === 'home' ? 'faq-title' : undefined}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: 'var(--surface-primary)' }}
    >
      <div className="pointer-events-none absolute inset-0 u-grid opacity-60" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        {variant === 'home' && (
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-light)] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--primary-700)]">
              Pertanyaan Umum
            </span>
            <h2 id="faq-title" className="mt-5 text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">
              Punya <span className="text-[color:var(--primary-700)]">pertanyaan?</span>
            </h2>
            <p className="mt-4 text-base text-[color:var(--text-tertiary)] sm:text-lg">
              Jawaban untuk hal yang paling sering ditanyakan sebelum memesan website.
            </p>
          </div>
        )}

        {/* Pencarian */}
        <div className="relative mx-auto mb-6 max-w-md">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]" aria-hidden="true" />
          <label htmlFor={`faq-search-${variant}`} className="sr-only">Cari pertanyaan</label>
          <input
            id={`faq-search-${variant}`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari pertanyaan…"
            className="w-full rounded-xl border border-[color:var(--border-light)] bg-white py-3 pl-11 pr-4 text-sm text-[color:var(--text-primary)] shadow-sm outline-none transition focus:border-[color:var(--primary-600)] sm:text-base"
          />
        </div>

        {/* Kategori */}
        <div className="-mx-4 mb-8 overflow-x-auto px-4 pb-1 scrollbar-hide" role="group" aria-label="Kategori pertanyaan">
          <div className="flex w-max gap-2 sm:mx-auto">
            {tabs.map((t) => {
              const active = category === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCategory(t.id)}
                  aria-pressed={active}
                  className={`min-h-11 whitespace-nowrap rounded-xl border px-4 text-sm font-semibold transition ${
                    active
                      ? 'border-[color:var(--primary-700)] bg-[color:var(--primary-700)] text-white shadow-sm'
                      : 'border-[color:var(--border-light)] bg-white text-[color:var(--text-secondary)] hover:border-[color:var(--primary-300)] hover:text-[color:var(--primary-700)]'
                  }`}
                >
                  {t.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Daftar — semua item selalu dirender */}
        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <details
              key={item.question}
              hidden={!visible[i]}
              className="group rounded-2xl border border-[color:var(--border-light)] bg-white shadow-sm open:border-[color:var(--primary-200)] open:bg-[color:var(--primary-50)]"
            >
              <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-4 text-left sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                <Q className="flex-1 text-base font-semibold leading-snug text-[color:var(--text-primary)] sm:text-lg">{item.question}</Q>
                <ChevronDown size={20} className="mt-0.5 shrink-0 text-[color:var(--text-muted)] transition-transform group-open:rotate-180 group-open:text-[color:var(--primary-700)]" aria-hidden="true" />
              </summary>
              <p className="border-t border-[color:var(--primary-200)] px-5 pb-5 pt-4 text-sm leading-relaxed text-[color:var(--text-secondary)] sm:px-6 sm:text-base">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        {count === 0 && (
          <p className="py-10 text-center text-[color:var(--text-tertiary)]" role="status">
            Tidak ada pertanyaan yang cocok. Coba kata lain, atau tanyakan langsung lewat WhatsApp.
          </p>
        )}

        {/* Ajakan */}
        <div className="relative mt-12 overflow-hidden rounded-3xl bg-[color:var(--text-primary)] p-8 text-center text-white sm:p-10">
          <div className="pointer-events-none absolute inset-0 u-grid opacity-[0.08]" aria-hidden="true" />
          <div className="relative">
            <p className="text-xl font-bold sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>Masih ada pertanyaan?</p>
            <p className="mx-auto mt-2 max-w-lg text-sm text-[color:var(--text-on-dark)] sm:text-base">
              Tanyakan langsung soal proyek Anda. Konsultasinya gratis.
            </p>
            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a
                href={wa('Halo PintuWeb, saya punya pertanyaan soal pembuatan website.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:-translate-y-0.5"
              >
                <MessageCircle size={18} aria-hidden="true" /> Tanya lewat WhatsApp
              </a>
              {variant === 'home' && (
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Lihat semua pertanyaan <ArrowRight size={16} aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
