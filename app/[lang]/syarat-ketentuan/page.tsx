import type { Metadata } from 'next'
import LegalPage from '../../components/LegalPage'
import { getPages, isLang, type Lang } from '../../i18n'
import { pageMeta } from '../../i18n/seo'

type Params = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const p = getPages(lang).legal
  return pageMeta({ lang, ref: { key: 'terms' }, title: p.termsTitle, description: p.termsDescription })
}

export default async function TermsPage({ params }: Params) {
  const lang = (await params).lang as Lang
  return <LegalPage lang={lang} which="terms" />
}
