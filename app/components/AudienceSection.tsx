import Image from 'next/image'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { CATEGORY_COLOR, alpha } from '../lib/portals'
import { wa } from '../lib/site'
import { demosFor, getDict } from '../i18n'
import type { Lang } from '../i18n/config'
import SectionHead from './SectionHead'
import { HlText } from './Bits'

// Tiap bidang usaha menunjuk satu demo live sebagai contoh. Gambarnya bukan thumbnail halaman (itu sudah ada
// di "Karya pilihan"), melainkan potongan dekat selebar ponsel dari bagian paling khas demo itu: denah meja,
// daftar dokter, papan status, dan seterusnya (public/images/siapa, 660x558).
// Urutannya sejajar dengan audience.items di kamus.
const DEMO_FOR = ['jajan', 'restoran', 'woodora', 'nimbus', 'celeste', 'wedding', 'klinik', 'lumora']
// Urutan tampil: dua bidang yang jenis websitenya sama (warnanya sama) tidak bersebelahan.
const ORDER = [0, 1, 2, 4, 5, 3, 6, 7]

export default function AudienceSection({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const t = d.audience
  const demos = demosFor(lang)
  const items = ORDER.map((i) => ({ ...t.items[i], demo: demos.find((x) => x.slug === DEMO_FOR[i])! }))

  return (
    <section id="untuk-siapa" aria-labelledby="audience-title" className="bg-[color:var(--surface-soft)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead eyebrow={t.eyebrow} id="audience-title" title={<HlText parts={t.title} />} lead={t.lead} />

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:mt-14 lg:gap-5">
          {items.map((it) => {
            const c = CATEGORY_COLOR[it.demo.category]
            // Undangan dinamai menurut jenisnya ("Undangan Pernikahan Digital"); nama contohnya ada di tagline.
            const name = it.demo.category === 'undangan' ? it.demo.tagline : it.demo.name
            return (
              <li key={it.label}>
                <a
                  href={it.demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-[1.25rem] bg-white p-1.5 ring-1 ring-[color:var(--border-light)] transition-shadow duration-300 hover:shadow-[0_24px_44px_-30px_var(--k)] sm:rounded-[1.5rem] sm:p-2"
                  style={{ '--k': c.color, '--k2': c.to } as CSSProperties}
                >
                  {/* Alas pastel berwarna jenis websitenya; saat disorot berubah jadi gradasi penuh */}
                  <span className="relative block overflow-hidden rounded-[0.95rem] p-2.5 sm:rounded-[1.125rem] sm:p-3" style={{ backgroundColor: c.tint, backgroundImage: `linear-gradient(135deg, ${c.tint} 10%, ${alpha(c.to, 0.24)})` }}>
                    <span className="absolute inset-0 opacity-0 transition-opacity duration-500 [background-image:linear-gradient(135deg,var(--k),var(--k2))] group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" />
                    <span className="relative block overflow-hidden rounded-lg bg-white shadow-[0_10px_24px_-14px_rgb(15_29_58/0.45)] ring-1 ring-black/5 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.015] sm:rounded-xl">
                      <Image src={`/images/siapa/${it.demo.slug}.webp`} alt="" width={660} height={558} sizes="(min-width: 1024px) 230px, (min-width: 768px) 20vw, 42vw" className="block h-auto w-full" />
                    </span>
                  </span>

                  <span className="flex flex-1 flex-col px-2 pb-1.5 pt-3 sm:px-3 sm:pb-2.5 sm:pt-4">
                    <span className="display text-base leading-snug text-[color:var(--text-primary)] lg:text-[1.25rem]">{it.label}</span>
                    <span className="mt-1 text-[0.8125rem] leading-relaxed text-[color:var(--text-tertiary)] lg:mt-1.5 lg:text-[0.9375rem]">{it.desc}</span>
                    <span className="mt-auto flex items-start justify-between gap-2 pt-3 lg:pt-4">
                      <span className="min-w-0 text-[0.8125rem] font-semibold text-[color:var(--k)] lg:text-sm">{name}</span>
                      <ArrowUpRight size={15} className="arw-ne mt-px shrink-0 text-[color:var(--k)] transition-transform" aria-hidden="true" />
                    </span>
                    <span className="sr-only">{d.common.newTabShort}</span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>

        {/* Untuk yang bidangnya tidak ada di atas */}
        <div className="mt-5 flex flex-col gap-5 rounded-[1.5rem] bg-white p-6 ring-1 ring-[color:var(--border-light)] sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 lg:mt-6">
          <div className="min-w-0">
            <h3 className="text-[1.125rem] leading-snug text-[color:var(--text-primary)] sm:text-[1.25rem]">{t.otherTitle}</h3>
            <p className="mt-1.5 max-w-xl text-[0.9375rem] leading-relaxed text-[color:var(--text-tertiary)]">{t.otherBody}</p>
          </div>
          <a href={wa(t.otherWa)} target="_blank" rel="noopener noreferrer" className="btn btn-solid shrink-0">
            {t.otherCta} <ArrowUpRight size={16} className="arw arw-ne" aria-hidden="true" />
            <span className="sr-only">{d.common.newTabShort}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
