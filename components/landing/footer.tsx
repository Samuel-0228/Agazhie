import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

const footerLinks = {
  platform: [
    { label: 'Find Tutors', href: '/tutors' },
    { label: 'Become a Tutor', href: '/become-tutor' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Pricing', href: '/pricing' },
  ],
  subjects: [
    { label: 'Mathematics', href: '/tutors?subject=mathematics' },
    { label: 'Physics', href: '/tutors?subject=physics' },
    { label: 'Chemistry', href: '/tutors?subject=chemistry' },
    { label: 'English', href: '/tutors?subject=english' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm transition-transform group-hover:scale-105">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-primary-foreground">Goongoon</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/60">
              Connecting parents with verified, qualified tutors across Ethiopia for a brighter academic future.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground/50">Platform</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground/50">Popular Subjects</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.subjects.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground/50">Support</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-primary-foreground/10 pt-8 sm:flex-row">
          <p className="text-sm text-primary-foreground/50">
            &copy; {new Date().getFullYear()} Goongoon. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/35">
            Built with ❤️ for Ethiopian students and families
          </p>
        </div>
      </div>
    </footer>
  )
}
