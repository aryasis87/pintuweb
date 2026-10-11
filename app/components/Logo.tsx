import Image from 'next/image'

// Logo PintuWeb milik pemilik situs: sumbernya public/images/logo.png. Yang dipakai di sini versi rapatnya
// (logo-pintuweb.png), dibuat oleh scripts/ikon-dari-logo.mjs bersama favicon, ikon aplikasi, dan logo OG.
const SRC = '/images/logo-pintuweb.png'
const W = 367
const H = 512

export function LogoMark({ className = 'h-8 w-auto', priority = false }: { className?: string; priority?: boolean }) {
  return <Image src={SRC} alt="" width={W} height={H} sizes="40px" priority={priority} className={className} />
}

/** Logo lengkap: gambar logo + nama. Di latar gelap logonya diberi alas putih supaya biru gelapnya tetap terbaca. */
export function Logo({ tone = 'ink', priority = false }: { tone?: 'ink' | 'light'; priority?: boolean }) {
  const light = tone === 'light'
  return (
    <span className="inline-flex items-center gap-2.5">
      {light ? (
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-white">
          <LogoMark className="h-6 w-auto" />
        </span>
      ) : (
        <LogoMark className="h-8 w-auto" priority={priority} />
      )}
      <span className={`display text-[1.25rem] leading-none tracking-[-0.02em] ${light ? 'text-white' : 'text-[color:var(--text-primary)]'}`}>PintuWeb</span>
    </span>
  )
}
