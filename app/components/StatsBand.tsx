import { DEMOS } from '../lib/demos'
import { CATEGORY_COUNT, CLIENT_PROJECTS, FOUNDED_YEAR } from '../lib/site'

// Fakta yang bisa dibuktikan; semua dari lib/site.ts & lib/demos.ts.
const STATS = [
  { v: CLIENT_PROJECTS, l: 'Proyek klien selesai' },
  { v: `${DEMOS.length}`, l: 'Demo live yang bisa dicoba' },
  { v: `${CATEGORY_COUNT}`, l: 'Kategori website' },
  { v: `${FOUNDED_YEAR}`, l: 'Berdiri sejak' },
]

export default function StatsBand() {
  return (
    <section aria-label="Pencapaian PintuWeb" className="relative overflow-hidden bg-gradient-brand py-14 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0 u-grid opacity-[0.08]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="font-[family-name:var(--font-display)] text-4xl font-extrabold sm:text-5xl">{s.v}</div>
              <p className="mt-2 text-sm text-white/75">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
