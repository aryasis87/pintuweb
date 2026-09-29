import { Store, UtensilsCrossed, Briefcase, Rocket, UserRound, PartyPopper, Stethoscope, Building2, ArrowUpRight } from 'lucide-react'
import { DEMOS } from '../lib/demos'
import SectionHead from './SectionHead'

// Tiap bidang langsung ditautkan ke satu demo live yang relevan — bukti, bukan sekadar daftar.
const AUDIENCE = [
  { icon: Store, title: 'UMKM & Toko Online', desc: 'Katalog produk, pesan lewat WhatsApp, dan promo yang menjual.', demo: 'jajan' },
  { icon: UtensilsCrossed, title: 'Restoran & Kafe', desc: 'Menu digital, reservasi meja, dan lokasi yang mudah ditemukan.', demo: 'restoran' },
  { icon: Briefcase, title: 'Jasa & Profesional', desc: 'Company profile kredibel yang meyakinkan calon klien.', demo: 'tastycorner' },
  { icon: Rocket, title: 'Startup', desc: 'Landing page cepat untuk validasi ide dan kumpulkan leads.', demo: 'nimbus' },
  { icon: UserRound, title: 'Personal Brand', desc: 'Portfolio & link-in-bio yang bikin kamu tampil menonjol.', demo: 'celeste' },
  { icon: PartyPopper, title: 'Event & Undangan', desc: 'Undangan digital elegan lengkap dengan RSVP dan galeri.', demo: 'wedding' },
  { icon: Stethoscope, title: 'Klinik & Kesehatan', desc: 'Janji temu online dan informasi layanan yang jelas.', demo: 'klinik' },
  { icon: Building2, title: 'Properti & Agen', desc: 'Katalog listing dengan filter dan detail properti menarik.', demo: 'lumora' },
].map((a) => ({ ...a, demo: DEMOS.find((d) => d.slug === a.demo)! }))

export default function AudienceSection() {
  return (
    <section id="untuk-siapa" aria-labelledby="audience-title" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          no="02"
          eyebrow="Untuk siapa"
          id="audience-title"
          title={<>Apa pun bidangmu, <span className="text-[color:var(--primary-700)]">ada pintu yang pas.</span></>}
          lead="Dari warung sampai klinik — tiap bidang di bawah punya contoh yang sudah online. Klik untuk melihatnya sendiri."
        />

        <ul className="mt-12 grid grid-cols-1 border-t border-[color:var(--border-medium)] md:grid-cols-2 md:gap-x-12">
          {AUDIENCE.map((a) => (
            <li key={a.title} className="flex items-start gap-4 border-b border-[color:var(--border-light)] py-5 sm:py-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--surface-primary)] ring-1 ring-[color:var(--border-light)]">
                <a.icon size={20} className="text-[color:var(--primary-700)]" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-[color:var(--text-primary)]">{a.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[color:var(--text-tertiary)]">{a.desc}</p>
                <a
                  href={a.demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--primary-700)] underline-offset-4 hover:underline"
                >
                  Contoh: {a.demo.name} <ArrowUpRight size={14} aria-hidden="true" />
                  <span className="sr-only">(tab baru)</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
