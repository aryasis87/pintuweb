'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Hl } from '../../i18n/dict/id'

type Form = { nama: string; usaha: string; paket: string; demo: string; pesan: string }
const EMPTY: Form = { nama: '', usaha: '', paket: '', demo: '', pesan: '' }

export type ContactText = {
  badge: string
  h1: Hl
  lead: string
  name: string
  business: string
  optional: string
  pkg: string
  pkgUnsure: string
  demo: string
  demoPh: string
  message: string
  messagePh: string
  errName: string
  errMessage: string
  sendWa: string
  sendEmail: string
  privacy: string
  infoAria: string
  infoWa: string
  infoEmail: string
  infoLocation: string
  infoHours: string
  msgIntro: string
  msgName: string
  msgBusiness: string
  msgPkg: string
  msgDemo: string
  subject: string
}

type Props = {
  t: ContactText
  packages: string[]
  waNumber: string
  waDisplay: string
  email: string
  location: string
  serves: string
  hoursDays: string
  hoursTime: string
}

export default function ContactForm({ t, packages, waNumber, waDisplay, email, location, serves, hoursDays, hoursTime }: Props) {
  const [f, setF] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})

  const info = [
    { title: t.infoWa, value: waDisplay, href: `https://wa.me/${waNumber}` },
    { title: t.infoEmail, value: email, href: `mailto:${email}` },
    { title: t.infoLocation, value: location, sub: serves },
    { title: t.infoHours, value: hoursDays, sub: hoursTime },
  ]

  const compose = () => {
    const detail = [
      `${t.msgName}: ${f.nama.trim()}`,
      f.usaha.trim() ? `${t.msgBusiness}: ${f.usaha.trim()}` : null,
      `${t.msgPkg}: ${f.paket || t.pkgUnsure}`,
      f.demo.trim() ? `${t.msgDemo}: ${f.demo.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n')
    return `${t.msgIntro}\n\n${detail}\n\n${f.pesan.trim()}`
  }

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }))

  const validate = () => {
    const e: typeof errors = {}
    if (!f.nama.trim()) e.nama = t.errName
    if (f.pesan.trim().length < 10) e.pesan = t.errMessage
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const sendWa = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(compose())}`, '_blank', 'noopener,noreferrer')
  }

  const sendEmail = () => {
    if (!validate()) return
    const subject = `${t.subject} — ${f.nama.trim()}`
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(compose())}`
  }

  const field =
    'mt-1 w-full border-0 border-b border-[color:var(--border-medium)] bg-transparent px-0 py-2.5 text-base text-[color:var(--text-primary)] outline-none transition-colors placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--primary-700)]'
  const label = 'kicker text-[color:var(--text-tertiary)]'
  const err = 'mt-1.5 text-sm font-medium text-[color:var(--error-700)]'

  return (
    <main id="main-content" className="pb-20 pt-28 sm:pb-28 sm:pt-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 border-b border-[color:var(--rule)] pb-10 lg:grid-cols-12">
          <p className="kicker text-[color:var(--primary-700)] lg:col-span-12">{t.badge}</p>
          <h1 className="text-[2.6rem] leading-[1.03] text-[color:var(--text-primary)] sm:text-6xl lg:col-span-10 lg:text-[4.4rem]">
            {t.h1[0]}
            <em className="text-[color:var(--primary-700)]">{t.h1[1]}</em>
            {t.h1[2] ?? ''}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-[color:var(--text-tertiary)] lg:col-span-7 lg:text-[1.2rem]">{t.lead}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12">
          {/* Form */}
          <form onSubmit={sendWa} noValidate className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
              <div>
                <label htmlFor="nama" className={label}>{t.name} <span aria-hidden="true" className="text-[color:var(--error-700)]">*</span></label>
                <input id="nama" autoComplete="name" value={f.nama} onChange={set('nama')} aria-invalid={!!errors.nama} aria-describedby={errors.nama ? 'nama-err' : undefined} className={field} />
                {errors.nama && <p id="nama-err" className={err}>{errors.nama}</p>}
              </div>
              <div>
                <label htmlFor="usaha" className={label}>{t.business}</label>
                <input id="usaha" autoComplete="organization" value={f.usaha} onChange={set('usaha')} className={field} placeholder={t.optional} />
              </div>
              <div>
                <label htmlFor="paket" className={label}>{t.pkg}</label>
                <select id="paket" value={f.paket} onChange={set('paket')} className={field}>
                  <option value="">{t.pkgUnsure}</option>
                  {packages.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="demo" className={label}>{t.demo}</label>
                <input id="demo" value={f.demo} onChange={set('demo')} className={field} placeholder={t.demoPh} />
              </div>
            </div>
            <div className="mt-7">
              <label htmlFor="pesan" className={label}>{t.message} <span aria-hidden="true" className="text-[color:var(--error-700)]">*</span></label>
              <textarea id="pesan" rows={5} value={f.pesan} onChange={set('pesan')} aria-invalid={!!errors.pesan} aria-describedby={errors.pesan ? 'pesan-err' : undefined} className={`${field} resize-y`} placeholder={t.messagePh} />
              {errors.pesan && <p id="pesan-err" className={err}>{errors.pesan}</p>}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="btn btn-solid">
                {t.sendWa} <ArrowUpRight size={17} className="arw arw-ne" aria-hidden="true" />
              </button>
              <button type="button" onClick={sendEmail} className="btn btn-line">
                {t.sendEmail} <ArrowUpRight size={17} className="arw arw-ne" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-5 max-w-lg text-sm text-[color:var(--text-tertiary)]">{t.privacy}</p>
          </form>

          {/* Info */}
          <aside aria-label={t.infoAria} className="lg:col-span-4 lg:col-start-9">
            <dl className="border-t border-[color:var(--rule)]">
              {info.map((i) => (
                <div key={i.title} className="border-b border-[color:var(--border-light)] py-4">
                  <dt className="kicker text-[color:var(--text-tertiary)]">{i.title}</dt>
                  <dd className="mt-1.5">
                    {i.href ? (
                      <a href={i.href} target={i.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="serif break-all text-[1.35rem] text-[color:var(--text-primary)] underline decoration-[color:var(--neutral-300)] underline-offset-4 hover:text-[color:var(--primary-700)] hover:decoration-current">
                        {i.value}
                      </a>
                    ) : (
                      <span className="serif text-[1.35rem] text-[color:var(--text-primary)]">{i.value}</span>
                    )}
                    {i.sub && <span className="mt-0.5 block text-sm text-[color:var(--text-tertiary)]">{i.sub}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </main>
  )
}
