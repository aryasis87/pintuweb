// Satu-satunya sumber FAQ (3 bahasa): bagian FAQ di beranda, halaman FAQ, dan JSON-LD FAQPage.
// Semua angka dirakit dari lib/packages.ts & lib/site.ts lewat i18n/facts.ts supaya tidak pernah bertentangan.
import { CLIENT_PROJECTS, FOUNDED_YEAR, GUARANTEE_DAYS, PERF_TARGET } from '../lib/site'
import { DEMOS } from '../lib/demos'
import { facts, packagesFor } from '../i18n/facts'
import type { Lang } from '../i18n/config'

export type FaqCategoryId = 'general' | 'pricing' | 'process' | 'technical' | 'support'
export type FaqItem = { category: FaqCategoryId; question: string; answer: string }

const CATEGORIES: Record<Lang, { id: FaqCategoryId; name: string }[]> = {
  id: [
    { id: 'general', name: 'Umum' },
    { id: 'pricing', name: 'Harga' },
    { id: 'process', name: 'Proses' },
    { id: 'technical', name: 'Teknis' },
    { id: 'support', name: 'Dukungan' },
  ],
  en: [
    { id: 'general', name: 'General' },
    { id: 'pricing', name: 'Pricing' },
    { id: 'process', name: 'Process' },
    { id: 'technical', name: 'Technical' },
    { id: 'support', name: 'Support' },
  ],
  ms: [
    { id: 'general', name: 'Umum' },
    { id: 'pricing', name: 'Harga' },
    { id: 'process', name: 'Proses' },
    { id: 'technical', name: 'Teknikal' },
    { id: 'support', name: 'Sokongan' },
  ],
}

