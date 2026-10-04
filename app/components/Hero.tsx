import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { DEMOS, type DemoCategory } from '../lib/demos'
import { PACKAGE_FOR_CATEGORY, PORTALS } from '../lib/portals'
import { wa } from '../lib/site'
import { getDict } from '../i18n'
import { packagesFor } from '../i18n/facts'
import { path } from '../i18n/routes'
import type { Lang } from '../i18n/config'

const count = (c: DemoCategory) => DEMOS.filter((d) => d.category === c).length

// Server component. Pembuka beranda: kalimat besar yang lapang, lalu "deretan pintu" —
// delapan lengkung berisi tangkapan layar galeri asli di atas panel biru muda.
export default function Hero({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const t = d.hero
  const g = d.portfolio
  const pk = packagesFor(lang)
  const fromOf = (c: DemoCategory) => pk.find((x) => x.slug === PACKAGE_FOR_CATEGORY[c])!.priceFrom

  return (
    <section id="hero" className="pb-8 pt-32 sm:pt-40" aria-label={t.aria}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-[0.9375rem] text-[color:var(--text-tertiary)]">
          <span className="font-semibold text-[color:var(--primary-700)]">{t.kicker}</span>
          <span className="hidden sm:inline"> · {t.meta(DEMOS.length)}</span>
        </p>

        <h1 className="mt-6 max-w-5xl text-[2.6rem] leading-[1.04] text-[color:var(--text-primary)] sm:text-[3.5rem] lg:text-[4.5rem]">
          {t.title[0]}
          {/* frasa miring tidak dipotong di tengah ("pintu depan") */}
          <em className="whitespace-nowrap text-[color:var(--primary-700)]">{t.title[1]}</em>
          {t.title[2] ?? ''}
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[color:var(--text-tertiary)] sm:text-[1.1875rem]">{t.lead(DEMOS.length)}</p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href={wa(d.header.waText)} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
            {t.ctaConsult} <ArrowUpRight size={17} className="arw arw-ne" aria-hidden="true" />
          </a>
          <Link href={path(lang, 'demo')} className="btn btn-line">
            {t.ctaDemos(DEMOS.length)} <ArrowRight size={17} className="arw" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Deretan pintu */}
      <div className="mx-auto mt-20 max-w-6xl sm:px-6">
        <div className="bg-[color:var(--surface-soft)] py-8 sm:rounded-[2rem] sm:py-10">
          <div className="flex items-baseline justify-between gap-4 px-4 sm:px-10">
            <h2 className="kicker text-[color:var(--text-primary)]">{t.facade}</h2>
            <p className="hidden text-sm text-[color:var(--text-tertiary)] sm:block">{t.facadeHint}</p>
          </div>
          <div className="scrollbar-hide mt-6 overflow-x-auto lg:overflow-visible">
            <ul className="flex w-max gap-4 px-4 sm:px-10 lg:grid lg:w-auto lg:grid-cols-8 lg:gap-5">
              {PORTALS.map((p, i) => {
                const gal = g.galleries[p.category]
                return (
                  <li key={p.path} className="w-[8.5rem] shrink-0 sm:w-36 lg:w-auto">
                    {/* Portal = zona Next terpisah: tautan biasa, bukan navigasi klien. */}
                    <a href={`/${p.path}`} hrefLang="id" className="door-link group block">
                      <span className="door arch-top block border border-[color:var(--border-light)] bg-white p-1 shadow-[0_1px_2px_rgb(15_29_58/0.04)]">
                        <span className="arch-top relative block aspect-[5/7] overflow-hidden bg-[color:var(--neutral-100)]">
                          <Image
                            src={p.image}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 120px, 144px"
                            loading={i < 4 ? 'eager' : 'lazy'}
                            className="object-cover object-top"
                          />
                        </span>
                      </span>
                      <span className="mt-3 block text-[0.9375rem] font-semibold leading-snug text-[color:var(--text-primary)] group-hover:text-[color:var(--primary-700)]">{gal.title}</span>
                      <span className="mt-0.5 block text-[0.8125rem] leading-snug text-[color:var(--text-tertiary)]">
                        {count(p.category)} {g.unit[p.category]} · {d.common.from} {fromOf(p.category)}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          {g.galleryLang && <p className="mt-6 px-4 text-sm text-[color:var(--text-tertiary)] sm:px-10">{g.galleryLang}</p>}
        </div>
      </div>
    </section>
  )
}
