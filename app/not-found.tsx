import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, LayoutGrid, MessageCircle } from 'lucide-react'
import { wa } from './lib/site'

export const metadata: Metadata = {
  title: 'Halaman tidak ditemukan',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main id="main-content" className="relative flex min-h-[80vh] items-center overflow-hidden pb-20 pt-32">
      <div className="pointer-events-none absolute inset-0 u-grid u-grid-fade" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-xl px-4 text-center sm:px-6">
        {/* Pintu yang tertutup */}
        <div className="pintu-frame mx-auto grid h-44 w-36 place-items-end bg-white p-2 shadow-[0_24px_48px_-24px_rgba(20,19,15,0.35)]" aria-hidden="true">
          <div className="arch-top grid h-full w-full place-items-center bg-[color:var(--surface-primary)]">
            <span className="text-4xl font-extrabold text-[color:var(--primary-700)]" style={{ fontFamily: 'var(--font-display)' }}>404</span>
          </div>
        </div>
        <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">Pintu ini belum ada.</h1>
        <p className="mt-4 text-lg text-[color:var(--text-tertiary)]">
          Halaman yang Anda cari tidak ditemukan atau sudah dipindahkan. Coba mulai dari salah satu pintu di bawah.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-md">
            Ke beranda <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/demo" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--border-medium)] bg-white px-6 py-3.5 text-sm font-semibold text-[color:var(--text-secondary)] transition hover:border-[color:var(--primary-700)] hover:text-[color:var(--primary-700)]">
            <LayoutGrid size={16} aria-hidden="true" /> Lihat demo
          </Link>
        </div>
        <a
          href={wa('Halo PintuWeb, saya tidak menemukan halaman yang saya cari di situs.')}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--primary-700)] underline-offset-4 hover:underline"
        >
          <MessageCircle size={16} aria-hidden="true" /> Atau tanyakan langsung lewat WhatsApp
        </a>
      </div>
    </main>
  )
}
