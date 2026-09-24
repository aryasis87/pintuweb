'use client'

import { useState } from 'react'
import { MessageCircle, Mail, PhoneCall, MapPin, Clock } from 'lucide-react'
import { PACKAGES, WA_NUMBER } from '../lib/packages'

const EMAIL = 'sanzystore@gmail.com'

type Form = { nama: string; usaha: string; paket: string; demo: string; pesan: string }
const EMPTY: Form = { nama: '', usaha: '', paket: '', demo: '', pesan: '' }

const INFO = [
  { icon: PhoneCall, title: 'WhatsApp', value: '+62 813 3990 8765', href: `https://wa.me/${WA_NUMBER}` },
  { icon: Mail, title: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: MapPin, title: 'Lokasi', value: 'Trenggalek, Jawa Timur', sub: 'Melayani seluruh Indonesia' },
  { icon: Clock, title: 'Jam operasional', value: 'Senin – Sabtu', sub: '09.00 – 17.00 WIB' },
]

function compose(f: Form) {
  const detail = [
    `Nama: ${f.nama.trim()}`,
    f.usaha.trim() ? `Usaha/instansi: ${f.usaha.trim()}` : null,
    `Paket yang diminati: ${f.paket || 'Belum tahu, mohon saran'}`,
    f.demo.trim() ? `Demo yang saya suka: ${f.demo.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n')
  return `Halo PintuWeb, saya ingin konsultasi pembuatan website.\n\n${detail}\n\n${f.pesan.trim()}`
}

export default function ContactForm() {
  const [f, setF] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }))

  const validate = () => {
    const e: typeof errors = {}
    if (!f.nama.trim()) e.nama = 'Nama wajib diisi'
    if (f.pesan.trim().length < 10) e.pesan = 'Ceritakan kebutuhanmu minimal 10 karakter'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const sendWa = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(compose(f))}`, '_blank', 'noopener,noreferrer')
  }

  const sendEmail = () => {
    if (!validate()) return
    const subject = `Konsultasi website — ${f.nama.trim()}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(compose(f))}`
  }

  const field =
    'mt-1.5 w-full rounded-xl border border-[color:var(--border-light)] bg-white px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--primary-700)] focus:ring-2 focus:ring-[color:var(--primary-100)]'
  const label = 'text-sm font-semibold text-[color:var(--text-secondary)]'
  const err = 'mt-1 text-xs font-medium text-red-600'

  return (
    <main id="main-content" className="relative overflow-hidden pb-20 pt-28 sm:pt-32" style={{ backgroundColor: 'var(--surface-primary)' }}>
      <div className="pointer-events-none absolute inset-0 u-grid u-grid-fade opacity-60" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-light)] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--primary-700)]">
            Kontak
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl lg:text-5xl">
            Ceritakan websitemu. <span className="text-[color:var(--primary-700)]">Konsultasi gratis.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[color:var(--text-tertiary)] sm:text-lg">
            Isi singkat di bawah, lalu kirim lewat WhatsApp atau email — pesanmu sudah tersusun rapi, tinggal tekan kirim.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <form onSubmit={sendWa} noValidate className="rounded-3xl border border-[color:var(--border-light)] bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nama" className={label}>Nama <span aria-hidden="true" className="text-red-600">*</span></label>
                <input id="nama" autoComplete="name" value={f.nama} onChange={set('nama')} aria-invalid={!!errors.nama} aria-describedby={errors.nama ? 'nama-err' : undefined} className={field} />
                {errors.nama && <p id="nama-err" className={err}>{errors.nama}</p>}
              </div>
              <div>
                <label htmlFor="usaha" className={label}>Usaha / instansi</label>
                <input id="usaha" autoComplete="organization" value={f.usaha} onChange={set('usaha')} className={field} placeholder="opsional" />
              </div>
              <div>
                <label htmlFor="paket" className={label}>Paket yang diminati</label>
                <select id="paket" value={f.paket} onChange={set('paket')} className={field}>
                  <option value="">Belum tahu, mohon saran</option>
                  {PACKAGES.map((p) => (
                    <option key={p.slug} value={p.title}>{p.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="demo" className={label}>Demo yang kamu suka</label>
                <input id="demo" value={f.demo} onChange={set('demo')} className={field} placeholder="mis. Woodora, Noelle (opsional)" />
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="pesan" className={label}>Kebutuhanmu <span aria-hidden="true" className="text-red-600">*</span></label>
              <textarea id="pesan" rows={5} value={f.pesan} onChange={set('pesan')} aria-invalid={!!errors.pesan} aria-describedby={errors.pesan ? 'pesan-err' : undefined} className={field} placeholder="Website untuk apa, fitur yang diinginkan, target selesai, dll." />
              {errors.pesan && <p id="pesan-err" className={err}>{errors.pesan}</p>}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-green-700">
                <MessageCircle size={17} /> Kirim via WhatsApp
              </button>
              <button type="button" onClick={sendEmail} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[color:var(--border-light)] bg-white px-6 py-3.5 text-sm font-semibold text-[color:var(--text-primary)] transition hover:-translate-y-0.5 hover:shadow-md">
                <Mail size={17} /> Kirim via Email
              </button>
            </div>
            <p className="mt-4 text-xs text-[color:var(--text-muted)]">Data tidak disimpan di situs ini — langsung terkirim dari aplikasi WhatsApp atau email-mu.</p>
          </form>

          {/* Info */}
          <aside aria-label="Informasi kontak" className="space-y-4">
            {INFO.map((i) => {
              const body = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--primary-100)] text-[color:var(--primary-700)]"><i.icon size={19} /></span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-[color:var(--text-muted)]">{i.title}</span>
                    <span className="block font-bold text-[color:var(--text-primary)]">{i.value}</span>
                    {i.sub && <span className="block text-sm text-[color:var(--text-tertiary)]">{i.sub}</span>}
                  </span>
                </>
              )
              const cls = 'flex items-start gap-4 rounded-2xl border border-[color:var(--border-light)] bg-white p-5'
              return i.href ? (
                <a key={i.title} href={i.href} target={i.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={`${cls} transition hover:-translate-y-0.5 hover:shadow-md`}>{body}</a>
              ) : (
                <div key={i.title} className={cls}>{body}</div>
              )
            })}
          </aside>
        </div>
      </div>
    </main>
  )
}
