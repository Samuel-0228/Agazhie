import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Tigist Haile',
    role: 'Parent of 11th grader',
    content: "My daughter's grades improved dramatically after finding her tutor through Goongoon. The tutor was patient, knowledgeable, and really understood how to explain difficult concepts.",
    rating: 5,
    initials: 'TH',
  },
  {
    name: 'Bekele Tadesse',
    role: 'Parent of 12th grader',
    content: 'Finding a qualified EUEE tutor was so easy. Our tutor helped my son prepare effectively, and he scored much higher than expected. Highly recommend!',
    rating: 5,
    initials: 'BT',
  },
  {
    name: 'Meron Getachew',
    role: 'Parent of 9th grader',
    content: 'The verification process gave me confidence in the tutors. My child now enjoys learning math because of the excellent tutor we found here.',
    rating: 5,
    initials: 'MG',
  },
]

export function Testimonials() {
  return (
    <section className="bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Testimonials
          </p>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Loved by parents across Ethiopia
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-muted-foreground">
            See what families are saying about their experience with Goongoon.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Quote icon */}
              <Quote className="h-7 w-7 text-primary/30" aria-hidden="true" />

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote text */}
              <p className="flex-1 text-sm leading-relaxed text-foreground/80">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <Avatar className="h-10 w-10 ring-2 ring-primary/15">
                  <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
