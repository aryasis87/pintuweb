// Satu-satunya sumber fakta bisnis & kontak PintuWeb.
// Angka yang tampil di situs (tahun berdiri, jumlah proyek, jam kerja, respon, target performa)
// wajib diambil dari sini supaya halaman tidak pernah saling bertentangan lagi.

/** Domain utama. Di Vercel, www adalah domain utama; pintuweb.com di-redirect 308 ke sini. */
export const SITE = 'https://www.pintuweb.com'

export const FOUNDED_YEAR = 2018
export const CLIENT_PROJECTS = '20+'
export const CATEGORY_COUNT = 8
export const LOCATION = 'Trenggalek, Jawa Timur'

export const WA_NUMBER = '6285190931399'
export const WA_DISPLAY = '+62 851 9093 1399'
export const EMAIL = 'sanzystore@gmail.com'

/** Jam buka dan tutup (WIB), format 24 jam. Semua tulisan jam kerja (tiga bahasa) dan JSON-LD dirakit dari sini. */
export const OPENS = '08:00'
export const CLOSES = '19:00'
/** "08.00" — penulisan jam gaya Indonesia/Melayu. */
export const dotTime = (t: string) => t.replace(':', '.')
export const HOURS = `Senin – Sabtu, ${dotTime(OPENS)} – ${dotTime(CLOSES)} WIB`
/** Janji respon yang dipakai di semua halaman. */
export const RESPONSE = 'Respon di hari kerja, maksimal 24 jam'

/** Target, bukan klaim rata-rata: situs dioptimalkan untuk mencapai skor ini. */
export const PERF_TARGET = '90+'

export const GUARANTEE_DAYS = 30

export const wa = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
