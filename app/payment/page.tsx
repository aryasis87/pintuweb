// app/payment/page.tsx
'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// ============================================================
// CONFIG
// ============================================================
const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ''
const MIDTRANS_SNAP_URL = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true'
  ? 'https://app.midtrans.com/snap/snap.js'
  : 'https://app.sandbox.midtrans.com/snap/snap.js'
const A_COM_URL = process.env.NEXT_PUBLIC_A_COM_URL || 'https://A.com'

// ============================================================
// TYPES
// ============================================================
type PageStatus =
  | 'loading'
  | 'opening'
  | 'waiting'
  | 'success'
  | 'pending'
  | 'error'
  | 'closed'
  | 'invalid'

// ============================================================
// SVG ICONS (inline - tidak perlu install package di B.com)
// ============================================================
const IconShield = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor">
    <path d="M208,40H48A16,16,0,0,0,32,56V120c0,72,88,110.4,92.4,112.2a8,8,0,0,0,7.2,0C136,230.4,224,192,224,120V56A16,16,0,0,0,208,40Zm0,80c0,57.23-71.62,92.47-80,96.46C119.65,212.48,48,177.3,48,120V56H208Z"/>
  </svg>
)

const IconCheck = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor">
    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"/>
  </svg>
)

const IconClock = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor">
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/>
  </svg>
)

const IconWarning = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor">
    <path d="M236.8,188.09,149.35,36.22a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"/>
  </svg>
)

const IconX = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor">
    <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"/>
  </svg>
)

const IconArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor">
    <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"/>
  </svg>
)

const IconCard = () => (
  <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
    <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V96H32V64Zm0,128H32V112H224v80Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"/>
  </svg>
)

