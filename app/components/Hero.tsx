import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { DEMOS, type DemoCategory } from '../lib/demos'
import { CATEGORY_COLOR, PACKAGE_FOR_CATEGORY, PORTALS } from '../lib/portals'
import { wa } from '../lib/site'
import { getDict } from '../i18n'
import { packagesFor } from '../i18n/facts'
import { path } from '../i18n/routes'
import type { Lang } from '../i18n/config'
import Kinds, { type Kind } from './Kinds'

const count = (c: DemoCategory) => DEMOS.filter((d) => d.category === c).length

// Server component. Pembuka beranda: kalimat besar yang lapang, lalu delapan jenis website
// (daftar + pratinjau besar, komponen klien Kinds) di atas panel biru muda.
export default function Hero({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const t = d.hero
  const g = d.portfolio
  const pk = packagesFor(lang)
  const fromOf = (c: DemoCategory) => pk.find((x) => x.slug === PACKAGE_FOR_CATEGORY[c])!.priceFrom
  // String siap tampil untuk komponen klien (kamus tidak ikut terkirim ke browser)
  const kinds: Kind[] = PORTALS.map((p) => {
    const gal = g.galleries[p.category]
    return {
      href: `/${p.path}`,
      title: gal.title,
      tagline: gal.tagline,
      count: `${count(p.category)} ${g.unit[p.category]}`,
      price: `${d.common.from} ${fromOf(p.category)}`,
      image: p.image,
      open: t.openGallery(gal.title),
      ...CATEGORY_COLOR[p.category],
    }
  })

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

      <Kinds items={kinds} heading={t.facade} hint={t.facadeHint} note={g.galleryLang || undefined} />
    </section>
  )
}
