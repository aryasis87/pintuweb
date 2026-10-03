// Gambar Open Graph 1200×630 dari judul halaman (dipakai halaman EN/MS & artikel).
import { ImageResponse } from 'next/og'

const TAG: Record<string, string> = {
  id: 'Jasa pembuatan website · sejak 2018',
  en: 'Website design & development · since 2018',
  ms: 'Perkhidmatan laman web · sejak 2018',
}

export function GET(req: Request) {
  const q = new URL(req.url).searchParams
  const lang = TAG[q.get('l') ?? ''] ? (q.get('l') as string) : 'id'
  const title = (q.get('t') ?? 'PintuWeb').slice(0, 120)
  const size = title.length > 70 ? 54 : title.length > 40 ? 64 : 76

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#fffdf9', position: 'relative', fontFamily: 'sans-serif' }}>
        {/* Grid cetak biru */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', backgroundImage: 'linear-gradient(#ece7dc 1px, transparent 1px), linear-gradient(90deg, #ece7dc 1px, transparent 1px)', backgroundSize: '48px 48px', opacity: 0.7 }} />
        {/* Gerbang */}
        <div style={{ position: 'absolute', right: 70, top: 90, width: 300, height: 470, display: 'flex', borderTopLeftRadius: 150, borderTopRightRadius: 150, background: 'linear-gradient(135deg, #2b39d4, #2c2e78)', boxShadow: '0 30px 60px -20px rgba(20,19,15,0.45)' }} />
        <div style={{ position: 'absolute', right: 205, top: 64, width: 30, height: 30, display: 'flex', background: '#ebb54c', transform: 'rotate(45deg)', borderRadius: 4 }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 70px', width: 780, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 40, fontWeight: 800, color: '#14130f' }}>
            Pintu<span style={{ color: '#2b39d4' }}>Web</span>
          </div>
          <div style={{ display: 'flex', fontSize: size, fontWeight: 800, lineHeight: 1.08, color: '#14130f', letterSpacing: -1.5 }}>{title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 26, color: '#45413a' }}>
            <span style={{ display: 'flex', background: '#2b39d4', color: '#fff', padding: '6px 16px', borderRadius: 999, fontWeight: 700, fontSize: 22 }}>{lang.toUpperCase()}</span>
            <span style={{ display: 'flex' }}>www.pintuweb.com · {TAG[lang]}</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable' } },
  )
}
