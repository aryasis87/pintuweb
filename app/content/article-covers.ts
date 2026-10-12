// Sampul tipografi artikel. Artikel tidak punya foto, jadi tiap artikel diberi satu tanda singkat yang mewakili
// isinya (dipakai sama di semua bahasa) dan sepasang warna. Warnanya meminjam palet CATEGORY_COLOR supaya
// serasi dengan bagian lain; pasangannya hanya soal palet, bukan berarti artikelnya termasuk jenis website itu.
import type { DemoCategory } from '../lib/demos'
import type { ArticleKey } from '../i18n/slugs'

export const ARTICLE_COVER: Record<ArticleKey, { mark: string; tone: DemoCategory }> = {
  biaya: { mark: 'Rp', tone: 'properti' },
  'website-umkm': { mark: '0→1', tone: 'portfolio' },
  'pilih-jasa': { mark: '12', tone: 'reservasi' },
  'seo-checklist': { mark: 'SEO', tone: 'kontes' },
  'domain-hosting': { mark: '.id', tone: 'linkinbio' },
  'landing-vs-compro': { mark: 'vs', tone: 'landing' },
  undangan: { mark: 'RSVP', tone: 'undangan' },
  'website-vs-sosmed': { mark: '@', tone: 'todo' },
}
