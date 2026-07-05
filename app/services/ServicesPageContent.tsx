'use client'

import {
  MonitorSmartphone,
  Rocket,
  Search,
  RefreshCcw,
  Sparkles,
  Star,
  ShieldCheck,
  Users,
} from 'lucide-react'

export default function ServicesPageContent() {
  return (
    <main className="pt-16 scroll-smooth bg-white text-gray-800">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Layanan <span className="text-blue-700">Pintu Web</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Kami bantu Anda membangun kehadiran digital yang <span className="font-semibold text-blue-700">cepat, kredibel, dan menarik</span>.
            Dari website elegan hingga perawatan rutin, semua tersedia.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Solusi Digital Lengkap
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Layanan kami dirancang untuk menjawab kebutuhan bisnis modern—baik Anda pemilik UMKM, startup, atau instansi besar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <MonitorSmartphone size={36} className="text-blue-600" />,
              title: 'Company Profile',
              desc: 'Website informatif yang mencerminkan identitas bisnis Anda secara elegan dan responsif.',
              bullets: ['Desain premium', 'Mobile-friendly', 'Multi-halaman'],
            },
            {
              icon: <Rocket size={36} className="text-blue-600" />,
              title: 'Landing Page',
              desc: 'Fokus konversi tinggi, ideal untuk kampanye, produk baru, atau promosi digital.',
              bullets: ['CTA kuat', 'Struktur optimal', 'Konversi maksimal'],
            },
            {
              icon: <Search size={36} className="text-blue-600" />,
              title: 'Optimasi SEO',
              desc: 'Struktur website dan konten yang disesuaikan agar mudah ditemukan di mesin pencari.',
              bullets: ['Teknis & konten', 'Speed + SEO', 'Struktur heading rapi'],
            },
            {
              icon: <RefreshCcw size={36} className="text-blue-600" />,
              title: 'Maintenance & Support',
              desc: 'Pemeliharaan rutin agar website tetap aman, cepat, dan bebas error.',
              bullets: ['Backup otomatis', 'Monitoring uptime', 'Dukungan teknis'],
            },
            {
              icon: <Sparkles size={36} className="text-blue-600" />,
              title: 'Custom Development',
              desc: 'Solusi tailor-made: sistem pemesanan, katalog dinamis, API-integrated, dll.',
              bullets: ['Fleksibel', 'Bisa integrasi pihak ketiga', 'Sesuai kebutuhan'],
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition text-left"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-2 mb-3">{item.desc}</p>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                {item.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mengapa Memilih Pintu Web?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Kami tidak hanya buat website — kami bantu Anda membangun citra digital yang profesional dan meyakinkan.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-xl shadow">
            <Star className="text-yellow-500 mb-3" size={28} />
            <h4 className="font-bold text-gray-800 mb-1">Desain Premium</h4>
            <p className="text-sm text-gray-600">
              Tampilan modern dan kredibel, disesuaikan dengan brand Anda — bukan template generik.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <Users className="text-blue-600 mb-3" size={28} />
            <h4 className="font-bold text-gray-800 mb-1">Kolaborasi Personal</h4>
            <p className="text-sm text-gray-600">
              Kami dengarkan kebutuhan Anda dan selalu terbuka terhadap feedback dalam proses pengerjaan.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <ShieldCheck className="text-green-600 mb-3" size={28} />
            <h4 className="font-bold text-gray-800 mb-1">Keamanan & Kinerja</h4>
            <p className="text-sm text-gray-600">
              Teknologi modern, keamanan terjaga, dan performa website optimal untuk semua perangkat.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Tertarik Kerja Sama?</h2>
          <p className="mb-6 text-white/90">
            Kami siap bantu Anda mewujudkan website impian. Konsultasi gratis, tanpa komitmen awal.
          </p>
          <a
            href="https://wa.me/6281339908765"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-100 transition"
          >
            <Rocket size={18} /> Konsultasi Sekarang
          </a>
        </div>
      </section>
    </main>
  )
}
