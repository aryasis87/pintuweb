// Membuat paket logo PintuWeb: SVG (teks sudah jadi kurva) + PNG.
// Jalankan dari folder proyek: npx -y -p opentype.js@1 node brand/logo-kit.js .   (opentype.js tidak dipasang permanen)
const fs = require('fs')
const path = require('path')
const opentype = require('opentype.js')
const root = process.argv[2]
const sharp = require(path.join(root, 'node_modules/sharp'))
const font = opentype.loadSync(path.join(root, 'app/api/og/fonts/Inter-SemiBold.ttf'))
const OUT = path.join(root, 'brand')
fs.mkdirSync(path.join(OUT, 'svg'), { recursive: true })
fs.mkdirSync(path.join(OUT, 'png'), { recursive: true })

const C = { blue: '#26469c', ink: '#0f1b33', white: '#ffffff', navy: '#0f1d3a', ice: '#93bbff' }
const r = (n) => Math.round(n * 100) / 100

// ---- Teks jadi kurva, dengan kerning + jarak huruf rapat (seperti judul situs) ----
function wordPath(text, size, tracking = -0.018) {
  const glyphs = font.stringToGlyphs(text)
  const scale = size / font.unitsPerEm
  let x = 0
  const parts = []
  glyphs.forEach((g, i) => {
    parts.push(g.getPath(x, 0, size).toPathData(2))
    x += g.advanceWidth * scale
    if (i < glyphs.length - 1) x += font.getKerningValue(g, glyphs[i + 1]) * scale + tracking * size
  })
  // batas tinta sebenarnya (untuk perataan)
  const bb = font.getPath(text, 0, 0, size).getBoundingBox()
  return { d: parts.join(''), width: x, inkLeft: bb.x1 }
}
const CAP = font.tables.os2.sCapHeight / font.unitsPerEm // tinggi huruf kapital per em

// ---- Tanda pintu (sama dengan components/Logo.tsx), satuan 32 ----
// Kotak tinta tanda: x 5..27, y 4..30 (lebar 22, tinggi 26)
const MARK = (fill, leafOpacity, leafColor = fill) =>
  `<path fill="${fill}" fill-rule="evenodd" d="M5 30V15C5 8.92 9.92 4 16 4s11 4.92 11 11v15zM10.5 30V15.5a5.5 5.5 0 0 1 11 0V30z"/>` +
  `<path fill="${leafColor}" fill-opacity="${leafOpacity}" d="M10.5 30V16.8l7.5-1.6V30z"/>`

// ---- Logo mendatar: tanda berdiri di garis dasar teks ----
function horizontal({ mark, leaf, word, leafColor }) {
  const F = 100 // ukuran huruf
  const capH = CAP * F
  const markH = capH * 1.42 // tanda sedikit lebih tinggi dari huruf kapital
  const s = markH / 26
  const markW = 22 * s
  const gap = F * 0.26
  const w = wordPath('PintuWeb', F)
  const pad = capH * 0.5
  const textX = pad + markW + gap - w.inkLeft
  const base = pad + markH // garis dasar
  const W = textX + w.width + pad
  const H = base + pad + F * 0.02
  return {
    W, H,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(W)} ${r(H)}" width="${r(W)}" height="${r(H)}" role="img" aria-label="PintuWeb">` +
      `<g transform="translate(${r(pad - 5 * s)} ${r(base - 30 * s)}) scale(${r(s * 1000) / 1000})">${MARK(mark, leaf, leafColor)}</g>` +
      `<path fill="${word}" transform="translate(${r(textX)} ${r(base)})" d="${w.d}"/></svg>`,
  }
}

// ---- Logo bertumpuk: tanda di atas, teks di bawah ----
function stacked({ mark, leaf, word, leafColor }) {
  const F = 100
  const capH = CAP * F
  const w = wordPath('PintuWeb', F)
  const markH = capH * 2.6
  const s = markH / 26
  const markW = 22 * s
  const pad = capH * 0.6
  const W = Math.max(w.width, markW) + pad * 2
  const gap = capH * 0.55
  const base = pad + markH + gap + capH
  const H = base + pad
  return {
    W, H,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(W)} ${r(H)}" width="${r(W)}" height="${r(H)}" role="img" aria-label="PintuWeb">` +
      `<g transform="translate(${r((W - markW) / 2 - 5 * s)} ${r(pad - 4 * s)}) scale(${r(s * 1000) / 1000})">${MARK(mark, leaf, leafColor)}</g>` +
      `<path fill="${word}" transform="translate(${r((W - w.width) / 2)} ${r(base)})" d="${w.d}"/></svg>`,
  }
}

