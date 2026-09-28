import type { Metadata } from 'next'
import Link from 'next/link'
import { Wallet, CalendarClock, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react'
import PageHero from '../components/PageHero'
import PackageCard from '../components/PackageCard'
import { PACKAGES, PAYMENT_SUMMARY, RENEWAL_SUMMARY, formatRupiah } from '../lib/packages'
import { GUARANTEE_DAYS, SITE, wa } from '../lib/site'

const MIN_PRICE = Math.min(...PACKAGES.map((p) => p.minPrice))

export const metadata: Metadata = {
  title: 'Paket & Harga Jasa Pembuatan Website',
  description: `Enam paket website PintuWeb mulai ${formatRupiah(MIN_PRICE)}: landing page, website UMKM, toko online, portofolio, hingga website custom. DP 50%, garansi ${GUARANTEE_DAYS} hari.`,
  alternates: { canonical: `${SITE}/paket` },
  openGraph: {
    title: 'Paket & Harga — PintuWeb',
    description: `Pilih paket website mulai ${formatRupiah(MIN_PRICE)}. Harga transparan, DP 50%, pelunasan setelah website Anda setujui.`,
    url: `${SITE}/paket`,
    siteName: 'PintuWeb',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/images/og-pintuweb.png', width: 1200, height: 630, alt: 'Paket jasa pembuatan website PintuWeb' }],
  },
}

const INFO = [
  { icon: Wallet, title: 'Pembayaran', body: PAYMENT_SUMMARY },
  { icon: CalendarClock, title: 'Setelah tahun pertama', body: RENEWAL_SUMMARY },
  {
    icon: ShieldCheck,
    title: 'Garansi & maintenance',
    body: `Bug dan masalah teknis diperbaiki gratis selama ${GUARANTEE_DAYS} hari setelah website online. Setelah itu maintenance mengikuti paket (1–6 bulan) dan bisa diperpanjang.`,
  },
]

export default function PaketPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Harga Transparan"
        title={<>Pilih paket yang <span className="text-[color:var(--primary-700)]">tepat untuk usahamu.</span></>}
        lead={`Mulai ${formatRupiah(MIN_PRICE)}. Harga tertera sudah termasuk desain, development, dan SEO dasar. Bayar DP 50%, pelunasan setelah website Anda setujui.`}
      />

      <section aria-label="Daftar paket" className="relative pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-6xl gap-x-6 gap-y-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {PACKAGES.map((p) => (
            <PackageCard key={p.slug} p={p} as="h2" />
          ))}
        </div>
      </section>

      <section aria-labelledby="info-title" className="relative overflow-hidden py-16 sm:py-20" style={{ backgroundColor: 'var(--surface-primary)' }}>
        <div className="pointer-events-none absolute inset-0 u-grid opacity-60" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="info-title" className="text-center text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">
            Yang perlu Anda tahu <span className="text-[color:var(--primary-700)]">sebelum memesan</span>
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {INFO.map((i) => (
              <div key={i.title} className="rounded-2xl border border-[color:var(--border-light)] bg-white p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--primary-100)]">
                  <i.icon size={20} className="text-[color:var(--primary-700)]" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold text-[color:var(--text-primary)]">{i.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-tertiary)]">{i.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href={wa('Halo PintuWeb, saya ingin konsultasi paket website yang cocok untuk usaha saya.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-md"
            >
              <MessageCircle size={17} aria-hidden="true" /> Bingung pilih? Konsultasi gratis
            </a>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--border-medium)] bg-white px-6 py-3.5 text-sm font-semibold text-[color:var(--text-secondary)] transition hover:border-[color:var(--primary-700)] hover:text-[color:var(--primary-700)]"
            >
              Baca FAQ lengkap <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
