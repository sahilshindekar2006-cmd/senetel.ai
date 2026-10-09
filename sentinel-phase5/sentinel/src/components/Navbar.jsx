import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'SYSTEM', href: '#assembly' },
  { label: 'SENSORS', href: '#components' },
  { label: 'AI', href: '#ai-engine' },
  { label: 'DEMO', href: '#simulator' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-white/10 bg-bg/70 backdrop-blur-xl' : 'border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-x flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3 md:py-4"
      >
        <a href="#hero" className="font-display text-sm font-semibold tracking-[0.3em] text-fg">
          SENTINEL
        </a>

        <span className="flex items-center gap-2 font-mono text-xs text-fg/80 md:order-3">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
          ONLINE
        </span>

        <ul className="order-3 flex w-full items-center justify-between md:order-2 md:w-auto md:gap-10">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-xs tracking-widest text-muted transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
