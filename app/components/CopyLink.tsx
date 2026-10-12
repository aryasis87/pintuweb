'use client'

import { useState } from 'react'
import { Check, Link2 } from 'lucide-react'

/** Menyalin teks: Clipboard API bila tersedia, kalau gagal lewat textarea sementara + execCommand. */
export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      ta.remove()
      return ok
    } catch {
      return false
    }
  }
}

type Props = {
  label: string
  done: string
  /** bila diisi, yang disalin adalah alamat halaman ini + #hash (mis. satu pertanyaan di halaman FAQ) */
  hash?: string
  /** tampil sebagai tautan teks, bukan pil */
  plain?: boolean
}

/** Tombol "Salin tautan" halaman ini (atau satu bagiannya). */
export default function CopyLink({ label, done, hash, plain = false }: Props) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        const url = hash ? `${window.location.origin}${window.location.pathname}#${hash}` : window.location.href
        if (!(await copyText(url))) return
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2200)
      }}
      className={
        plain
          ? 'inline-flex min-h-8 items-center gap-1.5 text-[0.8125rem] font-semibold text-[color:var(--text-secondary)] underline-offset-4 transition-colors hover:text-[color:var(--primary-700)] hover:underline'
          : 'inline-flex min-h-9 items-center gap-1.5 rounded-full bg-white px-3.5 text-[0.8125rem] font-semibold text-[color:var(--text-secondary)] ring-1 ring-[color:var(--border-light)] transition-colors hover:text-[color:var(--primary-700)] hover:ring-[color:var(--primary-300)]'
      }
    >
      {copied ? <Check size={14} aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />}
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  )
}
