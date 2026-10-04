// Variasi logo PintuWeb yang tetap berangkat dari "lengkung pintu" (logo utama), dengan perlakuan berbeda.
// Jalankan dari folder proyek: npm i --no-save opentype.js@1 && node brand/logo-variasi.js .
// Hasil: brand/variasi/<variasi>/{svg,png} + brand/variasi/perbandingan.png
const fs = require('fs')
const path = require('path')
const opentype = require('opentype.js')
const root = path.resolve(process.argv[2] || '.')
const sharp = require(path.join(root, 'node_modules/sharp'))
const semibold = opentype.loadSync(path.join(root, 'app/api/og/fonts/Inter-SemiBold.ttf'))
const regular = opentype.loadSync(path.join(root, 'app/api/og/fonts/Inter-Regular.ttf'))
const OUT = path.join(root, 'brand/variasi')

const C = { blue: '#26469c', ink: '#0f1b33', white: '#ffffff', navy: '#0f1d3a', ice: '#93bbff', soft: '#f6f8fc' }
const r = (n) => Math.round(n * 100) / 100
const CAP = semibold.tables.os2.sCapHeight / semibold.unitsPerEm

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

// Lengkung (busur atas setengah lingkaran) dari kiri-bawah: x kiri, lebar w, alas y, pusat lengkung cy
const arch = (x, w, base, cy) => `M${x} ${base}V${cy}a${w / 2} ${w / 2} 0 0 1 ${w} 0V${base}`

// ---------- Simbol (kisi 48) ----------
const MARKS = {
  // 1. Garis: lengkung satu goresan + gagang pintu
  garis: (c) => ({
    box: [10.5, 8.5, 37.5, 42],
    body:
      `<path d="${arch(13, 22, 42, 21)}" fill="none" stroke="${c.main}" stroke-width="5"/>` +
      `<circle cx="29.5" cy="31" r="2.2" fill="${c.accentSolid}"/>`,
  }),
  // 2. Ubin: lubang pintu melengkung di ubin membulat, daun pintu terbuka
  ubin: (c) => ({
    box: [6, 6, 42, 42],
    body:
      `<path fill="${c.main}" fill-rule="evenodd" d="M15 6h18a9 9 0 0 1 9 9v27H6V15a9 9 0 0 1 9-9z${arch(18, 12, 42, 26)}z"/>` +
      `<path fill="${c.accentSolid}" d="M18 42V26.6L24 25.2V42z"/>`,
  }),
  // 3. Lorong: tiga lengkung mengecil ke dalam, seperti pintu yang mengajak masuk
  lorong: (c) => ({
    box: [8, 6, 40, 42],
    body:
      `<path fill="${c.main}" fill-rule="evenodd" d="${arch(8, 32, 42, 22)}z${arch(12.5, 23, 42, 22)}z"/>` +
      `<path fill="${c.main}" fill-opacity="${c.leafOp}" fill-rule="evenodd" d="${arch(15.5, 17, 42, 25.5)}z${arch(19, 10, 42, 25.5)}z"/>` +
      `<path fill="${c.accentSolid}" d="${arch(21, 6, 42, 31)}z"/>`,
  }),
  // 4. Pintu ganda: dua daun pintu terbuka ke samping, cahaya di tengah
  ganda: (c) => ({
    box: [8, 6, 40, 42],
    body:
      `<path fill="${c.main}" fill-rule="evenodd" d="${arch(8, 32, 42, 22)}z${arch(13, 22, 42, 22)}z"/>` +
      `<path fill="${c.accentSolid}" fill-opacity="${c.lightOp}" d="${arch(13, 22, 42, 22)}z"/>` +
      `<path fill="${c.main}" fill-opacity="${c.leafOp}" d="M13 22L18.5 24.6V39.6L13 42Z"/>` +
      `<path fill="${c.main}" fill-opacity="${c.leafOp}" d="M35 22L29.5 24.6V39.6L35 42Z"/>`,
  }),
  // 5. Lengkung + kursor: pintu terang yang "diklik" untuk masuk
  kursor: (c) => ({
    box: [9, 6, 39, 42],
    body:
      `<path fill="${c.main}" fill-rule="evenodd" d="${arch(9, 30, 42, 21)}z${arch(16.5, 15, 42, 21)}z"/>` +
      `<path fill="${c.accentSolid}" d="${arch(16.5, 15, 42, 21)}z"/>` +
      `<g transform="translate(22.5 26.5) scale(0.95)"><path d="M0 0V14.5l3.6-3.4 2.5 5.6 2.6-1.1-2.4-5.5H11Z" fill="${c.cursor}" stroke="${c.cursorStroke}" stroke-width="1.3" stroke-linejoin="round"/></g>`,
  }),
  // Logo utama saat ini (pembanding)
  sekarang: (c) => ({
    box: [7.5, 6, 40.5, 45],
    body:
      `<g transform="scale(1.5)"><path fill="${c.main}" fill-rule="evenodd" d="M5 30V15C5 8.92 9.92 4 16 4s11 4.92 11 11v15zM10.5 30V15.5a5.5 5.5 0 0 1 11 0V30z"/>` +
      `<path fill="${c.leafColor || c.main}" fill-opacity="${c.leafColor ? 1 : c.leafOp}" d="M10.5 30V16.8l7.5-1.6V30z"/></g>`,
  }),
}

