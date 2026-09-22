'use client'

import { useState } from 'react'
import { CheckCircle, Star, MessageCircle } from 'lucide-react'

const packages = [
  {
    title: 'Landing Page',
    price: 'Rp600.000 – Rp1.200.000',
    basePrice: 600000,
    badge: 'Starter',
    badgeColor: 'green',
    features: [
      '1 halaman promosi yang fokus konversi',
      'Desain modern & mobile-friendly',
      'Free domain .com/.xyz + SSL 1 tahun',
      'Optimasi kecepatan & SEO dasar',
      'Form kontak + tombol WhatsApp',
      'Waktu pengerjaan cepat: 1–3 hari',
      'Bonus: CDN & maintenance 1 bulan',
    ],
  },
  {
    title: 'Standar UMKM',
    price: 'Rp1.500.000 – Rp2.500.000',
    basePrice: 1500000,
    badge: 'Bisnis',
    badgeColor: 'blue',
    features: [
      '3–5 halaman lengkap (Home, Profil, Layanan, Blog, Kontak)',
      'Desain profesional & responsif',
      'Domain .com + hosting + SSL',
      'Form kontak, WhatsApp & Google Maps',
      'Basic copywriting & setup SEO on-page',
      '2× revisi desain',
      'Maintenance & security support 1–3 bulan',
    ],
  },
  {
    title: 'Toko Online Simple',
    price: 'Rp2.500.000 – Rp3.500.000',
    basePrice: 2500000,
    badge: 'Premium',
    badgeColor: 'red',
    features: [
      'Katalog produk hingga 20 item',
      'Checkout via WhatsApp (langsung order)',
      'Kategori produk & banner promo',
      'Desain responsif + performa cepat',
      'CMS ringan – mudah update produk',
      '2× revisi tampilan/konten',
      'Domain + hosting + SSL sudah termasuk',
    ],
  },
  {
    title: 'Website Custom',
    price: 'Rp3.500.000 – Rp6.000.000+',
    basePrice: 3500000,
    badge: 'Custom',
    badgeColor: 'purple',
    features: [
      'Desain & layout full custom',
      'Jumlah halaman & fitur fleksibel',
      'Integrasi API, booking, formulir kompleks',
      'Framework modern (Next.js, Tailwind, dsb.)',
      'UX consultation & optimasi performa',
      'Maintenance & support teknis 3 bulan',
      'Cocok untuk startup & instansi',
    ],
  },
  {
    title: 'Toko Online Full',
    price: 'Rp4.500.000 – Rp7.500.000',
    basePrice: 4500000,
    features: [
      'Keranjang belanja & sistem checkout lengkap',
      'Integrasi payment gateway',
      'Ongkir otomatis (via RajaOngkir)',
      'Dashboard admin – kelola produk & pesanan',
      'Desain mobile-first, loading cepat & SEO-ready',
      'Maintenance & support 3–6 bulan',
      'Domain + hosting + SSL premium',
    ],
  },
  {
    title: 'Portofolio / Personal Branding',
    price: 'Rp1.500.000 – Rp2.500.000',
    basePrice: 1500000,
    features: [
      'Halaman Tentang, Karya, Blog & Kontak',
      'Desain clean & profesional',
      'CTA ke WhatsApp, LinkedIn, IG, dsb.',
      'SEO dasar & struktur heading rapi',
      'Domain + hosting + SSL 1 tahun',
      'Ideal untuk freelancer & kreator',
    ],
  },
]

const getBadgeColor = (color: string) => {
  switch (color) {
    case 'green':   return 'bg-gradient-to-r from-green-600 to-green-400'
    case 'blue':    return 'bg-gradient-to-r from-blue-600 to-blue-400'
    case 'red':     return 'bg-gradient-to-r from-red-600 to-red-400'
    case 'purple':  return 'bg-gradient-to-r from-purple-600 to-pink-500'
    default:        return 'bg-gray-400'
  }
}

export default function PaketPageContent() {
  const [expanded, setExpanded] = useState<number[]>([])

  const toggle = (idx: number) => {
    setExpanded(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount)

  return (
    <main className="bg-gray-50 py-28 px-4 lg:px-8">

      {/* Header */}
      <div className="max-w-screen-xl mx-auto text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Pilih Paket Website Sesuai Kebutuhan
        </h1>
        <p className="text-lg text-gray-600">
          Mulai dari landing page, UMKM, hingga toko online – semua sudah termasuk domain, hosting, dan support.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Konsultasi gratis dan pemesanan langsung via WhatsApp.
        </p>
      </div>

      {/* Grid Paket */}
      <div className="max-w-screen-xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg, idx) => {
          const cleanTitle = pkg.title.split('–')[0].trim()
          const waMsg = encodeURIComponent(
            `Halo, saya tertarik dengan paket "${cleanTitle}". Boleh minta info lebih lanjut?`
          )
          const isOpen = expanded.includes(idx)
          const list = isOpen ? pkg.features : pkg.features.slice(0, 4)

          return (
            <div
              key={idx}
              className="relative bg-white rounded-2xl shadow-md border border-transparent
                         hover:border-blue-300 hover:shadow-lg transform hover:-translate-y-1
                         transition-all duration-300 flex flex-col"
            >
              {/* Ribbon */}
              {pkg.badge && (
                <div
                  className={`absolute top-0 right-0
                    text-white text-xs font-semibold uppercase
                    px-3 py-1 rounded-tr-2xl rounded-bl-xl z-10
                    ${getBadgeColor(pkg.badgeColor || '')}`}
                >
                  {pkg.badge}
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{pkg.title}</h2>
                <p className="mb-1">
                  <span className="text-gray-500 text-sm">Mulai dari </span>
                  <span className="text-blue-600 font-bold">{pkg.price}</span>
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  DP mulai {formatRupiah(Math.round(pkg.basePrice * 0.5))}
                </p>

                <ul className="space-y-3 flex-1">
                  {list.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {pkg.features.length > 4 && (
                  <button
                    onClick={() => toggle(idx)}
                    className="text-blue-600 text-sm font-medium mt-2 hover:underline self-start"
                  >
                    {isOpen ? 'Sembunyikan fitur' : 'Lihat semua fitur'}
                  </button>
                )}

                {/* CTA */}
                <div className="mt-6">
                  <a
                    href={`https://wa.me/6281339908765?text=${waMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2
                               bg-green-600 text-white py-3 rounded-lg font-medium
                               hover:bg-green-700 transition text-sm"
                  >
                    <MessageCircle size={16} />
                    Pesan via WhatsApp
                  </a>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-100 rounded-b-2xl text-sm text-gray-600 flex items-center gap-2">
                <Star size={16} className="text-yellow-500" />
                Paket {cleanTitle}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
