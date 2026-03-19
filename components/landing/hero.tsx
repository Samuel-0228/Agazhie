import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Star, Users, Shield } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pb-16 pt-12 sm:pb-24 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <Badge variant="secondary" className="w-fit gap-1.5 px-3 py-1.5">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span>Trusted by 500+ families</span>
            </Badge>
            
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Find the{' '}
              <span className="text-primary">perfect tutor</span>{' '}
              for your child
            </h1>
            
            <p className="max-w-xl text-pretty text-lg text-muted-foreground sm:text-xl">
              Connect with verified university students and graduates who excel academically. 
              Personalized tutoring for EUEE, SAT, and all subjects.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button size="lg" asChild className="text-base">
                <Link href="/tutors">Find a Tutor</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base">
                <Link href="/become-tutor">Become a Tutor</Link>
              </Button>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Verified tutors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-primary" />
                <span>Safe & secure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary" />
                <span>1-on-1 sessions</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 to-accent/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl bg-card p-2 shadow-2xl ring-1 ring-border">
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                  <div className="flex h-full flex-col">
                    <div className="flex items-center gap-2 border-b border-border bg-card/50 px-4 py-3">
                      <div className="h-3 w-3 rounded-full bg-destructive/60" />
                      <div className="h-3 w-3 rounded-full bg-accent/60" />
                      <div className="h-3 w-3 rounded-full bg-primary/60" />
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/20" />
                        <div className="flex flex-col gap-1">
                          <div className="h-4 w-32 rounded bg-foreground/10" />
                          <div className="h-3 w-24 rounded bg-foreground/5" />
                        </div>
                        <Badge className="ml-auto">EUEE Expert</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">Mathematics</Badge>
                        <Badge variant="secondary">Physics</Badge>
                        <Badge variant="secondary">Chemistry</Badge>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          <span className="text-sm font-medium">4.9</span>
                          <span className="text-xs text-muted-foreground">(47 reviews)</span>
                        </div>
                        <Button size="sm">Book Now</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
