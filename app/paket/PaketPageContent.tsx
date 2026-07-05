'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Star, X, Loader2, CreditCard, MessageCircle } from 'lucide-react'

// Extend window for Midtrans Snap
declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess: (result: SnapResult) => void
          onPending: (result: SnapResult) => void
          onError: (result: SnapResult) => void
          onClose: () => void
        }
      ) => void
    }
  }
}

interface SnapResult {
  order_id: string
  transaction_status: string
  fraud_status?: string
  payment_type?: string
}

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
      'Integrasi pembayaran (Midtrans/Xendit)',
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

type PaymentStatus = 'idle' | 'loading' | 'success' | 'pending' | 'error'

interface CustomerForm {
  name: string
  email: string
  phone: string
}

export default function PaketPageContent() {
  const [expanded, setExpanded] = useState<number[]>([])
  const [snapLoaded, setSnapLoaded] = useState(false)

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPkg, setSelectedPkg] = useState<(typeof packages)[0] | null>(null)
  const [form, setForm] = useState<CustomerForm>({ name: '', email: '', phone: '' })
  const [formErrors, setFormErrors] = useState<Partial<CustomerForm>>({})
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  // Load Midtrans Snap.js on mount
  useEffect(() => {
    if (document.getElementById('midtrans-snap-script')) {
      setSnapLoaded(true)
      return
    }
    const script = document.createElement('script')
    script.id = 'midtrans-snap-script'
    script.src = process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL || 'https://app.midtrans.com/snap/snap.js'
    script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '')
    script.async = true
    script.onload = () => setSnapLoaded(true)
    document.body.appendChild(script)
  }, [])

  // Handle URL status params (after redirect back)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const status = params.get('status')
    if (status === 'success') {
      setPaymentStatus('success')
      setStatusMessage('Pembayaran berhasil! Tim kami akan segera menghubungi Anda.')
    } else if (status === 'pending') {
      setPaymentStatus('pending')
      setStatusMessage('Pembayaran sedang diproses. Cek email atau WhatsApp untuk konfirmasi.')
    } else if (status === 'error') {
      setPaymentStatus('error')
      setStatusMessage('Pembayaran gagal. Silakan coba lagi atau hubungi kami.')
    }
  }, [])

  const toggle = (idx: number) => {
    setExpanded(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  const openModal = (pkg: (typeof packages)[0]) => {
    setSelectedPkg(pkg)
    setForm({ name: '', email: '', phone: '' })
    setFormErrors({})
    setPaymentStatus('idle')
    setModalOpen(true)
  }

  const closeModal = () => {
    if (paymentStatus === 'loading') return
    setModalOpen(false)
    setSelectedPkg(null)
    setPaymentStatus('idle')
  }

  const validateForm = (): boolean => {
    const errors: Partial<CustomerForm> = {}
    if (!form.name.trim()) errors.name = 'Nama wajib diisi'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = 'Email tidak valid'
    if (!form.phone.trim() || !/^[0-9+\-\s]{8,15}$/.test(form.phone))
      errors.phone = 'Nomor HP tidak valid'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handlePayment = async () => {
    if (!selectedPkg || !validateForm()) return
    if (!snapLoaded) {
      alert('Mohon tunggu, sistem pembayaran sedang dimuat...')
      return
    }

    setPaymentStatus('loading')

    try {
      const orderId = `PINTU-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`

      const res = await fetch('/api/midtrans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          amount: selectedPkg.basePrice,
          customerDetails: {
            first_name: form.name,
            email: form.email,
            phone: form.phone,
          },
          itemDetails: [
            {
              id: orderId,
              price: selectedPkg.basePrice,
              quantity: 1,
              name: `DP Paket ${selectedPkg.title}`,
            },
          ],
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.token) {
        throw new Error(data.error || 'Gagal mendapatkan token pembayaran')
      }

      // Close our modal, open Midtrans Snap
      setModalOpen(false)
      setPaymentStatus('idle')

      window.snap.pay(data.token, {
        onSuccess: (result) => {
          console.log('Payment success:', result)
          setPaymentStatus('success')
          setStatusMessage('🎉 Pembayaran berhasil! Tim kami akan segera menghubungi Anda dalam 1×24 jam.')
          setModalOpen(true)
        },
        onPending: (result) => {
          console.log('Payment pending:', result)
          setPaymentStatus('pending')
          setStatusMessage('⏳ Pembayaran menunggu konfirmasi. Cek email Anda untuk instruksi selanjutnya.')
          setModalOpen(true)
        },
        onError: (result) => {
          console.error('Payment error:', result)
          setPaymentStatus('error')
          setStatusMessage('❌ Pembayaran gagal. Silakan coba lagi atau hubungi kami via WhatsApp.')
          setModalOpen(true)
        },
        onClose: () => {
          console.log('Snap closed')
          setPaymentStatus('idle')
        },
      })
    } catch (err) {
      console.error(err)
      setPaymentStatus('error')
      setStatusMessage(err instanceof Error ? err.message : 'Terjadi kesalahan, coba lagi.')
      setModalOpen(true)
    }
  }

  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount)

  return (
    <main className="bg-gray-50 py-28 px-4 lg:px-8">

      {/* Global Status Banner */}
      {paymentStatus !== 'idle' && !modalOpen && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-xl text-white text-sm font-medium max-w-sm w-full text-center ${
          paymentStatus === 'success' ? 'bg-green-600' :
          paymentStatus === 'pending' ? 'bg-yellow-500' :
          'bg-red-600'
        }`}>
          {statusMessage}
        </div>
      )}

      {/* Header */}
      <div className="max-w-screen-xl mx-auto text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Pilih Paket Website Sesuai Kebutuhan
        </h1>
        <p className="text-lg text-gray-600">
          Mulai dari landing page, UMKM, hingga toko online – semua sudah termasuk domain, hosting, dan support.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Bayar DP sekarang via Midtrans (transfer bank, QRIS, e-wallet) atau konsultasi gratis via WhatsApp.
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
                <p className="text-xs text-gray-400 mb-4">
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

                {/* CTA Buttons */}
                <div className="mt-6 flex flex-col gap-2">
                  <button
                    onClick={() => openModal(pkg)}
                    className="inline-flex items-center justify-center gap-2
                               bg-blue-700 text-white py-3 rounded-lg font-medium
                               hover:bg-blue-800 transition text-sm"
                  >
                    <CreditCard size={16} />
                    Bayar DP Sekarang
                  </button>
                  <a
                    href={`https://wa.me/6281339908765?text=${waMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2
                               border border-green-500 text-green-700 py-3 rounded-lg font-medium
                               hover:bg-green-50 transition text-sm"
                  >
                    <MessageCircle size={16} />
                    Konsultasi via WhatsApp
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

      {/* Payment Info Note */}
      <div className="max-w-screen-xl mx-auto mt-12 p-5 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800 text-center">
        🔒 Pembayaran aman & terenkripsi melalui <strong>Midtrans</strong> — mendukung transfer bank (BCA, Mandiri, BNI, BRI), QRIS, GoPay, OVO, ShopeePay, kartu kredit, dan Indomaret/Alfamart.
      </div>

      {/* ===== PAYMENT MODAL ===== */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">

            {/* Modal Header */}
            <div className="bg-blue-700 px-6 py-5 text-white">
              <button
                onClick={closeModal}
                disabled={paymentStatus === 'loading'}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-blue-600 transition disabled:opacity-50"
              >
                <X size={18} />
              </button>

              {/* Success / Pending / Error State */}
              {(paymentStatus === 'success' || paymentStatus === 'pending' || paymentStatus === 'error') ? (
                <div className="text-center py-2">
                  <div className={`text-4xl mb-2 ${
                    paymentStatus === 'success' ? '🎉' :
                    paymentStatus === 'pending' ? '⏳' : '❌'
                  }`}>
                    {paymentStatus === 'success' ? '🎉' : paymentStatus === 'pending' ? '⏳' : '❌'}
                  </div>
                  <h3 className="text-xl font-bold">
                    {paymentStatus === 'success' ? 'Pembayaran Berhasil!' :
                     paymentStatus === 'pending' ? 'Menunggu Pembayaran' :
                     'Pembayaran Gagal'}
                  </h3>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold pr-8">Konfirmasi & Pembayaran</h3>
                  {selectedPkg && (
                    <p className="text-blue-200 text-sm mt-1">{selectedPkg.title}</p>
                  )}
                </>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Status messages */}
              {(paymentStatus === 'success' || paymentStatus === 'pending' || paymentStatus === 'error') && (
                <div className="text-center">
                  <p className="text-gray-700 mb-6">{statusMessage}</p>
                  <div className="flex flex-col gap-3">
                    {paymentStatus === 'success' && (
                      <a
                        href="https://wa.me/6281339908765"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition text-sm"
                      >
                        <MessageCircle size={16} /> Chat via WhatsApp
                      </a>
                    )}
                    {paymentStatus === 'error' && (
                      <button
                        onClick={() => {
                          setPaymentStatus('idle')
                          setStatusMessage('')
                        }}
                        className="bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition text-sm"
                      >
                        Coba Lagi
                      </button>
                    )}
                    <button
                      onClick={closeModal}
                      className="text-gray-500 text-sm hover:text-gray-700 transition"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              {paymentStatus === 'idle' && selectedPkg && (
                <>
                  <div className="bg-gray-50 rounded-xl p-4 mb-5 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-500">Paket</span>
                      <span className="font-semibold text-gray-800">{selectedPkg.title}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-500">Harga mulai</span>
                      <span className="text-gray-700">{selectedPkg.price}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                      <span className="font-semibold text-gray-700">DP (50%)</span>
                      <span className="font-bold text-blue-700 text-base">
                        {formatRupiah(selectedPkg.basePrice)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-right">
                      *DP = harga paket minimum. Harga final sesuai brief.
                    </p>
                  </div>

                  {/* Customer Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Budi Santoso"
                        className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition ${
                          formErrors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="budi@gmail.com"
                        className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition ${
                          formErrors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        No. WhatsApp / HP <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="08123456789"
                        className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition ${
                          formErrors.phone ? 'border-red-400 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={!snapLoaded}
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-blue-700 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-800 transition disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                  >
                    <CreditCard size={18} />
                    Lanjut ke Pembayaran
                  </button>

                  <p className="text-xs text-center text-gray-400 mt-3">
                    🔒 Aman & terenkripsi oleh Midtrans. Mendukung QRIS, e-wallet, transfer bank, dan kartu kredit.
                  </p>
                </>
              )}

              {/* Loading State */}
              {paymentStatus === 'loading' && (
                <div className="py-8 text-center">
                  <Loader2 size={40} className="animate-spin mx-auto text-blue-600 mb-4" />
                  <p className="text-gray-600 font-medium">Memproses pembayaran...</p>
                  <p className="text-gray-400 text-sm mt-1">Mohon tunggu sebentar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}