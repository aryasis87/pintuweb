'use client'

import {
  Linkedin,
  ArrowRight,
  Calendar,
  MessageCircle,
} from 'lucide-react'
import Image from 'next/image'

export default function OwnerPageContent() {
  return (
    <main className="pt-16 bg-gradient-to-b from-white to-blue-50 text-gray-800 scroll-smooth">
      {/* Hero */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-gray-900">
              Halo, Saya <span className="text-blue-700">Sanzy</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Founder & Developer di balik <strong className="text-blue-700">Pintu Web</strong>. Saya membangun solusi web
              yang cepat, elegan, dan performa tinggi untuk UMKM dan startup di Indonesia.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/in/namalinkedin"
                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} /> LinkedIn Saya
              </a>
              <a
                href="https://github.com/yourgithub"
                className="text-gray-600 hover:text-gray-900 text-sm underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/owner.jpg"
              alt="Foto Owner"
              width={320}
              height={320}
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Perjalanan Karier
          </h2>
          <div className="flex gap-6 overflow-x-auto snap-x pb-4">
            {[
              {
                year: '2018',
                title: 'Mulai Freelance',
                desc: 'Belajar frontend & backend secara otodidak, mulai terima project kecil dari UMKM.',
              },
              {
                year: '2020',
                title: 'Pintu Web Lahir',
                desc: 'Resmi mendirikan studio freelance digital Pintu Web.',
              },
              {
                year: '2022',
                title: 'Fokus pada UX & SEO',
                desc: 'Implementasi best-practice performa, Lighthouse, dan struktur konten SEO.',
              },
              {
                year: '2024',
                title: 'Ratusan Website Dibangun',
                desc: 'Melayani UMKM, startup, dan instansi pemerintah.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="min-w-[220px] bg-blue-50 rounded-xl shadow p-5 snap-start shrink-0"
              >
                <div className="text-blue-700 font-bold mb-1">
                  <Calendar size={18} className="inline mr-2" />
                  {item.year}
                </div>
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 bg-blue-50 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Keahlian Utama
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Next.js',
              'Tailwind CSS',
              'TypeScript',
              'Supabase',
              'Vercel',
              'Headless CMS',
              'SEO Optimization',
              'Performance Auditing',
              'UI/UX',
              'Clean Code',
            ].map((skill, i) => (
              <span
                key={i}
                className="bg-white border border-gray-200 text-sm px-4 py-2 rounded-full shadow hover:shadow-md transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-xl italic text-gray-700">
            &ldquo;Sebuah website bukan hanya desain &mdash; tapi citra, kepercayaan, dan strategi bisnis.&rdquo;
          </blockquote>
          <p className="mt-4 text-gray-500">&mdash; Sanzy, Founder Pintu Web</p>
        </div>
      </section>

      {/* Testimoni (optional) */}
      <section className="py-24 bg-gray-100 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-900">
            Apa Kata Klien?
          </h2>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <MessageCircle size={24} className="text-blue-600 mb-2 mx-auto" />
            <p className="text-gray-700 italic max-w-2xl mx-auto mb-4">
              &ldquo;Sanzy sangat komunikatif dan detail. Website kami jauh lebih profesional dan cepat setelah dibangun ulang oleh Pintu Web.&rdquo;
            </p>
            <p className="text-sm font-semibold text-gray-800">&mdash; Budi, Founder Kopi Lokal</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-700 text-white text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Tertarik Kolaborasi?</h2>
          <p className="mb-6 text-white/90">
            Saya terbuka untuk project baru, konsultasi, atau kerja sama jangka panjang.
          </p>
          <a
            href="https://wa.me/6281339908765"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-blue-100 transition"
          >
            <ArrowRight size={18} /> Konsultasi Gratis
          </a>
        </div>
      </section>
    </main>
  )
}