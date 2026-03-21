import { Card, CardContent } from '@/components/ui/card'
import {
  Search,
  Shield,
  MessageSquare,
  Calendar,
  Award,
  CreditCard,
  BookOpen,
  Video,
  HelpCircle,
} from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Smart Tutor Matching',
    description: 'Find tutors based on subject, availability, location, and teaching style that matches your child\'s needs.',
  },
  {
    icon: Shield,
    title: 'Verified Profiles & Badges',
    description: 'All tutors are verified with documents and tests. Look for the "Verified" or "Gold Tutor" badge for the best tutors.',
  },
  {
    icon: CreditCard,
    title: 'Escrow Payments via Telebirr',
    description: 'Pay safely via Telebirr. Money is held in escrow and only released to the tutor after you confirm the session.',
  },
  {
    icon: BookOpen,
    title: 'Assignment Marketplace',
    description: 'Post homework and assignments. Verified tutors apply, complete the work, and you release payment only when satisfied.',
  },
  {
    icon: Video,
    title: 'Live Sessions (Jitsi)',
    description: 'Join live video tutoring sessions directly from your browser. Low-bandwidth mode available for 3G connections.',
  },
  {
    icon: MessageSquare,
    title: 'In-App Messaging',
    description: 'Message tutors directly before and after booking to discuss your child\'s needs and coordinate sessions.',
  },
  {
    icon: HelpCircle,
    title: 'Free Q&A Board',
    description: 'Ask quick academic questions and get free answers from verified tutors. Build your child\'s confidence.',
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    description: 'Book sessions that fit your schedule. In-person at home, online, or either — you choose what works.',
  },
  {
    icon: Award,
    title: 'EUEE & SAT Specialists',
    description: 'Expert tutors who have excelled in national and international exams and can help your child succeed.',
  },
]

export function Features() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need for better education
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Ethiopia&apos;s most trusted tutoring platform — from live sessions to homework help, with safe Telebirr payments.
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
