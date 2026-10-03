// Slug per bahasa untuk halaman bertingkat (layanan & artikel). Dipakai untuk membangun URL,
// hreflang, dan pemilih bahasa. Isi lengkapnya ada di app/content/.
import type { Lang } from './config'

export const SERVICE_SLUGS = {
  'landing-page': { id: 'landing-page', en: 'landing-page', ms: 'landing-page' },
  'company-profile': { id: 'company-profile', en: 'company-profile-website', ms: 'laman-web-syarikat' },
  'toko-online': { id: 'toko-online', en: 'online-store', ms: 'kedai-dalam-talian' },
  portofolio: { id: 'website-portofolio', en: 'portfolio-website', ms: 'laman-web-portfolio' },
  'website-custom': { id: 'website-custom', en: 'custom-website', ms: 'laman-web-tersuai' },
  'undangan-digital': { id: 'undangan-digital', en: 'digital-invitation', ms: 'kad-jemputan-digital' },
  'link-in-bio': { id: 'link-in-bio', en: 'link-in-bio', ms: 'link-in-bio' },
} satisfies Record<string, Record<Lang, string>>

export type ServiceKey = keyof typeof SERVICE_SLUGS
export const SERVICE_KEYS = Object.keys(SERVICE_SLUGS) as ServiceKey[]

/** Artikel hanya ada dalam ID & EN. */
export const ARTICLE_SLUGS = {
  biaya: { id: 'biaya-membuat-website', en: 'website-cost-indonesia' },
  'landing-vs-compro': { id: 'landing-page-vs-company-profile', en: 'landing-page-vs-company-profile' },
  'website-umkm': { id: 'cara-membuat-website-umkm', en: 'small-business-website-guide' },
  'domain-hosting': { id: 'domain-dan-hosting-untuk-pemula', en: 'domain-and-hosting-basics' },
  'website-vs-sosmed': { id: 'website-vs-media-sosial', en: 'website-vs-social-media' },
  'seo-checklist': { id: 'checklist-seo-website-baru', en: 'new-website-seo-checklist' },
  'pilih-jasa': { id: 'cara-memilih-jasa-pembuatan-website', en: 'how-to-choose-a-web-developer' },
  undangan: { id: 'panduan-undangan-digital', en: 'digital-invitation-guide' },
} satisfies Record<string, Partial<Record<Lang, string>>>

export type ArticleKey = keyof typeof ARTICLE_SLUGS
export const ARTICLE_KEYS = Object.keys(ARTICLE_SLUGS) as ArticleKey[]

export const serviceKeyBySlug = (lang: Lang, slug: string) =>
  SERVICE_KEYS.find((k) => SERVICE_SLUGS[k][lang] === slug)

export const articleKeyBySlug = (lang: Lang, slug: string) =>
  ARTICLE_KEYS.find((k) => (ARTICLE_SLUGS[k] as Partial<Record<Lang, string>>)[lang] === slug)
