import Image from 'next/image'
import Link from 'next/link'
import { Mail, PhoneCall, MapPin, Clock, MessageCircle, ArrowUpRight } from 'lucide-react'
import { EMAIL, WA_DISPLAY, WA_NUMBER, wa } from '../lib/site'
import { PORTALS } from '../lib/portals'
import { getDict } from '../i18n'
import { facts } from '../i18n/facts'
import { LANGS, LANG_INFO, type Lang } from '../i18n/config'
import { hasPage, path, pathOf } from '../i18n/routes'
import { SERVICES } from '../content/services'
import { HlText } from './Bits'

// Footer = peta tautan internal: semua layanan, galeri, sumber daya, dan halaman perusahaan di setiap halaman.
export default function Footer({ lang }: { lang: Lang }) {
  const t = getDict(lang)
  const f = facts(lang)
  const year = new Date().getFullYear()

  const CONTACTS = [
    { icon: PhoneCall, title: t.footer.phone, value: WA_DISPLAY, link: `https://wa.me/${WA_NUMBER}` },
    { icon: Mail, title: t.footer.email, value: EMAIL, link: `mailto:${EMAIL}` },
    { icon: MapPin, title: t.footer.location, value: f.location, sub: f.serves },
    { icon: Clock, title: t.footer.hours, value: f.hoursDays, sub: f.hoursTime },
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
    <footer id="contact" className="relative overflow-hidden bg-gradient-neutral px-4 pt-16 text-white sm:px-6 lg:pt-20" aria-label={t.footer.aria}>
      <div className="pointer-events-none absolute inset-0 u-grid opacity-[0.06]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* CTA + contact */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                <Image src="/images/logo.webp" alt={t.header.logoAlt} width={26} height={26} unoptimized className="h-6 w-6 object-contain" />
              </span>
              <span className="font-[family-name:var(--font-display)] text-xl font-extrabold">
                Pintu<span className="text-[color:var(--accent-300)]">Web</span>
              </span>
            </div>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              <HlText parts={t.footer.title} tone="accent" />
            </h2>
            <p className="mt-4 max-w-md text-white/70">{t.footer.lead(f.response)}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={wa(t.footer.waText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--accent-300)] px-7 py-3.5 font-semibold text-[color:var(--text-primary)] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[color:var(--accent-200)]"
              >
                <MessageCircle size={18} /> {t.footer.chat}
              </a>
              <Link href={path(lang, 'pricing')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10">
                {t.footer.seePackages} <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CONTACTS.map((c) => {
              const inner = (
                <div className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color:var(--accent-300)]/20 text-[color:var(--accent-300)]">
                    <c.icon size={19} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{c.title}</p>
                    <p className={`mt-0.5 text-sm ${c.link ? 'break-all text-[color:var(--accent-300)]' : 'text-white/70'}`}>{c.value}</p>
                    {c.sub && <p className="mt-0.5 text-xs text-white/60">{c.sub}</p>}
                  </div>
                </div>
              )
              return c.link ? (
                <a key={c.title} href={c.link} target="_blank" rel="noopener noreferrer" className="block">{inner}</a>
              ) : (
                <div key={c.title}>{inner}</div>
              )
            })}
          </div>
        </div>

        {/* Peta tautan */}
        <nav aria-label={t.footer.linksAria} className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-4">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-200)]">{c.title}</p>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l.href}>
                    {l.zone ? (
                      // Portal = zona Next terpisah: tautan biasa, bukan navigasi klien.
                      <a href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">{l.label}</a>
                    ) : (
                      <Link href={l.href} prefetch={false} className="text-sm text-white/70 transition-colors hover:text-white">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 lg:flex-row">
          <p className="text-sm text-white/60">{t.footer.copyright(year)}</p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-white/60">
            <span>{t.footer.otherLangs}:</span>
            {LANGS.filter((l) => l !== lang).map((l) => (
              <a key={l} href={path(l, 'home')} hrefLang={LANG_INFO[l].hreflang} lang={LANG_INFO[l].htmlLang} className="font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline">
                {LANG_INFO[l].name}
              </a>
            ))}
          </p>
          <p className="text-sm text-white/60">{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  )
}
