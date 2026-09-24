// Dibuat dari 65 situs demo yang live di akun Vercel aryasis87.
// Judul diambil dari <title> tiap situs; gambar = og.jpg milik situs itu sendiri.

export type DemoCategory = 'landing' | 'undangan' | 'linkinbio' | 'portfolio' | 'reservasi' | 'properti' | 'todo' | 'kontes'

export const DEMO_CATEGORIES: { id: DemoCategory; label: string }[] = [
  { id: 'landing', label: 'Landing Page' },
  { id: 'undangan', label: 'Undangan Digital' },
  { id: 'linkinbio', label: 'Link in Bio' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'reservasi', label: 'Reservasi Online' },
  { id: 'properti', label: 'Marketplace Properti' },
  { id: 'todo', label: 'Aplikasi Produktivitas' },
  { id: 'kontes', label: 'Kontes Desain' },
]

export type Demo = {
  slug: string
  name: string
  tagline: string
  category: DemoCategory
  url: string
}

export const DEMOS: Demo[] = [
  { slug: "bribu", name: "Bribu", tagline: "Kontes Desain untuk Bisnismu", category: 'landing', url: "https://landing-bribu.vercel.app" },
  { slug: "cissycoffee", name: "Cissy Coffee", tagline: "Premium Coffee Experience", category: 'landing', url: "https://landing-cissycoffee.vercel.app" },
  { slug: "citarasa", name: "CitaRasa Digital", tagline: "Solusi Digital Bisnis Kuliner", category: 'landing', url: "https://landing-citarasa.vercel.app" },
  { slug: "eduplay", name: "EduPlay", tagline: "Belajar Sambil Bermain", category: 'landing', url: "https://landing-eduplay.vercel.app" },
  { slug: "elevinar", name: "Elevinar", tagline: "Naikkan Level Skill-mu", category: 'landing', url: "https://landing-elevinar.vercel.app" },
  { slug: "lumicast", name: "Lumicast", tagline: "Webinar Eksklusif untuk Masa Depanmu", category: 'landing', url: "https://landing-lumicast.vercel.app" },
  { slug: "luxeelectro", name: "LuxeElectro", tagline: "Elektronik Premium untuk Hidup Mewah", category: 'landing', url: "https://landing-luxeelectro.vercel.app" },
  { slug: "modewear", name: "MODEWEAR", tagline: "Koleksi Fashion Terbaru", category: 'landing', url: "https://landing-modewear.vercel.app" },
  { slug: "nexttalks", name: "NextTalks", tagline: "Ide Besar, Pembicara Inspiratif", category: 'landing', url: "https://landing-nexttalks.vercel.app" },
  { slug: "nimbus", name: "Nimbus Cloud", tagline: "Cloud Tercepat & Teraman untuk Bisnis", category: 'landing', url: "https://landing-nimbus.vercel.app" },
  { slug: "rasanusantara", name: "Rasa Nusantara", tagline: "Kuliner Tradisional, Sentuhan Modern", category: 'landing', url: "https://landing-rasanusantara.vercel.app" },
  { slug: "sanzyhub", name: "SanzyHub", tagline: "Template Website Premium Siap Pakai", category: 'landing', url: "https://landing-sanzyhub.vercel.app" },
  { slug: "skywings", name: "SkyWings", tagline: "Rasakan Keajaiban Terbang", category: 'landing', url: "https://landing-skywings.vercel.app" },
  { slug: "sribu", name: "Sribu", tagline: "Platform Desain Kontes Terbaik", category: 'landing', url: "https://landing-sribu.vercel.app" },
  { slug: "tastycorner", name: "Tasty Corner", tagline: "Strategi F&B yang Menggugah Selera", category: 'landing', url: "https://landing-tastycorner.vercel.app" },
  { slug: "woodora", name: "Woodora", tagline: "Furnitur Berkualitas untuk Rumah Impian", category: 'landing', url: "https://landing-woodora.vercel.app" },
  { slug: "zychrome", name: "Zychrome", tagline: "Webinar Interaktif Para Ahli", category: 'landing', url: "https://landing-zychrome.vercel.app" },
  { slug: "corporate", name: "Undangan Acara Korporat Digital", tagline: "TechNusantara Summit 2026", category: 'undangan', url: "https://undangan-corporate-delta.vercel.app" },
  { slug: "aqiqah", name: "Undangan Aqiqah Digital", tagline: "Aisyah Khairunnisa", category: 'undangan', url: "https://undangan-aqiqah-puce.vercel.app" },
  { slug: "khitanan", name: "Undangan Khitanan Digital", tagline: "Kapten Fauzan", category: 'undangan', url: "https://undangan-khitanan-theta.vercel.app" },
  { slug: "wedding", name: "Undangan Pernikahan Digital", tagline: "Raka & Sinta", category: 'undangan', url: "https://undangan-wedding-eight.vercel.app" },
  { slug: "reuni", name: "Undangan Reuni Digital", tagline: "Angkatan 2010 SMA Harapan Bangsa", category: 'undangan', url: "https://undangan-reuni-livid.vercel.app" },
  { slug: "engagement", name: "Undangan Tunangan Digital", tagline: "Raka & Sinta", category: 'undangan', url: "https://undangan-engagement.vercel.app" },
  { slug: "birthday", name: "Undangan Ulang Tahun Digital", tagline: "Kayla", category: 'undangan', url: "https://undangan-birthday.vercel.app" },
  { slug: "wisuda", name: "Undangan Wisuda Digital", tagline: "Dimas Prasetyo", category: 'undangan', url: "https://undangan-wisuda-ten.vercel.app" },
  { slug: "arsip", name: "Arsip Kata", tagline: "Surat dari Dara", category: 'linkinbio', url: "https://linkinbio-arsip.vercel.app" },
  { slug: "atlas", name: "Atlas Studio", tagline: "Links", category: 'linkinbio', url: "https://linkinbio-atlas.vercel.app" },
  { slug: "cipher", name: "cipher", tagline: "Security Researcher Links", category: 'linkinbio', url: "https://linkinbio-cipher.vercel.app" },
  { slug: "disko", name: "DISKO PANDA", tagline: "Dengarkan & Tonton", category: 'linkinbio', url: "https://linkinbio-disko.vercel.app" },
  { slug: "jajan", name: "Jajanan Bu Rina", tagline: "Pesan Sekarang", category: 'linkinbio', url: "https://linkinbio-jajan.vercel.app" },
  { slug: "kaset", name: "KASET KITA", tagline: "Mixtape & Radio", category: 'linkinbio', url: "https://linkinbio-kaset.vercel.app" },
  { slug: "vendra", name: "Kopi Vendra", tagline: "Pesan & Kunjungi", category: 'linkinbio', url: "https://linkinbio-vendra.vercel.app" },
  { slug: "vinyl", name: "Laras", tagline: "Dengarkan di Mana Saja", category: 'linkinbio', url: "https://linkinbio-vinyl.vercel.app" },
  { slug: "mellow", name: "Mella", tagline: "Ilustrator & Sticker Artist", category: 'linkinbio', url: "https://linkinbio-mellow.vercel.app" },
  { slug: "nova", name: "Nova Ardhana", tagline: "Links", category: 'linkinbio', url: "https://linkinbio-nova.vercel.app" },
  { slug: "pulse", name: "PULSE", tagline: "Raka Wijaya, Motion Designer", category: 'linkinbio', url: "https://linkinbio-pulse.vercel.app" },
  { slug: "zen", name: "Sena", tagline: "Ruang Teduh", category: 'linkinbio', url: "https://linkinbio-zen.vercel.app" },
  { slug: "aria", name: "Aria", tagline: "Creative Developer & Designer", category: 'portfolio', url: "https://portfolio-aria-pearl.vercel.app" },
  { slug: "carlos", name: "Carlos Mendoza", tagline: "Product Designer & Developer", category: 'portfolio', url: "https://portfolio-carlos-eosin.vercel.app" },
  { slug: "celeste", name: "Celeste", tagline: "Brand Designer & Art Director", category: 'portfolio', url: "https://portfolio-celeste-one.vercel.app" },
  { slug: "milo", name: "Milo", tagline: "Designer & Illustrator", category: 'portfolio', url: "https://portfolio-milo.vercel.app" },
  { slug: "noelle", name: "Noelle", tagline: "UI/UX Designer", category: 'portfolio', url: "https://portfolio-noelle-one.vercel.app" },
  { slug: "rex", name: "Rex", tagline: "Graphic Designer & Front-end Dev", category: 'portfolio', url: "https://portfolio-rex-zeta.vercel.app" },
  { slug: "sorelle", name: "Sorelle", tagline: "UI/UX Designer & Developer", category: 'portfolio', url: "https://portfolio-sorelle.vercel.app" },
  { slug: "futsal", name: "Arena Futsal Garuda", tagline: "Booking Lapangan Online", category: 'reservasi', url: "https://reservasi-futsal.vercel.app" },
  { slug: "klinik", name: "Klinik Sehat Sentosa", tagline: "Janji Temu Dokter Online", category: 'reservasi', url: "https://reservasi-klinik-rose.vercel.app" },
  { slug: "restoran", name: "Saung Rasa", tagline: "Reservasi Meja Restoran Online", category: 'reservasi', url: "https://reservasi-restoran-gilt.vercel.app" },
  { slug: "hotel", name: "Senja Bay Resort", tagline: "Reservasi Kamar Online", category: 'reservasi', url: "https://reservasi-hotel-kappa.vercel.app" },
  { slug: "bioskop", name: "Sinema Nusantara", tagline: "Pesan Tiket Bioskop Online", category: 'reservasi', url: "https://reservasi-bioskop.vercel.app" },
  { slug: "beranda", name: "Beranda", tagline: "Cari Rumah dengan Hati", category: 'properti', url: "https://properti-beranda.vercel.app" },
  { slug: "homigo", name: "Homigo", tagline: "Cari Properti Jadi Mudah", category: 'properti', url: "https://properti-homigo.vercel.app" },
  { slug: "lumora", name: "Lumora", tagline: "Properti Premium Pilihan", category: 'properti', url: "https://properti-lumora.vercel.app" },
  { slug: "propertia", name: "Propertia", tagline: "Temukan Rumah Impianmu", category: 'properti', url: "https://properti-propertia.vercel.app" },
  { slug: "classic-todo", name: "Hari Ini", tagline: "Daftar Tugas Minimal & Fokus", category: 'todo', url: "https://todo-classic.vercel.app" },
  { slug: "kanban-board", name: "TaskFlow", tagline: "Papan Kanban Produktif", category: 'todo', url: "https://todo-kanban-one.vercel.app" },
  { slug: "task-manager", name: "TaskFlow", tagline: "Task Manager Lengkap", category: 'todo', url: "https://todo-manager-ivory-seven.vercel.app" },
  { slug: "absorber-dickson", name: "EthyleneAbsorber", tagline: "Konsep Korporat", category: 'kontes', url: "https://absorber-dickson.vercel.app" },
  { slug: "absorber-divine", name: "EthyleneAbsorber", tagline: "Konsep Divine", category: 'kontes', url: "https://absorber-divine.vercel.app" },
  { slug: "absorber-premium", name: "EthyleneAbsorber", tagline: "Konsep Premium", category: 'kontes', url: "https://absorber-premium.vercel.app" },
  { slug: "absorber-segar", name: "EthyleneAbsorber", tagline: "Konsep Segar", category: 'kontes', url: "https://absorber-segar.vercel.app" },
  { slug: "crave-amber", name: "Positive Crave", tagline: "Konsep Amber", category: 'kontes', url: "https://crave-amber-mu.vercel.app" },
  { slug: "crave-close", name: "Positive Crave", tagline: "Konsep Close", category: 'kontes', url: "https://crave-close.vercel.app" },
  { slug: "crave-grace", name: "Positive Crave", tagline: "Konsep Grace", category: 'kontes', url: "https://crave-grace.vercel.app" },
  { slug: "crave-lumen", name: "Positive Crave", tagline: "Konsep Lumen", category: 'kontes', url: "https://crave-lumen.vercel.app" },
  { slug: "crave-noir", name: "Positive Crave", tagline: "Konsep Noir", category: 'kontes', url: "https://crave-noir.vercel.app" },
]

export const demoImage = (d: Demo) => `${d.url}/og.jpg`
