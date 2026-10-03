import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Hl } from '../i18n/dict/id'

/** Judul berpola [biasa, sorotan, sisa?]: bagian sorotan berwarna aksen. */
export function HlText({ parts, tone = 'primary' }: { parts: Hl; tone?: 'primary' | 'accent' }) {
  const color = tone === 'accent' ? 'text-[color:var(--accent-300)]' : 'text-[color:var(--primary-700)]'
  return (
    <>
      {parts[0]}
      <span className={color}>{parts[1]}</span>
      {parts[2] ?? ''}
    </>
  )
}

/** Data terstruktur JSON-LD. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

/** Jejak navigasi yang terlihat (pasangan BreadcrumbList di JSON-LD). */
export function Breadcrumbs({ items, label }: { items: { name: string; href?: string }[]; label: string }) {
  return (
    <nav aria-label={label} className="mx-auto max-w-6xl px-4 pt-24 sm:px-6 sm:pt-28">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[color:var(--text-tertiary)]">
        {items.map((it, i) => (
          <li key={it.name} className="inline-flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={14} aria-hidden="true" className="text-[color:var(--text-muted)]" />}
            {it.href ? (
              <Link href={it.href} className="underline-offset-4 hover:text-[color:var(--primary-700)] hover:underline">{it.name}</Link>
            ) : (
              <span aria-current="page" className="font-medium text-[color:var(--text-secondary)]">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
