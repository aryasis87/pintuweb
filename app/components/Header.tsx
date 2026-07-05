'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Phone, Menu, X, ShieldCheck, Sparkles } from 'lucide-react'

const NAV = [
  { label: 'Layanan', href: '#services', id: 'services' },
  { label: 'Showcase', href: '#portfolio', id: 'portfolio' },
  { label: 'Harga', href: '/paket', id: 'pricing' },
  { label: 'FAQ', href: '#faq', id: 'faq' },
  { label: 'Kontak', href: '#contact', id: 'contact' },
]
const sectionIds = ['hero', 'services', 'portfolio', 'pricing', 'faq', 'contact']

const WA =
  'https://wa.me/6281339908765?text=Halo%20PintuWeb%2C%20saya%20mau%20konsultasi%20pembuatan%20website.'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>('hero')

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
        for (const id of sectionIds) {
          const el = document.getElementById(id)
          if (el) {
            const r = el.getBoundingClientRect()
            if (r.top <= 120 && r.bottom >= 120) { setActive(id); break }
          }
        }
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[color:var(--background)]/85 backdrop-blur-xl border-b border-[color:var(--border-light)] shadow-[0_4px_20px_-12px_rgba(20,19,15,0.25)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Brand */}
          <Link href="/" prefetch={false} className="group flex items-center gap-2.5" aria-label="PintuWeb beranda">
            <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[color:var(--border-light)]">
              <Image src="/images/logo.webp" alt="Logo PintuWeb" width={28} height={28} priority unoptimized className="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-110" />
            </span>
            <span className="leading-tight">
              <span className="block font-[family-name:var(--font-display)] text-lg font-extrabold tracking-tight text-[color:var(--text-primary)]">
                Pintu<span className="text-[color:var(--primary-700)]">Web</span>
              </span>
              <span className="hidden text-[11px] text-[color:var(--text-muted)] sm:block">Pintu menuju web impianmu</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navigasi utama" className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => {
              const isActive = active === n.id
              const cls = `relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-[color:var(--primary-700)]'
                  : 'text-[color:var(--text-secondary)] hover:text-[color:var(--primary-700)] hover:bg-[color:var(--primary-50)]'
              }`
              const dot = isActive ? (
                <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-[color:var(--primary-700)]" />
              ) : null
              return n.href.startsWith('/') ? (
                <Link key={n.label} href={n.href} className={cls}>{n.label}{dot}</Link>
              ) : (
                <a key={n.label} href={n.href} className={cls}>{n.label}{dot}</a>
              )
            })}
          </nav>

          {/* Right */}
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-2 text-xs text-[color:var(--text-tertiary)]">
              <ShieldCheck size={15} className="text-[color:var(--success-600)]" />
              <span className="font-medium">Garansi &amp; Support</span>
            </div>
            <div className="h-5 w-px bg-[color:var(--border-medium)]" />
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <Phone size={16} /> Konsultasi
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="rounded-lg p-2 text-[color:var(--text-secondary)] transition-colors hover:bg-[color:var(--neutral-100)] lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
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
          menuOpen ? 'max-h-[32rem] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-1 px-4 py-5 sm:px-6">
          <div className="mb-3 flex items-center justify-center gap-2 rounded-xl bg-[color:var(--surface-primary)] py-2.5 text-sm">
            <Sparkles size={16} className="text-[color:var(--accent-500)]" />
            <span className="font-semibold text-[color:var(--text-secondary)]">65+ demo siap dilihat langsung</span>
          </div>
          <nav aria-label="Navigasi mobile" className="space-y-1">
            {NAV.map((n) =>
              n.href.startsWith('/') ? (
                <Link key={n.label} href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-4 py-3 font-medium text-[color:var(--text-secondary)] transition-colors hover:bg-[color:var(--primary-50)] hover:text-[color:var(--primary-700)]">{n.label}</Link>
              ) : (
                <a key={n.label} href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-4 py-3 font-medium text-[color:var(--text-secondary)] transition-colors hover:bg-[color:var(--primary-50)] hover:text-[color:var(--primary-700)]">{n.label}</a>
              )
            )}
          </nav>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="btn-primary mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold shadow-md"
          >
            <Phone size={18} /> Konsultasi Gratis
          </a>
          <p className="pt-3 text-center text-sm text-[color:var(--text-tertiary)]">
            Respon cepat • <span className="font-medium text-[color:var(--text-primary)]">+62 813 3990 8765</span>
          </p>
        </div>
      </div>
    </header>
  )
}
