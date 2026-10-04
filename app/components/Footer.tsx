import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { EMAIL, WA_DISPLAY, WA_NUMBER, wa } from '../lib/site'
import { PORTALS } from '../lib/portals'
import { getDict } from '../i18n'
import { facts } from '../i18n/facts'
import { LANGS, LANG_INFO, type Lang } from '../i18n/config'
import { hasPage, path, pathOf } from '../i18n/routes'
import { SERVICES } from '../content/services'
import { HlText } from './Bits'
import { Logo } from './Logo'

// Footer = ajakan penutup + peta tautan internal (semua layanan, galeri, sumber daya, halaman perusahaan).
export default function Footer({ lang }: { lang: Lang }) {
  const t = getDict(lang)
  const f = facts(lang)
  const year = new Date().getFullYear()

  const CONTACTS: { label: string; value: string; sub?: string; link?: string }[] = [
    { label: t.footer.phone, value: WA_DISPLAY, link: `https://wa.me/${WA_NUMBER}` },
    { label: t.footer.email, value: EMAIL, link: `mailto:${EMAIL}` },
    { label: t.footer.location, value: f.location, sub: f.serves },
    { label: t.footer.hours, value: f.hoursDays, sub: f.hoursTime },
  ]

  const cols: { title: string; links: { label: string; href: string; zone?: boolean }[] }[] = [
    {
      title: t.footer.colServices,
      links: SERVICES.map((s) => ({ label: s.text[lang].name, href: pathOf(lang, { key: 'services', service: s.key }) })),
    },
    {
      title: t.footer.colGalleries,
      links: PORTALS.map((p) => ({ label: t.portfolio.galleries[p.category].title, href: `/${p.path}`, zone: true })),
    },
    {
      title: t.footer.colResources,
      links: [
        ...(hasPage(lang, 'articles') ? [{ label: t.links.articles, href: path(lang, 'articles') }] : []),
        { label: t.links.glossary, href: path(lang, 'glossary') },
        { label: t.links.demo, href: path(lang, 'demo') },
        { label: t.links.pricing, href: path(lang, 'pricing') },
        { label: t.links.faq, href: path(lang, 'faq') },
      ],
    },
    {
      title: t.footer.colCompany,
      links: [
        { label: t.links.about, href: path(lang, 'about') },
        { label: t.links.founder, href: path(lang, 'founder') },
        { label: t.links.contact, href: path(lang, 'contact') },
        { label: t.links.privacy, href: path(lang, 'privacy') },
        { label: t.links.terms, href: path(lang, 'terms') },
      ],
    },
  ]

  return (
    <footer id="contact" className="relative overflow-hidden bg-[color:var(--navy)] text-white" aria-label={t.footer.aria}>
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-20 sm:px-6 lg:pt-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="kicker text-[color:var(--accent-200)]">{t.footer.kicker}</p>
            <h2 className="mt-5 text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.6rem]">
              <HlText parts={t.footer.title} mode="italic" tone="accent" />
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">{t.footer.lead(f.response)}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={wa(t.footer.waText)} target="_blank" rel="noopener noreferrer" className="btn btn-white">
                {t.footer.chat} <ArrowUpRight size={17} className="arw arw-ne" aria-hidden="true" />
              </a>
              <Link href={path(lang, 'pricing')} className="btn btn-ghost-dark">
                {t.footer.seePackages} <ArrowRight size={17} className="arw" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <dl className="border-t border-white/40 lg:col-span-5 lg:mt-11">
            {CONTACTS.map((c) => (
              <div key={c.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-white/15 py-4 sm:grid-cols-[9rem_1fr]">
                <dt className="kicker pt-0.5 text-white/65">{c.label}</dt>
                <dd className="min-w-0">
                  {c.link ? (
                    <a href={c.link} target="_blank" rel="noopener noreferrer" className="break-all text-white underline decoration-white/35 underline-offset-4 hover:decoration-white">
                      {c.value}
                    </a>
                  ) : (
                    <span className="text-white">{c.value}</span>
                  )}
                  {c.sub && <span className="mt-0.5 block text-sm text-white/65">{c.sub}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label={t.footer.linksAria} className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/15 pt-10 sm:grid-cols-4">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="kicker text-[color:var(--accent-200)]">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    {l.zone ? (
                      // Portal = zona Next terpisah: tautan biasa, bukan navigasi klien.
                      <a href={l.href} className="text-[0.9375rem] text-white/75 transition-colors hover:text-white">{l.label}</a>
                    ) : (
                      <Link href={l.href} prefetch={false} className="text-[0.9375rem] text-white/75 transition-colors hover:text-white">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 py-7 text-sm text-white/65 lg:flex-row lg:items-center lg:justify-between">
          <Logo tone="light" />
          <p>{t.footer.copyright(year)}</p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{t.footer.otherLangs}:</span>
            {LANGS.filter((l) => l !== lang).map((l) => (
              <a key={l} href={path(l, 'home')} hrefLang={LANG_INFO[l].hreflang} lang={LANG_INFO[l].htmlLang} className="text-white/85 underline decoration-white/30 underline-offset-4 hover:text-white">
                {LANG_INFO[l].name}
              </a>
            ))}
          </p>
          <p>{t.footer.madeIn}</p>
        </div>
      </div>

      {/* Nama merek raksasa penutup halaman. Hurufnya lewat pseudo-elemen (attr data-word): hiasan murni, tidak dibaca pembaca layar dan tidak diperiksa sebagai teks. */}
      <div aria-hidden="true" data-word="PintuWeb" className="serif pointer-events-none mt-6 translate-y-[0.1em] select-none whitespace-nowrap px-4 text-center text-[21vw] leading-[0.8] tracking-[-0.045em] text-white/[0.06] before:content-[attr(data-word)] sm:mt-10 sm:px-6" />
    </footer>
  )
}
