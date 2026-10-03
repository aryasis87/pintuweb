'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Phone, Menu, X, ShieldCheck, Sparkles, Globe } from 'lucide-react'
import { LANGS, LANG_INFO, type Lang } from '../i18n/config'
import { switchPath, toPublicPath } from '../i18n/routes'

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
function LangSwitch({ lang, label, notAvailable, onPick, block = false }: { lang: Lang; label: string; notAvailable: string; onPick?: () => void; block?: boolean }) {
  const pathname = toPublicPath(usePathname() ?? '/')
  return (
    <div role="group" aria-label={label} className={`flex items-center gap-1 ${block ? 'justify-center' : ''}`}>
      <Globe size={15} className={`mr-0.5 text-[color:var(--text-muted)] ${block ? '' : 'lg:hidden xl:block'}`} aria-hidden="true" />
      {LANGS.map((l) => {
        const href = switchPath(pathname, l)
        const info = LANG_INFO[l]
        const base = 'grid min-h-9 min-w-9 place-items-center rounded-lg px-2 text-xs font-bold transition-colors'
        if (l === lang) {
          return (
            <span key={l} lang={info.htmlLang} aria-current="true" title={info.name} className={`${base} bg-[color:var(--primary-700)] text-white`}>
              {info.short}
            </span>
          )
        }
        if (!href) {
          return (
            <span key={l} lang={info.htmlLang} title={`${info.name} — ${notAvailable}`} aria-disabled="true" className={`${base} cursor-not-allowed text-[color:var(--text-muted)] line-through decoration-1`}>
              {info.short}
              <span className="sr-only"> ({notAvailable})</span>
            </span>
          )
        }
        return (
          <a key={l} href={href} hrefLang={info.hreflang} lang={info.htmlLang} title={info.name} onClick={onPick} className={`${base} text-[color:var(--text-secondary)] hover:bg-[color:var(--primary-50)] hover:text-[color:var(--primary-700)]`}>
            {info.short}
            <span className="sr-only"> — {info.name}</span>
          </a>
        )
      })}
    </div>
  )
}

export default function Header({ lang, homeHref, nav, waHref, waDisplay, t }: HeaderProps) {
  const pathname = toPublicPath(usePathname() ?? '/')
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  const lastY = useRef(0)
  const ticking = useRef(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      window.requestAnimationFrame(() => {
        const y = window.scrollY
        setVisible(y < 80 || y < lastY.current)
        setScrolled(y > 16)
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
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    if (menuOpen) document.addEventListener('mousedown', onClick)
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => document.removeEventListener('mousedown', onClick)
  }, [menuOpen])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[color:var(--background)]/85 backdrop-blur-xl border-b border-[color:var(--border-light)] shadow-[0_4px_20px_-12px_rgba(20,19,15,0.25)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          {/* Brand */}
          <Link href={homeHref} prefetch={false} className="group flex shrink-0 items-center gap-2.5" aria-label={t.brandAria}>
            <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[color:var(--border-light)]">
              <Image src="/images/logo.webp" alt={t.logoAlt} width={28} height={28} priority unoptimized className="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-110" />
            </span>
            <span className="leading-tight">
              <span className="block font-[family-name:var(--font-display)] text-lg font-extrabold tracking-tight text-[color:var(--text-primary)]">
                Pintu<span className="text-[color:var(--primary-700)]">Web</span>
              </span>
              <span className="hidden text-[11px] text-[color:var(--text-muted)] sm:block lg:hidden xl:block">{t.tagline}</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label={t.mainNav} className="hidden items-center gap-0.5 lg:flex">
            {nav.map((n) => {
              const isActive = pathname === n.href || pathname.startsWith(`${n.href}/`)
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors xl:px-3 ${
                    isActive ? 'text-[color:var(--primary-700)]' : 'text-[color:var(--text-secondary)] hover:bg-[color:var(--primary-50)] hover:text-[color:var(--primary-700)]'
                  }`}
                >
                  {n.label}
                  {isActive && <span className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-[color:var(--primary-700)] xl:inset-x-3" />}
                </Link>
              )
            })}
          </nav>

          {/* Right */}
          <div className="hidden shrink-0 items-center gap-2 md:flex xl:gap-3">
            <LangSwitch lang={lang} label={t.language} notAvailable={t.notAvailable} />
            <div className="hidden h-5 w-px bg-[color:var(--border-medium)] xl:block" />
            <div className="hidden items-center gap-2 text-xs text-[color:var(--text-tertiary)] 2xl:flex">
              <ShieldCheck size={15} className="text-[color:var(--success-600)]" />
              <span className="font-medium">{t.guarantee}</span>
            </div>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md xl:px-5">
              <Phone size={16} /> {t.consult}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="rounded-lg p-2 text-[color:var(--text-secondary)] transition-colors hover:bg-[color:var(--neutral-100)] lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`overflow-hidden border-b border-[color:var(--border-light)] bg-[color:var(--background)] shadow-lg transition-[max-height,opacity] duration-300 lg:hidden ${
          menuOpen ? 'max-h-[40rem] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-1 px-4 py-5 sm:px-6">
          <div className="mb-3 flex items-center justify-center gap-2 rounded-xl bg-[color:var(--surface-primary)] py-2.5 text-sm">
            <Sparkles size={16} className="text-[color:var(--accent-500)]" />
            <span className="font-semibold text-[color:var(--text-secondary)]">{t.demosReady}</span>
          </div>
          <nav aria-label={t.mobileNav} className="space-y-1">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-4 py-3 font-medium text-[color:var(--text-secondary)] transition-colors hover:bg-[color:var(--primary-50)] hover:text-[color:var(--primary-700)]">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 md:hidden">
            <LangSwitch lang={lang} label={t.language} notAvailable={t.notAvailable} onPick={() => setMenuOpen(false)} block />
          </div>
          <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="btn-primary mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold shadow-md">
            <Phone size={18} /> {t.consultFree}
          </a>
          <p className="pt-3 text-center text-sm text-[color:var(--text-tertiary)]">
            {t.respond} • <span className="font-medium text-[color:var(--text-primary)]">{waDisplay}</span>
          </p>
        </div>
      </div>
    </header>
  )
}
