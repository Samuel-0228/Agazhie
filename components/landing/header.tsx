'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GraduationCap, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm transition-transform group-hover:scale-105">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">Goongoon</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/tutors"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Find Tutors
          </Link>
          <Link
            href="/become-tutor"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Become a Tutor
          </Link>
          <Link
            href="/how-it-works"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            How It Works
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild className="rounded-full text-sm font-medium">
            <Link href="/auth/login">Log in</Link>
          </Button>
          <Button asChild className="rounded-full text-sm font-medium shadow-sm">
            <Link href="/auth/sign-up">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-muted md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Subtle separator */}
      <div className="h-px bg-border/60 mx-auto max-w-7xl" />

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            <Link
              href="/tutors"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Tutors
            </Link>
            <Link
              href="/become-tutor"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Become a Tutor
            </Link>
            <Link
              href="/how-it-works"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
              <Button variant="outline" asChild className="w-full rounded-full">
                <Link href="/auth/login">Log in</Link>
              </Button>
              <Button asChild className="w-full rounded-full">
                <Link href="/auth/sign-up">Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
