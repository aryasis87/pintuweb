import type { Metadata } from 'next'
import Link from 'next/link'
import { Rocket, Target, Compass, Users, Sparkles, ShieldCheck, Gauge, Timer, Wallet, LifeBuoy, MessageCircle, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import { DEMOS } from '../lib/demos'
import { PACKAGES } from '../lib/packages'
import { CATEGORY_COUNT, CLIENT_PROJECTS, FOUNDED_YEAR, GUARANTEE_DAYS, LOCATION, PERF_TARGET, RESPONSE, SITE, wa } from '../lib/site'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: `Jasa pembuatan website dari ${LOCATION}, berdiri sejak ${FOUNDED_YEAR} dengan ${CLIENT_PROJECTS} proyek klien untuk UMKM, startup, dan personal brand.`,
  alternates: { canonical: `${SITE}/about` },
  openGraph: {
    title: 'Tentang PintuWeb',
    description: `Berdiri sejak ${FOUNDED_YEAR}, ${CLIENT_PROJECTS} proyek klien, dan ${DEMOS.length} demo live yang bisa Anda coba.`,
    url: `${SITE}/about`,
    siteName: 'PintuWeb',
    images: [{ url: '/images/og-pintuweb.png', width: 1200, height: 630, alt: 'Tentang PintuWeb' }],
    type: 'website',
    locale: 'id_ID',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${SITE}/about`,
  mainEntity: {
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'PintuWeb',
    url: SITE,
    logo: `${SITE}/images/logo.webp`,
    foundingDate: `${FOUNDED_YEAR}`,
    founder: { '@type': 'Person', name: 'Sanzy', url: `${SITE}/owner` },
    address: { '@type': 'PostalAddress', addressLocality: 'Trenggalek', addressRegion: 'Jawa Timur', addressCountry: 'ID' },
  },
}

const landing = PACKAGES.find((p) => p.slug === 'landing-page')?.duration
const bisnis = PACKAGES.find((p) => p.slug === 'standar-umkm')?.duration

const STATS = [
  { v: CLIENT_PROJECTS, l: 'Proyek klien selesai' },
  { v: `${DEMOS.length}`, l: 'Demo live' },
  { v: `${FOUNDED_YEAR}`, l: 'Berdiri sejak' },
  { v: `${CATEGORY_COUNT}`, l: 'Kategori website' },
]

const TIMELINE = [
  { year: `${FOUNDED_YEAR}`, title: 'PintuWeb berdiri', body: `Berangkat dari ${LOCATION}, mulai membantu UMKM setempat yang belum punya website.` },
  { year: '2022', title: 'Fokus pada kecepatan & SEO', body: 'Menerapkan praktik terbaik performa, pengujian Lighthouse, dan struktur konten SEO di setiap proyek.' },
  { year: 'Kini', title: `${CLIENT_PROJECTS} proyek klien`, body: `Melayani klien dari berbagai daerah, dengan ${DEMOS.length} demo live di ${CATEGORY_COUNT} kategori sebagai bukti karya.` },
]

const BELIEFS = [
  { icon: Rocket, title: 'Visi', body: 'Menjadi mitra digital yang memberdayakan UMKM dan startup di seluruh Indonesia lewat kehadiran online yang profesional.' },
  { icon: Target, title: 'Misi', body: 'Membangun website berkualitas dengan harga terjangkau, disertai dukungan setelah website online.' },
  { icon: Compass, title: 'Fokus', body: 'Kecepatan loading, keamanan, SEO, dan pengalaman pengguna yang mendorong pertumbuhan bisnis.' },
]

const VALUES = [
  { icon: Users, title: 'Kolaboratif', body: 'Kami mendengarkan kebutuhan Anda dan terbuka pada masukan di setiap tahap.' },
  { icon: Sparkles, title: 'Berkarakter', body: 'Setiap website punya identitasnya sendiri, bukan template daur ulang.' },
  { icon: ShieldCheck, title: 'Jujur', body: 'Harga transparan, janji yang realistis, dan tenggat yang kami jaga.' },
]

const WHY = [
  { icon: Gauge, title: 'Cepat & ramah Google', body: `Target skor PageSpeed ${PERF_TARGET}, mobile-first, dan SEO sejak awal.` },
  { icon: Timer, title: 'Pengerjaan terukur', body: `Landing page ${landing}, website bisnis ${bisnis}.` },
  { icon: Wallet, title: 'Harga transparan', body: 'DP 50%, pelunasan setelah Anda setuju, dan biaya perpanjangan disebut sejak awal.' },
  { icon: LifeBuoy, title: 'Didampingi setelah online', body: `Garansi ${GUARANTEE_DAYS} hari, maintenance sesuai paket. ${RESPONSE}.` },
]

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Tentang Kami"
        title={<>Membuka pintu digital untuk <span className="text-[color:var(--primary-700)]">usaha lokal sejak {FOUNDED_YEAR}.</span></>}
        lead="PintuWeb membantu UMKM, startup, dan personal brand punya website yang profesional, cepat, dan mudah ditemukan."
      >
        <dl className="mx-auto grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-[color:var(--text-tertiary)]">{s.l}</dt>
              <dd className="text-3xl font-extrabold text-[color:var(--primary-700)]" style={{ fontFamily: 'var(--font-display)' }}>{s.v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Cerita */}
      <section aria-labelledby="story-title" className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 id="story-title" className="text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">Cerita kami</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-[color:var(--text-tertiary)]">
              <p>PintuWeb dimulai dari kepedulian pada UMKM yang produknya bagus tapi belum terlihat di internet, hanya karena belum punya website yang layak.</p>
              <p>Berangkat dari {LOCATION} pada {FOUNDED_YEAR}, kami membangun website berkualitas dengan harga yang masuk akal. Setiap website adalah investasi untuk masa depan digital klien kami.</p>
              <p>Sampai hari ini kami sudah menyelesaikan {CLIENT_PROJECTS} proyek klien, dan membuka {DEMOS.length} demo live yang bisa Anda coba sendiri sebelum memutuskan.</p>
            </div>
          </div>
          <ol className="relative space-y-6 border-l-2 border-[color:var(--border-light)] pl-8">
            {TIMELINE.map((t) => (
              <li key={t.year} className="relative">
                <span className="absolute -left-[2.6rem] top-1 grid h-8 w-8 place-items-center rounded-full bg-[color:var(--primary-700)] text-[10px] font-bold text-white">{t.year === 'Kini' ? '•' : t.year.slice(2)}</span>
                <div className="rounded-2xl border border-[color:var(--border-light)] bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-[color:var(--primary-700)]">{t.year}</p>
                  <h3 className="mt-1 text-lg font-bold text-[color:var(--text-primary)]">{t.title}</h3>
                  <p className="mt-1 text-[color:var(--text-tertiary)]">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Visi, misi, fokus + nilai */}
      <section aria-labelledby="belief-title" className="relative overflow-hidden py-16 sm:py-20" style={{ backgroundColor: 'var(--surface-primary)' }}>
        <div className="pointer-events-none absolute inset-0 u-grid opacity-60" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="belief-title" className="text-center text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">
            Yang kami <span className="text-[color:var(--primary-700)]">pegang</span>
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {BELIEFS.map((b) => (
              <div key={b.title} className="rounded-2xl border border-[color:var(--border-light)] bg-white p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--primary-100)]"><b.icon size={20} className="text-[color:var(--primary-700)]" aria-hidden="true" /></span>
                <h3 className="mt-4 text-lg font-bold text-[color:var(--text-primary)]">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-[color:var(--text-tertiary)]">{b.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="flex gap-4 rounded-2xl border border-[color:var(--border-light)] bg-white/70 p-6">
                <v.icon size={22} className="mt-0.5 shrink-0 text-[color:var(--accent-600)]" aria-hidden="true" />
                <div>
                  <h3 className="font-bold text-[color:var(--text-primary)]">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[color:var(--text-tertiary)]">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mengapa */}
      <section aria-labelledby="why-title" className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 id="why-title" className="text-center text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">Mengapa memilih PintuWeb?</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {WHY.map((w) => (
              <div key={w.title} className="flex gap-4 rounded-2xl border border-[color:var(--border-light)] bg-white p-6 shadow-sm">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--success-100)]"><w.icon size={20} className="text-[color:var(--success-700)]" aria-hidden="true" /></span>
                <div>
                  <h3 className="font-bold text-[color:var(--text-primary)]">{w.title}</h3>
                  <p className="mt-1 text-[color:var(--text-tertiary)]">{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ajakan */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-brand px-6 py-14 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute inset-0 u-grid opacity-[0.08]" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Siap membangun website profesional?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">Ceritakan usaha Anda. Konsultasi gratis, tanpa komitmen.</p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a
                href={wa('Halo PintuWeb, saya ingin konsultasi pembuatan website setelah membaca halaman Tentang Kami.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-[color:var(--primary-800)] shadow-lg transition hover:-translate-y-0.5"
              >
                <MessageCircle size={18} aria-hidden="true" /> Konsultasi gratis
              </a>
              <Link href="/demo" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 px-7 py-4 font-semibold text-white transition hover:bg-white/10">
                Lihat {DEMOS.length} demo <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  )
}
