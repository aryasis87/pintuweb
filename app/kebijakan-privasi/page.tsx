import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '../components/PageHero'
import { EMAIL, SITE, WA_DISPLAY } from '../lib/site'

const UPDATED = '28 September 2026'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: 'Data apa yang diterima PintuWeb, untuk apa dipakai, dan hak Anda atas data tersebut.',
  alternates: { canonical: `${SITE}/kebijakan-privasi` },
  openGraph: { title: 'Kebijakan Privasi — PintuWeb', url: `${SITE}/kebijakan-privasi`, siteName: 'PintuWeb', locale: 'id_ID', type: 'website' },
}

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Legal" title="Kebijakan Privasi" lead={`Berlaku sejak ${UPDATED}.`} />
      <article className="legal mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <p>
          Kebijakan ini menjelaskan data apa yang PintuWeb terima saat Anda mengunjungi {SITE.replace('https://', '')} atau
          menghubungi kami, bagaimana data itu dipakai, dan hak Anda atasnya, sejalan dengan Undang-Undang Nomor 27 Tahun
          2022 tentang Pelindungan Data Pribadi.
        </p>

        <h2>Data yang kami terima</h2>
        <ul>
          <li>
            <strong>Data yang Anda kirim sendiri</strong> lewat WhatsApp atau email, misalnya nama, nama usaha, dan kebutuhan
            website. Formulir di halaman <Link href="/kontak">Kontak</Link> tidak menyimpan apa pun di server kami; formulir itu
            hanya menyusun pesan lalu membuka aplikasi WhatsApp atau email Anda.
          </li>
          <li>
            <strong>Statistik kunjungan anonim</strong> dari Vercel Web Analytics, seperti halaman yang dibuka dan jenis perangkat.
            Statistik ini tidak memakai cookie dan tidak mengidentifikasi Anda secara pribadi.
          </li>
          <li>
            <strong>Materi proyek</strong> yang Anda berikan saat bekerja sama, misalnya logo, foto, dan teks untuk website Anda.
          </li>
        </ul>

        <h2>Untuk apa data dipakai</h2>
        <ul>
          <li>Menjawab pertanyaan dan menyiapkan penawaran.</li>
          <li>Mengerjakan, memelihara, dan mendukung website Anda.</li>
          <li>Mengingatkan jadwal perpanjangan domain dan hosting.</li>
          <li>Memahami halaman mana yang berguna bagi pengunjung, dari statistik anonim.</li>
        </ul>

        <h2>Berbagi data</h2>
        <p>
          Kami tidak menjual atau menyewakan data Anda. Data hanya dibagikan kepada penyedia layanan yang memang diperlukan
          untuk menjalankan website Anda, seperti registrar domain dan penyedia hosting, atau bila diwajibkan oleh hukum.
        </p>

        <h2>Penyimpanan & keamanan</h2>
        <p>
          Percakapan dan materi proyek disimpan selama dibutuhkan untuk kerja sama dan dukungan. Kode website disimpan di
          repository Git yang aksesnya terbatas.
        </p>

        <h2>Hak Anda</h2>
        <p>
          Anda boleh meminta salinan, perbaikan, atau penghapusan data yang Anda berikan kepada kami. Kirim permintaan ke
          email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> atau WhatsApp {WA_DISPLAY}.
        </p>

        <h2>Perubahan kebijakan</h2>
        <p>
          Bila kebijakan ini berubah, tanggal berlaku di atas akan diperbarui. Lihat juga{' '}
          <Link href="/syarat-ketentuan">Syarat & Ketentuan</Link>.
        </p>
      </article>
    </main>
  )
}
