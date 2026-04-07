import { Card, CardContent } from '@/components/ui/card'
import { 
  Search, 
  Shield, 
  MessageSquare, 
  Calendar, 
  Award, 
  CreditCard 
} from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Smart Matching',
    description: 'Find tutors based on subject, availability, location, and teaching style that matches your child\'s needs.',
  },
  {
    icon: Shield,
    title: 'Verified Profiles',
    description: 'All tutors are verified students or graduates from accredited universities with proven academic excellence.',
  },
  {
    icon: MessageSquare,
    title: 'Direct Communication',
    description: 'Message tutors directly to discuss your child\'s needs before booking a session.',
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    description: 'Book sessions that fit your schedule. In-person at home or online - you choose.',
  },
  {
    icon: Award,
    title: 'EUEE & SAT Specialists',
    description: 'Expert tutors who have excelled in national exams and can help your child succeed.',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Pay securely through our platform with transparent pricing and no hidden fees.',
  },
]

export function Features() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to find the right tutor
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Our platform makes it easy to connect with qualified tutors who can help your child excel academically.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/50 bg-card/50 transition-colors hover:border-border hover:bg-card">
              <CardContent className="flex flex-col gap-4 pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
