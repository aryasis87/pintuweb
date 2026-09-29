import { MessagesSquare, PenTool, Code2, Rocket } from 'lucide-react'
import SectionHead from './SectionHead'

const STEPS = [
  { n: '01', icon: MessagesSquare, title: 'Konsultasi Gratis', desc: 'Ceritakan bisnis & kebutuhanmu via WhatsApp. Kami bantu petakan halaman, fitur, dan gaya yang pas.' },
  { n: '02', icon: PenTool, title: 'Desain & Proposal', desc: 'Kami susun konsep desain + rincian paket. Kamu setujui arah visual sebelum kami mulai membangun.' },
  { n: '03', icon: Code2, title: 'Pengembangan', desc: 'Website dibangun rapi, responsif, cepat, dan SEO-ready. Progresnya kami laporkan lewat WhatsApp.' },
  { n: '04', icon: Rocket, title: 'Launch & Support', desc: 'Website online dan sepenuhnya milikmu. Garansi & maintenance sesuai paket tetap kami dampingi.' },
]

export default function Process() {
  return (
    <section aria-labelledby="process-title" className="relative overflow-hidden bg-[color:var(--neutral-900)] py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 u-grid-light" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[color:var(--primary-700)] opacity-25 blur-3xl" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          no="03"
          eyebrow="Cara kerja"
          tone="dark"
          id="process-title"
          title={<>Dari obrolan ke website, <span className="text-[color:var(--accent-300)]">empat langkah.</span></>}
          lead="Proses yang transparan: kamu tahu persis apa yang terjadi di setiap tahap, dan tidak ada yang dibangun sebelum kamu setuju."
        />

        {/* Garis rambut antar-langkah dari celah 1px di atas latar terang tipis */}
        <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="bg-[color:var(--neutral-900)] p-5 sm:p-7">
              <div className="flex items-start justify-between">
                <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-none text-[color:var(--accent-300)] sm:text-5xl" aria-hidden="true">
                  {s.n}
                </span>
                <s.icon size={22} className="text-white/60" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white sm:mt-6">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
