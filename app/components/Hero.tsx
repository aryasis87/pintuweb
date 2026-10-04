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
import { HlText } from './Bits'

const count = (c: DemoCategory) => DEMOS.filter((d) => d.category === c).length

// Server component. Pembuka beranda: pernyataan serif besar, lalu "deretan pintu" — delapan lengkung
// berisi tangkapan layar galeri asli, berdiri di satu garis jalan seperti deret ruko.
export default function Hero({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const t = d.hero
  const g = d.portfolio
  const pk = packagesFor(lang)
  const fromOf = (c: DemoCategory) => pk.find((x) => x.slug === PACKAGE_FOR_CATEGORY[c])!.priceFrom

  return (
    <section id="hero" className="pt-28 sm:pt-32" aria-label={t.aria}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="kicker flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[color:var(--rule)] pb-3 text-[color:var(--text-tertiary)]">
          <span className="text-[color:var(--text-primary)]">{t.kicker}</span>
          <span>{t.meta(DEMOS.length)}</span>
        </div>

        <h1 className="mt-10 max-w-[16ch] text-[2.9rem] leading-[0.98] text-[color:var(--text-primary)] sm:mt-14 sm:text-7xl lg:text-[6.5rem]">
          <HlText parts={t.title} mode="italic" tone="primary" />
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 lg:grid-cols-12 lg:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-[color:var(--text-secondary)] lg:col-span-6 lg:text-[1.1875rem]">{t.lead(DEMOS.length)}</p>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
            <a href={wa(d.header.waText)} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              {t.ctaConsult} <ArrowUpRight size={17} className="arw arw-ne" aria-hidden="true" />
            </a>
            <Link href={path(lang, 'demo')} className="btn btn-line">
              {t.ctaDemos(DEMOS.length)} <ArrowRight size={17} className="arw" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Deretan pintu */}
      <div className="mt-16 sm:mt-20">
        <div className="mx-auto flex max-w-6xl items-baseline justify-between gap-4 px-4 sm:px-6">
          <h2 className="kicker text-[color:var(--text-primary)]">{t.facade}</h2>
          <p className="kicker hidden text-[color:var(--text-tertiary)] sm:block">{t.facadeHint}</p>
        </div>
        <div className="scrollbar-hide mt-5 overflow-x-auto lg:overflow-visible">
          <ul className="mx-auto flex w-max gap-3 px-4 sm:gap-4 sm:px-6 lg:grid lg:w-auto lg:max-w-6xl lg:grid-cols-8">
            {PORTALS.map((p, i) => {
              const gal = g.galleries[p.category]
              return (
                <li key={p.path} className="w-[8.5rem] shrink-0 sm:w-36 lg:w-auto">
                  {/* Portal = zona Next terpisah: tautan biasa, bukan navigasi klien. */}
                  <a href={`/${p.path}`} hrefLang="id" className="door-link group block focus-visible:outline-offset-8">
                    <span className="mono block text-[0.6875rem] tracking-[0.08em] text-[color:var(--text-tertiary)]">
                      {t.no} {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="door pintu-frame mt-2 block bg-white p-[3px]">
                      <span className="arch-top relative block aspect-[5/7] overflow-hidden bg-[color:var(--neutral-100)]">
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 136px, 144px"
                          loading={i < 4 ? 'eager' : 'lazy'}
                          className="object-cover object-top"
                        />
                      </span>
                    </span>
                    <span className="door-sill block h-[3px] bg-[color:var(--rule)]" aria-hidden="true" />
                    <span className="mt-3 block text-[0.9375rem] font-semibold leading-snug text-[color:var(--text-primary)] group-hover:text-[color:var(--primary-700)]">{gal.title}</span>
                    <span className="mono mt-1 block text-[0.6875rem] leading-relaxed text-[color:var(--text-tertiary)]">
                      {count(p.category)} {g.unit[p.category]}
                      <br />
                      {d.common.from} {fromOf(p.category)}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        {g.galleryLang && <p className="kicker mx-auto mt-6 max-w-6xl px-4 text-[color:var(--text-tertiary)] sm:px-6">{g.galleryLang}</p>}
      </div>
    </section>
  )
}