function items(lang: Lang): FaqItem[] {
  const f = facts(lang)
  const pk = packagesFor(lang)
  const durations = pk.map((p) => `${p.title}: ${p.duration}`).join('; ')
  const priceList = pk.map((p) => `${p.priceFrom} (${p.title})`).join(', ')
  const n = DEMOS.length

  if (lang === 'en') {
    return [
      { category: 'general', question: 'I have never had a website. Can you help me from scratch?', answer: 'Of course. We guide you step by step, from concept, design and content to the website going live. You do not need any technical knowledge; just tell us about your business and what you need.' },
      { category: 'general', question: 'How long has PintuWeb been around?', answer: `PintuWeb was founded in ${FOUNDED_YEAR} in Trenggalek, East Java, Indonesia, and has completed ${CLIENT_PROJECTS} client projects. There are also ${n} live demos you can try for yourself on the Demos page.` },
      { category: 'general', question: 'Will my website show up on Google?', answer: 'Yes. Every website is optimised for search from day one: meta tags, structured data, a sitemap and a clean heading structure. A new website usually starts being indexed by Google within 1–2 weeks, and its rankings grow with good-quality content.' },
      { category: 'general', question: 'What makes PintuWeb different?', answer: `Each website is designed around your brand rather than recycled from a template. We aim for a PageSpeed score of ${PERF_TARGET}, mobile-first design and SEO from the start, plus a ${GUARANTEE_DAYS}-day guarantee and maintenance according to your package.` },
      { category: 'general', question: 'What does the process look like from start to finish?', answer: '1) A consultation about your needs, 2) a quote and agreement, 3) an initial design for your approval, 4) development, 5) testing and revisions, 6) launch and handover. We keep you updated over WhatsApp at every stage.' },
      { category: 'general', question: 'Will I fully own the website?', answer: 'Yes. Once the final payment is made, you receive the source code, admin access, hosting and domain access and every credential. The website is entirely yours, with no dependence on us.' },
      { category: 'general', question: 'Can I request custom features for my business?', answer: 'Yes. Booking systems, member areas, calculators, dynamic catalogues or integrations with systems you already use can be built through the Custom Website package. Tell us what you need and we will give you an estimate.' },
      { category: 'pricing', question: 'How much does a website cost?', answer: `Prices start from ${priceList}. Full details of each package are on the Pricing page, and all prices are in Indonesian Rupiah (IDR). Every price includes design, development and basic SEO.` },
      { category: 'pricing', question: 'Are there any hidden costs?', answer: `No. The package price covers design, development and basic SEO. The only recurring cost is the domain and hosting renewal: ${f.renewal} Any major features outside the package are always discussed and agreed first.` },
      { category: 'pricing', question: 'How does payment work?', answer: f.payment },
      { category: 'pricing', question: 'What if I am not happy with the result?', answer: 'You approve the design before development starts, with the number of revisions set by your package. The remaining 50% is only paid once the website is finished and you have approved it, so you never pay in full for work that is not right yet.' },
      { category: 'pricing', question: 'Do you offer discounts for start-ups or small businesses?', answer: 'Yes. Businesses that are less than a year old can get up to 20% off, and payment can be arranged more flexibly. Contact us to talk it through.' },
      { category: 'process', question: 'How long does it take to build a website?', answer: `Estimated time per package once your content is complete: ${durations}. It can be quicker or longer depending on how complete your content is and how complex the features are.` },
      { category: 'process', question: 'What do I need to prepare?', answer: 'Required: your business name, a description of your business and contact details. Helpful: a logo, photos of your products or services and examples of websites you like. If anything is missing, we will help you prepare it.' },
      { category: 'process', question: 'What if I do not have any content or photos?', answer: 'No problem. We can write the content from a short brief, use licensed stock photos, or recommend a photographer if you need your own product photos.' },
      { category: 'process', question: 'Can I revise the design?', answer: 'Yes. The number of revisions depends on your package (for example, 2 design revisions for the Small Business Standard and Simple Online Store packages). Small changes such as text, photos or contact details are free during the maintenance period.' },
      { category: 'process', question: 'Can I see the progress?', answer: 'Yes. We send you a preview of the website that you can open yourself, and update you over WhatsApp at every stage.' },
      { category: 'process', question: 'What if I need extra features halfway through?', answer: 'Small additions can usually be included straight away. Larger features such as an online store or a booking system get a separate quote and are built once you approve it.' },
      { category: 'technical', question: 'Is the website responsive (mobile-friendly)?', answer: 'Yes. All our websites are mobile-first and tested across screen sizes, from phones to desktops. This also matters for your Google rankings.' },
      { category: 'technical', question: 'What technology do you use?', answer: 'Next.js, React and Tailwind CSS, with cloud hosting on a CDN. For websites that need data, we use databases such as PostgreSQL depending on the project.' },
      { category: 'technical', question: 'How fast will my website be?', answer: `We aim for a PageSpeed score of ${PERF_TARGET} through image optimisation, lazy loading, a CDN and caching. The final result also depends on the page content, such as the number of videos or large images.` },
      { category: 'technical', question: 'Is there an admin panel or CMS?', answer: 'The Simple Online Store and Full Online Store packages include product management. For other packages, content changes can be made through us during the maintenance period, or a CMS can be added as a feature.' },
      { category: 'technical', question: 'How is the website kept secure?', answer: 'Every website uses SSL (HTTPS), security headers and input validation. The code is stored in a Git repository so earlier versions can be restored, and during maintenance we update dependencies regularly.' },
      { category: 'technical', question: 'Can the website connect to social media or other services?', answer: 'Yes: WhatsApp buttons, Instagram, TikTok, Google Analytics, Meta Pixel, Google Maps, email marketing and even payment gateways for the online store packages.' },
      { category: 'support', question: 'Is there a guarantee?', answer: `Yes. For ${GUARANTEE_DAYS} days after launch, bugs and technical issues are fixed free of charge. After that, maintenance follows your package (1–6 months) and can be extended monthly or on request.` },
      { category: 'support', question: 'How do I update the content once the website is finished?', answer: 'With the online store packages, you can manage products yourself. For other packages, just send the changes over WhatsApp; during the maintenance period, small updates such as text, images or contact details are free. We also give you a short guide to managing the website.' },
      { category: 'support', question: 'What if my website has a problem or goes down?', answer: `Message us on WhatsApp. ${f.response}, during working hours (${f.hours}). Fixes are free during the ${GUARANTEE_DAYS}-day guarantee, and because the code is kept in Git, an earlier version can always be restored.` },
      { category: 'support', question: 'Can you migrate my old website?', answer: 'Yes. We move your content, set up redirects from the old addresses so your SEO rankings are not lost, and help transfer your domain if needed.' },
      { category: 'support', question: 'Can I still get help after the website is finished?', answer: `Of course. You can still reach us on WhatsApp for advice, fixes or ongoing maintenance. ${f.response}.` },
    ]
  }

  if (lang === 'ms') {
    return [
      { category: 'general', question: 'Saya tidak pernah ada laman web. Bolehkah dibantu dari awal?', answer: 'Tentu sekali. Kami bimbing anda langkah demi langkah, daripada konsep, reka bentuk dan kandungan sehingga laman web dilancarkan. Anda tidak perlu tahu hal teknikal; cukup ceritakan tentang perniagaan dan keperluan anda.' },
      { category: 'general', question: 'Sudah berapa lama PintuWeb beroperasi?', answer: `PintuWeb ditubuhkan pada ${FOUNDED_YEAR} di Trenggalek, Jawa Timur, Indonesia, dan telah menyiapkan ${CLIENT_PROJECTS} projek pelanggan. Terdapat juga ${n} demo langsung yang boleh anda cuba sendiri di halaman Demo.` },
      { category: 'general', question: 'Adakah laman web saya akan muncul di Google?', answer: 'Ya. Setiap laman web dioptimumkan untuk carian sejak awal: tag meta, data berstruktur, peta laman dan struktur tajuk yang kemas. Laman web baharu biasanya mula diindeks Google dalam 1–2 minggu, dan kedudukannya meningkat seiring kandungan yang berkualiti.' },
      { category: 'general', question: 'Apakah yang membezakan PintuWeb?', answer: `Setiap laman web direka mengikut identiti perniagaan anda, bukan templat kitar semula. Kami menyasarkan skor PageSpeed ${PERF_TARGET}, reka bentuk mudah alih dahulu dan SEO sejak awal, berserta jaminan ${GUARANTEE_DAYS} hari dan penyelenggaraan mengikut pakej.` },
      { category: 'general', question: 'Bagaimanakah proses kerja dari awal hingga akhir?', answer: '1) Konsultasi keperluan, 2) sebut harga dan persetujuan, 3) reka bentuk awal untuk kelulusan anda, 4) pembangunan, 5) pengujian dan semakan, 6) pelancaran dan serahan. Kami maklumkan setiap peringkat melalui WhatsApp.' },
      { category: 'general', question: 'Adakah saya memiliki laman web itu sepenuhnya?', answer: 'Ya. Selepas bayaran penuh, anda menerima kod sumber, akses admin, akses hosting dan domain, serta semua kelayakan masuk. Laman web itu milik anda sepenuhnya, tanpa bergantung kepada kami.' },
      { category: 'general', question: 'Bolehkah saya meminta ciri khas untuk perniagaan saya?', answer: 'Boleh. Sistem tempahan, ruang ahli, kalkulator, katalog dinamik atau integrasi dengan sistem sedia ada boleh dibina melalui pakej Laman Web Tersuai. Bincangkan keperluan anda dan kami berikan anggaran.' },
      { category: 'pricing', question: 'Berapakah kos membina laman web?', answer: `Harga bermula dari ${priceList}. Butiran setiap pakej ada di halaman Harga, dan semua harga dalam Rupiah Indonesia (IDR). Setiap harga sudah termasuk reka bentuk, pembangunan dan SEO asas.` },
      { category: 'pricing', question: 'Adakah kos tersembunyi?', answer: `Tiada. Harga pakej merangkumi reka bentuk, pembangunan dan SEO asas. Satu-satunya kos berkala ialah pembaharuan domain dan hosting: ${f.renewal} Ciri besar di luar pakej sentiasa dibincang dan dipersetujui terlebih dahulu.` },
      { category: 'pricing', question: 'Bagaimanakah sistem pembayarannya?', answer: f.payment },
      { category: 'pricing', question: 'Bagaimana jika saya tidak berpuas hati dengan hasilnya?', answer: 'Anda meluluskan reka bentuk sebelum pembangunan bermula, dengan bilangan semakan mengikut pakej. Baki 50% hanya dibayar selepas laman web siap dan anda luluskan, jadi anda tidak membayar penuh untuk hasil yang belum sesuai.' },
      { category: 'pricing', question: 'Adakah diskaun untuk syarikat pemula atau PKS?', answer: 'Ada potongan sehingga 20% untuk perniagaan yang berusia kurang daripada setahun, dan pembayaran boleh diatur dengan lebih fleksibel. Hubungi kami untuk berbincang.' },
      { category: 'process', question: 'Berapa lama masa untuk membina laman web?', answer: `Anggaran setiap pakej selepas kandungan lengkap: ${durations}. Masa boleh lebih cepat atau lebih lama bergantung pada kelengkapan kandungan dan kerumitan ciri.` },
      { category: 'process', question: 'Apakah yang perlu saya sediakan?', answer: 'Wajib: nama perniagaan, penerangan perniagaan dan maklumat hubungan. Membantu: logo, foto produk atau perkhidmatan, dan contoh laman web yang anda suka. Jika belum lengkap, kami bantu menyediakannya.' },
      { category: 'process', question: 'Bagaimana jika saya tiada kandungan atau foto?', answer: 'Tiada masalah. Kami boleh menulis kandungan berdasarkan ringkasan pendek, menggunakan foto stok berlesen, atau mengesyorkan jurugambar jika anda memerlukan foto produk sendiri.' },
      { category: 'process', question: 'Bolehkah saya menyemak semula reka bentuk?', answer: 'Boleh. Bilangan semakan mengikut pakej (contohnya 2× semakan reka bentuk untuk pakej Standard PKS dan Kedai Online Ringkas). Perubahan kecil seperti teks, foto atau maklumat hubungan dibantu tanpa caj sepanjang tempoh penyelenggaraan.' },
      { category: 'process', question: 'Bolehkah saya melihat kemajuan kerja?', answer: 'Boleh. Kami hantar pratonton laman web yang boleh anda buka sendiri, dan maklumkan kemajuan melalui WhatsApp pada setiap peringkat.' },
      { category: 'process', question: 'Bagaimana jika saya perlukan ciri tambahan di tengah proses?', answer: 'Tambahan kecil biasanya boleh terus dimasukkan. Ciri besar seperti kedai dalam talian atau sistem tempahan diberikan sebut harga berasingan dan dibina selepas anda luluskan.' },
      { category: 'technical', question: 'Adakah laman web itu responsif (mesra mudah alih)?', answer: 'Ya. Semua laman web kami direka untuk mudah alih dahulu dan diuji pada pelbagai saiz skrin, dari telefon hingga desktop. Ini juga penting untuk kedudukan di Google.' },
      { category: 'technical', question: 'Teknologi apakah yang digunakan?', answer: 'Next.js, React dan Tailwind CSS, dengan hosting awan ber-CDN. Untuk laman web yang memerlukan data, kami menggunakan pangkalan data seperti PostgreSQL mengikut keperluan projek.' },
      { category: 'technical', question: 'Sepantas manakah laman web yang dibina?', answer: `Kami menyasarkan skor PageSpeed ${PERF_TARGET} melalui pengoptimuman imej, lazy loading, CDN dan caching. Hasil akhir juga dipengaruhi kandungan halaman, contohnya bilangan video atau imej besar.` },
      { category: 'technical', question: 'Adakah panel admin atau CMS?', answer: 'Pakej Kedai Online Ringkas dan Kedai Online Penuh sudah dilengkapi pengurusan produk. Untuk pakej lain, perubahan kandungan boleh dibuat melalui kami sepanjang tempoh penyelenggaraan, atau CMS ditambah sebagai ciri.' },
      { category: 'technical', question: 'Bagaimanakah keselamatan laman web dijamin?', answer: 'Semua laman web menggunakan SSL (HTTPS), pengepala keselamatan dan pengesahan input. Kod disimpan dalam repositori Git supaya versi terdahulu boleh dipulihkan, dan sepanjang penyelenggaraan kami mengemas kini kebergantungan secara berkala.' },
      { category: 'technical', question: 'Bolehkah laman web disambungkan ke media sosial atau perkhidmatan lain?', answer: 'Boleh: butang WhatsApp, Instagram, TikTok, Google Analytics, Meta Pixel, Google Maps, pemasaran e-mel hingga gerbang pembayaran untuk pakej kedai dalam talian.' },
      { category: 'support', question: 'Adakah jaminan?', answer: `Ya. Selama ${GUARANTEE_DAYS} hari selepas laman web dilancarkan, pepijat dan masalah teknikal dibaiki secara percuma. Selepas itu penyelenggaraan mengikut pakej (1–6 bulan) dan boleh dilanjutkan secara bulanan atau atas permintaan.` },
      { category: 'support', question: 'Bagaimana cara mengemas kini kandungan selepas laman web siap?', answer: 'Untuk pakej kedai dalam talian, produk boleh diurus sendiri. Untuk pakej lain, hantar sahaja perubahan melalui WhatsApp; sepanjang tempoh penyelenggaraan, kemas kini kecil seperti teks, imej atau maklumat hubungan dibuat secara percuma. Kami juga berikan panduan ringkas mengurus laman web.' },
      { category: 'support', question: 'Bagaimana jika laman web saya bermasalah atau tidak dapat diakses?', answer: `Maklumkan kepada kami melalui WhatsApp. ${f.response}, pada waktu bekerja (${f.hours}). Sepanjang jaminan ${GUARANTEE_DAYS} hari pembaikan adalah percuma, dan kerana kod disimpan dalam Git, versi terdahulu sentiasa boleh dipulihkan.` },
      { category: 'support', question: 'Bolehkah laman web lama dipindahkan?', answer: 'Boleh. Kami pindahkan kandungan, memasang pengalihan dari alamat lama supaya kedudukan SEO tidak hilang, dan membantu pemindahan domain jika perlu.' },
      { category: 'support', question: 'Selepas laman web siap, bolehkah saya masih meminta bantuan?', answer: `Tentu. Anda masih boleh menghubungi kami melalui WhatsApp untuk konsultasi, pembaikan atau penyelenggaraan lanjutan. ${f.response}.` },
    ]
  }

  return [
    { category: 'general', question: 'Saya belum pernah punya website, apakah bisa dibantu dari awal?', answer: 'Tentu. Kami memandu Anda langkah demi langkah, mulai dari konsep, desain, dan konten sampai website online. Anda tidak perlu paham teknis; cukup ceritakan usaha dan kebutuhan Anda.' },
    { category: 'general', question: 'Sudah berapa lama PintuWeb berdiri?', answer: `PintuWeb berdiri sejak ${FOUNDED_YEAR} di Trenggalek, Jawa Timur, dan sudah menyelesaikan ${CLIENT_PROJECTS} proyek klien. Selain itu ada ${n} demo live yang bisa Anda coba langsung di halaman Demo.` },
    { category: 'general', question: 'Apakah website yang dibuat bisa muncul di Google?', answer: 'Ya. Setiap website dioptimasi SEO sejak awal: meta tag, structured data, sitemap, dan struktur heading yang rapi. Biasanya website mulai terindeks Google dalam 1–2 minggu, lalu peringkatnya tumbuh seiring konten yang berkualitas.' },
    { category: 'general', question: 'Apa yang membedakan PintuWeb dengan jasa lain?', answer: `Setiap website dirancang khusus sesuai identitas bisnis Anda, bukan template daur ulang. Kami menargetkan skor PageSpeed ${PERF_TARGET}, desain mobile-first, SEO sejak awal, serta garansi ${GUARANTEE_DAYS} hari dan maintenance sesuai paket.` },
    { category: 'general', question: 'Bagaimana proses kerja dari awal sampai akhir?', answer: '1) Konsultasi kebutuhan, 2) penawaran dan kesepakatan, 3) desain awal untuk Anda setujui, 4) pengembangan, 5) pengujian dan revisi, 6) website online dan serah terima. Setiap tahap kami kabarkan lewat WhatsApp.' },
    { category: 'general', question: 'Apakah saya memiliki hak penuh atas website?', answer: 'Ya. Setelah pelunasan, Anda mendapat source code, akses admin, akses hosting dan domain, serta semua kredensial. Website sepenuhnya milik Anda, tanpa ketergantungan pada kami.' },
    { category: 'general', question: 'Apakah bisa request fitur custom sesuai kebutuhan bisnis?', answer: 'Bisa. Sistem booking, area member, kalkulator, katalog dinamis, atau integrasi dengan sistem yang sudah ada dapat kami buatkan lewat paket Website Custom. Diskusikan kebutuhan Anda dan kami beri estimasi.' },
    { category: 'pricing', question: 'Berapa biaya pembuatan website?', answer: `Harga mulai ${pk.map((p) => `${p.priceFrom} untuk ${p.title}`).join(', ')}. Rincian fitur tiap paket ada di halaman Paket. Semua harga sudah termasuk desain, development, dan SEO dasar.` },
    { category: 'pricing', question: 'Apakah ada biaya tersembunyi?', answer: `Tidak. Harga paket sudah mencakup desain, development, dan SEO dasar. Biaya berkala satu-satunya adalah perpanjangan domain dan hosting: ${f.renewal} Fitur besar di luar paket selalu dibicarakan dan disepakati lebih dulu.` },
    { category: 'pricing', question: 'Bagaimana sistem pembayarannya?', answer: f.payment },
    { category: 'pricing', question: 'Bagaimana kalau saya tidak cocok dengan hasilnya?', answer: 'Desain Anda setujui dulu sebelum pengembangan dimulai, dengan jatah revisi sesuai paket. Pelunasan 50% baru dibayar setelah website selesai dan Anda setujui, jadi Anda tidak membayar penuh untuk hasil yang belum sesuai.' },
    { category: 'pricing', question: 'Apakah ada diskon untuk startup atau UMKM?', answer: 'Ada potongan hingga 20% untuk bisnis yang berdiri kurang dari 1 tahun, dan pembayaran bisa diatur lebih fleksibel. Hubungi kami untuk membicarakannya.' },
    { category: 'process', question: 'Berapa lama proses pembuatan website?', answer: `Perkiraan per paket setelah konten lengkap: ${durations}. Waktu bisa lebih cepat atau lebih lama tergantung kelengkapan konten dan kompleksitas fitur.` },
    { category: 'process', question: 'Apa saja yang perlu saya siapkan?', answer: 'Yang wajib: nama bisnis, deskripsi usaha, dan kontak. Yang membantu: logo, foto produk atau layanan, dan contoh website yang Anda suka. Kalau belum lengkap, kami bantu menyiapkannya.' },
    { category: 'process', question: 'Bagaimana jika saya tidak punya konten atau foto?', answer: 'Tidak masalah. Kami bisa menulis konten berdasarkan brief singkat, memakai foto stok berlisensi, atau merekomendasikan fotografer bila Anda butuh foto produk sendiri.' },
    { category: 'process', question: 'Apakah saya bisa merevisi desain?', answer: 'Bisa. Jatah revisi mengikuti paket (misalnya 2× revisi desain untuk paket Standar UMKM dan Toko Online Simple). Perubahan kecil seperti teks, foto, atau info kontak kami bantu tanpa biaya selama masa maintenance.' },
    { category: 'process', question: 'Apakah saya bisa melihat progres pengerjaan?', answer: 'Bisa. Kami kirim pratinjau website yang bisa Anda buka sendiri, dan mengabarkan progres lewat WhatsApp di setiap tahap.' },
    { category: 'process', question: 'Bagaimana jika saya butuh tambahan fitur di tengah proses?', answer: 'Tambahan kecil biasanya bisa langsung kami masukkan. Fitur besar seperti toko online atau sistem booking dibuatkan penawaran terpisah dan dikerjakan setelah Anda setujui.' },
    { category: 'technical', question: 'Apakah website-nya responsif (mobile-friendly)?', answer: 'Ya. Semua website kami mobile-first dan diuji di berbagai ukuran layar, dari ponsel sampai desktop. Ini juga penting untuk peringkat di Google.' },
    { category: 'technical', question: 'Teknologi apa yang digunakan?', answer: 'Next.js, React, dan Tailwind CSS, dengan hosting cloud ber-CDN. Untuk website yang butuh data, kami memakai database seperti PostgreSQL sesuai kebutuhan proyek.' },
    { category: 'technical', question: 'Seberapa cepat website yang dibuat?', answer: `Kami menargetkan skor PageSpeed ${PERF_TARGET} lewat optimasi gambar, lazy loading, CDN, dan caching. Hasil akhirnya juga dipengaruhi isi halaman, misalnya jumlah video atau gambar besar.` },
    { category: 'technical', question: 'Apakah ada admin panel atau CMS?', answer: 'Paket Toko Online Simple dan Toko Online Full sudah dilengkapi pengelolaan produk. Untuk paket lain, perubahan konten bisa lewat kami selama masa maintenance, atau CMS ditambahkan sebagai fitur.' },
    { category: 'technical', question: 'Bagaimana keamanan website dijamin?', answer: 'Semua website memakai SSL (HTTPS), security headers, dan validasi input. Kode tersimpan di repository Git sehingga versi sebelumnya bisa dipulihkan, dan selama masa maintenance kami memperbarui dependensi secara berkala.' },
    { category: 'technical', question: 'Apakah website bisa diintegrasikan dengan media sosial atau layanan lain?', answer: 'Bisa: tombol WhatsApp, Instagram, TikTok, Google Analytics, Meta Pixel, Google Maps, email marketing, hingga payment gateway untuk paket toko online.' },
    { category: 'support', question: 'Apakah ada garansi?', answer: `Ya. Selama ${GUARANTEE_DAYS} hari setelah website online, bug dan masalah teknis kami perbaiki gratis. Setelah itu maintenance mengikuti paket (1–6 bulan) dan bisa diperpanjang bulanan atau per permintaan.` },
    { category: 'support', question: 'Bagaimana cara update konten setelah website jadi?', answer: 'Untuk paket toko online, produk bisa Anda kelola sendiri. Untuk paket lain, kirim saja perubahan lewat WhatsApp; selama masa maintenance, update kecil seperti teks, gambar, atau info kontak kami kerjakan gratis. Kami juga memberi panduan singkat cara mengelola website.' },
    { category: 'support', question: 'Bagaimana jika website saya bermasalah atau down?', answer: `Kabari kami lewat WhatsApp. ${f.response}, pada jam kerja (${f.hours}). Selama garansi ${GUARANTEE_DAYS} hari perbaikannya gratis, dan karena kode tersimpan di Git, versi sebelumnya selalu bisa dipulihkan.` },
    { category: 'support', question: 'Apakah bisa migrasi dari website lama?', answer: 'Bisa. Kami pindahkan konten, memasang redirect dari alamat lama agar peringkat SEO tidak hilang, dan membantu transfer domain bila diperlukan.' },
    { category: 'support', question: 'Setelah website selesai, apakah masih bisa minta bantuan?', answer: `Tentu. Kami tetap bisa dihubungi lewat WhatsApp untuk konsultasi, perbaikan, atau maintenance lanjutan. ${f.response}.` },
  ]
}

export const faqFor = (lang: Lang) => ({ categories: CATEGORIES[lang], items: items(lang) })

/** JSON-LD FAQPage dari daftar tanya-jawab yang sama dengan yang tampil. */
export const faqJsonLd = (list: { question: string; answer: string }[], inLanguage: string) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage,
  mainEntity: list.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
})
