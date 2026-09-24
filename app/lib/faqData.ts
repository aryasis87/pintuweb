import { PRICE_SUMMARY, PAYMENT_SUMMARY } from './packages'
import { HelpCircle, DollarSign, Clock, Settings, Users, type LucideIcon } from 'lucide-react'

export type FaqCategory = { id: string; name: string; icon: LucideIcon }
export type FaqItem = { category: string; question: string; answer: string; tags: string[] }

export const faqCategories: FaqCategory[] = [
  { id: 'general', name: 'Umum', icon: HelpCircle },
  { id: 'pricing', name: 'Harga', icon: DollarSign },
  { id: 'process', name: 'Proses', icon: Clock },
  { id: 'technical', name: 'Teknis', icon: Settings },
  { id: 'support', name: 'Dukungan', icon: Users },
]

export const faqItems: FaqItem[] = [
  { category: 'general', question: 'Saya belum pernah punya website, apakah bisa dibantu dari awal?', answer: 'Tentu saja! Sebagian besar klien kami adalah first-timer. Kami memandu Anda step by step mulai dari konsep, desain, konten, hingga website live. Tim kami berpengalaman menangani klien yang benar-benar baru dalam dunia digital.', tags: ['pemula', 'konsultasi', 'panduan'] },
  { category: 'general', question: 'Apakah website yang dibuat bisa muncul di Google?', answer: 'Ya, semua website kami dioptimasi SEO sejak awal: meta tags, structured data, sitemap, dan teknik SEO on-page lainnya. Biasanya website mulai terindeks Google dalam 1–2 minggu, dan ranking meningkat seiring waktu dengan konten berkualitas.', tags: ['seo', 'google', 'ranking'] },
  { category: 'general', question: 'Apa yang membedakan layanan PintuWeb dengan yang lain?', answer: 'Kami fokus pada kualitas dan kepuasan klien. Setiap website dibuat custom (bukan template), performance score 90+, mobile-first, SEO optimized, dan after-sales support yang responsif. Kami juga memberikan training untuk maintenance mandiri.', tags: ['keunggulan', 'kualitas', 'custom'] },
  { category: 'general', question: 'Apakah bisa request fitur custom sesuai kebutuhan bisnis?', answer: 'Tentu bisa! Kami spesialisasi dalam custom development: booking system, membership area, calculator tools, atau integrasi dengan sistem existing — semua bisa kami buatkan. Diskusikan kebutuhan Anda dan kami berikan solusi terbaik.', tags: ['custom', 'fitur', 'development'] },
  { category: 'general', question: 'Apakah website bisa diintegrasikan dengan media sosial?', answer: 'Ya, kami integrasikan website dengan Instagram, Facebook, WhatsApp, TikTok, LinkedIn, dll. Termasuk social share buttons, Instagram feed widget, dan Facebook Pixel untuk tracking ads.', tags: ['sosial media', 'integrasi', 'instagram'] },

  { category: 'pricing', question: 'Berapa biaya pembuatan website?', answer: PRICE_SUMMARY, tags: ['harga', 'paket', 'biaya'] },
  { category: 'pricing', question: 'Apakah ada biaya tersembunyi?', answer: 'Tidak ada biaya tersembunyi. Semua biaya dijelaskan di awal termasuk hosting, domain, dan maintenance. Satu-satunya biaya tambahan adalah jika ada permintaan perubahan major setelah website selesai, dan itupun dikomunikasikan lebih dulu.', tags: ['transparansi', 'biaya', 'jujur'] },
  { category: 'pricing', question: 'Bagaimana sistem pembayaran?', answer: PAYMENT_SUMMARY, tags: ['pembayaran', 'dp', 'transfer'] },
  { category: 'pricing', question: 'Apakah ada diskon untuk startup atau UMKM?', answer: 'Ya! Ada special discount hingga 20% untuk bisnis baru yang berdiri kurang dari 1 tahun. Kami juga bisa mengatur payment plan yang lebih fleksibel. Hubungi kami untuk diskusi lebih lanjut.', tags: ['diskon', 'startup', 'umkm'] },

  { category: 'process', question: 'Berapa lama proses pembuatan website?', answer: 'Landing page: 1–2 hari kerja. Business website: 3–5 hari kerja. Custom website: 1–2 minggu. Timeline tergantung kompleksitas dan kelengkapan konten dari klien. Kami selalu komunikasi progress real-time via WhatsApp.', tags: ['waktu', 'timeline', 'proses'] },
  { category: 'process', question: 'Apa saja yang perlu saya siapkan?', answer: 'Yang wajib: nama bisnis, deskripsi usaha, dan kontak. Opsional tapi membantu: logo, foto produk/layanan, content brief, referensi website. Jangan khawatir jika belum lengkap — kami bantu menyiapkan konten yang dibutuhkan.', tags: ['persiapan', 'konten', 'logo'] },
  { category: 'process', question: 'Bagaimana jika saya tidak punya konten atau foto?', answer: 'Tidak masalah! Kami bisa menyediakan stock photos berkualitas, menulis konten sesuai brief Anda, atau memberikan template konten yang bisa Anda edit. Kami juga bisa merekomendasikan photographer jika butuh foto profesional.', tags: ['konten', 'foto', 'copywriting'] },
  { category: 'process', question: 'Apakah saya mendapat akses penuh ke website?', answer: 'Absolutely! Setelah website selesai dan lunas, Anda mendapat full ownership: source code, akses hosting, domain, dan semua credentials. Website 100% milik Anda, lengkap dengan dokumentasi.', tags: ['ownership', 'akses', 'kontrol'] },

  { category: 'technical', question: 'Apakah website responsive (mobile-friendly)?', answer: 'Ya, 100% responsive dan mobile-first. Kami test di berbagai device dan browser. Website tampil sempurna di smartphone, tablet, laptop, dan desktop — yang juga penting untuk ranking SEO Google.', tags: ['responsive', 'mobile', 'device'] },
  { category: 'technical', question: 'Teknologi apa yang digunakan?', answer: 'Kami menggunakan teknologi modern: Next.js, React, Tailwind CSS untuk performa optimal, hosting cloud dengan CDN global, serta database PostgreSQL atau MongoDB sesuai kebutuhan project.', tags: ['teknologi', 'nextjs', 'modern'] },
  { category: 'technical', question: 'Bagaimana keamanan website dijamin?', answer: 'Semua website dilengkapi SSL (HTTPS), security headers, dan validasi input. Kode tersimpan di repository Git sehingga versi sebelumnya bisa dipulihkan, dan selama masa maintenance kami perbarui security patch secara berkala. Untuk e-commerce, kami tambahkan lapisan keamanan ekstra.', tags: ['keamanan', 'ssl', 'security'] },
  { category: 'technical', question: 'Berapa lama waktu loading website yang dibuat?', answer: 'Website kami dioptimasi untuk loading 1–3 detik: image optimization, code minification, lazy loading, CDN, dan caching. Performance score Google Lighthouse rata-rata 90–100.', tags: ['speed', 'loading', 'performance'] },

  { category: 'support', question: 'Apakah ada garansi?', answer: 'Ya, garansi 30 hari setelah website live: bug dan masalah teknis kami perbaiki gratis. Setelah itu maintenance mengikuti paket (1–6 bulan) dan bisa diperpanjang bulanan atau per-request.', tags: ['garansi', 'support', 'maintenance'] },
  { category: 'support', question: 'Bagaimana cara update konten website setelah jadi?', answer: 'Kami provide training update konten via dashboard admin (paket Business+) atau request update ke kami. Selama masa maintenance, update minor seperti teks, gambar, atau info kontak kami bantu gratis via WhatsApp.', tags: ['update', 'konten', 'training'] },
  { category: 'support', question: 'Setelah website selesai, apakah masih bisa minta bantuan?', answer: 'Tentu! Kami berkomitmen untuk long-term partnership. Tim support available via WhatsApp untuk troubleshooting, konsultasi, atau request maintenance. Relationship kami tidak berakhir setelah project selesai.', tags: ['partnership', 'bantuan', 'support'] },
]
