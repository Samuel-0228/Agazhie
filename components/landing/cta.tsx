import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to help your child succeed?
          </h2>
          <p className="mt-4 text-pretty text-lg text-primary-foreground/80">
            Join hundreds of families who have found the perfect tutor through አጋዤ. 
            Start your search today.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Button size="lg" variant="secondary" asChild className="text-base">
              <Link href="/tutors">
                Browse Tutors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="border-primary-foreground/20 bg-transparent text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/become-tutor">Become a Tutor</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
