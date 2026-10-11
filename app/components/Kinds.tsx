'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

export type Kind = {
  href: string
  title: string
  tagline: string
  /** mis. "17 demo" */
  count: string
  /** mis. "mulai Rp600.000" */
  price: string
  image: string
  /** teks tombol, mis. "Buka galeri Landing Page" */
  open: string
}

// Delapan jenis website sebagai daftar rapi + satu pratinjau besar. Baris adalah tautan ke galerinya;
// menyorot atau memfokus baris mengganti pratinjau (desktop). Di ponsel tiap baris punya gambar kecil sendiri.
export default function Kinds({ items, heading, hint, note }: { items: Kind[]; heading: string; hint: string; note?: string }) {
  const [active, setActive] = useState(0)
  // Pratinjau lain baru dimuat setelah daftar disentuh pertama kali, supaya halaman awal tetap ringan.
  const [armed, setArmed] = useState(false)
  const cur = items[active]

  return (
    <div className="mx-auto mt-20 max-w-6xl sm:px-6">
      <div className="bg-[color:var(--surface-soft)] px-4 py-10 sm:rounded-[2rem] sm:p-10 lg:p-12">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-[1.5rem] leading-tight text-[color:var(--text-primary)] sm:text-[1.875rem]">{heading}</h2>
          <p className="hidden text-sm text-[color:var(--text-tertiary)] lg:block">{hint}</p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-8 lg:mt-9 lg:grid-cols-12 lg:items-start lg:gap-10">
          <ul className="-mx-2 lg:col-span-5 lg:mx-0" onPointerEnter={() => setArmed(true)}>
            {items.map((it, i) => {
              const on = i === active
              return (
                <li key={it.href}>
                  {/* Portal = zona Next terpisah: tautan biasa, bukan navigasi klien. */}
                  <a
                    href={it.href}
                    hrefLang="id"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => {
                      setActive(i)
                      setArmed(true)
                    }}
                    className={`group flex items-center gap-4 rounded-2xl px-2 py-2.5 transition-colors lg:px-4 lg:py-3 ${
                      on ? 'lg:bg-white lg:shadow-[0_1px_2px_rgb(15_29_58/0.05),0_8px_24px_-16px_rgb(15_29_58/0.25)]' : 'lg:hover:bg-white/70'
                    }`}
                  >
                    <span className="relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-[color:var(--border-light)] lg:hidden">
                      <Image src={it.image} alt="" fill sizes="72px" className="object-cover object-top" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate text-[1.0625rem] font-semibold ${on ? 'text-[color:var(--text-primary)] lg:text-[color:var(--primary-700)]' : 'text-[color:var(--text-primary)]'}`}>{it.title}</span>
                      <span className="block truncate text-sm text-[color:var(--text-tertiary)]">
                        {it.count}
                        <span className="lg:hidden"> · {it.price}</span>
                      </span>
                    </span>
                    <span className="hidden whitespace-nowrap text-sm text-[color:var(--text-secondary)] lg:block">{it.price}</span>
                    <ArrowUpRight size={17} className={`arw-ne shrink-0 transition-transform ${on ? 'text-[color:var(--text-muted)] lg:text-[color:var(--primary-700)]' : 'text-[color:var(--text-muted)]'}`} aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Pratinjau besar (desktop) */}
          <div className="hidden lg:col-span-7 lg:block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-40px_rgb(15_29_58/0.45)] ring-1 ring-[color:var(--border-light)]" aria-hidden="true">
              {items.map((it, i) =>
                i === active || armed ? (
                  <Image
                    key={it.href}
                    src={it.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 640px, 1px"
                    className={`object-cover object-top transition-opacity duration-300 ${i === active ? 'opacity-100' : 'opacity-0'}`}
                  />
                ) : null,
              )}
            </div>
            <div className="mt-5 flex items-center justify-between gap-6">
              <p className="min-w-0 text-[color:var(--text-tertiary)]">{cur.tagline}</p>
              <a href={cur.href} hrefLang="id" className="btn btn-solid btn-sm shrink-0">
                {cur.open} <ArrowUpRight size={16} className="arw arw-ne" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {note && <p className="mt-7 text-sm text-[color:var(--text-tertiary)]">{note}</p>}
      </div>
    </div>
  )
}
