'use client'

import { useState } from 'react'
import { Check, Link2 } from 'lucide-react'

/** Menyalin teks: Clipboard API bila tersedia, kalau gagal lewat textarea sementara + execCommand. */
async function copyText(text: string) {
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

/** Tombol "Salin tautan" halaman ini. */
export default function CopyLink({ label, done }: { label: string; done: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        if (!(await copyText(window.location.href))) return
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2200)
      }}
      className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-white px-3.5 text-[0.8125rem] font-semibold text-[color:var(--text-secondary)] ring-1 ring-[color:var(--border-light)] transition-colors hover:text-[color:var(--primary-700)] hover:ring-[color:var(--primary-300)]"
    >
      {copied ? <Check size={14} aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />}
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  )
}
