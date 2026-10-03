'use client'
// Halaman 404 berbahasa sesuai URL (not-found tidak menerima params, jadi bahasa dibaca dari path).
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, LayoutGrid, MessageCircle } from 'lucide-react'
import { WA_NUMBER } from '../lib/site'

const TEXT = {
  id: { title: 'Halaman tidak ditemukan', h1: 'Pintu ini belum ada.', lead: 'Halaman yang Anda cari tidak ditemukan atau sudah dipindahkan. Coba mulai dari salah satu pintu di bawah.', home: 'Ke beranda', homeHref: '/', demos: 'Lihat demo', demosHref: '/demo', wa: 'Atau tanyakan langsung lewat WhatsApp', waText: 'Halo PintuWeb, saya tidak menemukan halaman yang saya cari di situs.' },
  en: { title: 'Page not found', h1: 'This door does not exist yet.', lead: 'The page you are looking for could not be found or has moved. Try starting from one of the doors below.', home: 'Go to the home page', homeHref: '/en', demos: 'See demos', demosHref: '/en/demos', wa: 'Or ask us directly on WhatsApp', waText: 'Hello PintuWeb, I could not find the page I was looking for on your site.' },
  ms: { title: 'Halaman tidak ditemui', h1: 'Pintu ini belum wujud.', lead: 'Halaman yang anda cari tidak ditemui atau telah dipindahkan. Cuba mulakan dari salah satu pintu di bawah.', home: 'Ke halaman utama', homeHref: '/ms', demos: 'Lihat demo', demosHref: '/ms/demo', wa: 'Atau tanya terus melalui WhatsApp', waText: 'Hai PintuWeb, saya tidak menemui halaman yang saya cari di laman anda.' },
}

export default function NotFound() {
  const first = usePathname()?.split('/')[1]
  const t = TEXT[first === 'en' || first === 'ms' ? first : 'id']
  return (
    <main id="main-content" className="relative flex min-h-[80vh] items-center overflow-hidden pb-20 pt-32">
      <title>{`${t.title} | PintuWeb`}</title>
      <meta name="robots" content="noindex" />
      <div className="pointer-events-none absolute inset-0 u-grid u-grid-fade" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-xl px-4 text-center sm:px-6">
        {/* Pintu yang tertutup */}
        <div className="pintu-frame mx-auto grid h-44 w-36 place-items-end bg-white p-2 shadow-[0_24px_48px_-24px_rgba(20,19,15,0.35)]" aria-hidden="true">
          <div className="arch-top grid h-full w-full place-items-center bg-[color:var(--surface-primary)]">
            <span className="text-4xl font-extrabold text-[color:var(--primary-700)]" style={{ fontFamily: 'var(--font-display)' }}>404</span>
          </div>
        </div>
        <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">{t.h1}</h1>
        <p className="mt-4 text-lg text-[color:var(--text-tertiary)]">{t.lead}</p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link href={t.homeHref} className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-md">
            {t.home} <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href={t.demosHref} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--border-medium)] bg-white px-6 py-3.5 text-sm font-semibold text-[color:var(--text-secondary)] transition hover:border-[color:var(--primary-700)] hover:text-[color:var(--primary-700)]">
            <LayoutGrid size={16} aria-hidden="true" /> {t.demos}
          </Link>
        </div>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.waText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--primary-700)] underline-offset-4 hover:underline"
        >
          <MessageCircle size={16} aria-hidden="true" /> {t.wa}
        </a>
      </div>
    </main>
  )
}
