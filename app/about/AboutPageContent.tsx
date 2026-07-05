'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  Rocket, 
  Brush, 
  ShieldCheck,
  Users, 
  Sparkles, 
  Target,
  Star,
  CheckCircle2,
  MessageCircle,
  ArrowRight
} from 'lucide-react'

export default function AboutPageContent() {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 })
  }, [])

  return (
    <main className="pt-16 scroll-smooth bg-white text-slate-800">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Tentang <span className="text-blue-700">PintuWeb</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            PintuWeb adalah mitra digital yang membantu UMKM dan bisnis lokal membangun kehadiran online 
            yang profesional. Kami percaya setiap bisnis berhak memiliki website berkualitas tinggi yang 
            mencerminkan nilai dan potensi mereka.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700 mb-1">15+</div>
              <div className="text-sm text-slate-600">Proyek Selesai</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700 mb-1">100%</div>
              <div className="text-sm text-slate-600">Kepuasan Klien</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700 mb-1">24H</div>
              <div className="text-sm text-slate-600">Response Time</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-3xl font-bold text-blue-700">4.9</span>
                <Star size={20} className="text-yellow-400 fill-current" />
              </div>
              <div className="text-sm text-slate-600">Rating Klien</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8" data-aos="fade-up">
            Cerita Kami
          </h2>
          <div className="prose prose-lg max-w-none text-slate-600" data-aos="fade-up" data-aos-delay="200">
            <p className="text-lg leading-relaxed mb-6">
              PintuWeb dimulai dari kepedulian terhadap UMKM dan bisnis lokal yang belum memiliki 
              kehadiran digital yang memadai. Kami melihat banyak produk dan layanan berkualitas 
              yang tidak mendapat eksposur optimal karena tidak memiliki website profesional.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Berangkat dari Trenggalek, Jawa Timur, kami berkomitmen memberikan layanan web development 
              berkualitas tinggi dengan harga terjangkau. Setiap website yang kami buat adalah investasi 
              untuk masa depan digital klien kami.
            </p>
            <p className="text-lg leading-relaxed">
              Dengan pengalaman menyelesaikan 15+ proyek dan tingkat kepuasan klien 100%, 
              kami terus berinovasi untuk memberikan yang terbaik bagi setiap bisnis yang mempercayai kami.
            </p>
          </div>
        </div>
      </section>

      {/* Visi, Misi, dan Fokus */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900" data-aos="fade-up">
            Apa yang Kami Percayai
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Rocket className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Visi Kami</h3>
              <p className="text-slate-600 leading-relaxed">
                Menjadi mitra digital terpercaya yang memberdayakan UMKM dan startup 
                di seluruh Indonesia untuk berkembang melalui kehadiran online yang profesional.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brush className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Misi Kami</h3>
              <p className="text-slate-600 leading-relaxed">
                Memberikan layanan desain dan pengembangan website berkualitas tinggi 
                dengan harga terjangkau, disertai dukungan jangka panjang untuk kesuksesan klien.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Fokus Utama</h3>
              <p className="text-slate-600 leading-relaxed">
                Mengutamakan kecepatan loading, keamanan data, SEO optimization, 
                dan user experience yang mendorong konversi dan pertumbuhan bisnis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16 text-center" data-aos="fade-up">
            Perjalanan Kami
          </h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-blue-200"></div>
            
            <div className="space-y-12">
              <div className="relative flex items-center gap-8" data-aos="fade-right">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center relative z-10">
                  <Sparkles className="text-white" size={16} />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 flex-1">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">2023: Awal Mula</h3>
                  <p className="text-slate-600">
                    Memulai perjalanan dari Trenggalek dengan visi memperkuat digitalisasi UMKM Indonesia. 
                    Fokus pada kualitas dan kepuasan klien menjadi fondasi utama kami.
                  </p>
                </div>
              </div>
              
              <div className="relative flex items-center gap-8" data-aos="fade-left">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center relative z-10">
                  <Rocket className="text-white" size={16} />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 flex-1">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">2024-Sekarang: Berkembang Pesat</h3>
                  <p className="text-slate-600">
                    Kini dipercaya menangani proyek dari berbagai daerah di Indonesia. 
                    Dengan 15+ proyek berhasil dan kepuasan klien 100%, kami terus berinovasi dan berkembang.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" data-aos="fade-up">
              Nilai-Nilai Kami
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Prinsip-prinsip yang memandu setiap keputusan dan tindakan kami dalam melayani klien.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="text-blue-600" size={28} />
              </div>
              <h4 className="font-bold text-slate-900 mb-4 text-lg">Kolaboratif</h4>
              <p className="text-slate-600 leading-relaxed">
                Kami bekerja sebagai tim dengan klien — mendengarkan kebutuhan, 
                berdiskusi solusi, dan membangun website yang benar-benar sesuai visi Anda.
              </p>
            </div>
            
            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="text-purple-600" size={28} />
              </div>
              <h4 className="font-bold text-slate-900 mb-4 text-lg">Inovatif</h4>
              <p className="text-slate-600 leading-relaxed">
                Selalu mengadopsi teknologi terdepan dan pendekatan kreatif 
                untuk menghasilkan website yang modern, cepat, dan future-proof.
              </p>
            </div>
            
            <div className="text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-green-600" size={28} />
              </div>
              <h4 className="font-bold text-slate-900 mb-4 text-lg">Integritas</h4>
              <p className="text-slate-600 leading-relaxed">
                Menjunjung tinggi transparansi harga, ketepatan waktu pengerjaan, 
                dan komitmen penuh pada kualitas hasil yang memuaskan klien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12" data-aos="fade-up">
            Mengapa Memilih PintuWeb?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="flex gap-4" data-aos="fade-up" data-aos-delay="100">
              <CheckCircle2 size={24} className="text-green-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Kualitas Terjamin</h4>
                <p className="text-slate-600">Performance score 90+, mobile-friendly, dan SEO optimized dari awal.</p>
              </div>
            </div>
            
            <div className="flex gap-4" data-aos="fade-up" data-aos-delay="200">
              <CheckCircle2 size={24} className="text-green-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Pengerjaan Cepat</h4>
                <p className="text-slate-600">Website siap dalam 1-5 hari kerja tanpa mengurangi kualitas.</p>
              </div>
            </div>
            
            <div className="flex gap-4" data-aos="fade-up" data-aos-delay="300">
              <CheckCircle2 size={24} className="text-green-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Harga Transparan</h4>
                <p className="text-slate-600">No hidden cost, pembayaran fleksibel, dan value for money terbaik.</p>
              </div>
            </div>
            
            <div className="flex gap-4" data-aos="fade-up" data-aos-delay="400">
              <CheckCircle2 size={24} className="text-green-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Support Berkelanjutan</h4>
                <p className="text-slate-600">Garansi 30 hari dan support lifetime via WhatsApp 24/7.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900 text-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-aos="fade-up">
            Siap Membangun Website Profesional?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            Mari diskusikan bagaimana kami dapat membantu mewujudkan website impian Anda. 
            Konsultasi gratis, tanpa komitmen, dan full support dari tim expert kami.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" data-aos="fade-up" data-aos-delay="400">
            <a
              href="https://wa.me/6281339908765?text=Halo%2C%20saya%20tertarik%20untuk%20konsultasi%20tentang%20pembuatan%20website%20setelah%20membaca%20tentang%20PintuWeb."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle size={20} />
              Konsultasi Gratis
              <ArrowRight size={18} />
            </a>
            
            <a
              href="#portfolio"
              className="inline-flex items-center gap-3 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Lihat Portfolio
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-sm text-blue-100">
            <span>✓ Response dalam 1 jam</span>
            <span>✓ Konsultasi gratis</span>
            <span>✓ Garansi kepuasan</span>
          </div>
        </div>
      </section>
    </main>
  )
}