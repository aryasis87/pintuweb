'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { LANGS, LANG_INFO, type Lang } from '../i18n/config'
import { switchPath, toPublicPath } from '../i18n/routes'
import { Logo } from './Logo'

export type HeaderProps = {
  lang: Lang
  homeHref: string
  nav: { label: string; href: string }[]
  waHref: string
  waDisplay: string
  t: {
    tagline: string
    brandAria: string
    logoAlt: string
    mainNav: string
    mobileNav: string
    guarantee: string
    consult: string
    consultFree: string
    openMenu: string
    closeMenu: string
    demosReady: string
    respond: string
    language: string
    notAvailable: string
  }
}

/** Pemilih bahasa berbentuk kapsul: menaut ke halaman padanan; bahasa tanpa versi halaman ini ditampilkan nonaktif. */
function LangSwitch({ lang, label, notAvailable, onPick, big = false }: { lang: Lang; label: string; notAvailable: string; onPick?: () => void; big?: boolean }) {
  const pathname = toPublicPath(usePathname() ?? '/')
  const base = `grid place-items-center rounded-full ${big ? 'min-h-10 min-w-12 px-3' : 'min-h-8 min-w-9 px-2'}`
  return (
    <div role="group" aria-label={label} className={`flex items-center rounded-full bg-[color:var(--surface-soft)] p-0.5 font-semibold ring-1 ring-[color:var(--border-light)] ${big ? 'text-[0.9375rem]' : 'text-[0.8125rem]'}`}>
      {LANGS.map((l) => {
        const href = switchPath(pathname, l)
        const info = LANG_INFO[l]
        if (l === lang) {
          return (
            <span key={l} lang={info.htmlLang} aria-current="true" title={info.name} className={`${base} bg-white text-[color:var(--primary-700)] shadow-[0_1px_2px_rgb(15_29_58/0.12)] ring-1 ring-[color:var(--border-light)]`}>
              {info.short}
            </span>
          )
        }
        if (!href) {
          return (
            <span key={l} lang={info.htmlLang} title={`${info.name} — ${notAvailable}`} aria-disabled="true" className={`${base} cursor-not-allowed text-[color:var(--text-muted)] line-through`}>
              {info.short}
              <span className="sr-only"> ({notAvailable})</span>
            </span>
          )
        }
        return (
          <a key={l} href={href} hrefLang={info.hreflang} lang={info.htmlLang} title={info.name} onClick={onPick} className={`${base} text-[color:var(--text-tertiary)] transition-colors hover:text-[color:var(--primary-700)]`}>
            {info.short}
            <span className="sr-only"> — {info.name}</span>
          </a>
        )
      })}
    </div>
  )
}

