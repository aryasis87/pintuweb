import Link from 'next/link'
import type { CSSProperties } from 'react'
import { PACKAGES, byPrice } from '../lib/packages'
import { PACKAGE_GROUP_TEXT } from '../content/packages-text'
import { getDict } from '../i18n'
import { currencyCode, moneyCompact, moneyShort, packagesFor } from '../i18n/facts'
import type { Lang } from '../i18n/config'

// "Peta harga": semua paket diurutkan dari yang termurah, masing-masing dengan batang kisaran harganya pada
// satu skala bersama, sehingga terlihat sekilas paket mana yang masuk anggaran. Server component (tanpa
// JavaScript); setiap baris menaut ke kartu paketnya. Dipakai di beranda dan di halaman harga.
// Angka selalu dari lib/packages.ts.

// Skala berpita: tiap pita sama lebar supaya paket murah tidak tergencet oleh yang puluhan juta.
// Batasnya ditulis di sumbu, dan pita terakhir berakhir di harga tertinggi yang ada.
const STOPS = [0, 500_000, 1_500_000, 5_000_000]
const TOP = Math.max(...PACKAGES.map((p) => p.maxPrice), STOPS[STOPS.length - 1] + 1)
const BOUNDS = [...STOPS, TOP]
const BANDS = BOUNDS.length - 1

/** posisi (0-100) suatu harga pada skala berpita */
function pos(v: number) {
  for (let i = 0; i < BANDS; i++) {
    if (v <= BOUNDS[i + 1]) return ((i + (v - BOUNDS[i]) / (BOUNDS[i + 1] - BOUNDS[i])) / BANDS) * 100
  }
  return 100
}

const COLS = 'md:grid-cols-[13.5rem_minmax(0,1fr)_11.5rem] md:gap-x-5 lg:grid-cols-[17rem_minmax(0,1fr)_12rem] lg:gap-x-6'
const GRID_LINES = Array.from({ length: BANDS + 1 }, (_, i) => (i / BANDS) * 100)

type Props = {
  lang: Lang
  /** awalan tautan baris; slug paket ditambahkan di belakangnya (mis. "/paket#" atau "#") */
  base: string
  /** warna panel: 'soft' untuk bagian berlatar putih, 'white' untuk bagian berlatar lembut */
  tone?: 'soft' | 'white'
  className?: string
}

