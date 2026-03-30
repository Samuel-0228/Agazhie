import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, GraduationCap } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center sm:px-14 sm:py-20">
          {/* Background decoration */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/5 blur-2xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-primary-foreground/5 blur-2xl" />

          {/* Icon */}
          <div className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/15 ring-1 ring-primary-foreground/25">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </div>

          {/* Heading */}
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
              Ready to help your child succeed?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-pretty text-lg text-primary-foreground/75">
              Join hundreds of families who have found the perfect tutor through Goongoon.
              Start your search today — it&apos;s free to browse.
            </p>
          </div>

          {/* Actions */}
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              size="lg"
              asChild
              className="rounded-full bg-primary-foreground text-primary px-8 text-base font-semibold shadow-lg hover:bg-primary-foreground/90"
            >
              <Link href="/tutors">
                Browse Tutors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-full border-primary-foreground/30 bg-transparent px-8 text-base font-medium text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/become-tutor">Become a Tutor</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
