import { getDict } from '../i18n'
import type { Lang } from '../i18n/config'
import SectionHead from './SectionHead'
import { HlText } from './Bits'

// Cara kerja: empat langkah sejajar yang dihubungkan satu garis tipis.
export default function Process({ lang }: { lang: Lang }) {
  const t = getDict(lang).process
  return (
    <section aria-labelledby="process-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead eyebrow={t.eyebrow} id="process-title" title={<HlText parts={t.title} />} lead={t.lead} />

        <div className="relative mt-16">
          {/* garis penghubung di belakang nomor (desktop); di luar <ol> supaya daftar tetap valid */}
          <span className="absolute left-5 right-5 top-5 hidden h-px bg-[color:var(--border-medium)] lg:block" aria-hidden="true" />
          <ol className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {t.steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="relative grid h-10 w-10 place-items-center rounded-full bg-[color:var(--primary-700)] text-[0.9375rem] font-semibold text-white ring-8 ring-white" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-[1.6rem] leading-tight text-[color:var(--text-primary)]">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-[color:var(--text-tertiary)]">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
