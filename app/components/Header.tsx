'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
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

/** Pemilih bahasa: menaut ke halaman padanan; bahasa tanpa versi halaman ini ditampilkan nonaktif. */
function LangSwitch({ lang, label, notAvailable, onPick, big = false }: { lang: Lang; label: string; notAvailable: string; onPick?: () => void; big?: boolean }) {
  const pathname = toPublicPath(usePathname() ?? '/')
  return (
    <div role="group" aria-label={label} className={`mono flex items-center ${big ? 'gap-1 text-sm' : 'text-xs'}`}>
      {LANGS.map((l, i) => {
        const href = switchPath(pathname, l)
        const info = LANG_INFO[l]
        const base = `grid min-h-9 min-w-9 place-items-center px-1.5 tracking-[0.06em]`
        const sep = i > 0 ? <span aria-hidden="true" className="text-[color:var(--neutral-300)]">/</span> : null
        if (l === lang) {
          return (
            <span key={l} className="contents">
              {sep}
              <span lang={info.htmlLang} aria-current="true" title={info.name} className={`${base} text-[color:var(--text-primary)] underline decoration-[color:var(--primary-700)] decoration-2 underline-offset-[6px]`}>
                {info.short}
              </span>
            </span>
          )
        }
        if (!href) {
          return (
            <span key={l} className="contents">
              {sep}
              <span lang={info.htmlLang} title={`${info.name} — ${notAvailable}`} aria-disabled="true" className={`${base} cursor-not-allowed text-[color:var(--text-muted)] line-through`}>
                {info.short}
                <span className="sr-only"> ({notAvailable})</span>
              </span>
            </span>
          )
        }
        return (
          <span key={l} className="contents">
            {sep}
            <a href={href} hrefLang={info.hreflang} lang={info.htmlLang} title={info.name} onClick={onPick} className={`${base} text-[color:var(--text-tertiary)] transition-colors hover:text-[color:var(--primary-700)]`}>
              {info.short}
              <span className="sr-only"> — {info.name}</span>
            </a>
          </span>
        )
      })}
    </div>
  )
}

export default function Header({ lang, homeHref, nav, waHref, waDisplay, t }: HeaderProps) {
  const pathname = toPublicPath(usePathname() ?? '/')
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)

  const lastY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      window.requestAnimationFrame(() => {
        const y = window.scrollY
        setVisible(y < 80 || y < lastY.current)
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

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${visible || menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="border-b border-[color:var(--border-light)] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href={homeHref} prefetch={false} className="shrink-0" aria-label={t.brandAria}>
            <Logo />
          </Link>

          <nav aria-label={t.mainNav} className="hidden items-center lg:flex">
            {nav.map((n) => {
              const isActive = pathname === n.href || pathname.startsWith(`${n.href}/`)
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`whitespace-nowrap px-2.5 py-2 text-[0.9375rem] transition-colors xl:px-3.5 ${
                    isActive
                      ? 'text-[color:var(--text-primary)] underline decoration-[color:var(--primary-700)] decoration-2 underline-offset-[10px]'
                      : 'text-[color:var(--text-secondary)] hover:text-[color:var(--primary-700)]'
                  }`}
                >
                  {n.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-4 md:flex">
            <LangSwitch lang={lang} label={t.language} notAvailable={t.notAvailable} />
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-solid btn-sm">
              {t.consult} <ArrowUpRight size={16} className="arw arw-ne" aria-hidden="true" />
            </a>
          </div>

          <button
            className="mono -mr-2 inline-flex min-h-11 items-center gap-2.5 px-2 text-xs uppercase tracking-[0.08em] text-[color:var(--text-primary)] lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span aria-hidden="true">{menuOpen ? '✕' : 'Menu'}</span>
            <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
              <span className={`h-px w-full bg-current transition-transform ${menuOpen ? 'translate-y-[3px] rotate-45' : ''}`} />
              <span className={`h-px w-full bg-current transition-transform ${menuOpen ? '-translate-y-[3px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Menu ponsel: daftar besar bernomor, seperti daftar isi */}
      <div
        id="mobile-menu"
        className={`h-[calc(100dvh-4.25rem)] overflow-y-auto bg-white transition-[opacity,visibility] duration-200 lg:hidden ${menuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <div className="px-4 pb-10 pt-4 sm:px-6">
          <nav aria-label={t.mobileNav}>
            <ol>
              {nav.map((n, i) => {
                const isActive = pathname === n.href || pathname.startsWith(`${n.href}/`)
                return (
                  <li key={n.href} className="border-b border-[color:var(--border-light)]">
                    <Link
                      href={n.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className="flex items-baseline gap-4 py-3.5"
                    >
                      <span className="mono w-6 text-xs text-[color:var(--text-muted)]">{String(i + 1).padStart(2, '0')}</span>
                      <span className={`serif text-[1.75rem] leading-tight ${isActive ? 'text-[color:var(--primary-700)]' : 'text-[color:var(--text-primary)]'}`}>{n.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </nav>
          <div className="mt-6 md:hidden">
            <LangSwitch lang={lang} label={t.language} notAvailable={t.notAvailable} onPick={() => setMenuOpen(false)} big />
          </div>
          <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="btn btn-solid mt-6 w-full">
            {t.consultFree} <ArrowUpRight size={17} className="arw arw-ne" aria-hidden="true" />
          </a>
          <p className="mt-4 text-sm text-[color:var(--text-tertiary)]">
            {t.respond} · <span className="tnum text-[color:var(--text-primary)]">{waDisplay}</span>
          </p>
        </div>
      </div>
    </header>
  )
}
