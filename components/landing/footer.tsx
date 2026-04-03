import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

const footerLinks = {
  platform: [
    { label: 'Find Tutors', href: '/tutors' },
    { label: 'Become a Tutor', href: '/become-tutor' },
    { label: 'Request a Tutor', href: '/request' },
  ],
  subjects: [
    { label: 'Mathematics', href: '/tutors?subject=mathematics' },
    { label: 'Physics', href: '/tutors?subject=physics' },
    { label: 'Chemistry', href: '/tutors?subject=chemistry' },
    { label: 'English', href: '/tutors?subject=english' },
  ],
  support: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="glass-panel flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:scale-105">
                <GraduationCap className="h-5 w-5 text-foreground" />
              </div>
              <span
                className="text-xl font-bold tracking-tight text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Agazhie
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Connecting parents with verified, qualified tutors across Ethiopia for a brighter academic future.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Platform</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Popular Subjects</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.subjects.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Support</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Agazhie. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for Ethiopian students and families
          </p>
        </div>
      </div>
    </footer>
  )
}
