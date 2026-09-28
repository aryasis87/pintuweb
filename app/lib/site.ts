// Satu-satunya sumber fakta bisnis & kontak PintuWeb.
// Angka yang tampil di situs (tahun berdiri, jumlah proyek, jam kerja, respon, target performa)
// wajib diambil dari sini supaya halaman tidak pernah saling bertentangan lagi.

/** Domain utama. Di Vercel, www adalah domain utama; pintuweb.com di-redirect 308 ke sini. */
export const SITE = 'https://www.pintuweb.com'

export const FOUNDED_YEAR = 2018
export const CLIENT_PROJECTS = '20+'
export const CATEGORY_COUNT = 8
export const LOCATION = 'Trenggalek, Jawa Timur'

export const WA_NUMBER = '6281339908765'
export const WA_DISPLAY = '+62 813 3990 8765'
export const EMAIL = 'sanzystore@gmail.com'

export const HOURS = 'Senin – Sabtu, 09.00 – 17.00 WIB'
/** Janji respon yang dipakai di semua halaman. */
export const RESPONSE = 'Respon di hari kerja, maksimal 24 jam'

/** Target, bukan klaim rata-rata: situs dioptimalkan untuk mencapai skor ini. */
export const PERF_TARGET = '90+'

export const GUARANTEE_DAYS = 30

export const wa = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
