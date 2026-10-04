// Layout akar per bahasa. URL Indonesia tanpa awalan (/paket) ditulis ulang ke /id/… oleh next.config.ts.
import '../globals.css'
import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { IBM_Plex_Mono, Schibsted_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { JsonLd } from '../components/Bits'
import { DEMOS } from '../lib/demos'
import { SITE, WA_DISPLAY, wa } from '../lib/site'
import { LANGS, LANG_INFO, getDict, isLang, type Lang } from '../i18n'
import { hasPage, path } from '../i18n/routes'
import { siteGraph } from '../i18n/seo'

// Judul: Newsreader 500 dengan sumbu optical size (dihost sendiri; Google tidak menyediakan berat tetap + opsz lewat next/font/google).
const serif = localFont({
  src: '../fonts/newsreader-500-opsz.woff2',
  weight: '500',
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})
// Miring hanya untuk penekanan di beberapa judul: tidak dipramuat supaya tidak berebut dengan font utama.
const serifItalic = localFont({
  src: '../fonts/newsreader-500-italic.woff2',
  weight: '500',
  style: 'italic',
  variable: '--font-serif-italic',
  display: 'swap',
  preload: false,
  fallback: ['Georgia', 'serif'],
})
const sans = Schibsted_Grotesk({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: '500', variable: '--font-mono', display: 'swap', preload: false })

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
    <html lang={LANG_INFO[lang].htmlLang} className={`${serif.variable} ${serifItalic.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
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
