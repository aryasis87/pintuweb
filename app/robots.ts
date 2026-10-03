import type { MetadataRoute } from 'next'
import { SITE } from './lib/site'

// Semua perayap boleh masuk. Perayap mesin pencari & asisten AI disebut eksplisit supaya niatnya jelas:
// pemilik ingin PintuWeb bisa ditemukan dan dikutip seluas mungkin (keputusan 3 Okt 2026).
const AI_AND_SEARCH = [
  'Googlebot', 'Bingbot', 'Applebot', 'DuckDuckBot', 'YandexBot',
  'OAI-SearchBot', 'ChatGPT-User', 'GPTBot',
  'Claude-SearchBot', 'Claude-User', 'ClaudeBot',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended',
  'Meta-ExternalAgent', 'Amazonbot', 'CCBot', 'DuckAssistBot', 'MistralAI-User',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // /api/og harus terbuka: gambar pratinjau tautan diambil perayap media sosial.
      { userAgent: '*', allow: '/' },
      { userAgent: AI_AND_SEARCH, allow: '/' },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
