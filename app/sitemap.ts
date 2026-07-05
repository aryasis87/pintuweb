import type { MetadataRoute } from 'next'

const SITE = 'https://pintuweb.id'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1.0, freq: 'weekly' },
    { path: '/paket', priority: 0.9, freq: 'weekly' },
    { path: '/services', priority: 0.8, freq: 'monthly' },
    { path: '/about', priority: 0.7, freq: 'monthly' },
    { path: '/faq', priority: 0.6, freq: 'monthly' },
    { path: '/owner', priority: 0.5, freq: 'yearly' },
  ]
  return routes.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }))
}
