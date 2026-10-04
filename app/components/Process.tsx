import { getDict } from '../i18n'
import type { Lang } from '../i18n/config'
import SectionHead from './SectionHead'
import { HlText } from './Bits'

// Cara kerja sebagai tabel dua pihak: apa yang kamu lakukan, apa yang kami lakukan, di tiap tahap.
export default function Process({ lang, no = '03' }: { lang: Lang; no?: string }) {
  const t = getDict(lang).process
  return (
    <section aria-labelledby="process-title" className="relative overflow-hidden bg-[color:var(--navy)] py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 u-grid-light [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead no={no} eyebrow={t.eyebrow} tone="dark" id="process-title" title={<HlText parts={t.title} />} lead={t.lead} />

        <div className="mt-14 lg:mt-16">
          <div className="kicker hidden grid-cols-12 gap-10 pb-3 text-[color:var(--accent-200)] lg:grid" aria-hidden="true">
            <span className="col-span-4">{t.colStep}</span>
            <span className="col-span-4">{t.colYou}</span>
            <span className="col-span-4">{t.colWe}</span>
          </div>
          <ol>
            {t.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-1 gap-x-10 gap-y-4 border-t border-white/20 py-8 lg:grid-cols-12">
                <h3 className="flex items-baseline gap-4 text-[1.9rem] leading-tight text-white lg:col-span-4">
                  <span className="serif text-[color:var(--accent-300)]" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h3>
                <p className="text-white/80 lg:col-span-4">
                  <span className="kicker mb-1 block text-[color:var(--accent-200)] lg:sr-only">{t.colYou}</span>
                  {s.you}
                </p>
                <p className="text-white/80 lg:col-span-4">
                  <span className="kicker mb-1 block text-[color:var(--accent-200)] lg:sr-only">{t.colWe}</span>
                  {s.we}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
