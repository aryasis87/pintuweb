// Layout akar per bahasa. URL Indonesia tanpa awalan (/paket) ditulis ulang ke /id/… oleh next.config.ts.
import '../globals.css'
import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { Inter, Bricolage_Grotesque } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { JsonLd } from '../components/Bits'
import { DEMOS } from '../lib/demos'
import { SITE, WA_DISPLAY, wa } from '../lib/site'
import { LANGS, LANG_INFO, getDict, isLang, type Lang } from '../i18n'
import { hasPage, path } from '../i18n/routes'
import { siteGraph } from '../i18n/seo'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['600', '700', '800'] })

export const dynamicParams = false
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }))

type Params = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = getDict(lang)
  return {
    metadataBase: new URL(SITE),
    title: { default: t.meta.homeTitle, template: '%s | PintuWeb' },
    description: t.meta.homeDescription(DEMOS.length),
    applicationName: 'PintuWeb',
    authors: [{ name: 'Sanzy', url: `${SITE}/owner` }],
    creator: 'PintuWeb',
    publisher: 'PintuWeb',
    keywords: t.meta.keywords,
    category: 'technology',
    formatDetection: { telephone: false, email: false, address: false },
    icons: {
      icon: [
        { url: '/images/favicon.ico' },
        { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      shortcut: '/images/favicon.ico',
      apple: '/images/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    // Kode verifikasi diisi lewat variabel lingkungan Vercel bila tersedia (Google Search Console, Bing).
    verification: {
      ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
      ...(process.env.BING_SITE_VERIFICATION ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } } : {}),
    },
    alternates: { types: { 'application/rss+xml': [{ url: lang === 'en' ? '/en/articles/rss' : '/artikel/rss', title: lang === 'en' ? 'PintuWeb articles' : 'Artikel PintuWeb' }] } },
  }
}

export const viewport: Viewport = {
  themeColor: '#26469c',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default async function LangLayout({ children, params }: { children: React.ReactNode } & Params) {
  const { lang: raw } = await params
  if (!isLang(raw)) notFound()
  const lang: Lang = raw
  const t = getDict(lang)

  const nav = [
    { label: t.nav.services, href: path(lang, 'services') },
    { label: t.nav.demo, href: path(lang, 'demo') },
    { label: t.nav.pricing, href: path(lang, 'pricing') },
    ...(hasPage(lang, 'articles') ? [{ label: t.nav.articles, href: path(lang, 'articles') }] : []),
    { label: t.nav.faq, href: path(lang, 'faq') },
    { label: t.nav.about, href: path(lang, 'about') },
    { label: t.nav.contact, href: path(lang, 'contact') },
  ]

  return (
    <html lang={LANG_INFO[lang].htmlLang} className={`${inter.variable} ${bricolage.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">{t.common.skip}</a>
        <Header
          lang={lang}
          homeHref={path(lang, 'home')}
          nav={nav}
          waHref={wa(t.header.waText)}
          waDisplay={WA_DISPLAY}
          t={{
            tagline: t.header.tagline,
            brandAria: t.header.brandAria,
            logoAlt: t.header.logoAlt,
            mainNav: t.header.mainNav,
            mobileNav: t.header.mobileNav,
            guarantee: t.header.guarantee,
            consult: t.header.consult,
            consultFree: t.header.consultFree,
            openMenu: t.header.openMenu,
            closeMenu: t.header.closeMenu,
            demosReady: t.header.demosReady(DEMOS.length),
            respond: t.header.respond,
            language: t.header.language,
            notAvailable: t.header.notAvailable,
          }}
        />
        {children}
        <Footer lang={lang} />
        <JsonLd data={siteGraph(lang)} />
        <Analytics />
      </body>
    </html>
  )
}