const LIGHT = { main: C.blue, leafOp: 0.45, accentSolid: C.ice, lightOp: 1, cursor: C.ink, cursorStroke: C.white }
const DARK = { main: C.white, leafOp: 0.5, accentSolid: C.ice, lightOp: 1, cursor: C.white, cursorStroke: C.navy, leafColor: C.ice }
const ON_BLUE = { main: C.white, leafOp: 0.5, accentSolid: C.ice, lightOp: 1, cursor: C.white, cursorStroke: C.blue, leafColor: C.ice }
// Variasi garis: gagang sapphire di latar terang supaya tidak pudar
const LIGHT_GARIS = { ...LIGHT, accentSolid: C.blue }

function lockup(markFn, palette, wordParts, { tracking = -0.018, F = 100, font = semibold, markScale = 1.55 } = {}) {
  const capH = CAP * F
  const m = markFn(palette)
  const [x1, y1, x2, y2] = m.box
  const markH = capH * markScale
  const s = markH / (y2 - y1)
  const markW = (x2 - x1) * s
  const w = words(wordParts, F, tracking, font)
  const pad = capH * 0.55
  const gap = F * 0.28
  const base = pad + markH // simbol berdiri di garis dasar teks
  const textX = pad + markW + gap
  const W = textX + w.width + pad
  const H = base + pad
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(W)} ${r(H)}" width="${r(W)}" height="${r(H)}" role="img" aria-label="PintuWeb">` +
    `<g transform="translate(${r(pad - x1 * s)} ${r(pad - y1 * s)}) scale(${r(s * 10000) / 10000})">${m.body}</g>` +
    w.svg(textX, base) + `</svg>`
}

function icon(markFn, fill = 0.6) {
  const S = 512
  const m = markFn(ON_BLUE)
  const [x1, y1, x2, y2] = m.box
  const k = (S * fill) / Math.max(x2 - x1, y2 - y1)
  const ox = (S - (x2 - x1) * k) / 2 - x1 * k
  const oy = (S - (y2 - y1) * k) / 2 - y1 * k
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}"><rect width="${S}" height="${S}" rx="${S * 0.22}" fill="${C.blue}"/><g transform="translate(${r(ox)} ${r(oy)}) scale(${r(k * 1000) / 1000})">${m.body}</g></svg>`
}
// Ubin sudah berbentuk ikon: ubin putih dengan lubang biru di atas latar biru akan terbalik warnanya,
// jadi ikonnya ubin biru penuh dengan lubang putih & daun biru es.
function iconUbin() {
  const S = 512, k = S / 48
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}"><rect width="${S}" height="${S}" rx="${S * 0.22}" fill="${C.blue}"/>` +
    `<g transform="scale(${r(k)})"><path fill="${C.white}" d="${arch(18, 12, 42, 26)}z"/><path fill="${C.ice}" d="M18 42V26.6L24 25.2V42z"/></g></svg>`
}

const ink = (t) => [{ text: t, color: C.ink }]
const white = (t) => [{ text: t, color: C.white }]
const VARIANTS = [
  {
    id: '1-garis', name: '1. Garis', note: 'Lengkung satu goresan + gagang pintu; ringan & elegan',
    light: lockup(MARKS.garis, LIGHT_GARIS, ink('PintuWeb'), { font: regular, tracking: -0.01 }),
    dark: lockup(MARKS.garis, DARK, white('PintuWeb'), { font: regular, tracking: -0.01 }),
    icon: icon(MARKS.garis, 0.56),
  },
  {
    id: '2-ubin', name: '2. Ubin', note: 'Lubang pintu di ubin membulat, daun pintu terbuka',
    light: lockup(MARKS.ubin, LIGHT, ink('PintuWeb'), { markScale: 1.45 }),
    dark: lockup(MARKS.ubin, DARK, white('PintuWeb'), { markScale: 1.45 }),
    icon: iconUbin(),
  },
  {
    id: '3-lorong', name: '3. Lorong', note: 'Tiga lengkung mengecil ke dalam; mengajak masuk',
    light: lockup(MARKS.lorong, LIGHT, [{ text: 'Pintu', color: C.ink }, { text: 'Web', color: C.blue }]),
    dark: lockup(MARKS.lorong, DARK, [{ text: 'Pintu', color: C.white }, { text: 'Web', color: C.ice }]),
    icon: icon(MARKS.lorong, 0.6),
  },
  {
    id: '4-pintu-ganda', name: '4. Pintu ganda', note: 'Dua daun pintu terbuka, cahaya di tengah',
    light: lockup(MARKS.ganda, LIGHT, ink('pintuweb'), { tracking: -0.022 }),
    dark: lockup(MARKS.ganda, DARK, white('pintuweb'), { tracking: -0.022 }),
    icon: icon(MARKS.ganda, 0.6),
  },
  {
    id: '5-kursor', name: '5. Lengkung + kursor', note: 'Pintu terang yang diklik untuk masuk; isyarat web',
    light: lockup(MARKS.kursor, LIGHT, ink('PintuWeb')),
    dark: lockup(MARKS.kursor, DARK, white('PintuWeb')),
    icon: icon(MARKS.kursor, 0.6),
  },
  {
    id: 'sekarang', name: 'Logo sekarang', note: 'Lengkung pintu (pembanding)',
    light: lockup(MARKS.sekarang, LIGHT, ink('PintuWeb'), { markScale: 1.42 }),
    dark: lockup(MARKS.sekarang, DARK, white('PintuWeb'), { markScale: 1.42 }),
    icon: icon(MARKS.sekarang, 0.6),
  },
]

