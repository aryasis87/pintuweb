// app/api/midtrans/route.ts
import { NextRequest, NextResponse } from 'next/server'

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY
// Satu saklar untuk server & klien: tanpa 'true' eksplisit, semua jalan di sandbox (tidak memotong uang).
const IS_PRODUCTION = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true'
const MIDTRANS_API_URL = IS_PRODUCTION
  ? 'https://app.midtrans.com/snap/v1/transactions'
  : 'https://app.sandbox.midtrans.com/snap/v1/transactions'

export async function POST(req: NextRequest) {
  if (!MIDTRANS_SERVER_KEY) {
    console.error('MIDTRANS_SERVER_KEY belum diset di environment')
    return NextResponse.json(
      { error: 'Pembayaran belum dikonfigurasi' },
      { status: 503 }
    )
  }

  try {
    const body = await req.json()
    const { orderId, amount, customerDetails, itemDetails } = body

    if (!orderId || !amount || !customerDetails || !itemDetails) {
      return NextResponse.json(
        { error: 'Parameter tidak lengkap' },
        { status: 400 }
      )
    }

    const authString = Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString('base64')

    const payload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      item_details: itemDetails,
      customer_details: customerDetails,
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://pintuweb.com'}/paket?status=success`,
        error: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://pintuweb.com'}/paket?status=error`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://pintuweb.com'}/paket?status=pending`,
      },
    }

    const response = await fetch(MIDTRANS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Midtrans error:', data)
      return NextResponse.json(
        { error: data.error_messages?.join(', ') || 'Gagal membuat transaksi' },
        { status: response.status }
      )
    }

    return NextResponse.json({
      token: data.token,
      redirect_url: data.redirect_url,
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}