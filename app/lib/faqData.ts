// Satu-satunya sumber FAQ: dipakai bagian FAQ di beranda, halaman /faq, dan JSON-LD FAQPage keduanya.
// Semua angka dirakit dari packages.ts & site.ts supaya jawaban tidak pernah bertentangan dengan halaman lain.
import { PACKAGES, PRICE_SUMMARY, PAYMENT_SUMMARY, RENEWAL_SUMMARY } from './packages'
import { CLIENT_PROJECTS, FOUNDED_YEAR, GUARANTEE_DAYS, HOURS, PERF_TARGET, RESPONSE } from './site'
import { DEMOS } from './demos'

export type FaqCategoryId = 'general' | 'pricing' | 'process' | 'technical' | 'support'
export type FaqCategory = { id: FaqCategoryId; name: string }
export type FaqItem = { category: FaqCategoryId; question: string; answer: string }

export const faqCategories: FaqCategory[] = [
  { id: 'general', name: 'Umum' },
  { id: 'pricing', name: 'Harga' },
  { id: 'process', name: 'Proses' },
  { id: 'technical', name: 'Teknis' },
  { id: 'support', name: 'Dukungan' },
]

const durationSummary = PACKAGES.map((p) => `${p.title}: ${p.duration}`).join('; ')

export const faqItems: FaqItem[] = [
  // Umum
  { category: 'general', question: 'Saya belum pernah punya website, apakah bisa dibantu dari awal?', answer: 'Tentu. Kami memandu Anda langkah demi langkah, mulai dari konsep, desain, dan konten sampai website online. Anda tidak perlu paham teknis; cukup ceritakan usaha dan kebutuhan Anda.' },
  { category: 'general', question: 'Sudah berapa lama PintuWeb berdiri?', answer: `PintuWeb berdiri sejak ${FOUNDED_YEAR} di Trenggalek, Jawa Timur, dan sudah menyelesaikan ${CLIENT_PROJECTS} proyek klien. Selain itu ada ${DEMOS.length} demo live yang bisa Anda coba langsung di halaman Demo.` },
  { category: 'general', question: 'Apakah website yang dibuat bisa muncul di Google?', answer: 'Ya. Setiap website dioptimasi SEO sejak awal: meta tag, structured data, sitemap, dan struktur heading yang rapi. Biasanya website mulai terindeks Google dalam 1–2 minggu, lalu peringkatnya tumbuh seiring konten yang berkualitas.' },
  { category: 'general', question: 'Apa yang membedakan PintuWeb dengan jasa lain?', answer: `Setiap website dirancang khusus sesuai identitas bisnis Anda, bukan template daur ulang. Kami menargetkan skor PageSpeed ${PERF_TARGET}, desain mobile-first, SEO sejak awal, serta garansi ${GUARANTEE_DAYS} hari dan maintenance sesuai paket.` },
  { category: 'general', question: 'Bagaimana proses kerja dari awal sampai akhir?', answer: '1) Konsultasi kebutuhan, 2) penawaran dan kesepakatan, 3) desain awal untuk Anda setujui, 4) pengembangan, 5) pengujian dan revisi, 6) website online dan serah terima. Setiap tahap kami kabarkan lewat WhatsApp.' },
  { category: 'general', question: 'Apakah saya memiliki hak penuh atas website?', answer: 'Ya. Setelah pelunasan, Anda mendapat source code, akses admin, akses hosting dan domain, serta semua kredensial. Website sepenuhnya milik Anda, tanpa ketergantungan pada kami.' },
  { category: 'general', question: 'Apakah bisa request fitur custom sesuai kebutuhan bisnis?', answer: 'Bisa. Sistem booking, area member, kalkulator, katalog dinamis, atau integrasi dengan sistem yang sudah ada dapat kami buatkan lewat paket Website Custom. Diskusikan kebutuhan Anda dan kami beri estimasi.' },

  // Harga
  { category: 'pricing', question: 'Berapa biaya pembuatan website?', answer: PRICE_SUMMARY },
  { category: 'pricing', question: 'Apakah ada biaya tersembunyi?', answer: `Tidak. Harga paket sudah mencakup desain, development, dan SEO dasar. Biaya berkala satu-satunya adalah perpanjangan domain dan hosting: ${RENEWAL_SUMMARY} Fitur besar di luar paket selalu dibicarakan dan disepakati lebih dulu.` },
  { category: 'pricing', question: 'Bagaimana sistem pembayarannya?', answer: PAYMENT_SUMMARY },
  { category: 'pricing', question: 'Bagaimana kalau saya tidak cocok dengan hasilnya?', answer: 'Desain Anda setujui dulu sebelum pengembangan dimulai, dengan jatah revisi sesuai paket. Pelunasan 50% baru dibayar setelah website selesai dan Anda setujui, jadi Anda tidak membayar penuh untuk hasil yang belum sesuai.' },
  { category: 'pricing', question: 'Apakah ada diskon untuk startup atau UMKM?', answer: 'Ada potongan hingga 20% untuk bisnis yang berdiri kurang dari 1 tahun, dan pembayaran bisa diatur lebih fleksibel. Hubungi kami untuk membicarakannya.' },

  // Proses
  { category: 'process', question: 'Berapa lama proses pembuatan website?', answer: `Perkiraan per paket setelah konten lengkap: ${durationSummary}. Waktu bisa lebih cepat atau lebih lama tergantung kelengkapan konten dan kompleksitas fitur.` },
  { category: 'process', question: 'Apa saja yang perlu saya siapkan?', answer: 'Yang wajib: nama bisnis, deskripsi usaha, dan kontak. Yang membantu: logo, foto produk atau layanan, dan contoh website yang Anda suka. Kalau belum lengkap, kami bantu menyiapkannya.' },
  { category: 'process', question: 'Bagaimana jika saya tidak punya konten atau foto?', answer: 'Tidak masalah. Kami bisa menulis konten berdasarkan brief singkat, memakai foto stok berlisensi, atau merekomendasikan fotografer bila Anda butuh foto produk sendiri.' },
  { category: 'process', question: 'Apakah saya bisa merevisi desain?', answer: 'Bisa. Jatah revisi mengikuti paket (misalnya 2× revisi desain untuk paket Standar UMKM dan Toko Online Simple). Perubahan kecil seperti teks, foto, atau info kontak kami bantu tanpa biaya selama masa maintenance.' },
  { category: 'process', question: 'Apakah saya bisa melihat progres pengerjaan?', answer: 'Bisa. Kami kirim pratinjau website yang bisa Anda buka sendiri, dan mengabarkan progres lewat WhatsApp di setiap tahap.' },
  { category: 'process', question: 'Bagaimana jika saya butuh tambahan fitur di tengah proses?', answer: 'Tambahan kecil biasanya bisa langsung kami masukkan. Fitur besar seperti toko online atau sistem booking dibuatkan penawaran terpisah dan dikerjakan setelah Anda setujui.' },

  // Teknis
  { category: 'technical', question: 'Apakah website-nya responsif (mobile-friendly)?', answer: 'Ya. Semua website kami mobile-first dan diuji di berbagai ukuran layar, dari ponsel sampai desktop. Ini juga penting untuk peringkat di Google.' },
  { category: 'technical', question: 'Teknologi apa yang digunakan?', answer: 'Next.js, React, dan Tailwind CSS, dengan hosting cloud ber-CDN. Untuk website yang butuh data, kami memakai database seperti PostgreSQL sesuai kebutuhan proyek.' },
  { category: 'technical', question: 'Seberapa cepat website yang dibuat?', answer: `Kami menargetkan skor PageSpeed ${PERF_TARGET} lewat optimasi gambar, lazy loading, CDN, dan caching. Hasil akhirnya juga dipengaruhi isi halaman, misalnya jumlah video atau gambar besar.` },
  { category: 'technical', question: 'Apakah ada admin panel atau CMS?', answer: 'Paket Toko Online Simple dan Toko Online Full sudah dilengkapi pengelolaan produk. Untuk paket lain, perubahan konten bisa lewat kami selama masa maintenance, atau CMS ditambahkan sebagai fitur.' },
  { category: 'technical', question: 'Bagaimana keamanan website dijamin?', answer: 'Semua website memakai SSL (HTTPS), security headers, dan validasi input. Kode tersimpan di repository Git sehingga versi sebelumnya bisa dipulihkan, dan selama masa maintenance kami memperbarui dependensi secara berkala.' },
  { category: 'technical', question: 'Apakah website bisa diintegrasikan dengan media sosial atau layanan lain?', answer: 'Bisa: tombol WhatsApp, Instagram, TikTok, Google Analytics, Meta Pixel, Google Maps, email marketing, hingga payment gateway untuk paket toko online.' },

  // Dukungan
  { category: 'support', question: 'Apakah ada garansi?', answer: `Ya. Selama ${GUARANTEE_DAYS} hari setelah website online, bug dan masalah teknis kami perbaiki gratis. Setelah itu maintenance mengikuti paket (1–6 bulan) dan bisa diperpanjang bulanan atau per permintaan.` },
  { category: 'support', question: 'Bagaimana cara update konten setelah website jadi?', answer: 'Untuk paket toko online, produk bisa Anda kelola sendiri. Untuk paket lain, kirim saja perubahan lewat WhatsApp; selama masa maintenance, update kecil seperti teks, gambar, atau info kontak kami kerjakan gratis. Kami juga memberi panduan singkat cara mengelola website.' },
  { category: 'support', question: 'Bagaimana jika website saya bermasalah atau down?', answer: `Kabari kami lewat WhatsApp. ${RESPONSE}, pada jam kerja (${HOURS}). Selama garansi ${GUARANTEE_DAYS} hari perbaikannya gratis, dan karena kode tersimpan di Git, versi sebelumnya selalu bisa dipulihkan.` },
  { category: 'support', question: 'Apakah bisa migrasi dari website lama?', answer: 'Bisa. Kami pindahkan konten, memasang redirect dari alamat lama agar peringkat SEO tidak hilang, dan membantu transfer domain bila diperlukan.' },
  { category: 'support', question: 'Setelah website selesai, apakah masih bisa minta bantuan?', answer: `Tentu. Kami tetap bisa dihubungi lewat WhatsApp untuk konsultasi, perbaikan, atau maintenance lanjutan. ${RESPONSE}.` },
]
