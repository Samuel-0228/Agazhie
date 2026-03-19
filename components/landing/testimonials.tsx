import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Tigist Haile',
    role: 'Parent of 11th grader',
    content: 'My daughter\'s grades improved dramatically after finding her tutor through አጋዤ. The tutor was patient, knowledgeable, and really understood how to explain difficult concepts.',
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
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by parents across Ethiopia
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            See what parents are saying about their experience with አጋዤ.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-card">
              <CardContent className="flex flex-col gap-4 pt-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {`"${testimonial.content}"`}
                </p>
                <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
