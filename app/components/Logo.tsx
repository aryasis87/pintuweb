// Tanda PintuWeb: lengkung pintu dengan daun pintu yang sedikit terbuka.
// Bentuk yang sama dipakai untuk favicon & ikon aplikasi (public/images, dibuat dari SVG ini).
export function LogoMark({ className = 'h-7 w-7', leaf = 0.45 }: { className?: string; leaf?: number }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true" focusable="false">
      <path fillRule="evenodd" d="M5 30V15C5 8.92 9.92 4 16 4s11 4.92 11 11v15zM10.5 30V15.5a5.5 5.5 0 0 1 11 0V30z" />
      <path d="M10.5 30V16.8l7.5-1.6V30z" opacity={leaf} />
    </svg>
  )
}

/** Logo lengkap: tanda + nama dalam serif. */
export function Logo({ tone = 'ink' }: { tone?: 'ink' | 'light' }) {
  const light = tone === 'light'
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark className={`h-7 w-7 ${light ? 'text-[color:var(--accent-300)]' : 'text-[color:var(--primary-700)]'}`} />
      <span className={`serif text-[1.4rem] leading-none tracking-[-0.02em] ${light ? 'text-white' : 'text-[color:var(--text-primary)]'}`}>PintuWeb</span>
    </span>
  )
}
