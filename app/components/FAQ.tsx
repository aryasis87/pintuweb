'use client'

import { useState, useMemo } from 'react'
import { ChevronDown, HelpCircle, Search, Shield, ArrowRight, MessageCircle } from 'lucide-react'
import { faqCategories, faqItems } from '../lib/faqData'

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