import { getDict } from '../i18n'
import { packagesFor } from '../i18n/facts'
import type { Lang } from '../i18n/config'
import SectionHead from './SectionHead'
import { HlText } from './Bits'

const DURATION_SLUGS = ['link-in-bio', 'landing-page', 'standar-umkm', 'toko-online-simple', 'toko-online-full', 'sistem-reservasi']

// Janji yang bisa ditagih — semuanya fakta yang juga tertulis di halaman harga, FAQ, dan S&K.
export default function WhyUs({ lang }: { lang: Lang }) {
  const t = getDict(lang).why
  const pk = packagesFor(lang)
  const durations = DURATION_SLUGS.map((slug) => pk.find((p) => p.slug === slug)!)
  return (
    <section aria-labelledby="why-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead no="04" eyebrow={t.eyebrow} id="why-title" title={<HlText parts={t.title} />} lead={t.lead} />

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-14 lg:mt-16 lg:grid-cols-12">
          <ol className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {t.promises.map((p, i) => (
              <li key={p.title} className="border-t border-[color:var(--border-medium)] py-6">
                <span className="mono text-xs text-[color:var(--primary-700)]" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-[1.5rem] leading-snug text-[color:var(--text-primary)]">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)]">{p.body}</p>
              </li>
            ))}
          </ol>

          <aside aria-labelledby="durasi-title" className="lg:col-span-4">
            <div className="border-t border-[color:var(--rule)] pt-6">
              <h3 id="durasi-title" className="text-[1.5rem] text-[color:var(--text-primary)]">{t.fastTitle}</h3>
              <dl className="mt-4">
                {durations.map((d) => (
                  <div key={d.slug} className="flex items-baseline gap-3 border-b border-[color:var(--border-light)] py-3">
                    <dt className="flex flex-1 items-baseline gap-3 text-[0.9375rem] text-[color:var(--text-secondary)]">
                      {d.title}
                      <span className="leader" aria-hidden="true" />
                    </dt>
                    <dd className="mono shrink-0 text-right text-xs text-[color:var(--text-primary)]">{d.duration}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-[color:var(--text-tertiary)]">{t.fastNote}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
