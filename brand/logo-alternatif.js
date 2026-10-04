// Konsep logo alternatif PintuWeb untuk dibandingkan dengan logo utama (brand/logo-kit.js).
// Jalankan dari folder proyek: npm i --no-save opentype.js@1 && node brand/logo-alternatif.js .
// Hasil: brand/alternatif/<konsep>/{svg,png} + brand/alternatif/perbandingan.png
const fs = require('fs')
const path = require('path')
const opentype = require('opentype.js')
const root = path.resolve(process.argv[2] || '.')
const sharp = require(path.join(root, 'node_modules/sharp'))
const semibold = opentype.loadSync(path.join(root, 'app/api/og/fonts/Inter-SemiBold.ttf'))
const regular = opentype.loadSync(path.join(root, 'app/api/og/fonts/Inter-Regular.ttf'))
const OUT = path.join(root, 'brand/alternatif')

const C = { blue: '#26469c', ink: '#0f1b33', white: '#ffffff', navy: '#0f1d3a', ice: '#93bbff', soft: '#f6f8fc' }
const r = (n) => Math.round(n * 100) / 100
const CAP = semibold.tables.os2.sCapHeight / semibold.unitsPerEm
const XH = semibold.tables.os2.sxHeight / semibold.unitsPerEm

// ---------- Teks jadi kurva (bisa beberapa warna dalam satu kata, kerning tetap utuh) ----------
function words(parts, size, tracking = -0.018, font = semibold) {
  const text = parts.map((p) => p.text).join('')
  const colors = parts.flatMap((p) => [...p.text].map(() => p.color))
  const glyphs = font.stringToGlyphs(text)
  const scale = size / font.unitsPerEm
  let x = 0
  const out = []
  glyphs.forEach((g, i) => {
    out.push({ d: g.getPath(x, 0, size).toPathData(2), color: colors[i] })
    x += g.advanceWidth * scale
    if (i < glyphs.length - 1) x += font.getKerningValue(g, glyphs[i + 1]) * scale + tracking * size
  })
  return { svg: (dx, dy) => out.map((o) => `<path fill="${o.color}" transform="translate(${r(dx)} ${r(dy)})" d="${o.d}"/>`).join(''), width: x }
}

// ---------- Simbol tiap konsep (kisi 48) ----------
// tiap simbol: fungsi warna -> { body: string SVG, box: [x1, y1, x2, y2] }
const MARKS = {
  // A. Gapura candi bentar: dua menara bertingkat yang terbelah, celah di tengah = jalan masuk
  gapura: (c) => ({
    box: [4, 4, 44, 42],
    body:
      `<path fill="${c.main}" d="M4 42V33H7V24H10V16H13V9H17V4H21V42Z"/>` +
      `<path fill="${c.main}" d="M44 42V33H41V24H38V16H35V9H31V4H27V42Z"/>`,
  }),
  // C. Pintu terbuka dengan cahaya yang jatuh ke lantai
  cahaya: (c) => ({
    box: [10, 4, 44, 46],
    body:
      `<path fill="${c.main}" d="M10 40V4H38V40H34V8H14V40Z"/>` +
      `<path fill="${c.main}" fill-opacity="${c.leafOp}" d="M14 8L24 11V37L14 40Z"/>` +
      `<path fill="${c.accent}" d="M24 8H34V40H24Z"/>` +
      `<path fill="${c.accent}" fill-opacity="${c.accentOp}" d="M24 40H34L44 46H20Z"/>`,
  }),
  // D. Jendela browser yang di dalamnya ada pintu terbuka
  browser: (c) => ({
    box: [4, 7, 44, 41],
    body:
      `<path fill="${c.main}" fill-rule="evenodd" d="M9 7h30a5 5 0 0 1 5 5v24a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V12a5 5 0 0 1 5-5zM9.5 17h29v20.5a0 0 0 0 1 0 0h-29z"/>` +
      `<circle cx="10.5" cy="12" r="1.5" fill="${c.dot}"/><circle cx="15" cy="12" r="1.5" fill="${c.dot}"/><circle cx="19.5" cy="12" r="1.5" fill="${c.dot}"/>` +
      `<path fill="${c.main}" d="M18 37.5V21H30V37.5H27V24H21V37.5Z"/>` +
      `<path fill="${c.main}" fill-opacity="${c.leafOp}" d="M21 24L25.5 25.5V36L21 37.5Z"/>` +
      `<path fill="${c.accent}" d="M25.5 25.5L27 24V37.5L25.5 36Z"/>`,
  }),
  // Logo utama saat ini (lengkung pintu) — kisi 32 diskalakan ke 48
  lengkung: (c) => ({
    box: [7.5, 6, 40.5, 45],
    body:
      `<g transform="scale(1.5)"><path fill="${c.main}" fill-rule="evenodd" d="M5 30V15C5 8.92 9.92 4 16 4s11 4.92 11 11v15zM10.5 30V15.5a5.5 5.5 0 0 1 11 0V30z"/>` +
      `<path fill="${c.leafColor || c.main}" fill-opacity="${c.leafColor ? 1 : c.leafOp}" d="M10.5 30V16.8l7.5-1.6V30z"/></g>`,
  }),
}

