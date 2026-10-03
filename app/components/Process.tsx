import { MessagesSquare, PenTool, Code2, Rocket } from 'lucide-react'
import { getDict } from '../i18n'
import type { Lang } from '../i18n/config'
import SectionHead from './SectionHead'
import { HlText } from './Bits'

const ICONS = [MessagesSquare, PenTool, Code2, Rocket]

export default function Process({ lang, no = '03' }: { lang: Lang; no?: string }) {
  const t = getDict(lang).process
  return (
    <section aria-labelledby="process-title" className="relative overflow-hidden bg-[color:var(--neutral-900)] py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 u-grid-light" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[color:var(--primary-700)] opacity-25 blur-3xl" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead no={no} eyebrow={t.eyebrow} tone="dark" id="process-title" title={<HlText parts={t.title} tone="accent" />} lead={t.lead} />

        {/* Garis rambut antar-langkah dari celah 1px di atas latar terang tipis */}
        <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((s, i) => {
            const Icon = ICONS[i]
            return (
              <li key={s.title} className="bg-[color:var(--neutral-900)] p-5 sm:p-7">
                <div className="flex items-start justify-between">
                  <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-none text-[color:var(--accent-300)] sm:text-5xl" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Icon size={22} className="text-white/60" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white sm:mt-6">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{s.desc}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
