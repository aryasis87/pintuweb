import { Rocket, Building2, ShoppingBag, UserRound, Code2, Mail, Link2 } from 'lucide-react'
import { packagesFor } from '../i18n/facts'
import type { Lang } from '../i18n/config'
import type { Service } from './services'

export const SERVICE_ICONS = { Rocket, Building2, ShoppingBag, UserRound, Code2, Mail, Link2 }

/** Harga mulai & durasi dari paket termurah layanan (packages.ts); null bila layanan tanpa paket. */
export function serviceFrom(lang: Lang, s: Service) {
  const pk = packagesFor(lang)
  const list = s.packages.map((slug) => pk.find((p) => p.slug === slug)!).filter(Boolean)
  if (!list.length) return null
  const cheapest = list.reduce((a, b) => (a.minPrice <= b.minPrice ? a : b))
  return { price: cheapest.priceFrom, duration: cheapest.duration, list }
}
