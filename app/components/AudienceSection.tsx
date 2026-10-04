import { ArrowUpRight } from 'lucide-react'
import { demosFor, getDict } from '../i18n'
import type { Lang } from '../i18n/config'

// Tiap bidang menunjuk satu demo live sebagai catatan kaki — bukti, bukan sekadar daftar.
const DEMO_FOR = ['jajan', 'restoran', 'woodora', 'nimbus', 'celeste', 'wedding', 'klinik', 'lumora']

export default function AudienceSection({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const t = d.audience
  const demos = demosFor(lang)
  const items = t.items.map((it, i) => ({ ...it, demo: demos.find((x) => x.slug === DEMO_FOR[i])! }))
  const last = items.length - 1

  return (
    <section id="untuk-siapa" aria-labelledby="audience-title" className="bg-[color:var(--surface-primary)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-x-10 gap-y-5 border-t border-[color:var(--rule)] pt-5 lg:grid-cols-12">
          <p className="kicker flex gap-3 text-[color:var(--text-tertiary)] lg:col-span-3">
            <span className="text-[color:var(--primary-700)]">02</span>
            <span>{t.eyebrow}</span>
          </p>
          {/* Satu kalimat panjang; angka kecil merujuk catatan di bawahnya */}
          <h2 id="audience-title" className="text-[2rem] leading-[1.18] text-[color:var(--text-primary)] sm:text-[2.6rem] lg:col-span-9 lg:text-[3.1rem]">
            {t.intro}
            {items.map((it, i) => (
              <span key={it.noun}>
                {i === last ? t.and : ''}
                <span className="whitespace-nowrap">
                  {it.noun}
                  <sup className="mono ml-0.5 align-super text-[0.38em] text-[color:var(--primary-700)]" aria-hidden="true">{i + 1}</sup>
                </span>
                {i < last ? ', ' : '.'}
              </span>
            ))}
          </h2>
        </div>

        <div className="mt-14 lg:grid lg:grid-cols-12 lg:gap-x-10">
        <ol className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:col-span-9 lg:col-start-4">
          {items.map((it, i) => (
            <li key={it.noun} className="flex gap-4 border-t border-[color:var(--border-medium)] py-4">
              <span className="mono w-5 shrink-0 pt-0.5 text-xs text-[color:var(--primary-700)]">{i + 1}</span>
              <p className="min-w-0 text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)]">
                <a href={it.demo.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-[color:var(--text-primary)] underline decoration-[color:var(--neutral-300)] underline-offset-4 hover:text-[color:var(--primary-700)] hover:decoration-current">
                  {it.demo.name}
                  <ArrowUpRight size={13} className="ml-0.5 inline align-[-1px]" aria-hidden="true" />
                  <span className="sr-only">{d.common.newTabShort}</span>
                </a>
                <span className="mt-0.5 block">{it.desc}</span>
              </p>
            </li>
          ))}
        </ol>
        <p className="kicker mt-6 text-[color:var(--text-tertiary)] lg:col-span-9 lg:col-start-4">{t.note}</p>
        </div>
      </div>
    </section>
  )
}
