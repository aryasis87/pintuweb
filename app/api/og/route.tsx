// Gambar Open Graph 1200×630 dengan gaya situs: putih lapang, judul serif Newsreader, teks Schibsted Grotesk.
//   /api/og?l=en&t=Judul      -> kartu judul halaman
//   /api/og?v=home&l=id       -> kartu beranda (kalimat & angka dari kamus, lib/site.ts & lib/demos.ts)
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getDict } from '../../i18n'
import { isLang, type Lang } from '../../i18n/config'
import { DEMOS } from '../../lib/demos'

const C = { white: '#ffffff', ink: '#0f1b33', ink2: '#4d5b74', blue: '#26469c', line: '#dfe5ef', soft: '#f4f7fc' }

const TAG: Record<Lang, string> = {
  id: 'Jasa pembuatan website',
  en: 'Website design & development',
  ms: 'Perkhidmatan laman web',
}

const fonts = async () => {
  const dir = join(process.cwd(), 'app/api/og/fonts')
  const [serif, serifItalic, sans] = await Promise.all(
    ['Newsreader-Medium.ttf', 'Newsreader-MediumItalic.ttf', 'SchibstedGrotesk-Regular.ttf'].map((f) => readFile(join(dir, f))),
  )
  return [
    { name: 'Serif', data: serif, weight: 500 as const, style: 'normal' as const },
    { name: 'Serif', data: serifItalic, weight: 500 as const, style: 'italic' as const },
    { name: 'Sans', data: sans, weight: 400 as const, style: 'normal' as const },
  ]
}

/** Tanda PintuWeb (sama dengan components/Logo.tsx). */
function Mark({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill={color}>
      <path fillRule="evenodd" d="M5 30V15C5 8.92 9.92 4 16 4s11 4.92 11 11v15zM10.5 30V15.5a5.5 5.5 0 0 1 11 0V30z" />
      <path d="M10.5 30V16.8l7.5-1.6V30z" opacity={0.45} />
    </svg>
  )
}

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams
  const raw = q.get('l') ?? ''
  const lang: Lang = isLang(raw) ? raw : 'id'
  const d = getDict(lang)
  const home = q.get('v') === 'home'
  const title = (q.get('t') ?? 'PintuWeb').slice(0, 120)
  const size = title.length > 70 ? 56 : title.length > 40 ? 68 : 80
  const [h0, h1, h2] = d.hero.title

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: C.white, padding: '56px 72px', fontFamily: 'Sans', position: 'relative' }}>
        {/* Pintu di kanan bawah: lengkung bergaris + ambang */}
        <div style={{ position: 'absolute', right: 72, bottom: 128, width: 230, height: 330, display: 'flex', flexDirection: 'column', borderTopLeftRadius: 115, borderTopRightRadius: 115, overflow: 'hidden' }}>
          <div style={{ display: 'flex', flex: 1, borderTopLeftRadius: 115, borderTopRightRadius: 115, border: `2px solid ${C.line}`, padding: 6 }}>
            <div style={{ display: 'flex', flex: 1, borderTopLeftRadius: 109, borderTopRightRadius: 109, background: C.soft, alignItems: 'center', justifyContent: 'center' }}>
              <Mark size={120} color={C.blue} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 32, fontSize: 22, color: C.ink2 }}>
          <span style={{ display: 'flex', color: C.blue }}>{d.hero.kicker}</span>
          <span style={{ display: 'flex' }}>{home ? d.hero.meta(DEMOS.length) : TAG[lang]}</span>
        </div>

        {home ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', width: 780, fontFamily: 'Serif', fontSize: 92, lineHeight: 1.0, letterSpacing: -2.5, color: C.ink }}>
            <span style={{ display: 'flex', marginRight: 22 }}>{h0.trim()}</span>
            <span style={{ display: 'flex', fontStyle: 'italic', color: C.blue, marginRight: 22 }}>{h1}</span>
            <span style={{ display: 'flex' }}>{(h2 ?? '').trim()}</span>
          </div>
        ) : (
          <div style={{ display: 'flex', width: 780, fontFamily: 'Serif', fontSize: size, lineHeight: 1.06, letterSpacing: -1.5, color: C.ink }}>{title}</div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Mark size={44} color={C.blue} />
            <span style={{ display: 'flex', fontFamily: 'Serif', fontSize: 40, color: C.ink, letterSpacing: -0.5 }}>PintuWeb</span>
          </div>
          <span style={{ display: 'flex', fontSize: 22, color: C.ink2 }}>www.pintuweb.com · {lang.toUpperCase()}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: await fonts(), headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable' } },
  )
}
