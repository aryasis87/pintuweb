import Image from 'next/image'
import Link from 'next/link'
import { Mail, PhoneCall, MapPin, Clock, MessageCircle, ArrowUpRight } from 'lucide-react'

const CONTACTS = [
  { icon: PhoneCall, title: 'Telepon / WhatsApp', value: '+62 813 3990 8765', link: 'https://wa.me/6281339908765' },
  { icon: Mail, title: 'Email', value: 'sanzystore@gmail.com', link: 'mailto:sanzystore@gmail.com' },
  { icon: MapPin, title: 'Lokasi', value: 'Trenggalek, Jawa Timur', sub: 'Melayani seluruh Indonesia' },
  { icon: Clock, title: 'Jam Operasional', value: 'Senin – Sabtu', sub: '09.00 – 17.00 WIB' },
]

const LINKS = [
  { label: 'Layanan', href: '#services' },
  { label: 'Showcase', href: '#portfolio' },
  { label: 'Harga & Paket', href: '/paket' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Tentang', href: '/about' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="relative overflow-hidden bg-gradient-neutral px-4 pt-16 text-white sm:px-6 lg:pt-20" aria-label="Kontak dan info PintuWeb">
      <div className="pointer-events-none absolute inset-0 u-grid opacity-[0.06]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* CTA + contact */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                <Image src="/images/logo.webp" alt="Logo PintuWeb" width={26} height={26} unoptimized className="h-6 w-6 object-contain" />
              </span>
              <span className="font-[family-name:var(--font-display)] text-xl font-extrabold">
                Pintu<span className="text-[color:var(--accent-300)]">Web</span>
              </span>
            </div>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
              Siap bikin bisnismu <span className="text-[color:var(--accent-300)]">tampil online?</span>
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              Konsultasi gratis, respon cepat. Ceritakan kebutuhanmu — kami buka pintunya.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/6281339908765?text=Halo%20PintuWeb%2C%20saya%20mau%20konsultasi%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--accent-300)] px-7 py-3.5 font-semibold text-[color:var(--text-primary)] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[color:var(--accent-200)]"
              >
                <MessageCircle size={18} /> Chat WhatsApp
              </a>
              <Link
                href="/paket"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Lihat Paket <ArrowUpRight size={16} />
              </Link>
            </div>

            {/* Quick links */}
            <nav aria-label="Tautan footer" className="mt-9 flex flex-wrap gap-x-6 gap-y-2">
              {LINKS.map((l) =>
                l.href.startsWith('/') ? (
                  <Link key={l.label} href={l.href} className="text-sm text-white/60 transition-colors hover:text-white">{l.label}</Link>
                ) : (
                  <a key={l.label} href={l.href} className="text-sm text-white/60 transition-colors hover:text-white">{l.label}</a>
                )
              )}
            </nav>
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CONTACTS.map((c) => {
              const inner = (
                <div className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color:var(--accent-300)]/20 text-[color:var(--accent-300)]">
                    <c.icon size={19} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{c.title}</p>
                    <p className={`mt-0.5 text-sm ${c.link ? 'break-all text-[color:var(--accent-300)]' : 'text-white/70'}`}>{c.value}</p>
                    {c.sub && <p className="mt-0.5 text-xs text-white/50">{c.sub}</p>}
                  </div>
                </div>
              )
              return c.link ? (
                <a key={c.title} href={c.link} target="_blank" rel="noopener noreferrer" className="block">{inner}</a>
              ) : (
                <div key={c.title}>{inner}</div>
              )
            })}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 sm:flex-row">
          <p className="text-sm text-white/50">© {year} PintuWeb — pintuweb.com. Semua hak dilindungi.</p>
          <p className="text-sm text-white/50">Dibuat dengan ❤️ di Trenggalek untuk seluruh Indonesia.</p>
        </div>
      </div>
    </footer>
  )
}
