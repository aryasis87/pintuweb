import type { Metadata } from 'next'
import Link from 'next/link'
import { Rocket, Building2, ShoppingBag, UserRound, Code2, Search, LifeBuoy, ArrowRight, MessageCircle } from 'lucide-react'
import PageHero from '../components/PageHero'
import { PACKAGES, formatRupiah } from '../lib/packages'
import { GUARANTEE_DAYS, PERF_TARGET, SITE, wa } from '../lib/site'

export const metadata: Metadata = {
  title: 'Layanan',
  description:
    'Landing page, company profile, toko online, portofolio, dan website custom dari PintuWeb, lengkap dengan harga mulai, perkiraan waktu, dan contoh demo.',
  alternates: { canonical: `${SITE}/services` },
  openGraph: {
    title: 'Layanan — PintuWeb',
    description: 'Dari landing page sampai toko online dan website custom, lengkap dengan harga mulai dan demo yang bisa dicoba.',
    url: `${SITE}/services`,
    siteName: 'PintuWeb',
    images: [{ url: '/images/og-pintuweb.png', width: 1200, height: 630, alt: 'Layanan PintuWeb' }],
    type: 'website',
    locale: 'id_ID',
  },
}

const from = (slug: string) => {
  const p = PACKAGES.find((x) => x.slug === slug)
  return p ? { price: formatRupiah(p.minPrice), duration: p.duration } : null
}

type Service = {
  icon: typeof Rocket
  title: string
  body: string
  pkg?: string
  demo?: { href: string; label: string }
}

const SERVICES: Service[] = [
  { icon: Rocket, title: 'Landing Page', body: 'Satu halaman yang fokus konversi untuk promosi produk, event, atau kampanye iklan.', pkg: 'landing-page', demo: { href: '/demo#landing', label: 'Contoh landing page' } },
  { icon: Building2, title: 'Company Profile & Website UMKM', body: 'Website 3–5 halaman yang memperkenalkan usaha Anda: profil, layanan, blog, dan kontak.', pkg: 'standar-umkm' },
  { icon: ShoppingBag, title: 'Toko Online', body: 'Katalog produk dengan order via WhatsApp, sampai toko lengkap dengan keranjang, payment gateway, dan ongkir otomatis.', pkg: 'toko-online-simple' },
  { icon: UserRound, title: 'Portofolio & Personal Branding', body: 'Etalase karya untuk freelancer, kreator, dan profesional, termasuk halaman link in bio.', pkg: 'portofolio', demo: { href: '/demo#portfolio', label: 'Contoh portofolio' } },
  { icon: Code2, title: 'Website Custom', body: 'Undangan digital, sistem reservasi, aplikasi web, atau fitur khusus lain sesuai kebutuhan bisnis.', pkg: 'website-custom', demo: { href: '/demo#reservasi', label: 'Contoh reservasi online' } },
]

const INCLUDED = [
  { icon: Search, title: 'SEO sejak awal', body: `Meta tag, sitemap, structured data, dan target skor PageSpeed ${PERF_TARGET} sudah termasuk di setiap paket.` },
  { icon: LifeBuoy, title: 'Garansi & maintenance', body: `Perbaikan bug gratis ${GUARANTEE_DAYS} hari setelah online, lalu maintenance 1–6 bulan sesuai paket.` },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Jasa Pembuatan Website',
  provider: { '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'PintuWeb', url: SITE },
  areaServed: { '@type': 'Country', name: 'Indonesia' },
  url: `${SITE}/services`,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Layanan PintuWeb',
    itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.body } })),
  },
}

export default function ServicesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Layanan"
        title={<>Website yang <span className="text-[color:var(--primary-700)]">cepat, kredibel, dan menarik</span> untuk usahamu.</>}
        lead="Pilih jenis website yang Anda butuhkan. Setiap layanan dilengkapi harga mulai, perkiraan waktu, dan contoh yang bisa dicoba."
      />

      <section aria-label="Daftar layanan" className="pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const info = s.pkg ? from(s.pkg) : null
            return (
              <article key={s.title} className="flex flex-col rounded-3xl border border-[color:var(--border-light)] bg-white p-6 shadow-sm sm:p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--primary-100)]">
                  <s.icon size={22} className="text-[color:var(--primary-700)]" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-[color:var(--text-primary)]">{s.title}</h2>
                <p className="mt-2 flex-1 leading-relaxed text-[color:var(--text-tertiary)]">{s.body}</p>
                {info && (
                  <p className="mt-5 text-sm text-[color:var(--text-secondary)]">
                    Mulai <strong className="text-[color:var(--text-primary)]">{info.price}</strong> · {info.duration}
                  </p>
                )}
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                  <Link href="/paket" className="inline-flex items-center gap-1.5 text-[color:var(--primary-700)] underline-offset-4 hover:underline">
                    Lihat paket <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                  {s.demo && (
                    <Link href={s.demo.href} className="inline-flex items-center gap-1.5 text-[color:var(--text-secondary)] underline-offset-4 hover:text-[color:var(--primary-700)] hover:underline">
                      {s.demo.label}
                    </Link>
                  )}
                </div>
              </article>
            )
          })}

          {/* Selalu termasuk */}
          <article className="flex flex-col rounded-3xl bg-[color:var(--text-primary)] p-6 text-white sm:p-7">
            <h2 className="text-xl font-bold">Selalu termasuk</h2>
            <ul className="mt-4 space-y-4">
              {INCLUDED.map((i) => (
                <li key={i.title} className="flex gap-3">
                  <i.icon size={20} className="mt-0.5 shrink-0 text-[color:var(--accent-200)]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">{i.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[color:var(--text-on-dark)]">{i.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-brand px-6 py-14 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute inset-0 u-grid opacity-[0.08]" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Belum yakin butuh yang mana?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">Ceritakan usaha Anda, kami bantu pilihkan layanan yang paling pas. Gratis.</p>
            <a
              href={wa('Halo PintuWeb, saya ingin konsultasi layanan website yang cocok untuk usaha saya.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-[color:var(--primary-800)] shadow-lg transition hover:-translate-y-0.5"
            >
              <MessageCircle size={18} aria-hidden="true" /> Konsultasi gratis
            </a>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  )
}