// Navbar = bilah membulat yang mengambang di atas halaman. Bersembunyi saat menggulir turun, muncul lagi saat
// menggulir naik. Di bawah lg, tautan pindah ke lembar menu yang turun dari bilah.
export default function Header({ lang, homeHref, nav, waHref, waDisplay, t }: HeaderProps) {
  const pathname = toPublicPath(usePathname() ?? '/')
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  // di puncak halaman bilahnya lebih tembus; setelah digulir lebih pekat dan berbayang
  const [scrolled, setScrolled] = useState(false)

  const lastY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      window.requestAnimationFrame(() => {
        const y = window.scrollY
        setVisible(y < 80 || y < lastY.current)
        setScrolled(y > 12)
        lastY.current = y
        ticking.current = false
      })
      ticking.current = true
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Pindah halaman = tutup menu
  useEffect(() => setMenuOpen(false), [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <>
      {/* Tirai di belakang lembar menu */}
      <div
        className={`fixed inset-0 z-40 bg-[rgb(15_29_58/0.35)] backdrop-blur-[2px] transition-opacity duration-200 lg:hidden ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <header className={`pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-300 sm:px-5 ${visible || menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div
          className={`pointer-events-auto mx-auto flex h-[3.75rem] max-w-6xl items-center justify-between gap-3 rounded-full pl-4 pr-2 ring-1 backdrop-blur-md transition-[background-color,box-shadow] duration-300 sm:pl-5 ${
            scrolled || menuOpen
              ? 'bg-white/95 shadow-[0_16px_36px_-22px_rgb(15_29_58/0.45)] ring-[color:var(--border-light)]'
              : 'bg-white/80 shadow-[0_10px_28px_-22px_rgb(15_29_58/0.35)] ring-white/80'
          }`}
        >
          <Link href={homeHref} prefetch={false} className="shrink-0 rounded-full" aria-label={t.brandAria}>
            <Logo priority />
          </Link>

          <nav aria-label={t.mainNav} className="hidden items-center gap-0.5 lg:flex">
            {nav.map((n) => {
              const active = isActive(n.href)
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? 'page' : undefined}
                  className={`whitespace-nowrap rounded-full px-2.5 py-2 text-[0.9375rem] font-medium transition-colors xl:px-3.5 ${
                    active ? 'bg-[color:var(--primary-50)] text-[color:var(--primary-700)]' : 'text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-soft)] hover:text-[color:var(--text-primary)]'
                  }`}
                >
                  {n.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-2.5 md:flex">
              <LangSwitch lang={lang} label={t.language} notAvailable={t.notAvailable} />
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-solid btn-sm">
                {t.consult} <ArrowUpRight size={16} className="arw arw-ne" aria-hidden="true" />
              </a>
            </div>

            <button
              className="inline-flex h-11 items-center gap-2.5 rounded-full bg-[color:var(--surface-soft)] pl-4 pr-3.5 text-sm font-semibold text-[color:var(--text-primary)] ring-1 ring-[color:var(--border-light)] lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? t.closeMenu : t.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span aria-hidden="true">Menu</span>
              <span aria-hidden="true" className="relative block h-3 w-[1.125rem]">
                <span className={`absolute inset-x-0 h-[1.5px] rounded-full bg-current transition-transform duration-200 ${menuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[2px]'}`} />
                <span className={`absolute inset-x-0 h-[1.5px] rounded-full bg-current transition-transform duration-200 ${menuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-[2px]'}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Lembar menu (ponsel & tablet) */}
        <div
          id="mobile-menu"
          className={`pointer-events-auto mx-auto mt-2 max-h-[calc(100dvh-5.75rem)] max-w-6xl overflow-y-auto rounded-[1.75rem] bg-white p-2.5 shadow-[0_30px_60px_-30px_rgb(15_29_58/0.55)] ring-1 ring-[color:var(--border-light)] transition-[opacity,transform,visibility] duration-200 lg:hidden ${
            menuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
          }`}
        >
          <nav aria-label={t.mobileNav}>
            <ul>
              {nav.map((n) => {
                const active = isActive(n.href)
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center justify-between gap-4 rounded-2xl px-4 py-3 text-[1.1875rem] font-semibold transition-colors ${
                        active ? 'bg-[color:var(--primary-50)] text-[color:var(--primary-700)]' : 'text-[color:var(--text-primary)] hover:bg-[color:var(--surface-soft)]'
                      }`}
                    >
                      {n.label}
                      <ArrowRight size={18} className={active ? 'text-[color:var(--primary-700)]' : 'text-[color:var(--text-muted)]'} aria-hidden="true" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="mt-2 border-t border-[color:var(--border-light)] px-1.5 pb-1.5 pt-3">
            <div className="flex items-center justify-between gap-3 md:hidden">
              <span className="pl-2.5 text-sm text-[color:var(--text-tertiary)]">{t.language}</span>
              <LangSwitch lang={lang} label={t.language} notAvailable={t.notAvailable} onPick={() => setMenuOpen(false)} big />
            </div>
            <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="btn btn-solid mt-3 w-full md:mt-0">
              {t.consultFree} <ArrowUpRight size={17} className="arw arw-ne" aria-hidden="true" />
            </a>
            <p className="mt-3 text-center text-sm text-[color:var(--text-tertiary)]">
              {t.respond} · <span className="text-[color:var(--text-primary)]">{waDisplay}</span>
            </p>
          </div>
        </div>
      </header>
    </>
  )
}