// Palet per latar
const LIGHT = { main: C.blue, leafOp: 0.45, accent: C.ice, accentOp: 0.55, dot: C.white }
const DARK = { main: C.white, leafOp: 0.45, accent: C.ice, accentOp: 0.6, dot: C.navy, leafColor: C.ice }
const ON_BLUE = { main: C.white, leafOp: 0.45, accent: C.ice, accentOp: 0.7, dot: C.blue, leafColor: C.ice }

// ---------- B. Huruf "n" dibuat jadi pintu di dalam kata "pintuweb" ----------
function nDoor(x, base, w, h, c) {
  // lengkung pintu setinggi x-height, lebar = lebar glyph n; dinding ~23% lebar
  const t = w * 0.23
  const R = w / 2
  const ri = R - t
  const top = base - h
  const leafTop = top + R + ri * 0.15
  return (
    `<path fill="${c.main}" fill-rule="evenodd" d="M${r(x)} ${r(base)}V${r(top + R)}a${r(R)} ${r(R)} 0 0 1 ${r(w)} 0V${r(base)}h${r(-t)}V${r(top + R)}a${r(ri)} ${r(ri)} 0 0 0 ${r(-2 * ri)} 0V${r(base)}z"/>` +
    `<path fill="${c.leafColor || c.main}" fill-opacity="${c.leafColor ? 1 : c.leafOp}" d="M${r(x + t)} ${r(base)}V${r(leafTop + ri * 0.2)}L${r(x + t + ri * 1.25)} ${r(leafTop)}V${r(base)}z"/>`
  )
}
function hurufN({ ink, c, size = 100 }) {
  // susun "pi" + n-pintu + "tuweb" dengan kerning & jarak yang sama
  const font = semibold
  const scale = size / font.unitsPerEm
  const track = -0.02 * size
  const gl = font.stringToGlyphs('pintuweb')
  let x = 0
  let body = ''
  const xh = XH * size
  gl.forEach((g, i) => {
    if (i === 2) body += nDoor(x + g.leftSideBearing * scale, 0, (g.advanceWidth - g.leftSideBearing * 2) * scale, xh * 1.03, c)
    else body += `<path fill="${ink}" d="${g.getPath(x, 0, size).toPathData(2)}"/>`
    x += g.advanceWidth * scale
    if (i < gl.length - 1) x += font.getKerningValue(g, gl[i + 1]) * scale + track
  })
  const bb = font.getPath('pintuweb', 0, 0, size).getBoundingBox()
  return { body, width: x, top: bb.y1, bottom: bb.y2 }
}

// ---------- Susunan logo mendatar: simbol + kata ----------
function lockup(markFn, palette, wordParts, { tracking = -0.018, F = 100 } = {}) {
  const capH = CAP * F
  const m = markFn(palette)
  const [x1, y1, x2, y2] = m.box
  const markH = capH * 1.55
  const s = markH / (y2 - y1)
  const markW = (x2 - x1) * s
  const w = words(wordParts, F, tracking)
  const pad = capH * 0.55
  const gap = F * 0.28
  const base = pad + markH - capH * 0.18 // simbol sedikit turun di bawah garis dasar
  const markTop = base + capH * 0.18 - markH
  const textX = pad + markW + gap
  const W = textX + w.width + pad
  const H = pad + markH + pad
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(W)} ${r(H)}" width="${r(W)}" height="${r(H)}" role="img" aria-label="PintuWeb">` +
    `<g transform="translate(${r(pad - x1 * s)} ${r(markTop - y1 * s)}) scale(${r(s * 10000) / 10000})">${m.body}</g>` +
    w.svg(textX, base) + `</svg>`
}
function wordmarkN(ink, c) {
  const F = 120
  const n = hurufN({ ink, c, size: F })
  const pad = F * 0.3
  const W = n.width + pad * 2
  const H = n.bottom - n.top + pad * 2
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(W)} ${r(H)}" width="${r(W)}" height="${r(H)}" role="img" aria-label="PintuWeb"><g transform="translate(${r(pad)} ${r(pad - n.top)})">${n.body}</g></svg>`
}

