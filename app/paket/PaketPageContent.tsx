'use client'

import { useState } from 'react'
import { CheckCircle, Star, MessageCircle } from 'lucide-react'
import { PACKAGES, priceRange, formatRupiah } from '../lib/packages'

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
        {PACKAGES.map((pkg, idx) => {
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
                    ${getBadgeColor(pkg.badgeColor ?? '')}`}
                >
                  {pkg.badge}
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{pkg.title}</h2>
                <p className="mb-1">
                  <span className="text-gray-500 text-sm">Mulai dari </span>
                  <span className="text-blue-600 font-bold">{priceRange(pkg)}</span>
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  DP mulai {formatRupiah(Math.round(pkg.minPrice * 0.5))}
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
