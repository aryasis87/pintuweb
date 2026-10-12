import type { Metadata } from 'next'
import { ArrowDown } from 'lucide-react'
import FaqCenter from '../../components/FaqCenter'
import PageHero from '../../components/PageHero'
import { Breadcrumbs, HlText, JsonLd } from '../../components/Bits'
import { faqCenterProps } from '../../components/props'
import { faqJsonLd, type FaqKey } from '../../content/faq'
import { PACKAGES } from '../../lib/packages'
import { GUARANTEE_DAYS } from '../../lib/site'
import { LANG_INFO, getDict, getPages, isLang, type Lang } from '../../i18n'
import { durationSpan, minPrice, money } from '../../i18n/facts'
import { path, urlOf } from '../../i18n/routes'
import { pageGraph, pageMeta } from '../../i18n/seo'

type Params = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const p = getPages(lang).faq
  return pageMeta({ lang, ref: { key: 'faq' }, title: p.title, description: p.description, ogTitle: p.ogTitle, ogDescription: p.ogDescription })
}

export default async function FaqPage({ params }: Params) {
  const lang = (await params).lang as Lang
  const d = getDict(lang)
  const p = getPages(lang).faq
  const faq = faqCenterProps(lang)
  const span = durationSpan(lang)

  // Empat hal yang paling menentukan, dijawab dalam dua-tiga kata; tiap kartu melompat ke jawaban lengkapnya.
  const quick: { to: FaqKey; q: string; pre?: string; fig: string; note: string }[] = [
    { to: 'biaya', q: p.quick.price.q, pre: p.quick.price.pre, fig: money(lang, minPrice()).replace(/ /g, ' '), note: p.quick.price.note(PACKAGES.length) },
    { to: 'lama-pengerjaan', q: p.quick.time.q, pre: p.quick.time.pre, fig: span.fastest.duration, note: p.quick.time.note(span.slowest.duration) },
    { to: 'pembayaran', q: p.quick.pay.q, fig: p.quick.pay.fig, note: p.quick.pay.note },
    { to: 'garansi', q: p.quick.guarantee.q, fig: p.quick.guarantee.fig(GUARANTEE_DAYS), note: p.quick.guarantee.note },
  ]

  return (
    <main id="main-content">
      <Breadcrumbs label={d.common.breadcrumb} items={[{ name: d.common.home, href: path(lang, 'home') }, { name: d.nav.faq }]} />
      <PageHero tight eyebrow={p.eyebrow} title={<HlText parts={p.h1} mode="italic" tone="primary" />} lead={p.lead}>
        <section aria-labelledby="quick-title" className="mt-4 sm:mt-6">
          <h2 id="quick-title" className="kicker text-[color:var(--text-tertiary)]">
            {p.quickTitle}
          </h2>
          <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
            {quick.map((k) => (
              <li key={k.to}>
                {/* <a> biasa: tautan #jangkar di halaman yang sama harus memicu hashchange supaya kartunya terbuka */}
                <a
                  href={`#${k.to}`}
                  className="group flex h-full flex-col rounded-[1.25rem] bg-[color:var(--surface-soft)] p-4 ring-1 ring-transparent transition-[background-color,box-shadow] duration-200 hover:bg-white hover:shadow-[0_18px_34px_-26px_rgb(38_70_156/0.55)] hover:ring-[color:var(--primary-300)] sm:p-5"
                >
                  <span className="text-[0.8125rem] leading-snug text-[color:var(--text-tertiary)] sm:text-[0.875rem]">{k.q}</span>
                  <span className="display mt-2 text-[1.25rem] font-semibold leading-[1.15] tracking-tight text-[color:var(--primary-700)] sm:text-[1.5rem]">
                    {/* ponsel (dua kartu sempit per baris): kata pembuka di barisnya sendiri; selebihnya sebaris dengan angkanya */}
                    {k.pre && <span className="mr-1.5 block text-[0.8125rem] font-medium tracking-normal text-[color:var(--text-tertiary)] sm:inline sm:text-[0.875rem]">{k.pre}</span>}
                    {/* inline-block: bila tidak muat sebaris dengan kata pembuka, angkanya turun utuh ke baris berikut.
                        Word joiner di sekitar tanda pisah: "1–2" tidak boleh terbelah di ujung baris. */}
                    <span className="inline-block">{k.fig.replace(/–/g, '⁠–⁠')}</span>
                  </span>
                  <span className="mt-1.5 text-[0.8125rem] leading-snug text-[color:var(--text-secondary)] sm:text-[0.875rem]">{k.note}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[0.8125rem] font-semibold text-[color:var(--primary-700)]">
                    {p.quickMore} <ArrowDown size={14} className="transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </PageHero>
      <FaqCenter {...faq} />
      {/* Dibangun dari data yang sama dengan yang tampil di halaman, jadi schema selalu cocok dengan isi. */}
      <JsonLd data={faqJsonLd(faq.items, LANG_INFO[lang].htmlLang)} />
      <JsonLd
        data={pageGraph({
          lang,
          ref: { key: 'faq' },
          name: p.title,
          description: p.description,
          crumbs: [
            { name: d.common.home, url: urlOf(lang, { key: 'home' }) },
            { name: d.nav.faq, url: urlOf(lang, { key: 'faq' }) },
          ],
        })}
      />
    </main>
  )
}
