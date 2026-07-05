'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { 
  Star, 
  Quote, 
  Shield, 
  TrendingUp, 
  CheckCircle2,
  ArrowRight,
  Filter,
  Award,
  Target,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const testimonialCategories = [
  { id: 'all', name: 'Semua', count: 12 },
  { id: 'umkm', name: 'UMKM', count: 5 },
  { id: 'startup', name: 'Startup', count: 4 },
  { id: 'korporat', name: 'Korporat', count: 3 },
]

const testimonials = [
  {
    id: 1,
    name: 'Dewi Lestari',
    role: 'CEO & Founder',
    company: 'Klinik Medika Sehat',
    industry: 'Healthcare',
    category: 'umkm',
    avatar: '/images/t1.jpeg',
    location: 'Jakarta',
    projectType: 'Business Website',
    quote: 'Tim PintuWeb benar-benar profesional! Website klinik kami sekarang terlihat modern dan mudah ditemukan di Google. Pasien baru bertambah 40% dalam 2 bulan pertama setelah website live. Investasi terbaik untuk bisnis kami!',
    rating: 5,
    results: {
      metric: 'Patient Inquiries',
      increase: '+40%',
      timeframe: '2 bulan'
    },
    featured: true,
    verified: true
  },
  {
    id: 2,
    name: 'Budi Santoso',
    role: 'Founder & CTO',
    company: 'StartupAI Indonesia',
    industry: 'Technology',
    category: 'startup',
    avatar: '/images/t2.jpeg',
    location: 'Bandung',
    projectType: 'Corporate Website + Dashboard',
    quote: 'Sebagai startup tech, kami butuh website yang mencerminkan inovasi. PintuWeb tidak hanya memberikan design yang wow, tapi juga performance yang luar biasa. Loading speed website kami score 98 di Google PageSpeed!',
    rating: 5,
    results: {
      metric: 'Performance Score',
      increase: '98/100',
      timeframe: 'Google PageSpeed'
    },
    featured: true,
    verified: true
  },
  {
    id: 3,
    name: 'Siti Nurhaliza',
    role: 'Owner',
    company: 'Kopi Nusantara',
    industry: 'F&B',
    category: 'umkm',
    avatar: '/images/t3.jpeg',
    location: 'Yogyakarta',
    projectType: 'E-Commerce Website',
    quote: 'Online store kami langsung ramai setelah launching! Design yang menarik, mudah digunakan, dan yang paling penting - SEO-nya bagus banget. Penjualan online naik 300% dibanding platform marketplace. Highly recommended!',
    rating: 5,
    results: {
      metric: 'Online Sales',
      increase: '+300%',
      timeframe: '3 bulan'
    },
    featured: false,
    verified: true
  },
  {
    id: 4,
    name: 'Ahmad Rizki',
    role: 'Marketing Director',
    company: 'CV. Berkah Jaya',
    industry: 'Construction',
    category: 'korporat',
    avatar: '/images/t1.jpeg',
    location: 'Surabaya',
    projectType: 'Company Profile',
    quote: 'Website company profile kami sekarang benar-benar profesional. Klien korporat lebih percaya dan inquiry project besar meningkat signifikan. Tim PintuWeb sangat memahami kebutuhan bisnis B2B.',
    rating: 5,
    results: {
      metric: 'Corporate Leads',
      increase: '+65%',
      timeframe: '4 bulan'
    },
    featured: false,
    verified: true
  },
  {
    id: 5,
    name: 'Maya Sari',
    role: 'Creative Director',
    company: 'Studio Kreativa',
    industry: 'Creative Agency',
    category: 'startup',
    avatar: '/images/t2.jpeg',
    location: 'Bali',
    projectType: 'Portfolio Website',
    quote: 'Sebagai creative agency, kami sangat picky soal design. PintuWeb berhasil exceed expectation dengan portfolio website yang stunning dan interaktif. Client rate kami naik karena first impression yang powerful!',
    rating: 5,
    results: {
      metric: 'Client Conversion',
      increase: '+85%',
      timeframe: '6 bulan'
    },
    featured: false,
    verified: true
  },
  {
    id: 6,
    name: 'Fajar Pratama',
    role: 'CEO',
    company: 'EdTech Nusantara',
    industry: 'Education',
    category: 'startup',
    avatar: '/images/t3.jpeg',
    location: 'Jakarta',
    projectType: 'Learning Management System',
    quote: 'Platform edukasi online kami dibangun dengan teknologi terdepan oleh PintuWeb. User experience yang smooth, fitur lengkap, dan scalable untuk growth. Siswa aktif naik drastis setelah platform launch!',
    rating: 5,
    results: {
      metric: 'Active Students',
      increase: '+250%',
      timeframe: '5 bulan'
    },
    featured: true,
    verified: true
  },
  {
    id: 7,
    name: 'Indira Putri',
    role: 'Founder',
    company: 'Eco-Fashion Brand',
    industry: 'Fashion',
    category: 'umkm',
    avatar: '/images/t1.jpeg',
    location: 'Bandung',
    projectType: 'E-Commerce + Blog',
    quote: 'Website fashion brand kami tidak hanya cantik tapi juga functional. Integration dengan sosmed, payment gateway yang smooth, dan blog untuk content marketing. Sales organic meningkat pesat!',
    rating: 5,
    results: {
      metric: 'Organic Sales',
      increase: '+180%',
      timeframe: '4 bulan'
    },
    featured: false,
    verified: true
  },
  {
    id: 8,
    name: 'Roberto Chen',
    role: 'Operations Manager',
    company: 'PT. Global Logistics',
    industry: 'Logistics',
    category: 'korporat',
    avatar: '/images/t2.jpeg',
    location: 'Jakarta',
    projectType: 'Corporate Dashboard',
    quote: 'Dashboard tracking dan corporate website kami diintegrasikan dengan sempurna. Real-time monitoring, user management, dan customer portal yang powerful. Efisiensi operasional meningkat drastis.',
    rating: 5,
    results: {
      metric: 'Operational Efficiency',
      increase: '+45%',
      timeframe: '3 bulan'
    },
    featured: false,
    verified: true
  },
  {
    id: 9,
    name: 'Rika Amelia',
    role: 'Marketing Head',
    company: 'Wellness Center',
    industry: 'Health & Wellness',
    category: 'umkm',
    avatar: '/images/t3.jpeg',
    location: 'Surabaya',
    projectType: 'Booking System + Website',
    quote: 'Online booking system yang terintegrasi dengan website kami sangat membantu customer dan operasional. No-show rate turun, customer satisfaction naik, dan admin jadi lebih efisien.',
    rating: 5,
    results: {
      metric: 'Booking Efficiency',
      increase: '+70%',
      timeframe: '2 bulan'
    },
    featured: false,
    verified: true
  }
]

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [visibleTestimonials, setVisibleTestimonials] = useState(6)
  const [isLoading, setIsLoading] = useState(false)
  
  // Carousel states
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const filteredTestimonials = testimonials.filter(testimonial =>
    activeCategory === 'all' || testimonial.category === activeCategory
  )

  const currentTestimonials = filteredTestimonials.slice(0, visibleTestimonials)
  const hasMore = visibleTestimonials < filteredTestimonials.length

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleTestimonials(prev => Math.min(prev + 3, filteredTestimonials.length))
      setIsLoading(false)
    }, 500)
  }

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setVisibleTestimonials(6)
    setCurrentSlide(0)
  }

  const featuredTestimonials = testimonials.filter(t => t.featured)
  const totalRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length

  // Carousel functions
  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === currentTestimonials.length - 1 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? currentTestimonials.length - 1 : prev - 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide()
    }
    if (touchStart - touchEnd < -75) {
      prevSlide()
    }
  }

  // Reset slide when category changes
  useEffect(() => {
    setCurrentSlide(0)
  }, [activeCategory])

  const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <div className="card-base rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group h-full">
      {/* Industry Tag */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs px-3 py-1 rounded-full" style={{ 
          backgroundColor: 'var(--neutral-100)', 
          color: 'var(--text-tertiary)' 
        }}>
          {testimonial.industry}
        </span>
        {testimonial.verified && (
          <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--success-600)' }}>
            <CheckCircle2 size={12} />
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Results */}
      {testimonial.results && (
        <div className="rounded-lg p-3 mb-4" style={{ 
          background: 'linear-gradient(135deg, var(--primary-50), var(--secondary-50))' 
        }}>
          <div className="flex items-center gap-2" style={{ color: 'var(--primary-700)' }}>
            <Target size={16} />
            <div className="text-sm">
              <span className="font-bold">{testimonial.results.increase}</span>
              <span className="ml-1" style={{ color: 'var(--primary-600)' }}>{testimonial.results.metric}</span>
            </div>
          </div>
        </div>
      )}

      {/* Quote */}
      <blockquote className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1">
          {[...Array(testimonial.rating)].map((_, j) => (
            <Star key={j} size={14} style={{ color: 'var(--warning-400)' }} className="fill-current" />
          ))}
        </div>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>({testimonial.rating}.0)</span>
      </div>

      {/* Client Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={testimonial.avatar}
            alt={`Photo of ${testimonial.name}`}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{testimonial.name}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{testimonial.company}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{testimonial.location}</p>
          <p className="text-xs" style={{ color: 'var(--primary-600)' }}>{testimonial.projectType}</p>
        </div>
      </div>
    </div>
  )

  return (
    <section className="relative py-20 md:py-28 px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-white to-[var(--surface-primary)]">
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{ backgroundColor: 'var(--primary-200)' }}></div>
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" style={{ backgroundColor: 'var(--secondary-200)' }}></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" style={{ backgroundColor: 'var(--warning-200)' }}></div>
      </div>

      <div className="max-w-screen-xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full backdrop-blur-sm border" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderColor: 'var(--border-light)', borderWidth: '1px', borderStyle: 'solid' }}>
            <Shield size={16} style={{ color: 'var(--primary-700)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Testimoni Verified</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
            Ulasan <span className="text-gradient-brand">Klien </span>Kami
          </h2>
          
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8" style={{ color: 'var(--text-tertiary)' }}>
            Berikut komentar nyata klien ke kami bagaimana website yang tepat 
            dapat mentransformasi bisnis dan meningkatkan performa secara signifikan.
          </p>

          {/* Overall Stats */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{totalRating.toFixed(1)}</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} style={{ color: 'var(--warning-400)' }} className="fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Average Rating</p>
            </div>
            <div className="w-px h-12" style={{ backgroundColor: 'var(--border-light)' }}></div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{testimonials.length}+</div>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Happy Clients</p>
            </div>
            <div className="w-px h-12" style={{ backgroundColor: 'var(--border-light)' }}></div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>100%</div>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Project Success</p>
            </div>
            <div className="w-px h-12" style={{ backgroundColor: 'var(--border-light)' }}></div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>24H</div>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Avg Response</p>
            </div>
          </div>
        </div>

        {/* Featured Testimonials - Desktop Only */}
        <div className="mb-16 hidden md:block">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial, i) => (
              <div
                key={testimonial.id}
                className="relative rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-[var(--surface-primary)]"
                style={{ borderColor: 'var(--border-light)', borderWidth: '1px', borderStyle: 'solid' }}
               
               
              >
                {/* Featured Badge */}
                <div className="absolute -top-3 left-6">
                  <div className="text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 bg-gradient-warning">
                    <Award size={12} />
                    Featured
                  </div>
                </div>

                {/* Quote Icon */}
                <div className="absolute top-6 right-6">
                  <Quote size={24} style={{ color: 'var(--primary-200)' }} />
                </div>

                {/* Results Metric */}
                <div className="rounded-xl p-4 mb-6" style={{ 
                  background: 'linear-gradient(135deg, var(--success-50), var(--success-100))', 
                  borderColor: 'var(--success-100)',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}>
                  <div className="flex items-center gap-3">
                    <TrendingUp size={20} style={{ color: 'var(--success-600)' }} />
                    <div>
                      <div className="text-2xl font-bold" style={{ color: 'var(--success-700)' }}>
                        {testimonial.results.increase}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--success-600)' }}>
                        {testimonial.results.metric} dalam {testimonial.results.timeframe}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Content */}
                <blockquote className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} size={16} style={{ color: 'var(--warning-400)' }} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>({testimonial.rating}.0)</span>
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Image
                      src={testimonial.avatar}
                      alt={`Photo of ${testimonial.name}`}
                      width={60}
                      height={60}
                      className="w-12 h-12 rounded-full object-cover shadow-sm"
                      style={{ borderColor: 'white', borderWidth: '2px', borderStyle: 'solid' }}
                    />
                    {testimonial.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--success-500)', borderColor: 'white', borderWidth: '2px', borderStyle: 'solid' }}>
                        <CheckCircle2 size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{testimonial.name}</p>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{testimonial.role}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm mr-2" style={{ color: 'var(--text-tertiary)' }}>
              <Filter size={16} />
              <span>Filter by:</span>
            </div>
            {testimonialCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300`}
                style={{
                  backgroundColor: activeCategory === category.id ? 'var(--primary-700)' : 'white',
                  color: activeCategory === category.id ? 'var(--text-on-primary)' : 'var(--text-secondary)',
                  borderColor: activeCategory === category.id ? 'var(--primary-700)' : 'var(--border-light)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  boxShadow: activeCategory === category.id ? 'var(--card-shadow-hover)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== category.id) {
                    e.currentTarget.style.borderColor = 'var(--primary-300)'
                    e.currentTarget.style.color = 'var(--primary-700)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== category.id) {
                    e.currentTarget.style.borderColor = 'var(--border-light)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                  }
                }}
              >
                {category.name}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeCategory === category.id 
                    ? 'bg-[var(--primary-600)]' 
                    : 'bg-[var(--neutral-100)]'
                }`}
                style={{
                  color: activeCategory === category.id ? 'var(--text-on-primary)' : 'var(--text-tertiary)'
                }}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Load More Button - Desktop */}
          {hasMore && (
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="hidden md:inline-flex items-center gap-2 px-6 py-2 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 hover:scale-105"
              style={{
                backgroundColor: 'white',
                borderColor: 'var(--primary-700)',
                borderWidth: '2px',
                borderStyle: 'solid',
                color: 'var(--primary-700)'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = 'var(--primary-700)'
                  e.currentTarget.style.color = 'var(--text-on-primary)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = 'white'
                  e.currentTarget.style.color = 'var(--primary-700)'
                }
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 rounded-full animate-spin" style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: 'currentColor', borderTopColor: 'transparent' }}></div>
                  Loading...
                </>
              ) : (
                <>
                  Lihat Lainnya
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          )}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden mb-8">
          <div 
            ref={carouselRef}
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)` 
              }}
            >
              {currentTestimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-2"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
              style={{
                backgroundColor: 'white',
                color: 'var(--primary-700)'
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
              style={{
                backgroundColor: 'white',
                color: 'var(--primary-700)'
              }}
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {currentTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide 
                    ? 'w-8 h-2' 
                    : 'w-2 h-2'
                }`}
                style={{
                  backgroundColor: index === currentSlide 
                    ? 'var(--primary-700)' 
                    : 'var(--neutral-300)'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Load More */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--primary-700)',
                  color: 'var(--text-on-primary)'
                }}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 rounded-full animate-spin" style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: 'currentColor', borderTopColor: 'transparent' }}></div>
                    Loading...
                  </>
                ) : (
                  <>
                    Lihat Lainnya
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentTestimonials.map((testimonial, i) => {
            if (testimonial.featured) return null
            
            return (
              <div key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}