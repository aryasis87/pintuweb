import { getDict } from '../i18n'
import type { Lang } from '../i18n/config'
import SectionHead from './SectionHead'
import { HlText } from './Bits'

// Janji yang bisa ditagih — semuanya fakta yang juga tertulis di halaman harga, FAQ, dan S&K.
export default function WhyUs({ lang }: { lang: Lang }) {
  const t = getDict(lang).why
  return (
    <section aria-labelledby="why-title" className="bg-[color:var(--surface-soft)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead eyebrow={t.eyebrow} id="why-title" title={<HlText parts={t.title} />} lead={t.lead} />

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {t.promises.map((p) => (
            <li key={p.title}>
              <span className="block h-0.5 w-8 rounded-full bg-[color:var(--primary-700)]" aria-hidden="true" />
              <h3 className="mt-5 text-[1.25rem] leading-snug text-[color:var(--text-primary)]">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-[color:var(--text-tertiary)]">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