// ============================================================
// SPINNER
// ============================================================
function Spinner({ size = 48, className = 'text-sky-500' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      className={`animate-spin ${className}`}
      fill="none"
    >
      <circle cx="25" cy="25" r="20" stroke="currentColor" strokeOpacity="0.2" strokeWidth="5" />
      <path d="M25 5 A20 20 0 0 1 45 25" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

// ============================================================
// PROGRESS STEPS
// ============================================================
function StepsBar({ status }: { status: PageStatus }) {
  const steps = ['Memuat', 'Membuka', 'Pembayaran', 'Selesai']

  const activeStep =
    status === 'loading' ? 0 :
    status === 'opening' ? 1 :
    status === 'waiting' ? 2 :
    3

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((label, i) => {
        const done = i < activeStep
        const active = i === activeStep
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                done   ? 'bg-sky-500 border-sky-500 text-white shadow-md shadow-sky-200' :
                active ? 'bg-white border-sky-500 text-sky-600 shadow-sm' :
                         'bg-gray-100 border-gray-200 text-gray-400'
              }`}>
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/>
                  </svg>
                ) : i + 1}
              </div>
              <span className={`text-[10px] font-semibold whitespace-nowrap ${
                done ? 'text-sky-600' : active ? 'text-sky-500' : 'text-gray-400'
              }`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-4 rounded-full transition-all duration-500 ${
                done ? 'bg-gradient-to-r from-sky-400 to-sky-300' : 'bg-gray-200'
              }`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================
function PaymentContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<PageStatus>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [orderId, setOrderId] = useState('')
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const token = searchParams.get('token')
    const order = searchParams.get('orderId')

    if (!token || !order) {
      setStatus('invalid')
      setErrorMessage('Token atau Order ID tidak ditemukan.')
      return
    }

    setOrderId(order)

    const existingScript = document.getElementById('midtrans-snap')
    if (existingScript && (window as any).snap) {
      openSnap(token, order)
      return
    }

    const script = document.createElement('script')
    script.id = 'midtrans-snap'
    script.src = MIDTRANS_SNAP_URL
    script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY)
    script.onload = () => {
      setStatus('opening')
      setTimeout(() => openSnap(token, order), 600)
    }
    script.onerror = () => {
      setStatus('error')
      setErrorMessage('Gagal memuat modul pembayaran. Periksa koneksi internet Anda.')
    }
    document.body.appendChild(script)
  }, [searchParams])

  // Countdown redirect otomatis
  useEffect(() => {
    if (['success', 'pending', 'closed', 'error'].includes(status)) {
      setCountdown(3)
      const interval = setInterval(() => {
        setCountdown(prev => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [status])

  const openSnap = (token: string, order: string) => {
    if (!(window as any).snap) {
      setStatus('error')
      setErrorMessage('Midtrans Snap tidak berhasil dimuat.')
      return
    }
    setStatus('waiting')
    ;(window as any).snap.pay(token, {
      onSuccess: (result: any) => {
        console.log('✅ Payment success:', result)
        setStatus('success')
        setTimeout(() => {
          window.location.href = `${A_COM_URL}/payment?status=success&orderId=${order}`
        }, 3000)
      },
      onPending: (result: any) => {
        console.log('⏳ Payment pending:', result)
        setStatus('pending')
        setTimeout(() => {
          window.location.href = `${A_COM_URL}/payment?status=pending&orderId=${order}`
        }, 3000)
      },
      onError: (result: any) => {
        console.error('❌ Payment error:', result)
        setStatus('error')
        setErrorMessage('Terjadi kesalahan saat memproses pembayaran.')
        setTimeout(() => {
          window.location.href = `${A_COM_URL}/payment?status=error&orderId=${order}`
        }, 3000)
      },
      onClose: () => {
        console.log('🚪 Snap closed')
        setStatus('closed')
        setTimeout(() => {
          window.location.href = `${A_COM_URL}/payment?status=closed&orderId=${order}`
        }, 3000)
      },
    })
  }

  const goBack = () => {
    window.location.href = `${A_COM_URL}/payment`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Branding header */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-200">
            <span className="text-[15px] font-bold text-gray-800 tracking-tight">Stouch Pay</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

          {/* Top bar gradient */}
          <div className="h-1.5 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500" />

          <div className="p-6 sm:p-8">
            <StepsBar status={status} />

            {/* ── LOADING / OPENING ── */}
            {(status === 'loading' || status === 'opening') && (
              <div className="text-center py-2">
                <div className="relative flex justify-center mb-7">
                  <div className="w-24 h-24 bg-gradient-to-br from-sky-50 to-indigo-50 rounded-full flex items-center justify-center border-2 border-sky-100">
                    <Spinner size={44} className="text-sky-500" />
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-sky-200 animate-ping opacity-30 w-24 h-24" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Mempersiapkan Pembayaran</h2>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                  Mohon tunggu, sistem sedang menyiapkan halaman pembayaran yang aman untuk Anda...
                </p>
                <div className="mt-6 inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
                  <div className="text-green-500"><IconShield size={14} /></div>
                  <span className="text-xs text-gray-500 font-medium">Koneksi terenkripsi SSL 2048-bit</span>
                </div>
              </div>
            )}

            {/* ── WAITING ── */}
            {status === 'waiting' && (
              <div className="text-center py-2">
                <div className="relative flex justify-center mb-7">
                  <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center border-2 border-amber-200">
                    <div className="text-amber-500 animate-pulse">
                      <IconClock size={44} />
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Selesaikan Pembayaran</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs mx-auto">
                  Jendela pembayaran sudah terbuka. Pilih metode dan selesaikan transaksi Anda.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left">
                  <p className="text-xs font-bold text-amber-800 mb-2.5 flex items-center gap-1.5">
                    💡 Petunjuk
                  </p>
                  <ul className="space-y-2 text-xs text-amber-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 flex-shrink-0">•</span>
                      Jika popup tidak muncul, izinkan popup di pengaturan browser Anda
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 flex-shrink-0">•</span>
                      Jangan tutup atau refresh halaman ini selama proses berlangsung
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 flex-shrink-0">•</span>
                      Setelah selesai, Anda akan otomatis diarahkan kembali
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* ── SUCCESS ── */}
            {status === 'success' && (
              <div className="text-center py-2">
                <div className="relative flex justify-center mb-7">
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-200">
                    <div className="text-green-500"><IconCheck size={44} /></div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Transaksi Anda telah berhasil. Saldo akan segera dikreditkan ke akun Anda.
                </p>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-green-800">Status Transaksi</span>
                    <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
                      <svg width="10" height="10" viewBox="0 0 256 256" fill="currentColor">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/>
                      </svg>
                      Berhasil
                    </span>
                  </div>
                </div>
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 flex items-center justify-center gap-2">
                  <Spinner size={16} className="text-sky-500" />
                  <span className="text-sm text-sky-700 font-semibold">
                    Mengalihkan dalam {countdown} detik...
                  </span>
                </div>
              </div>
            )}

            {/* ── PENDING ── */}
            {status === 'pending' && (
              <div className="text-center py-2">
                <div className="relative flex justify-center mb-7">
                  <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center border-2 border-orange-200">
                    <div className="text-orange-500">
                      <IconClock size={44} />
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Menunggu Konfirmasi</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Pembayaran Anda sedang diproses. Saldo akan dikreditkan setelah konfirmasi diterima.
                </p>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-orange-800">Status Transaksi</span>
                    <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                      Menunggu
                    </span>
                  </div>
                </div>
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 flex items-center justify-center gap-2">
                  <Spinner size={16} className="text-sky-500" />
                  <span className="text-sm text-sky-700 font-semibold">
                    Mengalihkan dalam {countdown} detik...
                  </span>
                </div>
              </div>
            )}

            {/* ── CLOSED ── */}
            {status === 'closed' && (
              <div className="text-center py-2">
                <div className="relative flex justify-center mb-7">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
                    <div className="text-gray-400"><IconX size={44} /></div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Pembayaran Dibatalkan</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Anda menutup halaman pembayaran. Tidak ada biaya yang dikenakan.
                </p>
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 flex items-center justify-center gap-2 mb-4">
                  <Spinner size={16} className="text-sky-500" />
                  <span className="text-sm text-sky-700 font-semibold">
                    Kembali dalam {countdown} detik...
                  </span>
                </div>
                <button
                  onClick={goBack}
                  className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-3.5 px-6 rounded-xl font-bold text-sm hover:from-sky-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <IconArrowLeft />
                  Kembali ke Deposit Sekarang
                </button>
              </div>
            )}

            {/* ── ERROR ── */}
            {status === 'error' && (
              <div className="text-center py-2">
                <div className="relative flex justify-center mb-7">
                  <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center border-2 border-red-200">
                    <div className="text-red-400"><IconX size={44} /></div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Terjadi Kesalahan</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {errorMessage || 'Pembayaran gagal diproses. Silakan coba lagi.'}
                </p>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-left mb-4">
                  <p className="text-xs font-bold text-red-700 mb-2">Yang perlu dicek:</p>
                  <ul className="space-y-1.5 text-xs text-red-600">
                    <li className="flex items-start gap-2"><span>•</span>Pastikan koneksi internet stabil</li>
                    <li className="flex items-start gap-2"><span>•</span>Periksa saldo atau limit kartu Anda</li>
                    <li className="flex items-start gap-2"><span>•</span>Coba metode pembayaran lain</li>
                  </ul>
                </div>
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 flex items-center justify-center gap-2 mb-4">
                  <Spinner size={16} className="text-sky-500" />
                  <span className="text-sm text-sky-700 font-semibold">
                    Kembali dalam {countdown} detik...
                  </span>
                </div>
                <button
                  onClick={goBack}
                  className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-3.5 px-6 rounded-xl font-bold text-sm hover:from-sky-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                >
                  Coba Lagi
                </button>
              </div>
            )}

            {/* ── INVALID ── */}
            {status === 'invalid' && (
              <div className="text-center py-2">
                <div className="relative flex justify-center mb-7">
                  <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center border-2 border-amber-200">
                    <div className="text-amber-500"><IconWarning size={44} /></div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Halaman Tidak Valid</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {errorMessage || 'Parameter pembayaran tidak lengkap atau sudah kedaluwarsa.'}
                </p>
                <button
                  onClick={goBack}
                  className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-3.5 px-6 rounded-xl font-bold text-sm hover:from-sky-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <IconArrowLeft />
                  Kembali ke Deposit
                </button>
              </div>
            )}
          </div>

          {/* Order ID footer */}
          {orderId && status !== 'invalid' && (
            <div className="px-6 sm:px-8 pb-5">
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">Order ID</span>
                <code className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200 font-mono">
                  {orderId}
                </code>
              </div>
            </div>
          )}
        </div>

        {/* Security badges */}
        <div className="mt-5 flex items-center justify-center gap-5 flex-wrap">
          <div className="flex items-center gap-1.5 text-gray-400">
            <div className="text-green-500"><IconShield size={14} /></div>
            <span className="text-xs font-medium">SSL Secured</span>
          </div>
          <div className="w-px h-3 bg-gray-300" />
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-400 font-medium">Powered by</span>
            <span className="text-xs font-bold text-sky-600">Midtrans</span>
          </div>
          <div className="w-px h-3 bg-gray-300" />
          <span className="text-xs text-gray-400 font-medium">© Stouch</span>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// PAGE EXPORT
// ============================================================
export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg width="48" height="48" viewBox="0 0 50 50" className="animate-spin text-sky-500" fill="none">
              <circle cx="25" cy="25" r="20" stroke="currentColor" strokeOpacity="0.2" strokeWidth="5" />
              <path d="M25 5 A20 20 0 0 1 45 25" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-sm text-gray-500 font-medium">Memuat halaman pembayaran...</p>
        </div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  )
}