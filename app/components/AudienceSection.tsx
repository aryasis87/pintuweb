import { Store, UtensilsCrossed, Briefcase, Rocket, UserRound, PartyPopper, Stethoscope, Building2, ArrowUpRight } from 'lucide-react'
import { demosFor, getDict } from '../i18n'
import type { Lang } from '../i18n/config'
import SectionHead from './SectionHead'
import { HlText } from './Bits'

// Tiap bidang langsung ditautkan ke satu demo live yang relevan — bukti, bukan sekadar daftar.
const ROWS = [
  { icon: Store, demo: 'jajan' },
  { icon: UtensilsCrossed, demo: 'restoran' },
  { icon: Briefcase, demo: 'tastycorner' },
  { icon: Rocket, demo: 'nimbus' },
  { icon: UserRound, demo: 'celeste' },
  { icon: PartyPopper, demo: 'wedding' },
  { icon: Stethoscope, demo: 'klinik' },
  { icon: Building2, demo: 'lumora' },
]

export default function AudienceSection({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const t = d.audience
  const demos = demosFor(lang)
  const items = ROWS.map((r, i) => ({ ...r, ...t.items[i], demo: demos.find((x) => x.slug === r.demo)! }))
  return (
    <section id="untuk-siapa" aria-labelledby="audience-title" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead no="02" eyebrow={t.eyebrow} id="audience-title" title={<HlText parts={t.title} />} lead={t.lead} />

        <ul className="mt-12 grid grid-cols-1 border-t border-[color:var(--border-medium)] md:grid-cols-2 md:gap-x-12">
          {items.map((a) => (
            <li key={a.title} className="flex items-start gap-4 border-b border-[color:var(--border-light)] py-5 sm:py-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--surface-primary)] ring-1 ring-[color:var(--border-light)]">
                <a.icon size={20} className="text-[color:var(--primary-700)]" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-[color:var(--text-primary)]">{a.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[color:var(--text-tertiary)]">{a.desc}</p>
                <a href={a.demo.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--primary-700)] underline-offset-4 hover:underline">
                  {t.example} {a.demo.name} <ArrowUpRight size={14} aria-hidden="true" />
                  <span className="sr-only">{d.common.newTabShort}</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
