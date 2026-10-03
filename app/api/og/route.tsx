// Gambar Open Graph 1200×630 bertema biru elegan + putih.
//   /api/og?l=en&t=Judul      -> kartu judul halaman
//   /api/og?v=home&l=id       -> kartu merek beranda (angka dari lib/site.ts & lib/demos.ts)
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { CLIENT_PROJECTS, FOUNDED_YEAR } from '../../lib/site'
import { DEMOS } from '../../lib/demos'

const C = { white: '#ffffff', ink: '#0f1b33', ink2: '#4d5b74', blue: '#26469c', navy: '#1b2c52', ice: '#93bbff', line: '#e3e9f3', soft: '#f4f7fc' }

const COPY: Record<string, { tag: string; h: [string, string]; stats: [string, string][]; place: string }> = {
  id: {
    tag: 'Jasa pembuatan website',
    h: ['Pintu menuju', 'website impianmu.'],
    stats: [[CLIENT_PROJECTS, 'proyek klien'], [`${DEMOS.length}`, 'demo live'], [`${FOUNDED_YEAR}`, 'berdiri sejak']],
    place: 'Trenggalek, Jawa Timur',
  },
  en: {
    tag: 'Website design & development',
    h: ['Your doorway to', 'the website you want.'],
    stats: [[CLIENT_PROJECTS, 'client projects'], [`${DEMOS.length}`, 'live demos'], [`${FOUNDED_YEAR}`, 'founded']],
    place: 'Trenggalek, Indonesia',
  },
  ms: {
    tag: 'Perkhidmatan laman web',
    h: ['Pintu ke', 'laman web impian anda.'],
    stats: [[CLIENT_PROJECTS, 'projek pelanggan'], [`${DEMOS.length}`, 'demo langsung'], [`${FOUNDED_YEAR}`, 'ditubuhkan']],
    place: 'Trenggalek, Indonesia',
  },
}

const fonts = async () => {
  const dir = join(process.cwd(), 'app/api/og/fonts')
  const [display, body] = await Promise.all([readFile(join(dir, 'BricolageGrotesque-ExtraBold.ttf')), readFile(join(dir, 'Inter-Medium.ttf'))])
  return [
    { name: 'Display', data: display, weight: 800 as const, style: 'normal' as const },
    { name: 'Body', data: body, weight: 500 as const, style: 'normal' as const },
  ]
}

/** Gerbang khas PintuWeb: bingkai putih, isi gradien sapphire -> navy, belah ketupat biru es. */
function Arch() {
  return (
    <div style={{ position: 'absolute', right: 80, top: 70, width: 320, height: 500, display: 'flex' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', borderTopLeftRadius: 160, borderTopRightRadius: 160, borderRadius: 18, background: C.white, border: `2px solid ${C.line}`, boxShadow: '0 30px 60px -24px rgba(15,29,58,0.35)' }} />
      <div style={{ position: 'absolute', left: 12, right: 12, top: 12, bottom: 12, display: 'flex', borderTopLeftRadius: 148, borderTopRightRadius: 148, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, background: `linear-gradient(160deg, ${C.blue}, ${C.navy})` }} />
      <div style={{ position: 'absolute', left: 145, top: -15, width: 30, height: 30, display: 'flex', background: C.ice, transform: 'rotate(45deg)', borderRadius: 4 }} />
    </div>
  )
}

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams
  const lang = COPY[q.get('l') ?? ''] ? (q.get('l') as string) : 'id'
  const c = COPY[lang]
  const home = q.get('v') === 'home'
  const title = (q.get('t') ?? 'PintuWeb').slice(0, 120)
  const size = title.length > 70 ? 52 : title.length > 40 ? 62 : 74

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: C.white, position: 'relative', fontFamily: 'Body' }}>
        {/* Grid cetak biru tipis + cahaya biru lembut */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`, backgroundSize: '48px 48px', opacity: 0.55 }} />
        <div style={{ position: 'absolute', right: -120, top: -160, width: 560, height: 560, display: 'flex', borderRadius: 999, background: 'radial-gradient(circle, rgba(147,187,255,0.35), rgba(255,255,255,0))' }} />
        <Arch />

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '60px 72px', width: 790, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 14, background: C.blue, color: C.white, fontFamily: 'Display', fontSize: 30 }}>P</div>
            <div style={{ display: 'flex', fontFamily: 'Display', fontSize: 36, color: C.ink }}>
              Pintu<span style={{ color: C.blue }}>Web</span>
            </div>
          </div>

          {home ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontFamily: 'Display', fontSize: 74, lineHeight: 1.04, color: C.ink, letterSpacing: -2 }}>{c.h[0]}</div>
              <div style={{ display: 'flex', fontFamily: 'Display', fontSize: 74, lineHeight: 1.04, color: C.blue, letterSpacing: -2 }}>{c.h[1]}</div>
              <div style={{ display: 'flex', marginTop: 18, width: 300, height: 8, borderRadius: 8, background: C.ice }} />
              <div style={{ display: 'flex', gap: 44, marginTop: 34 }}>
                {c.stats.map(([v, l]) => (
                  <div key={l} style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: 'Display', fontSize: 40, color: C.ink }}>{v}</span>
                    <span style={{ fontSize: 22, color: C.ink2 }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', fontFamily: 'Display', fontSize: size, lineHeight: 1.08, color: C.ink, letterSpacing: -1.5 }}>{title}</div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 24, color: C.ink2 }}>
            <span style={{ display: 'flex', background: C.blue, color: C.white, padding: '6px 16px', borderRadius: 999, fontSize: 20 }}>{lang.toUpperCase()}</span>
            <span style={{ display: 'flex' }}>www.pintuweb.com · {home ? c.place : c.tag}</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: await fonts(), headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable' } },
  )
}
