import { MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react'

const WA = 'https://wa.me/6281339908765?text=Halo%20PintuWeb%2C%20saya%20mau%20konsultasi%20gratis%20soal%20website.'

const POINTS = ['Konsultasi gratis, tanpa komitmen', 'Respon cepat via WhatsApp', 'Garansi & harga transparan']

export default function CTABand() {
  return (
    <section aria-labelledby="cta-title" className="bg-white px-4 py-16 sm:px-6 lg:py-20">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[color:var(--border-light)] bg-[color:var(--surface-primary)] px-6 py-14 text-center shadow-sm sm:px-12">
        <div className="pointer-events-none absolute inset-0 u-grid opacity-70" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[color:var(--primary-200)] opacity-50 blur-3xl" aria-hidden="true" />

        {/* Gateway arch mark */}
        <div className="relative mx-auto mb-8 h-16 w-14">
          <div className="pintu-frame h-full w-full bg-white p-1.5 shadow-sm">
            <div className="arch-top h-full w-full bg-gradient-to-b from-[color:var(--primary-600)] to-[color:var(--secondary-800)]" />
          </div>
          <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm bg-[color:var(--accent-300)]" aria-hidden="true" />
        </div>

        <h2 id="cta-title" className="relative text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl lg:text-5xl">
          Ketuk pintunya —<br className="hidden sm:block" /> <span className="text-[color:var(--primary-700)]">website impianmu menunggu.</span>
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-base leading-relaxed text-[color:var(--text-tertiary)] sm:text-lg">
          Ceritakan idemu hari ini. Kami bantu wujudkan jadi website yang cepat, cantik, dan menghasilkan.
        </p>

        <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <MessageCircle size={18} /> Konsultasi Gratis Sekarang
          </a>
          <a href="/paket" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[color:var(--border-medium)] px-8 py-4 text-base font-semibold text-[color:var(--text-secondary)] transition-all hover:border-[color:var(--primary-700)] hover:text-[color:var(--primary-700)]">
            Lihat Paket <ArrowRight size={17} />
          </a>
        </div>

        <ul className="relative mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {POINTS.map((p) => (
            <li key={p} className="inline-flex items-center gap-2 text-sm text-[color:var(--text-tertiary)]">
              <CheckCircle2 size={16} className="text-[color:var(--success-600)]" /> {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
