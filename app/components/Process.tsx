import type { CSSProperties } from 'react'
import { getDict } from '../i18n'
import type { Lang } from '../i18n/config'
import SectionHead from './SectionHead'
import { HlText } from './Bits'

// Cara kerja sebagai satu lintasan: empat tahap, dua titik bayar di antaranya (DP setelah tahap 1, pelunasan
// setelah tahap 3), lalu garis putus-putus masa garansi setelah online. Lintasannya terisi mengikuti gulir
// halaman (kelas .proc* di globals.css). Ponsel/tablet: lintasan tegak di kiri. Desktop: mendatar.
export default function Process({ lang }: { lang: Lang }) {
  const t = getDict(lang).process
  const last = t.steps.length - 1
  const flagAfter: Record<number, string[]> = { 0: t.pay.deposit, 2: t.pay.final }

  return (
    <section aria-labelledby="process-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead eyebrow={t.eyebrow} id="process-title" title={<HlText parts={t.title} />} lead={t.lead} />

        <ol className="proc mt-14 grid grid-cols-1 lg:mt-16 lg:grid-cols-4 lg:gap-x-8">
          {t.steps.map((s, i) => {
            const flag = flagAfter[i]
            return (
              <li key={s.title} className="proc-step relative pb-10 pl-[4.5rem] last:pb-0 lg:pb-0 lg:pl-0 lg:pt-[6.75rem]" style={{ '--i': i } as CSSProperties}>
                {i < last ? (
                  // ruas lintasan menuju tahap berikutnya
                  <span className="absolute -bottom-6 left-[21px] top-6 w-1.5 overflow-hidden rounded-full bg-[color:var(--primary-100)] lg:-right-14 lg:bottom-auto lg:left-6 lg:top-[57px] lg:h-1.5 lg:w-auto" aria-hidden="true">
                    <span className="proc-fill absolute inset-0 rounded-full" />
                  </span>
                ) : (
                  // setelah online: garis putus-putus masa garansi
                  <span className="absolute bottom-4 left-[23px] top-6 border-l-2 border-dashed border-[color:var(--primary-300)] lg:bottom-auto lg:left-6 lg:right-3 lg:top-[59px] lg:border-l-0 lg:border-t-2" aria-hidden="true" />
                )}

                <span
                  className="proc-node absolute left-0 top-0 z-10 grid h-12 w-12 place-items-center rounded-full border-2 border-[color:var(--primary-700)] bg-[color:var(--primary-700)] text-[1.0625rem] font-semibold text-white ring-8 ring-white lg:top-9"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>

                <h3 className="pt-2 text-[1.375rem] leading-tight text-[color:var(--text-primary)] lg:pt-0">{s.title}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-[color:var(--text-tertiary)] lg:pr-2">{s.desc}</p>

                {flag && (
                  // titik bayar: di ponsel di bawah tahapnya, di desktop tepat di tengah ruas lintasan
                  <p className="proc-flag relative mt-6 text-[0.8125rem] leading-5 lg:absolute lg:left-[calc(50%+2.5rem)] lg:top-0 lg:mt-0 lg:-translate-x-1/2 lg:whitespace-nowrap lg:text-center">
                    <span className="proc-dot absolute -left-[3.375rem] top-1 z-10 h-3 w-3 rounded-full border-2 border-[color:var(--primary-700)] bg-[color:var(--primary-700)] ring-4 ring-white lg:left-1/2 lg:top-[54px] lg:-translate-x-1/2" aria-hidden="true" />
                    <strong className="font-semibold text-[color:var(--primary-700)] lg:block">{flag[0]}</strong> <span className="text-[color:var(--text-tertiary)] lg:block">{flag[1]}</span>
                  </p>
                )}
                {i === last && (
                  <p className="relative mt-6 text-[0.8125rem] leading-5 lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:whitespace-nowrap lg:text-right">
                    <span className="absolute -left-[3.375rem] top-1 z-10 h-3 w-3 rounded-full border-2 border-[color:var(--primary-300)] bg-white lg:left-auto lg:right-0 lg:top-[54px]" aria-hidden="true" />
                    <strong className="font-semibold text-[color:var(--primary-700)] lg:block">{t.pay.after[0]}</strong> <span className="text-[color:var(--text-tertiary)] lg:block">{t.pay.after[1]}</span>
                  </p>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
