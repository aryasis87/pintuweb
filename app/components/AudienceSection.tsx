import { ArrowUpRight } from 'lucide-react'
import { demosFor, getDict } from '../i18n'
import type { Lang } from '../i18n/config'
import SectionHead from './SectionHead'
import { HlText } from './Bits'

// Tiap bidang menunjuk satu demo live sebagai contoh — bukti, bukan sekadar daftar.
const DEMO_FOR = ['jajan', 'restoran', 'woodora', 'nimbus', 'celeste', 'wedding', 'klinik', 'lumora']

export default function AudienceSection({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const t = d.audience
  const demos = demosFor(lang)
  const items = t.items.map((it, i) => ({ ...it, demo: demos.find((x) => x.slug === DEMO_FOR[i])! }))

  return (
    <section id="untuk-siapa" aria-labelledby="audience-title" className="bg-[color:var(--surface-soft)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead eyebrow={t.eyebrow} id="audience-title" title={<HlText parts={t.title} />} lead={t.lead} />

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <li key={it.label}>
              <a
                href={it.demo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius)] bg-white ring-1 ring-[color:var(--border-light)] transition-shadow duration-300 hover:shadow-[0_12px_32px_-16px_rgb(15_29_58/0.25)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/demos/${it.demo.slug}.webp`} alt="" width={720} height={378} loading="lazy" decoding="async" className="aspect-[1200/630] w-full object-cover object-top" />
                <span className="flex flex-1 flex-col p-5">
                  <span className="kicker text-[color:var(--primary-700)]">{it.label}</span>
                  <span className="mt-1.5 flex items-start justify-between gap-2 font-semibold text-[color:var(--text-primary)]">
                    {it.demo.name}
                    <ArrowUpRight size={16} className="arw-ne mt-0.5 shrink-0 text-[color:var(--text-muted)] transition-transform group-hover:text-[color:var(--primary-700)]" aria-hidden="true" />
                  </span>
                  <span className="mt-1.5 text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)]">{it.desc}</span>
                  <span className="sr-only">{d.common.newTabShort}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
