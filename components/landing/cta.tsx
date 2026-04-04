import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageSquare } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-sm bg-primary px-8 py-14 text-center sm:px-14 sm:py-20">
          {/* Background decoration */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rotate-12 bg-primary-foreground/5 blur-2xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 -rotate-12 bg-primary-foreground/5 blur-2xl" />

          {/* Icon */}
          <div className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-sm bg-primary-foreground/15 ring-1 ring-primary-foreground/25">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </div>

          {/* Heading */}
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
              Ready to request a tutor?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-pretty text-lg text-primary-foreground/75">
              Submit your request, get matched by the admin team, and receive the right support faster.
            </p>
          </div>

          {/* Actions */}
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              size="lg"
              asChild
              className="rounded-sm bg-primary-foreground px-8 text-base font-semibold text-primary shadow-lg hover:bg-primary-foreground/90"
            >
              <Link href="/request-tutor">
                Request a Tutor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <div className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/30 px-6 py-3 text-sm text-primary-foreground/80">
              <MessageSquare className="h-4 w-4" />
              Admin handles tutor selection manually
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
