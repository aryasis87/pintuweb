import type { Metadata } from 'next'
import Link from 'next/link'
import { Github, MessageCircle, ArrowRight } from 'lucide-react'
import { DEMOS } from '../lib/demos'
import { CLIENT_PROJECTS, FOUNDED_YEAR, SITE, wa } from '../lib/site'

export const metadata: Metadata = {
  title: 'Profil Founder',
  description: `Kenalan dengan Sanzy, founder dan developer di balik PintuWeb sejak ${FOUNDED_YEAR}, yang sudah menyelesaikan ${CLIENT_PROJECTS} proyek website untuk UMKM dan startup.`,
  alternates: { canonical: `${SITE}/owner` },
  openGraph: {
    title: 'Profil Founder — PintuWeb',
    description: 'Sanzy, founder & developer PintuWeb: website cepat, rapi, dan SEO-ready untuk bisnis lokal.',
    url: `${SITE}/owner`,
    siteName: 'PintuWeb',
    images: [{ url: '/images/og-pintuweb.png', width: 1200, height: 630, alt: 'Profil founder PintuWeb' }],
    type: 'profile',
    locale: 'id_ID',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: `${SITE}/owner`,
  mainEntity: {
    '@type': 'Person',
    name: 'Sanzy',
    jobTitle: 'Founder & Developer',
    worksFor: { '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'PintuWeb', url: SITE },
    sameAs: ['https://github.com/aryasis87'],
  },
}

const TIMELINE = [
  { year: `${FOUNDED_YEAR}`, title: 'Mendirikan PintuWeb', body: 'Belajar frontend & backend secara otodidak dan mulai mengerjakan website untuk UMKM.' },
  { year: '2022', title: 'Fokus pada UX & SEO', body: 'Menerapkan praktik terbaik performa, pengujian Lighthouse, dan struktur konten SEO.' },
  { year: 'Kini', title: `${CLIENT_PROJECTS} proyek klien`, body: `Melayani UMKM, startup, dan personal brand, serta merawat ${DEMOS.length} demo live.` },
]

const SKILLS = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Supabase', 'Headless CMS', 'SEO teknis', 'Audit performa', 'UI/UX']

export default function OwnerPage() {
  return (
    <main id="main-content">
      {/* Perkenalan */}
      <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 u-grid u-grid-fade" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full border border-[color:var(--border-light)] bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--primary-700)]">Founder</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-[color:var(--text-primary)] sm:text-5xl">
              Halo, saya <span className="text-[color:var(--primary-700)]">Sanzy.</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[color:var(--text-tertiary)]">
              Founder & developer di balik PintuWeb. Sejak {FOUNDED_YEAR} saya membangun website yang cepat, rapi, dan mudah ditemukan untuk UMKM dan startup di Indonesia.
            </p>
            <a
              href="https://github.com/aryasis87"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-[color:var(--primary-700)] underline-offset-4 hover:underline"
            >
              <Github size={20} aria-hidden="true" /> Lihat karya saya di GitHub
            </a>
          </div>
          <div className="flex justify-center">
            <div className="pintu-frame w-full max-w-[300px] bg-white p-2 shadow-[0_30px_60px_-24px_rgba(20,19,15,0.35)]">
              <div
                role="img"
                aria-label="Monogram Sanzy, founder PintuWeb"
                className="arch-top grid aspect-[4/5] w-full place-items-center bg-gradient-brand"
              >
                <span className="select-none text-[120px] font-extrabold leading-none text-white/95" style={{ fontFamily: 'var(--font-display)' }}>S</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perjalanan */}
      <section aria-labelledby="journey-title" className="relative overflow-hidden py-16 sm:py-20" style={{ backgroundColor: 'var(--surface-primary)' }}>
        <div className="pointer-events-none absolute inset-0 u-grid opacity-60" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <h2 id="journey-title" className="text-center text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">Perjalanan</h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {TIMELINE.map((t) => (
              <li key={t.year} className="rounded-2xl border border-[color:var(--border-light)] bg-white p-6">
                <p className="text-sm font-bold text-[color:var(--primary-700)]">{t.year}</p>
                <h3 className="mt-1 text-lg font-bold text-[color:var(--text-primary)]">{t.title}</h3>
                <p className="mt-2 text-[color:var(--text-tertiary)]">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Keahlian + prinsip */}
      <section aria-labelledby="skills-title" className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 id="skills-title" className="text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">Keahlian utama</h2>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {SKILLS.map((s) => (
              <li key={s} className="rounded-full border border-[color:var(--border-light)] bg-white px-4 py-2 text-sm text-[color:var(--text-secondary)] shadow-sm">{s}</li>
            ))}
          </ul>
          <figure className="mx-auto mt-14 max-w-2xl">
            <blockquote className="text-2xl leading-snug text-[color:var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              “Website bukan hanya soal desain. Ia adalah citra, kepercayaan, dan strategi bisnis.”
            </blockquote>
            <figcaption className="mt-4 text-[color:var(--text-tertiary)]">Sanzy, Founder PintuWeb</figcaption>
          </figure>
        </div>
      </section>

      {/* Ajakan */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-brand px-6 py-14 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute inset-0 u-grid opacity-[0.08]" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Tertarik bekerja sama?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">Saya terbuka untuk proyek baru, konsultasi, maupun kerja sama jangka panjang.</p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a
                href={wa('Halo Sanzy, saya ingin berdiskusi soal proyek website.')}
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
