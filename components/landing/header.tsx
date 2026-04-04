'use client'

import Link from 'next/link'

const navLinks = [
  { label: 'Home', href: '/', active: true },
  { label: 'Request a Tutor', href: '/request-tutor' },
  { label: 'Admin', href: '/admin' },
]

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="liquid-glass mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full px-8 py-6">
        <Link
          href="/"
          className="text-3xl tracking-tight text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Agazhie
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? 'text-sm text-foreground transition-colors'
                  : 'text-sm text-muted-foreground transition-colors hover:text-foreground'
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/request-tutor"
          className="liquid-glass inline-flex rounded-full px-6 py-2.5 text-sm text-foreground transition-transform hover:scale-[1.03]"
        >
          <span className="relative z-10">Request a Tutor</span>
        </Link>
      </div>
    </header>
  )
}
