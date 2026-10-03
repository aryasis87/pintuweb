// Isi Kebijakan Privasi & Syarat Ketentuan (3 bahasa). Versi Indonesia adalah teks asli;
// EN/MS adalah terjemahan dan, bila ada perbedaan tafsir, versi Indonesia yang berlaku.
import Link from 'next/link'
import { EMAIL, GUARANTEE_DAYS, SITE, WA_DISPLAY } from '../lib/site'
import { facts, packagesFor } from '../i18n/facts'
import { path } from '../i18n/routes'
import type { Lang } from '../i18n/config'

export const LEGAL_UPDATED: Record<Lang, string> = {
  id: '28 September 2026',
  en: '28 September 2026',
  ms: '28 September 2026',
}
export const LEGAL_UPDATED_ISO = '2026-09-28'

const host = SITE.replace('https://', '')

export function PrivacyBody({ lang }: { lang: Lang }) {
  const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
  if (lang === 'en' || lang === 'ms') {
    const en = lang === 'en'
    return (
      <>
        <p>
          {en
            ? `This policy explains what data PintuWeb receives when you visit ${host} or contact us, how that data is used and your rights over it, in line with Indonesia's Personal Data Protection Law (Law No. 27 of 2022). The Indonesian version is the original; if the versions differ, the Indonesian version prevails.`
            : `Dasar ini menerangkan data yang diterima PintuWeb apabila anda melawat ${host} atau menghubungi kami, cara data itu digunakan dan hak anda ke atasnya, selaras dengan Undang-Undang Pelindungan Data Peribadi Indonesia (UU No. 27 Tahun 2022). Versi bahasa Indonesia ialah teks asal; jika terdapat perbezaan, versi bahasa Indonesia terpakai.`}
        </p>
        <h2>{en ? 'Data we receive' : 'Data yang kami terima'}</h2>
        <ul>
          <li>
            <strong>{en ? 'Data you send yourself' : 'Data yang anda hantar sendiri'}</strong>{' '}
            {en
              ? 'over WhatsApp or email, such as your name, business name and website needs. The form on the '
              : 'melalui WhatsApp atau e-mel, seperti nama, nama perniagaan dan keperluan laman web. Borang di halaman '}
            <Link href={path(lang, 'contact')}>{en ? 'Contact' : 'Hubungi'}</Link>
            {en
              ? ' page stores nothing on our server; it only composes a message and opens your WhatsApp or email app.'
              : ' tidak menyimpan apa-apa di pelayan kami; ia hanya menyusun mesej dan membuka aplikasi WhatsApp atau e-mel anda.'}
          </li>
          <li>
            <strong>{en ? 'Anonymous visit statistics' : 'Statistik lawatan tanpa nama'}</strong>{' '}
            {en
              ? 'from Vercel Web Analytics, such as pages viewed and device type. These statistics use no cookies and do not identify you personally.'
              : 'daripada Vercel Web Analytics, seperti halaman yang dibuka dan jenis peranti. Statistik ini tidak menggunakan kuki dan tidak mengenal pasti anda secara peribadi.'}
          </li>
          <li>
            <strong>{en ? 'Project materials' : 'Bahan projek'}</strong>{' '}
            {en
              ? 'you provide while we work together, such as logos, photos and text for your website.'
              : 'yang anda berikan semasa bekerjasama, contohnya logo, foto dan teks untuk laman web anda.'}
          </li>
        </ul>
        <h2>{en ? 'What the data is used for' : 'Tujuan penggunaan data'}</h2>
        <ul>
          {(en
            ? ['Answering questions and preparing quotes.', 'Building, maintaining and supporting your website.', 'Reminding you of domain and hosting renewal dates.', 'Understanding which pages help visitors, from anonymous statistics.']
            : ['Menjawab soalan dan menyediakan sebut harga.', 'Membina, menyelenggara dan menyokong laman web anda.', 'Mengingatkan tarikh pembaharuan domain dan hosting.', 'Memahami halaman mana yang berguna kepada pelawat, daripada statistik tanpa nama.']
          ).map((t) => <li key={t}>{t}</li>)}
        </ul>
        <h2>{en ? 'Sharing data' : 'Perkongsian data'}</h2>
        <p>
          {en
            ? 'We do not sell or rent your data. It is shared only with service providers genuinely needed to run your website, such as the domain registrar and hosting provider, or when required by law.'
            : 'Kami tidak menjual atau menyewakan data anda. Data hanya dikongsi dengan penyedia perkhidmatan yang benar-benar diperlukan untuk menjalankan laman web anda, seperti pendaftar domain dan penyedia hosting, atau apabila dikehendaki oleh undang-undang.'}
        </p>
        <h2>{en ? 'Storage & security' : 'Penyimpanan & keselamatan'}</h2>
        <p>
          {en
            ? 'Conversations and project materials are kept for as long as they are needed for our work together and support. Website code is kept in a Git repository with restricted access.'
            : 'Perbualan dan bahan projek disimpan selama diperlukan untuk kerjasama dan sokongan. Kod laman web disimpan dalam repositori Git dengan akses terhad.'}
        </p>
        <h2>{en ? 'Your rights' : 'Hak anda'}</h2>
        <p>
          {en
            ? 'You may ask for a copy, correction or deletion of the data you have given us. Send your request to '
            : 'Anda boleh meminta salinan, pembetulan atau pemadaman data yang anda berikan kepada kami. Hantar permintaan ke e-mel '}
          {mail} {en ? 'or WhatsApp' : 'atau WhatsApp'} {WA_DISPLAY}.
        </p>
        <h2>{en ? 'Changes to this policy' : 'Perubahan dasar'}</h2>
        <p>
          {en ? 'If this policy changes, the effective date above will be updated. See also the ' : 'Jika dasar ini berubah, tarikh berkuat kuasa di atas akan dikemas kini. Lihat juga '}
          <Link href={path(lang, 'terms')}>{en ? 'Terms & Conditions' : 'Terma & Syarat'}</Link>.
        </p>
      </>
    )
  }

  return (
    <>
      <p>
        Kebijakan ini menjelaskan data apa yang PintuWeb terima saat Anda mengunjungi {host} atau
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
        email {mail} atau WhatsApp {WA_DISPLAY}.
      </p>
      <h2>Perubahan kebijakan</h2>
      <p>
        Bila kebijakan ini berubah, tanggal berlaku di atas akan diperbarui. Lihat juga{' '}
        <Link href="/syarat-ketentuan">Syarat & Ketentuan</Link>.
      </p>
    </>
  )
}

