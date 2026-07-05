'use client'

import { useEffect, useState, useMemo } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { 
  ChevronDown, 
  Search, 
  Shield,
  HelpCircle,
  DollarSign,
  Clock,
  Settings,
  Users,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Star,
  Zap,
  Filter
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const faqCategories = [
  { id: 'all', name: 'Semua', icon: HelpCircle, count: 0 },
  { id: 'general', name: 'Umum', icon: HelpCircle, count: 0 },
  { id: 'pricing', name: 'Harga', icon: DollarSign, count: 0 },
  { id: 'process', name: 'Proses', icon: Clock, count: 0 },
  { id: 'technical', name: 'Teknis', icon: Settings, count: 0 },
  { id: 'support', name: 'Dukungan', icon: Users, count: 0 },
]

const faqs = [
  // General Questions
  {
    category: 'general',
    question: 'Berapa lama waktu pembuatan website?',
    answer: 'Untuk landing page sederhana: 1-2 hari kerja. Website bisnis (5 halaman): 3-5 hari kerja. E-commerce atau website custom: 1-2 minggu. Timeline tergantung kompleksitas fitur dan kelengkapan konten dari klien.',
    tags: ['waktu', 'timeline', 'pengerjaan']
  },
  {
    category: 'general',
    question: 'Bagaimana proses kerja dari awal sampai akhir?',
    answer: 'Proses kami: 1) Konsultasi kebutuhan, 2) Proposal & agreement, 3) Wireframe & mockup, 4) Development, 5) Testing & revisi, 6) Go-live & handover. Setiap tahap dikomunikasikan via WhatsApp dengan progress report.',
    tags: ['proses', 'tahapan', 'workflow']
  },
  {
    category: 'general',
    question: 'Apa saja yang harus saya siapkan sebelum memulai?',
    answer: 'Yang wajib: nama bisnis, deskripsi usaha, kontak informasi. Yang membantu: logo, foto produk/layanan, content brief, domain existing (jika ada). Jangan khawatir jika belum lengkap, kami bantu menyiapkan konten yang dibutuhkan.',
    tags: ['persiapan', 'requirement', 'konten']
  },
  {
    category: 'general',
    question: 'Apakah saya akan memiliki hak penuh atas website?',
    answer: 'Ya, 100%. Setelah pembayaran lunas, Anda mendapat semua file source code, akses admin penuh, dan hak kepemilikan website. Tidak ada vendor lock-in atau ketergantungan pada kami.',
    tags: ['kepemilikan', 'hak', 'ownership']
  },
  {
    category: 'general',
    question: 'Apakah website saya SEO friendly?',
    answer: 'Ya, semua website sudah SEO optimized: struktur HTML semantik, meta tags lengkap, site speed optimal, mobile-friendly, sitemap XML, dan schema markup. Kami juga berikan panduan SEO dasar.',
    tags: ['seo', 'optimasi', 'google']
  },

  // Pricing Questions
  {
    category: 'pricing',
    question: 'Berapa biaya pembuatan website?',
    answer: 'Paket Starter: Rp200k (1 halaman). Paket Bisnis: Rp1.5jt (5 halaman + hosting). Paket Custom: Rp3.5jt+ (unlimited fitur). Harga sudah termasuk design, development, dan basic SEO. Tidak ada biaya tersembunyi.',
    tags: ['harga', 'biaya', 'paket']
  },
  {
    category: 'pricing',
    question: 'Bagaimana sistem pembayarannya?',
    answer: 'Paket Starter: 100% di awal. Paket Bisnis & Custom: 50% DP untuk mulai, 50% setelah selesai. Kami terima transfer bank, e-wallet (OVO, GoPay, DANA), atau QRIS. Invoice akan dikirim sebelum pembayaran.',
    tags: ['pembayaran', 'dp', 'invoice']
  },
  {
    category: 'pricing',
    question: 'Apakah ada biaya maintenance atau hosting?',
    answer: 'Paket Bisnis sudah include hosting 1 tahun. Setelah itu sekitar Rp300-500k/tahun tergantung kebutuhan. Maintenance website gratis selama 30 hari pertama, setelah itu bisa extend dengan paket maintenance bulanan.',
    tags: ['maintenance', 'hosting', 'biaya']
  },
  {
    category: 'pricing',
    question: 'Apakah bisa refund jika tidak puas?',
    answer: 'Ya, kami berikan garansi 100% money back dalam 7 hari jika hasil tidak sesuai brief atau ekspektasi. Setelah approval design dan development dimulai, refund 50%. Kami berkomitmen pada kepuasan klien.',
    tags: ['refund', 'garansi', 'jaminan']
  },

  // Process Questions
  {
    category: 'process',
    question: 'Apakah saya bisa merevisi desain?',
    answer: 'Tentu! Setiap paket include 2-3x revisi major gratis. Revisi minor seperti ganti teks, warna, atau foto bisa unlimited. Kami akan tunjukkan mockup/preview sebelum development untuk memastikan sesuai ekspektasi.',
    tags: ['revisi', 'perubahan', 'design']
  },
  {
    category: 'process',
    question: 'Apakah saya bisa melihat progres pengerjaan?',
    answer: 'Absolut! Kami berikan akses staging site dimana Anda bisa lihat progress real-time. Update harian via WhatsApp dengan screenshot dan status completion. Transparansi penuh dalam setiap tahap development.',
    tags: ['progress', 'monitoring', 'transparansi']
  },
  {
    category: 'process',
    question: 'Bagaimana jika saya butuh tambahan fitur di tengah proses?',
    answer: 'Bisa, tapi akan ada additional cost yang akan kita diskusikan dulu. Untuk minor addition biasanya gratis. Major features seperti e-commerce, booking system, dll akan dibuatkan quotation terpisah.',
    tags: ['tambahan', 'fitur', 'scope']
  },
  {
    category: 'process',
    question: 'Apakah kalian menyediakan copywriting atau konten?',
    answer: 'Ya! Kami bantu content creation berdasarkan brief dan interview singkat. Include copywriting, image sourcing, dan content strategy. Untuk content photography bisa dibantu networking dengan fotografer profesional.',
    tags: ['copywriting', 'content', 'konten']
  },

  // Technical Questions
  {
    category: 'technical',
    question: 'Teknologi apa yang digunakan untuk membuat website?',
    answer: 'Kami menggunakan teknologi modern: Next.js + React untuk frontend, Node.js untuk backend, TailwindCSS untuk styling, dan deploy ke Vercel/Netlify. Semua tech stack terdepan untuk performance optimal.',
    tags: ['teknologi', 'tech-stack', 'modern']
  },
  {
    category: 'technical',
    question: 'Apakah website saya akan mobile friendly dan cepat?',
    answer: 'Ya, 100% responsive dan mobile-first design. Kami optimize untuk Core Web Vitals dengan target performance score 90+ di Google PageSpeed. Loading time < 3 detik dan compatible semua browser modern.',
    tags: ['mobile', 'speed', 'performance']
  },
  {
    category: 'technical',
    question: 'Apakah ada fitur admin panel atau CMS?',
    answer: 'Untuk paket Bisnis+, kami sediakan simple CMS dimana Anda bisa edit text, upload gambar, manage blog posts tanpa coding. User-friendly interface dengan tutorial lengkap cara penggunaan.',
    tags: ['cms', 'admin', 'management']
  },
  {
    category: 'technical',
    question: 'Apakah bisa integrasi dengan third-party services?',
    answer: 'Tentu! Kami bisa integrasikan dengan payment gateway (Midtrans, Xendit), Google Analytics, Facebook Pixel, email marketing (Mailchimp), WhatsApp API, dan berbagai tools bisnis lainnya.',
    tags: ['integrasi', 'third-party', 'api']
  },
  {
    category: 'technical',
    question: 'Bagaimana keamanan website dijamin?',
    answer: 'Kami implement SSL certificate, security headers, input validation, XSS protection, dan regular security updates. Backup otomatis dan monitoring uptime 99.9%. Data klien dienkripsi dan tidak pernah dibagikan ke pihak ketiga.',
    tags: ['keamanan', 'security', 'ssl']
  },

  // Support Questions
  {
    category: 'support',
    question: 'Apakah tersedia layanan support setelah website live?',
    answer: 'Ya! Support gratis 30 hari untuk bug fixes, minor updates, dan troubleshooting. Setelah itu bisa lanjut paket maintenance bulanan atau per-request. Support via WhatsApp dengan response time < 24 jam.',
    tags: ['support', 'maintenance', 'after-sales']
  },
  {
    category: 'support',
    question: 'Bagaimana jika website saya bermasalah atau down?',
    answer: 'Tim teknis kami monitoring uptime 24/7. Jika ada issue, kami langsung handle dan informasikan via WhatsApp. Backup harian otomatis sehingga data aman. Average uptime 99.9% dengan recovery time < 1 jam.',
    tags: ['troubleshooting', 'uptime', 'recovery']
  },
  {
    category: 'support',
    question: 'Apakah bisa migrasi dari website lama ke yang baru?',
    answer: 'Bisa! Kami bantu migrasi content, setup redirect, dan maintain SEO ranking. Proses migration biasanya 1-2 hari tanpa downtime. Include transfer domain dan database jika diperlukan.',
    tags: ['migrasi', 'transfer', 'website-lama']
  },
  {
    category: 'support',
    question: 'Apakah ada training cara mengelola website?',
    answer: 'Ya! Kami sediakan training session 1-on-1 via video call untuk menjelaskan cara update content, manage orders (untuk e-commerce), dan basic maintenance. Plus dokumentasi lengkap dan video tutorial.',
    tags: ['training', 'tutorial', 'panduan']
  }
]

// Update category counts
faqCategories.forEach(category => {
  if (category.id === 'all') {
    category.count = faqs.length
  } else {
    category.count = faqs.filter(faq => faq.category === category.id).length
  }
})

export default function FaqPageContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    AOS.init({ once: true, duration: 800 })
  }, [])

  const filteredFaqs = useMemo(() => {
    let filtered = faqs

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === activeCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    return filtered
  }, [activeCategory, searchTerm])

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setOpenIndex(null)
    setSearchTerm('')
  }

  return (
    <main className="pt-16 scroll-smooth bg-white text-slate-800">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white py-20 md:py-28 px-6 overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm" data-aos="fade-up">
            <Shield size={16} className="text-blue-700" />
            <span className="text-sm font-medium text-slate-700">Frequently Asked Questions</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight" data-aos="fade-up" data-aos-delay="100">
            Pertanyaan <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Umum</span><br />
            Seputar Layanan Kami
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Temukan jawaban lengkap untuk pertanyaan yang paling sering ditanyakan tentang proses, 
            harga, teknologi, dan layanan PintuWeb. Belum ketemu jawaban? Chat langsung dengan tim kami.
          </p>

          {/* Trust Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12" data-aos="fade-up" data-aos-delay="300">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-1">{faqs.length}+</div>
              <div className="text-sm text-slate-600">FAQ Tersedia</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-1">&lt; 1H</div>
              <div className="text-sm text-slate-600">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-1">100%</div>
              <div className="text-sm text-slate-600">Questions Answered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-1">24/7</div>
              <div className="text-sm text-slate-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-12" data-aos="fade-up">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari pertanyaan, kata kunci, atau topik..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center gap-2 text-sm text-slate-600 mr-4">
              <Filter size={16} />
              <span>Filter kategori:</span>
            </div>
            {faqCategories.map((category) => {
              const IconComponent = category.icon
              const isActive = activeCategory === category.id
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-700 text-white shadow-lg transform scale-105'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  <IconComponent size={18} />
                  <span>{category.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive 
                      ? 'bg-blue-600' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Results Info */}
          <div className="text-center mb-8">
            <p className="text-slate-600">
              {searchTerm ? (
                <>Menampilkan <strong>{filteredFaqs.length}</strong> hasil untuk &ldquo;{searchTerm}&rdquo;</>
              ) : (
                <>Menampilkan <strong>{filteredFaqs.length}</strong> pertanyaan dalam kategori <strong>{faqCategories.find(c => c.id === activeCategory)?.name}</strong></>
              )}
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12" data-aos="fade-up">
                <HelpCircle size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                  Tidak menemukan jawaban yang dicari?
                </h3>
                <p className="text-slate-500 mb-6">
                  Coba kata kunci lain atau hubungi kami langsung untuk bantuan personal.
                </p>
                <a
                  href="https://wa.me/6281339908765?text=Halo%2C%20saya%20punya%20pertanyaan%20yang%20tidak%20ada%20di%20FAQ."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors"
                >
                  <MessageCircle size={18} />
                  Tanya Langsung
                </a>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index
                const currentCategory = faqCategories.find(cat => cat.id === faq.category)
                const CategoryIcon = currentCategory?.icon || HelpCircle

                return (
                  <motion.div
                    key={`${faq.category}-${index}`}
                    layout
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'bg-blue-50 border-blue-200 shadow-lg'
                        : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
                    }`}
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                  >
                    <button
                      onClick={() => toggle(index)}
                      className="w-full flex items-start gap-4 text-left px-6 py-6 focus:outline-none group"
                      aria-expanded={isOpen}
                      aria-controls={`faq-content-${index}`}
                    >
                      {/* Category Icon */}
                      <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-1 transition-colors ${
                        isOpen 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                      }`}>
                        <CategoryIcon size={18} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className={`text-lg font-semibold mb-2 pr-4 transition-colors ${
                          isOpen ? 'text-blue-900' : 'text-slate-900'
                        }`}>
                          {faq.question}
                        </h3>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-2">
                          {faq.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className={`text-xs px-2 py-1 rounded-full ${
                              isOpen 
                                ? 'bg-blue-200 text-blue-800' 
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Answer */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`faq-content-${index}`}
                              key={`faq-content-${index}`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 border-t border-blue-200 mt-4">
                                <p className="text-slate-700 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Toggle Icon */}
                      <div className={`shrink-0 transition-all duration-300 ${
                        isOpen ? 'text-blue-600 rotate-180' : 'text-slate-400'
                      }`}>
                        <ChevronDown size={20} />
                      </div>
                    </button>
                  </motion.div>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* Additional Help Section */}
      <section className="py-16 bg-slate-50 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12" data-aos="fade-up">
            Butuh Bantuan Lebih Lanjut?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Quick Contact */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <MessageCircle size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Chat Langsung</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Tim support kami siap membantu menjawab pertanyaan spesifik Anda via WhatsApp.
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-green-500" />
                      <span>Response {'<'} 1 jam</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap size={12} className="text-blue-500" />
                      <span>Real-time chat</span>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/6281339908765?text=Halo%2C%20saya%20butuh%20bantuan%20terkait%20layanan%20PintuWeb."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm"
                  >
                    <MessageCircle size={16} />
                    Chat Sekarang
                  </a>
                </div>
              </div>
            </div>

            {/* Consultation */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Konsultasi Gratis</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Diskusi mendalam tentang kebutuhan website dan strategi digital bisnis Anda.
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-500" />
                      <span>Expert advice</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield size={12} className="text-purple-500" />
                      <span>No commitment</span>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/6281339908765?text=Halo%2C%20saya%20ingin%20konsultasi%20gratis%20untuk%20proyek%20website%20saya."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Users size={16} />
                    Konsultasi Gratis
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-aos="fade-up">
            Sudah Siap Memulai Project Website Anda?
          </h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            Jangan biarkan pertanyaan menghalangi kesuksesan digital bisnis Anda. 
            Tim expert kami siap membantu mewujudkan website impian dengan hasil yang melampaui ekspektasi.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8" data-aos="fade-up" data-aos-delay="400">
            <a
              href="https://wa.me/6281339908765?text=Halo%2C%20saya%20siap%20memulai%20project%20website%20dengan%20PintuWeb!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Zap size={20} />
              Mulai Project Sekarang
              <ArrowRight size={18} />
            </a>
            
            <a
              href="#portfolio"
              className="inline-flex items-center gap-3 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Lihat Portfolio Kami
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>Konsultasi gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} />
              <span>Garansi 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Pengerjaan cepat</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} />
              <span>Support lifetime</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}