// ---------- Ikon aplikasi: simbol putih di ubin biru ----------
function icon(body, box, fill = 0.6) {
  const S = 512
  const [x1, y1, x2, y2] = box
  const k = (S * fill) / Math.max(x2 - x1, y2 - y1)
  const ox = (S - (x2 - x1) * k) / 2 - x1 * k
  const oy = (S - (y2 - y1) * k) / 2 - y1 * k
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}"><rect width="${S}" height="${S}" rx="${S * 0.22}" fill="${C.blue}"/><g transform="translate(${r(ox)} ${r(oy)}) scale(${r(k * 1000) / 1000})">${body}</g></svg>`
}
function iconN() {
  // ubin: huruf n-pintu sendirian, putih
  const S = 512
  const w = 230, h = 250
  const body = nDoor((S - w) / 2, (S + h) / 2, w, h, ON_BLUE)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}"><rect width="${S}" height="${S}" rx="${S * 0.22}" fill="${C.blue}"/>${body}</svg>`
}

const CONCEPTS = [
  {
    id: 'a-gapura', name: 'A. Gapura', note: 'Gerbang candi bentar khas Jawa: masuk lewat celah di tengah',
    light: lockup(MARKS.gapura, LIGHT, [{ text: 'PintuWeb', color: C.ink }]),
    dark: lockup(MARKS.gapura, DARK, [{ text: 'PintuWeb', color: C.white }]),
    icon: icon(MARKS.gapura(ON_BLUE).body, MARKS.gapura(ON_BLUE).box),
  },
  {
    id: 'b-huruf-n', name: 'B. Huruf n jadi pintu', note: 'Logo menyatu dengan tulisan; ikonnya huruf n-pintu',
    light: wordmarkN(C.ink, LIGHT),
    dark: wordmarkN(C.white, DARK),
    icon: iconN(),
  },
  {
    id: 'c-pintu-cahaya', name: 'C. Pintu bercahaya', note: 'Pintu terbuka, cahaya jatuh ke lantai: kesan peluang & ramah',
    light: lockup(MARKS.cahaya, LIGHT, [{ text: 'Pintu', color: C.ink }, { text: 'Web', color: C.blue }]),
    dark: lockup(MARKS.cahaya, DARK, [{ text: 'Pintu', color: C.white }, { text: 'Web', color: C.ice }]),
    icon: icon(MARKS.cahaya(ON_BLUE).body, MARKS.cahaya(ON_BLUE).box, 0.62),
  },
  {
    id: 'd-browser', name: 'D. Browser berpintu', note: 'Paling gamblang: jendela web dengan pintu di dalamnya',
    light: lockup(MARKS.browser, LIGHT, [{ text: 'PINTUWEB', color: C.ink }], { tracking: 0.04, F: 88 }),
    dark: lockup(MARKS.browser, DARK, [{ text: 'PINTUWEB', color: C.white }], { tracking: 0.04, F: 88 }),
    icon: icon(MARKS.browser(ON_BLUE).body, MARKS.browser(ON_BLUE).box, 0.66),
  },
  {
    id: 'utama-lengkung', name: 'Logo sekarang', note: 'Lengkung pintu (pembanding)',
    light: lockup(MARKS.lengkung, LIGHT, [{ text: 'PintuWeb', color: C.ink }]),
    dark: lockup(MARKS.lengkung, DARK, [{ text: 'PintuWeb', color: C.white }]),
    icon: icon(MARKS.lengkung(ON_BLUE).body, MARKS.lengkung(ON_BLUE).box),
  },
]