export default function PriceMap({ lang, base, tone = 'soft', className = '' }: Props) {
  const t = getDict(lang).pricing
  const groupTitle = PACKAGE_GROUP_TEXT[lang]
  const items = byPrice(packagesFor(lang))
  const hasOpen = items.some((p) => p.openEnded)
  const panel = tone === 'white' ? 'bg-white ring-1 ring-[color:var(--border-light)]' : 'bg-[color:var(--surface-soft)]'
  const bg = tone === 'white' ? 'bg-white' : 'bg-[color:var(--surface-soft)]'
  const rowHover = tone === 'white' ? 'hover:bg-[color:var(--surface-soft)]' : 'hover:bg-white'
  // Jangkar di halaman yang sama memakai <a> biasa: navigasi klien Next tidak memicu :target (sorotan kartu tujuan).
  const Row = base.startsWith('#') ? 'a' : Link

  return (
    <div className={`rounded-[1.75rem] p-2 pb-4 sm:p-4 sm:pb-5 lg:p-5 ${panel} ${className}`}>
      {/* Sumbu: tetap terlihat selama daftar digulir */}
      <div className={`sticky top-0 z-10 grid grid-cols-1 rounded-t-[1.25rem] px-3 pb-2 pt-3 text-[0.75rem] font-semibold text-[color:var(--text-tertiary)] md:px-4 md:text-[0.8125rem] ${bg} ${COLS}`} aria-hidden="true">
        <span className="hidden md:block">{t.colPackage}</span>
        <span className="relative mr-7 block h-5 md:mr-0">
          <span className="absolute left-0">{currencyCode(lang)}</span>
          {BOUNDS.slice(1).map((b, i) => (
            <span
              key={b}
              className={`absolute whitespace-nowrap ${i === BANDS - 1 ? 'right-0 hidden sm:block md:hidden lg:block' : '-translate-x-1/2'}`}
              style={i === BANDS - 1 ? undefined : { left: `${((i + 1) / BANDS) * 100}%` }}
            >
              {moneyCompact(lang, b)}
            </span>
          ))}
        </span>
        <span className="hidden text-right md:block">{t.colPrice}</span>
      </div>

      <ul>
        {items.map((p) => {
          const a = pos(p.minPrice)
          const w = pos(p.maxPrice) - a
          const price = moneyShort(lang, p)
          return (
            <li key={p.slug}>
              <Row href={base + p.slug} className={`group block items-center rounded-2xl px-3 py-3 transition-colors md:grid md:px-4 md:py-0 ${rowHover} ${COLS}`}>
                <span className="block min-w-0 md:py-3">
                  <span className="block font-semibold leading-snug text-[color:var(--text-primary)] transition-colors group-hover:text-[color:var(--primary-700)]">{p.title}</span>
                  {/* ponsel: harga langsung di bawah nama, supaya nama tidak terdesak */}
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-[color:var(--text-tertiary)] md:hidden">
                    <span className="whitespace-nowrap text-[0.875rem] font-semibold text-[color:var(--text-primary)]">{price}</span> · {p.duration}
                  </span>
                  <span className="mt-0.5 hidden text-[0.8125rem] leading-snug text-[color:var(--text-tertiary)] md:block">
                    {groupTitle[p.group].title} · {p.duration}
                  </span>
                </span>
                <span className="hidden whitespace-nowrap text-right text-[0.9375rem] font-semibold text-[color:var(--text-primary)] md:order-3 md:block">{price}</span>

                {/* Batang kisaran harga pada skala bersama */}
                <span className="relative mr-7 mt-2.5 block h-5 md:order-2 md:mr-0 md:mt-0 md:h-full md:min-h-[3.75rem]" aria-hidden="true">
                  {GRID_LINES.map((x) => (
                    <span key={x} className="absolute inset-y-0 w-px bg-[color:var(--primary-200)]" style={{ left: x === 100 ? 'calc(100% - 1px)' : `${x}%` }} />
                  ))}
                  <span
                    className="absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full transition-[height] duration-200 group-hover:h-3.5"
                    style={
                      {
                        left: `${a}%`,
                        width: `${w}%`,
                        // satu gradasi untuk seluruh skala: tiap batang menampilkan irisannya sendiri
                        backgroundImage: 'linear-gradient(90deg, var(--accent-400), var(--primary-700))',
                        backgroundSize: `${(100 / w) * 100}% 100%`,
                        backgroundPosition: `${w >= 100 ? 0 : (a / (100 - w)) * 100}% 0`,
                      } as CSSProperties
                    }
                  />
                  {p.openEnded &&
                    // bisa lebih dari batas atas: ekor titik-titik
                    [0, 1, 2].map((k) => (
                      <span key={k} className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-[color:var(--primary-700)]" style={{ left: `calc(${a + w}% + ${5 + k * 7}px)`, opacity: 0.75 - k * 0.22 }} />
                    ))}
                </span>
              </Row>
            </li>
          )
        })}
      </ul>

      {hasOpen && (
        <p className="mt-3 flex items-center gap-2.5 px-3 text-[0.8125rem] text-[color:var(--text-tertiary)] md:px-4">
          <span className="flex shrink-0 gap-[3px]" aria-hidden="true">
            {[0.75, 0.53, 0.31].map((o) => (
              <span key={o} className="h-1 w-1 rounded-full bg-[color:var(--primary-700)]" style={{ opacity: o }} />
            ))}
          </span>
          {t.openNote}
        </p>
      )}
    </div>
  )
}
