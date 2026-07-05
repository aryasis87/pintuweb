const TECH = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Framer Motion', 'PostgreSQL', 'Node.js', 'Midtrans']

export default function TechMarquee() {
  return (
    <section aria-label="Teknologi yang digunakan" className="border-y border-[color:var(--border-light)] bg-white py-7">
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
        Dibangun dengan standar teknologi kelas dunia
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {TECH.map((t) => (
                <li key={t} className="flex items-center gap-3 px-6 text-lg font-bold text-[color:var(--text-secondary)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent-400)]" />
                  {t}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
