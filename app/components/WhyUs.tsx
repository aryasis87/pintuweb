import { Check, X, Gauge, Search, Palette, Headphones, ShieldCheck, Rocket } from 'lucide-react'

const COMPARE = [
  { label: 'Desain custom sesuai brand (bukan template)', us: true, them: false },
  { label: 'Skor performa Google 90+ & loading cepat', us: true, them: false },
  { label: 'SEO on-page siap ranking sejak awal', us: true, them: false },
  { label: 'Full ownership: source code, domain, hosting', us: true, them: false },
  { label: 'Garansi 30 hari + maintenance sesuai paket', us: true, them: false },
  { label: 'Progres real-time via WhatsApp', us: true, them: false },
]

const REASONS = [
  { icon: Palette, title: 'Desain berkarakter', desc: 'Bukan template daur ulang — tiap website punya identitas sendiri.' },
  { icon: Gauge, title: 'Ngebut & ringan', desc: 'Dibangun dengan Next.js; rata-rata skor performa 95+.' },
  { icon: Search, title: 'Ramah Google', desc: 'Struktur SEO, metadata, dan sitemap rapi sejak hari pertama.' },
  { icon: Headphones, title: 'Support responsif', desc: 'Respon cepat via WhatsApp, bahkan setelah proyek selesai.' },
  { icon: ShieldCheck, title: 'Aman & bergaransi', desc: 'SSL, backup, dan garansi 30 hari untuk ketenangan hatimu.' },
  { icon: Rocket, title: 'Cepat online', desc: 'Landing page 1–2 hari, website bisnis 3–5 hari kerja.' },
]

export default function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-light)] bg-[color:var(--surface-primary)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--primary-700)]">
            Kenapa PintuWeb
          </span>
          <h2 id="why-title" className="mt-5 text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl lg:text-5xl">
            Bukan sekadar jadi — tapi <span className="text-[color:var(--primary-700)]">bekerja untuk bisnismu</span>
          </h2>
        </div>

        {/* Comparison */}
        <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-3xl border border-[color:var(--border-light)] bg-white shadow-sm">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-[color:var(--border-light)] bg-[color:var(--surface-primary)] px-5 py-4 sm:px-8">
            <span className="text-sm font-semibold text-[color:var(--text-tertiary)]">Yang kamu dapatkan</span>
            <span className="w-16 text-center text-sm font-extrabold text-[color:var(--primary-700)]">PintuWeb</span>
            <span className="w-16 text-center text-sm font-medium text-[color:var(--text-muted)]">Umumnya</span>
          </div>
          {COMPARE.map((row, i) => (
            <div key={row.label} className={`grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-5 py-4 sm:px-8 ${i % 2 ? 'bg-[color:var(--surface-primary)]/40' : 'bg-white'}`}>
              <span className="text-sm text-[color:var(--text-secondary)]">{row.label}</span>
              <span className="flex w-16 justify-center">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[color:var(--success-100)]">
                  <Check size={15} className="text-[color:var(--success-700)]" strokeWidth={3} />
                </span>
              </span>
              <span className="flex w-16 justify-center">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[color:var(--neutral-100)]">
                  <X size={15} className="text-[color:var(--text-muted)]" strokeWidth={3} />
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Reasons */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r) => (
            <div key={r.title} className="rounded-2xl border border-[color:var(--border-light)] bg-white p-6 transition-shadow hover:shadow-[var(--card-shadow-hover)]">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[color:var(--primary-50)]">
                <r.icon size={22} className="text-[color:var(--primary-700)]" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-[color:var(--text-primary)]">{r.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--text-tertiary)]">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
