// Bentuk kata menurut kaidah jamak suatu bahasa (Intl.PluralRules), untuk teks yang memuat angka:
// plural('ru-RU', 5, { one: 'пакет', few: 'пакета', many: 'пакетов', other: 'пакета' }) -> "пакетов".
// Dipakai bahasa yang katanya berubah menurut angka (Rusia, Arab); bahasa lain cukup menulis satu bentuk.
import type { Plural } from './x/types'

const rules = new Map<string, Intl.PluralRules>()

export function plural(locale: string, n: number, forms: Plural): string {
  if (!rules.has(locale)) rules.set(locale, new Intl.PluralRules(locale))
  return forms[rules.get(locale)!.select(n) as keyof Plural] ?? forms.other
}
