'use client'
// Halaman 404 berbahasa sesuai URL (not-found tidak menerima params, jadi bahasa dibaca dari path).
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
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
    <main id="main-content" className="pb-24 pt-32 sm:pt-40">
      <title>{`${t.title} | PintuWeb`}</title>
      <meta name="robots" content="noindex" />
      <div className="mx-auto grid grid-cols-1 max-w-6xl items-end gap-x-10 gap-y-12 px-4 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="kicker text-[color:var(--primary-700)]">404 · {t.title}</p>
          <h1 className="mt-5 text-[2.6rem] leading-[1.05] text-[color:var(--text-primary)] sm:text-[3.75rem]">{t.h1}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--text-tertiary)]">{t.lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={t.homeHref} className="btn btn-solid">
              {t.home} <ArrowRight size={17} className="arw" aria-hidden="true" />
            </Link>
            <Link href={t.demosHref} className="btn btn-line">
              {t.demos} <ArrowRight size={17} className="arw" aria-hidden="true" />
            </Link>
          </div>
          <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.waText)}`} target="_blank" rel="noopener noreferrer" className="link mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold">
            {t.wa} <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        {/* Pintu yang masih tertutup */}
        <div className="md:col-span-4" aria-hidden="true">
          <div className="pintu-frame mx-auto w-44 bg-white p-[3px] md:ml-auto md:mr-0">
            <div className="arch-top grid aspect-[5/7] place-items-center bg-[color:var(--surface-primary)]">
              <span className="display text-5xl text-[color:var(--primary-700)]">404</span>
            </div>
          </div>
          <div className="mx-auto h-[3px] w-44 bg-[color:var(--rule)] md:ml-auto md:mr-0" />
        </div>
      </div>
    </main>
  )
}
