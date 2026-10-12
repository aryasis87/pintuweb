import Image from 'next/image'
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

// Server component. Pembuka beranda: kalimat besar di kiri dan gambar utama di kanan, lalu delapan jenis
// website (daftar + pratinjau besar, komponen klien Kinds) di atas panel biru muda.
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
    <section id="hero" className="pb-8" aria-label={t.aria}>
      {/* Pita pembuka: teks di kiri, gambar utama di kanan (desktop) atau sebagai kartu di bawah tombol (ponsel/tablet) */}
      <div className="relative isolate overflow-hidden pt-32 sm:pt-40 lg:pb-16 xl:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* di desktop teks dibatasi supaya berhenti sebelum isi gambar mulai terlihat */}
          <div className="lg:max-w-[30rem] xl:max-w-[38rem]">
            <p className="text-[0.9375rem] text-[color:var(--text-tertiary)]">
              <span className="font-semibold text-[color:var(--primary-700)]">{t.kicker}</span>
              <span className="hidden sm:inline lg:hidden"> · </span>
              <span className="hidden sm:inline lg:mt-1 lg:block">{t.meta(DEMOS.length)}</span>
            </p>

            <h1 className="mt-6 text-[2.6rem] leading-[1.04] text-[color:var(--text-primary)] sm:text-[3.5rem] lg:text-[3rem] lg:leading-[1.06] xl:text-[3.75rem]">
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
        </div>

        {/* Gambar utama (public/images/bgutama.png, milik pemilik situs). Sepertiga kirinya kosong, jadi:
            - desktop: menempel di kanan di belakang teks, tepi kiri/atas/bawahnya melebur ke latar putih
              (lapisan pudar dilebihkan 2px dari gambar supaya tidak ada garis di tepinya);
            - ponsel/tablet: kartu membulat yang hanya menampilkan bagian kanannya (pembungkus 132% rata kanan). */}
        <div className="relative mx-4 mt-12 aspect-[4/3] overflow-hidden rounded-[1.5rem] ring-1 ring-[color:var(--border-light)] sm:mx-6 sm:aspect-[16/9] lg:absolute lg:right-0 lg:top-1/2 lg:-z-10 lg:mx-0 lg:mt-0 lg:aspect-[3/2] lg:w-[66%] lg:-translate-y-[46%] lg:overflow-visible lg:rounded-none lg:ring-0 xl:w-[63%]">
          <span className="absolute inset-y-0 right-0 block w-[132%] lg:w-full">
            <Image src="/images/bgutama.png" alt={t.artAlt} fill priority sizes="(min-width: 1280px) 63vw, (min-width: 1024px) 66vw, 132vw" className="object-cover object-[50%_42%]" />
          </span>
          <span className="absolute -inset-y-0.5 -left-0.5 hidden w-[46%] [background-image:linear-gradient(to_right,#fff_0%,#fff_55%,rgb(255_255_255/0)_100%)] lg:block" aria-hidden="true" />
          <span className="absolute -inset-x-0.5 -top-0.5 hidden h-[18%] [background-image:linear-gradient(to_bottom,#fff_0%,#fff_25%,rgb(255_255_255/0)_100%)] lg:block" aria-hidden="true" />
          <span className="absolute -inset-x-0.5 -bottom-0.5 hidden h-[26%] [background-image:linear-gradient(to_top,#fff_0%,#fff_30%,rgb(255_255_255/0)_100%)] lg:block" aria-hidden="true" />
        </div>
      </div>

      <Kinds items={kinds} heading={t.facade} hint={t.facadeHint} note={g.galleryLang || undefined} />
    </section>
  )
}
