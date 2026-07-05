'use client'

import { useState, useMemo } from 'react'
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  Shield, 
  Clock, 
  DollarSign, 
  Settings, 
  Users, 
  ArrowRight,
  MessageCircle
} from 'lucide-react'

const faqCategories = [
  { id: 'general', name: 'Umum', icon: HelpCircle },
  { id: 'pricing', name: 'Harga', icon: DollarSign },
  { id: 'process', name: 'Proses', icon: Clock },
  { id: 'technical', name: 'Teknis', icon: Settings },
  { id: 'support', name: 'Dukungan', icon: Users },
]

const faqItems = [
  // General Category
  {
    category: 'general',
    question: 'Saya belum pernah punya website, apakah bisa dibantu dari awal?',
    answer: 'Tentu saja! Sebagian besar klien kami adalah first-timer. Kami akan memandu Anda step by step mulai dari konsep, desain, konten, hingga website live. Tim kami berpengalaman menangani klien yang benar-benar baru dalam dunia digital.',
    tags: ['pemula', 'konsultasi', 'panduan']
  },
  {
    category: 'general',
    question: 'Apakah website yang dibuat bisa muncul di Google?',
    answer: 'Ya, semua website kami sudah dioptimasi SEO sejak awal. Kami implementasikan meta tags, structured data, sitemap, dan teknik SEO on-page lainnya. Biasanya website mulai terindeks Google dalam 1-2 minggu, dan ranking akan meningkat seiring waktu dengan konten berkualitas.',
    tags: ['seo', 'google', 'ranking']
  },
  {
    category: 'general',
    question: 'Apa yang membedakan layanan PintuWeb dengan yang lain?',
    answer: 'Kami fokus pada kualitas dan kepuasan klien. Setiap website dibuat custom (bukan template), performance score 90+, mobile-first design, SEO optimized, dan yang terpenting adalah layanan after-sales support yang responsif. Kami juga memberikan training untuk maintenance mandiri.',
    tags: ['keunggulan', 'kualitas', 'custom']
  },

  // Pricing Category  
  {
    category: 'pricing',
    question: 'Berapa biaya pembuatan website?',
    answer: 'Harga dimulai dari Rp200.000 untuk landing page sederhana, Rp1.500.000 untuk business website (5+ halaman + hosting 1 tahun), dan Rp3.500.000 untuk website custom dengan fitur advanced. Semua harga sudah termasuk design, development, dan basic SEO.',
    tags: ['harga', 'paket', 'biaya']
  },
  {
    category: 'pricing',
    question: 'Apakah ada biaya tersembunyi?',
    answer: 'Tidak ada biaya tersembunyi sama sekali. Semua biaya sudah dijelaskan di awal termasuk hosting, domain (jika ada), dan maintenance. Satu-satunya biaya tambahan adalah jika ada permintaan perubahan major setelah website selesai, dan itupun akan dikomunikasikan terlebih dahulu.',
    tags: ['transparansi', 'biaya', 'jujur']
  },
  {
    category: 'pricing',
    question: 'Bagaimana sistem pembayaran?',
    answer: 'Untuk paket Starter: 100% di awal. Untuk paket Business dan Enterprise: 50% DP untuk memulai project, 50% sisanya setelah website selesai dan disetujui. Kami terima transfer bank, e-wallet, atau QRIS untuk kemudahan pembayaran.',
    tags: ['pembayaran', 'dp', 'transfer']
  },

  // Process Category
  {
    category: 'process',
    question: 'Berapa lama proses pembuatan website?',
    answer: 'Landing page: 1-2 hari kerja. Business website: 3-5 hari kerja. Custom website: 1-2 minggu. Timeline tergantung kompleksitas dan kelengkapan konten dari klien. Kami selalu komunikasi progress secara real-time via WhatsApp.',
    tags: ['waktu', 'timeline', 'proses']
  },
  {
    category: 'process',
    question: 'Apa saja yang perlu saya siapkan?',
    answer: 'Yang wajib: nama bisnis, deskripsi usaha, dan kontak. Yang opsional tapi membantu: logo, foto produk/layanan, content brief, referensi website yang disukai. Jangan khawatir jika belum lengkap, kami akan bantu menyiapkan konten yang dibutuhkan.',
    tags: ['persiapan', 'konten', 'logo']
  },
  {
    category: 'process',
    question: 'Bagaimana proses revisi website?',
    answer: 'Setiap paket includes 2-3 kali revisi major gratis. Kami akan tunjukkan preview website sebelum live, dan Anda bisa request perubahan. Minor changes seperti typo atau warna bisa unlimited. Komunikasi revisi melalui WhatsApp dengan screenshot untuk clarity.',
    tags: ['revisi', 'perubahan', 'feedback']
  },

  // Technical Category
  {
    category: 'technical',
    question: 'Apakah website responsive (mobile-friendly)?',
    answer: 'Ya, 100% responsive dan mobile-first. Kami test di berbagai device dan browser. Website akan tampil sempurna di smartphone, tablet, laptop, dan desktop. Google juga mengutamakan mobile-friendly website untuk ranking SEO.',
    tags: ['responsive', 'mobile', 'device']
  },
  {
    category: 'technical',
    question: 'Teknologi apa yang digunakan?',
    answer: 'Kami menggunakan teknologi modern seperti Next.js, React, Tailwind CSS untuk performa optimal. Hosting di cloud server dengan CDN global untuk loading speed tinggi. Database menggunakan PostgreSQL atau MongoDB sesuai kebutuhan project.',
    tags: ['teknologi', 'nextjs', 'modern']
  },
  {
    category: 'technical',
    question: 'Bagaimana keamanan website dijamin?',
    answer: 'Semua website dilengkapi SSL certificate, security headers, input validation, dan backup otomatis. Kami juga monitoring website secara berkala dan update security patch. Untuk e-commerce, kami implement additional security layer.',
    tags: ['keamanan', 'ssl', 'security']
  },

  // Support Category
  {
    category: 'support',
    question: 'Apakah ada garansi?',
    answer: 'Ya, kami berikan garansi 30 hari untuk bug fixes dan technical issues. Selain itu, kami provide lifetime support untuk konsultasi dan maintenance guidance. Jika ada masalah teknis, kami perbaiki secara gratis.',
    tags: ['garansi', 'support', 'maintenance']
  },
  {
    category: 'support',
    question: 'Bagaimana cara update konten website setelah jadi?',
    answer: 'Kami provide training cara update konten via dashboard admin (untuk paket Business+) atau bisa request update ke kami kapan saja. Update minor seperti text, gambar, atau info kontak bisa kami bantu gratis via WhatsApp.',
    tags: ['update', 'konten', 'training']
  },
  {
    category: 'support',
    question: 'Setelah website selesai, apakah masih bisa minta bantuan?',
    answer: 'Tentu! Kami berkomitmen untuk long-term partnership. Tim support kami available 24/7 via WhatsApp untuk troubleshooting, konsultasi, atau request maintenance. Relationship kami tidak berakhir setelah project selesai.',
    tags: ['partnership', '24/7', 'bantuan']
  },

  // Additional General Questions
  {
    category: 'general',
    question: 'Apakah bisa request fitur custom sesuai kebutuhan bisnis?',
    answer: 'Tentu bisa! Kami spesialisasi dalam custom development. Apapun fitur yang Anda butuhkan seperti booking system, membership area, calculator tools, atau integrasi dengan sistem existing - kami bisa buatkan. Diskusikan kebutuhan Anda dan kami akan berikan solusi terbaik.',
    tags: ['custom', 'fitur', 'development']
  },
  {
    category: 'general',
    question: 'Apakah website bisa diintegrasikan dengan media sosial?',
    answer: 'Ya, kami bisa integrasikan website dengan semua platform media sosial seperti Instagram, Facebook, WhatsApp, TikTok, LinkedIn, dll. Termasuk social share buttons, Instagram feed widget, dan Facebook Pixel untuk tracking ads.',
    tags: ['sosial media', 'integrasi', 'instagram']
  },

  // Additional Pricing Questions
  {
    category: 'pricing',
    question: 'Apakah ada paket berlangganan bulanan?',
    answer: 'Untuk website standard, pembayaran one-time. Namun untuk paket Business dan Enterprise, sudah termasuk hosting 1 tahun. Setelah tahun pertama, biaya perpanjangan hosting hanya Rp300.000-500.000/tahun tergantung resource yang digunakan. Maintenance dan support tetap gratis.',
    tags: ['berlangganan', 'hosting', 'tahunan']
  },
  {
    category: 'pricing',
    question: 'Apakah ada diskon untuk startup atau UMKM?',
    answer: 'Ya! Kami support startup dan UMKM lokal. Ada special discount hingga 20% untuk bisnis baru yang berdiri kurang dari 1 tahun. Kami juga bisa arrange payment plan yang lebih fleksibel. Hubungi kami untuk diskusi lebih lanjut.',
    tags: ['diskon', 'startup', 'umkm']
  },

  // Additional Process Questions
  {
    category: 'process',
    question: 'Bagaimana jika saya tidak punya konten atau foto untuk website?',
    answer: 'Tidak masalah! Kami bisa bantu dengan beberapa cara: (1) Menyediakan stock photos berkualitas tinggi, (2) Menulis content sesuai brief Anda, (3) Memberikan template content yang bisa Anda edit. Kami juga bisa rekomendasikan photographer jika butuh foto profesional.',
    tags: ['konten', 'foto', 'copywriting']
  },
  {
    category: 'process',
    question: 'Apakah saya akan mendapat akses penuh ke website?',
    answer: 'Absolutely! Setelah website selesai dan lunas, Anda akan mendapat full ownership: source code, akses hosting, domain, dan semua credentials. Website adalah 100% milik Anda. Kami juga provide dokumentasi lengkap untuk management website.',
    tags: ['ownership', 'akses', 'full control']
  },

  // Additional Technical Questions
  {
    category: 'technical',
    question: 'Apakah website bisa menampilkan produk dan katalog online?',
    answer: 'Ya, kami bisa buat catalog system atau full e-commerce. Fitur include: product listing dengan filter, shopping cart, wishlist, product search, kategori, dan detail produk lengkap. Untuk transaksi online, bisa integrate payment gateway seperti Midtrans atau Xendit.',
    tags: ['e-commerce', 'katalog', 'produk']
  },
  {
    category: 'technical',
    question: 'Berapa lama waktu loading website yang dibuat?',
    answer: 'Website kami dioptimasi untuk loading dalam 1-3 detik. Kami implement: image optimization, code minification, lazy loading, CDN, dan caching. Performance score Google Lighthouse rata-rata 90-100. Fast loading = better user experience dan SEO ranking.',
    tags: ['speed', 'loading', 'performance']
  },

  // Additional Support Questions
  {
    category: 'support',
    question: 'Bagaimana jika website mengalami masalah atau error?',
    answer: 'Hubungi kami langsung via WhatsApp dan kami akan respon maksimal 1 jam. Untuk technical issue, kami akan investigate dan fix sesegera mungkin. Dalam garansi period, semua bug fixes gratis. Website juga ada auto-backup jadi data Anda aman.',
    tags: ['error', 'troubleshooting', 'emergency']
  },
  {
    category: 'support',
    question: 'Apakah ada training untuk menggunakan website?',
    answer: 'Ya, untuk paket Business dan Enterprise, kami provide training session via video call atau tatap muka (area Trenggalek). Training meliputi: cara update content, upload foto/video, manage products, lihat analytics, dan basic maintenance. Plus video tutorial yang bisa ditonton kapan saja.',
    tags: ['training', 'tutorial', 'pembelajaran']
  },
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('general')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredFAQs = useMemo(() => {
    let filtered = faqItems.filter(item => item.category === activeCategory)
    
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }
    
    return filtered
  }, [activeCategory, searchQuery])

  const toggle = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setActiveIndex(null)
    setSearchQuery('')
  }

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-[var(--surface-primary)] to-white">
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 pattern-dots"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Section - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 card-base rounded-full">
            <Shield size={14} className="sm:w-4 sm:h-4" style={{ color: 'var(--primary-700)' }} />
            <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2" style={{ color: 'var(--text-primary)' }}>
            Punya <span style={{ color: 'var(--primary-700)' }}>Pertanyaan?</span>
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4" style={{ color: 'var(--text-tertiary)' }}>
            Temukan jawaban untuk pertanyaan yang paling sering ditanyakan ke kami.
          </p>
        </div>

        {/* Search Bar - Mobile Optimized */}
        <div className="relative mb-8 sm:mb-10 md:mb-12">
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="sm:w-5 sm:h-5 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Cari pertanyaan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 card-base rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-sm sm:text-base"
              style={{ 
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </div>

        {/* Category Filter - Mobile Optimized with Horizontal Scroll */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex md:flex-wrap md:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {faqCategories.map((category) => {
              const IconComponent = category.icon
              const isActive = activeCategory === category.id
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 text-xs sm:text-sm ${
                    isActive
                      ? 'shadow-md sm:shadow-lg transform scale-105'
                      : ''
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--primary-700)' : 'white',
                    color: isActive ? 'var(--text-on-primary)' : 'var(--text-secondary)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--primary-700)' : 'var(--border-light)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--primary-300)'
                      e.currentTarget.style.color = 'var(--primary-700)'
                      e.currentTarget.style.backgroundColor = 'var(--primary-50)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--border-light)'
                      e.currentTarget.style.color = 'var(--text-secondary)'
                      e.currentTarget.style.backgroundColor = 'white'
                    }
                  }}
                >
                  <IconComponent size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* FAQ Items - Mobile Optimized */}
        <div className="space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, index) => {
              const isOpen = index === activeIndex
              const currentCategory = faqCategories.find(cat => cat.id === item.category)
              const CategoryIcon = currentCategory?.icon || HelpCircle

              return (
                <div
                  key={`${item.category}-${index}`}
                  className={`rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'shadow-md sm:shadow-lg'
                      : 'card-base hover:shadow-md'
                  }`}
                  style={{
                    backgroundColor: isOpen ? 'var(--primary-50)' : 'white',
                    borderColor: isOpen ? 'var(--primary-200)' : 'var(--border-light)',
                  }}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-start gap-3 sm:gap-4 text-left px-4 sm:px-6 py-4 sm:py-6 focus:outline-none group"
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${index}`}
                  >
                    {/* Category Icon */}
                    <div className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mt-0.5 transition-colors`}
                    style={{
                      backgroundColor: isOpen ? 'var(--primary-600)' : 'var(--neutral-100)',
                      color: isOpen ? 'var(--text-on-primary)' : 'var(--text-tertiary)'
                    }}>
                      <CategoryIcon size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-2 pr-2 sm:pr-4 transition-colors leading-snug`}
                      style={{
                        color: isOpen ? 'var(--primary-900)' : 'var(--text-primary)'
                      }}>
                        {item.question}
                      </h3>

                      {/* Tags - Responsive */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={`text-xs px-2 py-0.5 sm:py-1 rounded-full`}
                          style={{
                            backgroundColor: isOpen ? 'var(--primary-200)' : 'var(--neutral-100)',
                            color: isOpen ? 'var(--primary-800)' : 'var(--text-tertiary)'
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Answer - Mobile Optimized */}
                      {isOpen && (
                        <div
                          id={`faq-content-${index}`}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 sm:pt-4 border-t mt-3 sm:mt-4" style={{ borderColor: 'var(--primary-200)' }}>
                            <p className="leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Toggle Icon */}
                    <div className={`shrink-0 transition-all duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    style={{
                      color: isOpen ? 'var(--primary-600)' : 'var(--text-muted)'
                    }}>
                      <ChevronDown size={18} className="sm:w-5 sm:h-5" />
                    </div>
                  </button>
                </div>
              )
            })
          ) : (
            <div className="text-center py-8 sm:py-12 px-4">
              <HelpCircle size={40} className="sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4" style={{ color: 'var(--neutral-300)' }} />
              <h3 className="text-base sm:text-lg font-semibold mb-2" style={{ color: 'var(--text-tertiary)' }}>
                Tidak menemukan jawaban yang dicari?
              </h3>
              <p className="text-sm sm:text-base mb-4 sm:mb-6" style={{ color: 'var(--text-muted)' }}>
                Coba kata kunci lain atau hubungi kami langsung untuk bantuan personal.
              </p>
              <a
                href="https://wa.me/6281339908765?text=Halo%2C%20saya%20punya%20pertanyaan%20yang%20tidak%20ada%20di%20FAQ."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-primary px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-colors"
              >
                <MessageCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                Tanya Langsung
              </a>
            </div>
          )}
        </div>

        {/* CTA Section - Mobile Optimized */}
        <div className="text-center rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-white relative overflow-hidden bg-gradient-neutral">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 pattern-dots"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
              Masih Ada Pertanyaan Lain?
            </h3>
            <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-2" style={{ color: 'var(--neutral-300)' }}>
              Kami siap membantu menjawab pertanyaan spesifik tentang projek Anda. 
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
              <a
                href="https://wa.me/6281339908765?text=Halo%2C%20saya%20ingin%20konsultasi%20tentang%20pembuatan%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ 
                  backgroundColor: 'white', 
                  color: 'var(--text-primary)' 
                }}
              >
                <MessageCircle size={18} className="sm:w-5 sm:h-5" />
                Hubungi Sekarang
                <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              
              <a
                href="/faq"
                className="inline-flex items-center justify-center gap-2 border-2 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300"
                style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                Lihat FAQ Lengkap
              </a>
            </div>
          </div>
        </div>        
      </div>

      {/* Custom Scrollbar Hide */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}