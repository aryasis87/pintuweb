import { MessagesSquare, PenTool, Code2, Rocket } from 'lucide-react'

const STEPS = [
  { n: '01', icon: MessagesSquare, title: 'Konsultasi Gratis', desc: 'Ceritakan bisnis & kebutuhanmu via WhatsApp. Kami bantu petakan halaman, fitur, dan gaya yang pas.' },
  { n: '02', icon: PenTool, title: 'Desain & Proposal', desc: 'Kami susun konsep desain + rincian paket. Kamu setujui arah visual sebelum kami mulai membangun.' },
  { n: '03', icon: Code2, title: 'Pengembangan', desc: 'Website dibangun rapi (Next.js + Tailwind), responsif, cepat, dan SEO-ready. Progres via WhatsApp real-time.' },
  { n: '04', icon: Rocket, title: 'Launch & Support', desc: 'Website online, kamu dapat full ownership + training. Garansi & maintenance tetap kami dampingi.' },
]

export default function Process() {
  return (
    <section aria-labelledby="process-title" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 u-grid u-grid-fade opacity-70" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-light)] bg-[color:var(--surface-primary)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--primary-700)]">
            Cara Kerja
          </span>
          <h2 id="process-title" className="mt-5 text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl lg:text-5xl">
            Dari obrolan ke website — <span className="text-[color:var(--primary-700)]">4 langkah</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[color:var(--text-tertiary)] sm:text-lg">
            Proses yang transparan dan cepat. Kamu tahu persis apa yang terjadi di setiap tahap.
          </p>
        </div>

        <ol className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* connecting line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-[color:var(--border-medium)] to-transparent lg:block" aria-hidden="true" />
          {STEPS.map((s) => (
            <li key={s.n} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-[color:var(--border-light)] bg-white shadow-sm">
                <s.icon size={24} className="text-[color:var(--primary-700)]" />
                <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-[color:var(--primary-700)] text-[10px] font-bold text-white">{s.n}</span>
              </span>
              <h3 className="mt-5 text-lg font-bold text-[color:var(--text-primary)]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-tertiary)]">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
