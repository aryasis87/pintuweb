import type { Metadata } from 'next'
import ContactForm, { type ContactText } from './ContactForm'
import { JsonLd } from '../../components/Bits'
import { facts, packagesFor } from '../../i18n/facts'
import { getDict, getPages, isLang, type Lang } from '../../i18n'
import { urlOf } from '../../i18n/routes'
import { ORG_ID, pageGraph, pageMeta } from '../../i18n/seo'
import { EMAIL, WA_DISPLAY, WA_NUMBER } from '../../lib/site'

type Params = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const p = getPages(lang).contact
  return pageMeta({ lang, ref: { key: 'contact' }, title: p.title, description: p.description, ogTitle: p.ogTitle, ogDescription: p.ogDescription })
}

export default async function KontakPage({ params }: Params) {
  const lang = (await params).lang as Lang
  const d = getDict(lang)
  const p = getPages(lang).contact
  const f = facts(lang)
  // Semua isi p.contact berupa string, jadi aman dikirim ke komponen klien.
  const t: ContactText = p
  return (
    <>
      <JsonLd
        data={pageGraph({
          lang,
          ref: { key: 'contact' },
          name: p.pageName,
          description: p.description,
          type: 'ContactPage',
          crumbs: [
            { name: d.common.home, url: urlOf(lang, { key: 'home' }) },
            { name: d.nav.contact, url: urlOf(lang, { key: 'contact' }) },
          ],
          extra: [{ '@id': ORG_ID }],
        })}
      />
      <ContactForm
        t={t}
        packages={packagesFor(lang).map((x) => x.title)}
        waNumber={WA_NUMBER}
        waDisplay={WA_DISPLAY}
        email={EMAIL}
        location={f.location}
        serves={f.serves}
        hoursDays={f.hoursDays}
        hoursTime={f.hoursTime}
      />
    </>
  )
}