// ---- Tanda saja & ikon aplikasi ----
const markOnly = (fill, leaf) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 28 30" width="280" height="300" role="img" aria-label="PintuWeb">${MARK(fill, leaf)}</svg>`
const appIcon = (radius) => {
  const S = 512, m = S * 0.6, s = m / 26, off = (S - 22 * s) / 2
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}" role="img" aria-label="PintuWeb">` +
    `<rect width="${S}" height="${S}" rx="${S * radius}" fill="${C.blue}"/>` +
    `<g transform="translate(${r(off - 5 * s)} ${r((S - m) / 2 - 4 * s)}) scale(${r(s * 1000) / 1000})">${MARK(C.white, 0.5)}</g></svg>`
}

const files = {
  'pintuweb-logo': horizontal({ mark: C.blue, leaf: 0.45, word: C.ink }),
  'pintuweb-logo-putih': horizontal({ mark: C.white, leaf: 1, leafColor: C.ice, word: C.white }),
  'pintuweb-logo-hitam': horizontal({ mark: C.ink, leaf: 0.35, word: C.ink }),
  'pintuweb-logo-tumpuk': stacked({ mark: C.blue, leaf: 0.45, word: C.ink }),
  'pintuweb-logo-tumpuk-putih': stacked({ mark: C.white, leaf: 1, leafColor: C.ice, word: C.white }),
}
;(async () => {
  for (const [name, { svg, W }] of Object.entries(files)) {
    fs.writeFileSync(path.join(OUT, 'svg', `${name}.svg`), svg)
    const width = name.includes('tumpuk') ? 1600 : 2400
    await sharp(Buffer.from(svg), { density: (72 * width) / W }).resize({ width }).png().toFile(path.join(OUT, 'png', `${name}.png`))
  }
  fs.writeFileSync(path.join(OUT, 'svg', 'pintuweb-tanda.svg'), markOnly(C.blue, 0.45))
  await sharp(Buffer.from(markOnly(C.blue, 0.45)), { density: 2400 }).resize({ height: 1024 }).png().toFile(path.join(OUT, 'png', 'pintuweb-tanda.png'))
  fs.writeFileSync(path.join(OUT, 'svg', 'pintuweb-ikon.svg'), appIcon(0.22))
  await sharp(Buffer.from(appIcon(0.22)), { density: 144 }).resize(1024, 1024).png().toFile(path.join(OUT, 'png', 'pintuweb-ikon.png'))
  // Avatar media sosial: persegi penuh (platform memotongnya sendiri jadi lingkaran)
  await sharp(Buffer.from(appIcon(0)), { density: 216 }).resize(1080, 1080).png().toFile(path.join(OUT, 'png', 'pintuweb-avatar-1080.png'))
  // Logo di atas latar putih/navy (siap tempel di dokumen, tanpa transparansi)
  const pad = async (name, bg, file) => {
    const logo = await sharp(path.join(OUT, 'png', `${name}.png`)).resize({ width: 1600 }).toBuffer()
    const meta = await sharp(logo).metadata()
    await sharp({ create: { width: 2000, height: Math.round(meta.height + 400), channels: 3, background: bg } })
      .composite([{ input: logo, left: 200, top: 200 }]).png().toFile(path.join(OUT, 'png', file))
  }
  await pad('pintuweb-logo', C.white, 'pintuweb-logo-latar-putih.png')
  await pad('pintuweb-logo-putih', C.navy, 'pintuweb-logo-latar-navy.png')
  console.log(fs.readdirSync(path.join(OUT, 'svg')).join(' '))
  console.log(fs.readdirSync(path.join(OUT, 'png')).map((f) => `${f} ${Math.round(fs.statSync(path.join(OUT, 'png', f)).size / 1024)}KB`).join('\n'))
})()