export function TermsBody({ lang }: { lang: Lang }) {
  const f = facts(lang)
  const pk = packagesFor(lang)
  const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
  if (lang === 'en' || lang === 'ms') {
    const en = lang === 'en'
    const T = en
      ? {
          intro: 'These terms apply to the PintuWeb website service. The final details of each project — features, price and schedule — are set out in a written quote (over WhatsApp or by invoice) that you approve before work starts. If anything differs, that written quote applies. The Indonesian version of these terms is the original and prevails if the versions differ.',
          h: ['1. Packages & scope', '2. Price & payment', '3. Turnaround', '4. Revisions', '5. Guarantee & maintenance', '6. Domain & hosting', '7. Ownership', '8. Client materials', '9. Cancellation', '10. Contact'],
          scope1: 'What each package includes is listed on the ',
          scopeLink: 'Pricing',
          scope2: ' page. Work outside a package, such as major extra features, gets a separate quote and is only done once you approve it.',
          time: (list: string) => `Estimated time per package: ${list}. The clock starts when the deposit is received and the materials (text, logo, photos) are complete. Late materials from the client shift the schedule.`,
          rev: 'The number of revisions follows your package. Small changes such as text, photos or contact details are free during the maintenance period. Major changes beyond the original agreement are discussed and priced first.',
          guar: `Bugs and technical issues are fixed free of charge for ${GUARANTEE_DAYS} days after launch. After that, maintenance applies according to your package (1–6 months) and can be extended. The guarantee does not cover damage caused by code changes made by others or requests for new features.`,
          dom: 'If renewal is not made, the domain and hosting may expire under the provider’s terms.',
          own: 'Once paid in full, the website with its source code, admin access, hosting access and domain becomes entirely yours. PintuWeb only shows your project as an example of our work if you allow it.',
          mat: 'You are responsible for making sure the materials you provide (logos, photos, text) may be used and do not infringe anyone else’s rights.',
          cancel: 'Cancellation and refund terms for each project are set out in the written quote before work starts.',
          contact1: 'Questions about these terms can be sent to ',
          contact2: ' or WhatsApp ',
          contact3: '. See also the ',
          privacy: 'Privacy Policy',
        }
      : {
          intro: 'Terma ini terpakai untuk perkhidmatan membina laman web PintuWeb. Butiran akhir setiap projek — ciri, harga dan jadual — dinyatakan dalam sebut harga bertulis (melalui WhatsApp atau invois) yang anda luluskan sebelum kerja bermula. Jika ada perbezaan, sebut harga bertulis itulah yang terpakai. Versi bahasa Indonesia terma ini ialah teks asal dan terpakai jika terdapat perbezaan.',
          h: ['1. Pakej & skop', '2. Harga & pembayaran', '3. Tempoh siap', '4. Semakan', '5. Jaminan & penyelenggaraan', '6. Domain & hosting', '7. Pemilikan', '8. Bahan daripada pelanggan', '9. Pembatalan', '10. Hubungi'],
          scope1: 'Kandungan setiap pakej tertera di halaman ',
          scopeLink: 'Harga',
          scope2: '. Kerja di luar pakej, contohnya ciri tambahan yang besar, diberikan sebut harga berasingan dan hanya dilaksanakan selepas anda luluskan.',
          time: (list: string) => `Anggaran masa setiap pakej: ${list}. Masa dikira sejak deposit diterima dan bahan (teks, logo, foto) lengkap. Kelewatan bahan daripada pelanggan akan menganjakkan jadual.`,
          rev: 'Bilangan semakan mengikut pakej. Perubahan kecil seperti teks, foto atau maklumat hubungan dibantu tanpa caj sepanjang tempoh penyelenggaraan. Perubahan besar di luar persetujuan awal dibincangkan dan dipersetujui kosnya terlebih dahulu.',
          guar: `Pepijat dan masalah teknikal dibaiki secara percuma selama ${GUARANTEE_DAYS} hari selepas laman web dilancarkan. Selepas itu, penyelenggaraan terpakai mengikut pakej (1–6 bulan) dan boleh dilanjutkan. Jaminan tidak meliputi kerosakan akibat perubahan kod oleh pihak lain atau permintaan ciri baharu.`,
          dom: 'Jika pembaharuan tidak dibuat, domain dan hosting boleh tamat mengikut terma penyedianya.',
          own: 'Selepas bayaran penuh, laman web beserta kod sumber, akses admin, akses hosting dan domain menjadi milik anda sepenuhnya. PintuWeb hanya memaparkan projek anda sebagai contoh karya jika anda membenarkannya.',
          mat: 'Anda bertanggungjawab memastikan bahan yang anda berikan (logo, foto, teks) boleh digunakan dan tidak melanggar hak pihak lain.',
          cancel: 'Terma pembatalan dan pemulangan wang bagi setiap projek dinyatakan dalam sebut harga bertulis sebelum kerja bermula.',
          contact1: 'Soalan tentang terma ini boleh dihantar ke ',
          contact2: ' atau WhatsApp ',
          contact3: '. Lihat juga ',
          privacy: 'Dasar Privasi',
        }
    return (
      <>
        <p>{T.intro}</p>
        <h2>{T.h[0]}</h2>
        <p>{T.scope1}<Link href={path(lang, 'pricing')}>{T.scopeLink}</Link>{T.scope2}</p>
        <h2>{T.h[1]}</h2>
        <p>{f.payment}</p>
        <h2>{T.h[2]}</h2>
        <p>{T.time(pk.map((p) => `${p.title} ${p.duration}`).join('; '))}</p>
        <h2>{T.h[3]}</h2>
        <p>{T.rev}</p>
        <h2>{T.h[4]}</h2>
        <p>{T.guar}</p>
        <h2>{T.h[5]}</h2>
        <p>{f.renewal} {T.dom}</p>
        <h2>{T.h[6]}</h2>
        <p>{T.own}</p>
        <h2>{T.h[7]}</h2>
        <p>{T.mat}</p>
        <h2>{T.h[8]}</h2>
        <p>{T.cancel}</p>
        <h2>{T.h[9]}</h2>
        <p>{T.contact1}{mail}{T.contact2}{WA_DISPLAY}{T.contact3}<Link href={path(lang, 'privacy')}>{T.privacy}</Link>.</p>
      </>
    )
  }

  return (
    <>
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
      <p>{f.payment}</p>
      <h2>3. Waktu pengerjaan</h2>
      <p>
        Perkiraan waktu per paket: {pk.map((p) => `${p.title} ${p.duration}`).join('; ')}. Waktu dihitung sejak DP
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
        {f.renewal} Bila perpanjangan tidak dilakukan, domain dan hosting dapat berakhir sesuai ketentuan
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
        Pertanyaan soal ketentuan ini dapat dikirim ke {mail} atau WhatsApp {WA_DISPLAY}.
        Lihat juga <Link href="/kebijakan-privasi">Kebijakan Privasi</Link>.
      </p>
    </>
  )
}
