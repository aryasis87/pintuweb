'use client'

import { useEffect, useRef, useState } from 'react'

type Item = { id: string; text: string }

/** Daftar isi artikel. Desktop: menempel di tepi dan menandai bagian yang sedang dibaca. Ponsel/tablet: bisa dilipat. */
export default function ArticleToc({ items, title }: { items: Item[]; title: string }) {
  const [active, setActive] = useState(items[0]?.id ?? '')
  const fold = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    const heads = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => Boolean(e))
    if (!heads.length) return
    let ticking = false
    const update = () => {
      // bagian aktif = judul terakhir yang sudah melewati garis 140px dari atas layar
      let cur = heads[0].id
      for (const h of heads) if (h.getBoundingClientRect().top <= 140) cur = h.id
      setActive(cur)
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [items])

  const list = (onPick?: () => void) => (
    <ol className="space-y-0.5">
      {items.map((h, i) => {
        const on = h.id === active
        return (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={onPick}
              aria-current={on ? 'location' : undefined}
              className={`flex gap-3 rounded-xl px-3 py-2 text-[0.9375rem] leading-snug transition-colors ${
                on ? 'bg-[color:var(--primary-50)] font-semibold text-[color:var(--primary-700)]' : 'text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-soft)] hover:text-[color:var(--text-primary)]'
              }`}
            >
              <span className={`w-4 shrink-0 text-[0.8125rem] leading-[1.45] ${on ? 'text-[color:var(--primary-700)]' : 'text-[color:var(--text-muted)]'}`} aria-hidden="true">
                {i + 1}
              </span>
              {h.text}
            </a>
          </li>
        )
      })}
    </ol>
  )

  return (
    <>
      {/* Ponsel & tablet: lipatan; memilih bagian menutup lipatannya */}
      <details ref={fold} className="group mb-8 rounded-[1.25rem] bg-[color:var(--surface-soft)] ring-1 ring-[color:var(--border-light)] lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[1.25rem] px-5 py-4 font-semibold text-[color:var(--text-primary)] [&::-webkit-details-marker]:hidden">
          <span>
            {title} <span className="font-normal text-[color:var(--text-tertiary)]">· {items.length}</span>
          </span>
          <span aria-hidden="true" className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[color:var(--text-secondary)] ring-1 ring-[color:var(--border-light)] transition-transform duration-300 group-open:rotate-45">
            <span className="absolute h-[1.5px] w-3 rounded-full bg-current" />
            <span className="absolute h-3 w-[1.5px] rounded-full bg-current" />
          </span>
        </summary>
        <nav aria-label={title} className="px-2 pb-3">
          {list(() => {
            if (fold.current) fold.current.open = false
          })}
        </nav>
      </details>

      {/* Desktop: menempel */}
      <nav aria-labelledby="toc-title" className="hidden lg:sticky lg:top-28 lg:block">
        <h2 id="toc-title" className="kicker px-3 pb-2 text-[color:var(--text-primary)]">
          {title}
        </h2>
        {list()}
      </nav>
    </>
  )
}