// teks label lembar perbandingan (jadi kurva supaya tidak butuh font terpasang)
function label(text, size, color, font = semibold) {
  const p = font.getPath(text, 0, 0, size)
  const bb = p.getBoundingBox()
  const W = Math.ceil(bb.x2 + 4), H = Math.ceil(size * 1.3)
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><path fill="${color}" transform="translate(0 ${size})" d="${p.toPathData(2)}"/></svg>`)
}

;(async () => {
  for (const c of CONCEPTS) {
    if (c.id.startsWith('utama')) continue
    const dir = path.join(OUT, c.id)
    fs.mkdirSync(path.join(dir, 'svg'), { recursive: true })
    fs.mkdirSync(path.join(dir, 'png'), { recursive: true })
    for (const [k, svg] of [['logo', c.light], ['logo-putih', c.dark], ['ikon', c.icon]]) {
      fs.writeFileSync(path.join(dir, 'svg', `pintuweb-${k}.svg`), svg)
      const size = k === 'ikon' ? { width: 1024, height: 1024 } : { width: 2400 }
      await sharp(Buffer.from(svg), { density: 300 }).resize(size).png().toFile(path.join(dir, 'png', `pintuweb-${k}.png`))
    }
  }

  // ---------- Lembar perbandingan ----------
  const W = 1800, ROW = 250, TOP = 120
  const comps = [
    { input: label('Perbandingan konsep logo PintuWeb', 40, C.ink), left: 60, top: 40 },
  ]
  const heads = [['Di latar putih', 380], ['Di latar gelap', 900], ['Ikon', 1400], ['Favicon 32 px', 1580]]
  for (const [t, x] of heads) comps.push({ input: label(t, 20, '#4d5b74', regular), left: x, top: TOP - 10 })
  for (const [i, c] of CONCEPTS.entries()) {
    const y = TOP + 30 + i * ROW
    const bgRow = await sharp({ create: { width: W - 80, height: ROW - 20, channels: 3, background: i === CONCEPTS.length - 1 ? '#eef2f8' : C.soft } }).png().toBuffer()
    comps.push({ input: bgRow, left: 40, top: y })
    comps.push({ input: label(c.name, 26, C.ink), left: 60, top: y + 30 })
    // catatan dipecah 2 baris bila panjang
    const words2 = c.note.split(' ')
    const half = Math.ceil(words2.length / 2)
    comps.push({ input: label(words2.slice(0, half).join(' '), 17, '#4d5b74', regular), left: 60, top: y + 80 })
    comps.push({ input: label(words2.slice(half).join(' '), 17, '#4d5b74', regular), left: 60, top: y + 104 })
    const white = await sharp({ create: { width: 480, height: 190, channels: 3, background: C.white } }).png().toBuffer()
    const navy = await sharp({ create: { width: 480, height: 190, channels: 3, background: C.navy } }).png().toBuffer()
    comps.push({ input: white, left: 380, top: y + 20 }, { input: navy, left: 900, top: y + 20 })
    const fitLogo = async (svg) => sharp(Buffer.from(svg), { density: 300 }).resize({ width: 400, height: 120, fit: 'inside' }).png().toBuffer()
    const lw = await fitLogo(c.light), ld = await fitLogo(c.dark)
    const mw = await sharp(lw).metadata(), md = await sharp(ld).metadata()
    comps.push({ input: lw, left: 380 + Math.round((480 - mw.width) / 2), top: y + 20 + Math.round((190 - mw.height) / 2) })
    comps.push({ input: ld, left: 900 + Math.round((480 - md.width) / 2), top: y + 20 + Math.round((190 - md.height) / 2) })
    const ic = await sharp(Buffer.from(c.icon), { density: 144 }).resize(150, 150).png().toBuffer()
    comps.push({ input: ic, left: 1405, top: y + 40 })
    const fav = await sharp(Buffer.from(c.icon), { density: 72 }).resize(32, 32).png().toBuffer()
    comps.push({ input: await sharp(fav).resize(64, 64, { kernel: 'nearest' }).toBuffer(), left: 1610, top: y + 60 })
    comps.push({ input: fav, left: 1626, top: y + 140 })
  }
  const H = TOP + 30 + CONCEPTS.length * ROW + 30
  await sharp({ create: { width: W, height: H, channels: 3, background: C.white } }).composite(comps).png().toFile(path.join(OUT, 'perbandingan.png'))
  console.log('ok', path.join(OUT, 'perbandingan.png'))
})()
