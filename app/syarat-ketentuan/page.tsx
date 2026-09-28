import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '../components/PageHero'
import { PACKAGES, PAYMENT_SUMMARY, RENEWAL_SUMMARY } from '../lib/packages'
import { EMAIL, GUARANTEE_DAYS, SITE, WA_DISPLAY } from '../lib/site'

const UPDATED = '28 September 2026'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan',
  description: 'Ketentuan layanan pembuatan website PintuWeb: pembayaran, waktu pengerjaan, revisi, garansi, domain & hosting, dan kepemilikan.',
  alternates: { canonical: `${SITE}/syarat-ketentuan` },
  openGraph: { title: 'Syarat & Ketentuan — PintuWeb', url: `${SITE}/syarat-ketentuan`, siteName: 'PintuWeb', locale: 'id_ID', type: 'website' },
}

export default function TermsPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Legal" title="Syarat & Ketentuan" lead={`Berlaku sejak ${UPDATED}.`} />
      <article className="legal mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <p>
          Ketentuan ini berlaku untuk layanan pembuatan website PintuWeb. Rincian akhir setiap proyek, seperti fitur, harga,
          dan jadwal, dicantumkan dalam penawaran tertulis (lewat WhatsApp atau invoice) yang Anda setujui sebelum pengerjaan
          dimulai. Bila ada perbedaan, penawaran tertulis itulah yang berlaku.
        </p>

        <h2>1. Paket & ruang lingkup</h2>
        <p>
          Isi setiap paket tercantum di halaman <Link href="/paket">Paket</Link>. Pekerjaan di luar paket, misalnya fitur
          tambahan yang besar, dibuatkan penawaran terpisah dan baru dikerjakan setelah Anda setujui.
        </p>

        <h2>2. Harga & pembayaran</h2>
        <p>{PAYMENT_SUMMARY}</p>

        <h2>3. Waktu pengerjaan</h2>
        <p>
          Perkiraan waktu per paket: {PACKAGES.map((p) => `${p.title} ${p.duration}`).join('; ')}. Waktu dihitung sejak DP
          diterima dan materi (teks, logo, foto) lengkap. Keterlambatan materi dari pihak klien menggeser jadwal.
        </p>

        <h2>4. Revisi</h2>
        <p>
          Jatah revisi mengikuti paket. Perubahan kecil seperti teks, foto, atau info kontak dibantu tanpa biaya selama masa
          maintenance. Perubahan besar di luar kesepakatan awal dibicarakan dan disepakati biayanya lebih dulu.
        </p>

        <h2>5. Garansi & maintenance</h2>
        <p>
          Bug dan masalah teknis diperbaiki gratis selama {GUARANTEE_DAYS} hari setelah website online. Setelah itu,
          maintenance berlaku sesuai paket (1–6 bulan) dan bisa diperpanjang. Garansi tidak mencakup kerusakan akibat
          perubahan kode oleh pihak lain atau permintaan fitur baru.
        </p>

        <h2>6. Domain & hosting</h2>
        <p>
          {RENEWAL_SUMMARY} Bila perpanjangan tidak dilakukan, domain dan hosting dapat berakhir sesuai ketentuan
          penyedianya.
        </p>

        <h2>7. Kepemilikan</h2>
        <p>
          Setelah pelunasan, website beserta source code, akses admin, akses hosting, dan domain sepenuhnya menjadi milik
          Anda. PintuWeb hanya menampilkan proyek Anda sebagai contoh karya bila Anda mengizinkannya.
        </p>

        <h2>8. Materi dari klien</h2>
        <p>
          Anda bertanggung jawab memastikan materi yang Anda berikan (logo, foto, teks) boleh dipakai dan tidak melanggar hak
          pihak lain.
        </p>

        <h2>9. Pembatalan</h2>
        <p>
          Ketentuan pembatalan dan pengembalian dana untuk tiap proyek dicantumkan dalam penawaran tertulis sebelum
          pengerjaan dimulai.
        </p>

        <h2>10. Kontak</h2>
        <p>
          Pertanyaan soal ketentuan ini dapat dikirim ke <a href={`mailto:${EMAIL}`}>{EMAIL}</a> atau WhatsApp {WA_DISPLAY}.
          Lihat juga <Link href="/kebijakan-privasi">Kebijakan Privasi</Link>.
        </p>
      </article>
    </main>
  )
}
