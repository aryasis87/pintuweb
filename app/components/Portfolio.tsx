import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { DEMOS } from '../lib/demos'
import { categoriesFor, demosFor, getDict } from '../i18n'
import { path } from '../i18n/routes'
import type { Lang } from '../i18n/config'
import SectionHead from './SectionHead'
import { HlText } from './Bits'

// Lima demo asli dari lima kategori berbeda. Potret = tangkapan tinggi (public/images/hero),
// lanskap = thumbnail galeri demo (public/demos). Rasio petak mengikuti rasio gambarnya supaya tidak terpotong.
const PICKS: { slug: string; src: (slug: string) => string; span: string }[] = [
  { slug: 'lumora', src: (s) => `/images/hero/${s}.webp`, span: 'lg:col-span-4' },
  { slug: 'cissycoffee', src: (s) => `/images/hero/${s}.webp`, span: 'lg:col-span-4' },
  { slug: 'jajan', src: (s) => `/images/hero/${s}.webp`, span: 'lg:col-span-4' },
  { slug: 'restoran', src: (s) => `/demos/${s}.webp`, span: 'lg:col-span-6' },
  { slug: 'celeste', src: (s) => `/demos/${s}.webp`, span: 'lg:col-span-6' },
]

export default function Portfolio({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const t = d.portfolio
  const demos = demosFor(lang)
  const label = Object.fromEntries(categoriesFor(lang).map((c) => [c.id, c.label]))
  const items = PICKS.map((p) => ({ ...p, demo: demos.find((x) => x.slug === p.slug)! }))

  return (
    <section id="portfolio" aria-labelledby="showcase-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead no="01" eyebrow={t.eyebrow} id="showcase-title" title={<HlText parts={t.title} />} lead={t.lead(DEMOS.length)} />

        <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-y-16">
          {items.map(({ demo, src, span }, i) => (
            <li key={demo.slug} className={span}>
              <a href={demo.url} target="_blank" rel="noopener noreferrer" className="group block">
                <span className={`crop block ${i < 3 ? 'aspect-[9/10]' : 'aspect-[16/9]'}`}>
                  <span className="relative block h-full w-full overflow-hidden border border-[color:var(--border-light)] bg-[color:var(--neutral-100)]">
                    <Image
                      src={src(demo.slug)}
                      alt={t.shotAlt(demo.name)}
                      fill
                      sizes={i < 3 ? '(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw' : '(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw'}
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    />
                  </span>
                </span>
                <span className="mt-5 flex items-start justify-between gap-4">
                  <span className="min-w-0">
                    <span className="kicker block text-[color:var(--text-tertiary)]">{String(i + 1).padStart(2, '0')} · {label[demo.category]}</span>
                    <span className="serif mt-1.5 block text-[1.6rem] leading-tight text-[color:var(--text-primary)] group-hover:text-[color:var(--primary-700)]">{demo.name}</span>
                    <span className="mt-1 block text-[0.9375rem] text-[color:var(--text-tertiary)]">{demo.tagline}</span>
                  </span>
                  <span className="mt-6 inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[color:var(--primary-700)]">
                    {t.open} <ArrowUpRight size={15} className="arw arw-ne transition-transform" aria-hidden="true" />
                    <span className="sr-only">{d.common.newTabShort}</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex justify-end border-t border-[color:var(--border-light)] pt-6">
          <Link href={path(lang, 'demo')} className="link inline-flex items-center gap-2 text-[0.9375rem] font-semibold no-underline hover:underline">
            {t.allDemos(DEMOS.length)} <ArrowRight size={16} className="arw" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
