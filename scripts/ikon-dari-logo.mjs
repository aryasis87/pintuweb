// Membuat semua turunan dari logo sumber public/images/logo.png (berkas milik pemilik situs, tidak diubah):
//   public/images/logo-pintuweb.png   logo rapat (tanpa area kosong) untuk header/footer
//   app/api/og/logo.png               versi kecil untuk gambar OG
//   favicon.ico, favicon-16/32, apple-touch-icon, icon-192/512, icon-maskable-512, logo-512 (skema)
// Jalankan dari folder proyek setelah logo diganti:  node scripts/ikon-dari-logo.mjs
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const SRC = path.join(root, 'public/images/logo.png')
const IMG = path.join(root, 'public/images')

// ---- 1. Bersihkan & rapatkan ----
// Sisa penghapusan latar meninggalkan piksel nyaris transparan yang tersebar di kanvas. Yang dipertahankan
// hanya bentuk utama (komponen terbesar) plus tepi halusnya; lalu dipotong pas ke bentuknya.
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const W = info.width, H = info.height
const solid = (i) => data[i * 4 + 3] > 24
const label = new Int32Array(W * H)
let best = { id: 0, area: 0 }
let n = 0
for (let i = 0; i < W * H; i++) {
  if (!solid(i) || label[i]) continue
  n++
  let area = 0
  const stack = [i]
  label[i] = n
  while (stack.length) {
    const p = stack.pop()
    area++
    const x = p % W
    for (const q of [p - 1, p + 1, p - W, p + W]) {
      if (q < 0 || q >= W * H || (q === p - 1 && x === 0) || (q === p + 1 && x === W - 1)) continue
      if (solid(q) && !label[q]) { label[q] = n; stack.push(q) }
    }
  }
  if (area > best.area) best = { id: n, area }
}
const R = 3 // tepi halus di sekitar bentuk utama yang ikut dipertahankan
const keep = new Uint8Array(W * H)
let x1 = W, y1 = H, x2 = 0, y2 = 0
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  if (label[y * W + x] !== best.id) continue
  if (x < x1) x1 = x; if (x > x2) x2 = x; if (y < y1) y1 = y; if (y > y2) y2 = y
  for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) {
    const xx = x + dx, yy = y + dy
    if (xx >= 0 && xx < W && yy >= 0 && yy < H) keep[yy * W + xx] = 1
  }
}
let removed = 0
for (let i = 0; i < W * H; i++) if (!keep[i] && data[i * 4 + 3] > 0) { data[i * 4 + 3] = 0; removed++ }
const m = 2
const box = { left: Math.max(0, x1 - m), top: Math.max(0, y1 - m), width: Math.min(W, x2 + m + 1) - Math.max(0, x1 - m), height: Math.min(H, y2 + m + 1) - Math.max(0, y1 - m) }
const clean = await sharp(data, { raw: { width: W, height: H, channels: 4 } }).extract(box).png().toBuffer()
console.log(`sumber ${W}x${H}; ${removed} piksel sisa latar dibuang; bentuk logo ${box.width}x${box.height}`)

const logoAt = (h) => sharp(clean).resize({ height: Math.round(h) }).png({ compressionLevel: 9 }).toBuffer()
fs.writeFileSync(path.join(IMG, 'logo-pintuweb.png'), await logoAt(512))
fs.writeFileSync(path.join(root, 'app/api/og/logo.png'), await logoAt(360))

// ---- 2. Ikon persegi berisi logo ----
// Favicon & ikon umum berlatar TRANSPARAN (seperti PNG logonya). Latar putih hanya untuk yang secara teknis
// tidak boleh transparan: apple-touch-icon (iOS mengisi transparan dengan hitam), ikon maskable, dan logo skema.
async function tile(S, { scale, radius = 0, bg = null }) {
  const logo = await logoAt(S * scale)
  const lm = await sharp(logo).metadata()
  const base = bg
    ? sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}"><rect width="${S}" height="${S}" rx="${S * radius}" fill="${bg}"/></svg>`))
    : sharp({ create: { width: S, height: S, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  return base.composite([{ input: logo, left: Math.round((S - lm.width) / 2), top: Math.round((S - lm.height) / 2) }]).png({ compressionLevel: 9 }).toBuffer()
}
const out = async (file, S, opt) => fs.writeFileSync(path.join(IMG, file), await tile(S, opt))
await out('favicon-16x16.png', 16, { scale: 1 })
await out('favicon-32x32.png', 32, { scale: 1 })
await out('icon-192.png', 192, { scale: 0.92 })
await out('icon-512.png', 512, { scale: 0.92 })
await out('apple-touch-icon.png', 180, { scale: 0.68, bg: '#ffffff' })
await out('icon-maskable-512.png', 512, { scale: 0.52, bg: '#ffffff' }) // zona aman ikon maskable
await out('logo-512.png', 512, { scale: 0.76, bg: '#ffffff' }) // logo Organization di JSON-LD

// ---- 3. favicon.ico berisi PNG 16/32/48 ----
const pngs = await Promise.all([16, 32, 48].map(async (s) => ({ s, buf: await tile(s, { scale: 1 }) })))
const head = Buffer.alloc(6)
head.writeUInt16LE(1, 2)
head.writeUInt16LE(pngs.length, 4)
let offset = 6 + 16 * pngs.length
const dir = pngs.map(({ s, buf }) => {
  const e = Buffer.alloc(16)
  e.writeUInt8(s, 0)
  e.writeUInt8(s, 1)
  e.writeUInt16LE(1, 4)
  e.writeUInt16LE(32, 6)
  e.writeUInt32LE(buf.length, 8)
  e.writeUInt32LE(offset, 12)
  offset += buf.length
  return e
})
const ico = Buffer.concat([head, ...dir, ...pngs.map((p) => p.buf)])
fs.writeFileSync(path.join(IMG, 'favicon.ico'), ico)
fs.writeFileSync(path.join(root, 'public/favicon.ico'), ico)
console.log('selesai: logo-pintuweb.png, app/api/og/logo.png, favicon.ico, favicon-16/32, apple-touch-icon, icon-192/512, icon-maskable-512, logo-512')