function label(text, size, color, font = semibold) {
  const p = font.getPath(text, 0, 0, size)
  const bb = p.getBoundingBox()
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(bb.x2 + 4)}" height="${Math.ceil(size * 1.3)}"><path fill="${color}" transform="translate(0 ${size})" d="${p.toPathData(2)}"/></svg>`)
}

;(async () => {
  for (const v of VARIANTS) {
    if (v.id === 'sekarang') continue
    const dir = path.join(OUT, v.id)
    fs.mkdirSync(path.join(dir, 'svg'), { recursive: true })
    fs.mkdirSync(path.join(dir, 'png'), { recursive: true })
    for (const [k, svg] of [['logo', v.light], ['logo-putih', v.dark], ['ikon', v.icon]]) {
      fs.writeFileSync(path.join(dir, 'svg', `pintuweb-${k}.svg`), svg)
      const size = k === 'ikon' ? { width: 1024, height: 1024 } : { width: 2400 }
      await sharp(Buffer.from(svg), { density: 300 }).resize(size).png().toFile(path.join(dir, 'png', `pintuweb-${k}.png`))
    }
  }

  const W = 1800, ROW = 250, TOP = 120
  const comps = [{ input: label('Variasi logo PintuWeb (berangkat dari lengkung pintu)', 38, C.ink), left: 60, top: 40 }]
  for (const [t, x] of [['Di latar putih', 380], ['Di latar gelap', 900], ['Ikon', 1400], ['Favicon 32 px', 1580]]) comps.push({ input: label(t, 20, '#4d5b74', regular), left: x, top: TOP - 10 })
  for (const [i, v] of VARIANTS.entries()) {
    const y = TOP + 30 + i * ROW
    comps.push({ input: await sharp({ create: { width: W - 80, height: ROW - 20, channels: 3, background: v.id === 'sekarang' ? '#eef2f8' : C.soft } }).png().toBuffer(), left: 40, top: y })
    comps.push({ input: label(v.name, 26, C.ink), left: 60, top: y + 30 })
    const ws = v.note.split(' '), half = Math.ceil(ws.length / 2)
    comps.push({ input: label(ws.slice(0, half).join(' '), 17, '#4d5b74', regular), left: 60, top: y + 80 })
    comps.push({ input: label(ws.slice(half).join(' '), 17, '#4d5b74', regular), left: 60, top: y + 104 })
    comps.push({ input: await sharp({ create: { width: 480, height: 190, channels: 3, background: C.white } }).png().toBuffer(), left: 380, top: y + 20 })
    comps.push({ input: await sharp({ create: { width: 480, height: 190, channels: 3, background: C.navy } }).png().toBuffer(), left: 900, top: y + 20 })
    const fit = async (svg) => sharp(Buffer.from(svg), { density: 300 }).resize({ width: 400, height: 120, fit: 'inside' }).png().toBuffer()
    const lw = await fit(v.light), ld = await fit(v.dark)
    const mw = await sharp(lw).metadata(), md = await sharp(ld).metadata()
    comps.push({ input: lw, left: 380 + Math.round((480 - mw.width) / 2), top: y + 20 + Math.round((190 - mw.height) / 2) })
    comps.push({ input: ld, left: 900 + Math.round((480 - md.width) / 2), top: y + 20 + Math.round((190 - md.height) / 2) })
    comps.push({ input: await sharp(Buffer.from(v.icon), { density: 144 }).resize(150, 150).png().toBuffer(), left: 1405, top: y + 40 })
    const fav = await sharp(Buffer.from(v.icon), { density: 72 }).resize(32, 32).png().toBuffer()
    comps.push({ input: await sharp(fav).resize(64, 64, { kernel: 'nearest' }).toBuffer(), left: 1610, top: y + 60 })
    comps.push({ input: fav, left: 1626, top: y + 140 })
  }
  const H = TOP + 30 + VARIANTS.length * ROW + 30
  fs.mkdirSync(OUT, { recursive: true })
  await sharp({ create: { width: W, height: H, channels: 3, background: C.white } }).composite(comps).png().toFile(path.join(OUT, 'perbandingan.png'))
  console.log('ok', path.join(OUT, 'perbandingan.png'))
})()
