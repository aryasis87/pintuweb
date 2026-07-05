import { Store, UtensilsCrossed, Briefcase, Rocket, UserRound, PartyPopper, Stethoscope, Building2 } from 'lucide-react'

const AUDIENCE = [
  { icon: Store, title: 'UMKM & Toko Online', desc: 'Katalog produk, checkout WhatsApp, dan promo yang menjual.' },
  { icon: UtensilsCrossed, title: 'Restoran & Kafe', desc: 'Menu digital, reservasi meja, dan lokasi yang mudah ditemukan.' },
  { icon: Briefcase, title: 'Jasa & Profesional', desc: 'Company profile kredibel yang meyakinkan calon klien.' },
  { icon: Rocket, title: 'Startup', desc: 'Landing page cepat untuk validasi ide dan kumpulkan leads.' },
  { icon: UserRound, title: 'Personal Brand', desc: 'Portfolio & link-in-bio yang bikin kamu tampil menonjol.' },
  { icon: PartyPopper, title: 'Event & Undangan', desc: 'Undangan digital elegan lengkap dengan RSVP dan galeri.' },
  { icon: Stethoscope, title: 'Klinik & Kesehatan', desc: 'Sistem booking praktik dan informasi layanan yang jelas.' },
  { icon: Building2, title: 'Properti & Agen', desc: 'Katalog listing dengan filter dan detail properti menarik.' },
]

export default function AudienceSection() {
  return (
    <section aria-labelledby="audience-title" className="relative overflow-hidden bg-[color:var(--surface-primary)] py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 u-grid opacity-50" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-light)] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--primary-700)]">
            Untuk Siapa
          </span>
          <h2 id="audience-title" className="mt-5 text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl lg:text-5xl">
            Dibuat untuk <span className="text-[color:var(--primary-700)]">bisnismu</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[color:var(--text-tertiary)] sm:text-lg">
            Apapun bidangmu, ada pintu yang pas. Kami sudah membangun untuk berbagai industri.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE.map((a) => (
            <div key={a.title} className="group rounded-2xl border border-[color:var(--border-light)] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--card-shadow-hover)]">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[color:var(--primary-50)] transition-colors group-hover:bg-[color:var(--primary-700)]">
                <a.icon size={22} className="text-[color:var(--primary-700)] transition-colors group-hover:text-white" />
              </span>
              <h3 className="mt-4 text-base font-bold text-[color:var(--text-primary)]">{a.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--text-tertiary)]">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
