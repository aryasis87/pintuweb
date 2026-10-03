import { Check, X, Timer, Headphones } from 'lucide-react'
import { getDict } from '../i18n'
import { facts, packagesFor } from '../i18n/facts'
import type { Lang } from '../i18n/config'
import SectionHead from './SectionHead'
import { HlText } from './Bits'

const DURATION_SLUGS = ['landing-page', 'standar-umkm', 'toko-online-simple', 'website-custom']

export default function WhyUs({ lang }: { lang: Lang }) {
  const t = getDict(lang).why
  const f = facts(lang)
  // Durasi langsung dari lib/packages.ts supaya selalu sama dengan halaman paket.
  const pk = packagesFor(lang)
  const durations = DURATION_SLUGS.map((slug) => pk.find((p) => p.slug === slug)!)
  return (
    <section aria-labelledby="why-title" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead no="04" eyebrow={t.eyebrow} id="why-title" title={<HlText parts={t.title} />} lead={t.lead} />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Perbandingan */}
          <div className="overflow-hidden rounded-3xl border border-[color:var(--border-light)] bg-white shadow-sm lg:col-span-7">
            <table className="w-full text-left">
              <caption className="sr-only">{t.caption}</caption>
              <thead className="bg-[color:var(--surface-primary)]">
                <tr>
                  <th scope="col" className="px-5 py-4 text-sm font-semibold text-[color:var(--text-tertiary)] sm:px-7">{t.colWhat}</th>
                  <th scope="col" className="w-20 px-2 py-4 text-center text-sm font-extrabold text-[color:var(--primary-700)]">{t.colUs}</th>
                  <th scope="col" className="w-20 px-2 py-4 pr-4 text-center text-sm font-medium text-[color:var(--text-muted)] sm:pr-6">{t.colOthers}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[color:var(--border-light)]">
                {t.compare.map((label) => (
                  <tr key={label}>
                    <th scope="row" className="px-5 py-4 text-sm font-normal text-[color:var(--text-secondary)] sm:px-7">{label}</th>
                    <td className="px-2 py-4 text-center">
                      <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[color:var(--success-100)]">
                        <Check size={15} className="text-[color:var(--success-700)]" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className="sr-only">{t.yes}</span>
                    </td>
                    <td className="px-2 py-4 pr-4 text-center sm:pr-6">
                      <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[color:var(--neutral-100)]">
                        <X size={15} className="text-[color:var(--text-muted)]" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className="sr-only">{t.rarely}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {/* Durasi pengerjaan */}
            <div className="rounded-3xl border border-[color:var(--border-light)] bg-[color:var(--surface-primary)] p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-[color:var(--border-light)]">
                  <Timer size={19} className="text-[color:var(--primary-700)]" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-bold text-[color:var(--text-primary)]">{t.fastTitle}</h3>
              </div>
              <dl className="mt-5 divide-y divide-[color:var(--border-light)]">
                {durations.map((d) => (
                  <div key={d.slug} className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="text-sm text-[color:var(--text-secondary)]">{d.title}</dt>
                    <dd className="text-right text-sm font-semibold text-[color:var(--text-primary)]">{d.duration}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Pendampingan */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 text-white sm:p-7">
              <div className="pointer-events-none absolute inset-0 u-grid-light" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20">
                    <Headphones size={19} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold">{t.supportTitle}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/85">{t.supportBody}</p>
                <p className="mt-4 border-t border-white/20 pt-4 text-sm text-white/85">
                  {f.response}
                  <span className="mt-0.5 block text-white/75">{f.hours}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
