import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle, BookOpen, CreditCard, UserCheck, Star } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    category: 'Getting Started',
    icon: BookOpen,
    questions: [
      {
        q: 'How do I find a tutor?',
        a: 'Browse tutors at /tutors and filter by subject, grade, location, and price. You can view each tutor\'s profile, rating, and specialization before making a request.',
      },
      {
        q: 'How do I post a tutoring request?',
        a: 'Go to "Request a Tutor" and fill in the subject, grade level, schedule preferences, and budget. Your request is then reviewed by our team, who will match you with a suitable tutor.',
      },
      {
        q: 'Is the platform free for parents?',
        a: 'Signing up and browsing tutors is completely free. You only pay when you book a confirmed tutoring session or assignment help.',
      },
    ],
  },
  {
    category: 'Payments & Escrow',
    icon: CreditCard,
    questions: [
      {
        q: 'How does the escrow system work?',
        a: 'When you book a session, your payment is held securely in escrow. The tutor only receives the payment after you confirm the session was completed successfully. This protects both parties.',
      },
      {
        q: 'What payment methods are supported?',
        a: 'We primarily support Telebirr. Bank transfer and other mobile wallets may be available depending on your region.',
      },
      {
        q: 'How do I get a refund?',
        a: 'If you are unsatisfied with a session, you can raise a dispute within 48 hours of the session\'s end time. Our team will review the case and process a refund if eligible.',
      },
    ],
  },
  {
    category: 'Tutor Verification',
    icon: UserCheck,
    questions: [
      {
        q: 'What does "Verified Tutor" mean?',
        a: 'Verified Tutors have submitted valid academic documents (transcripts, certificates) that have been reviewed and approved by our admin team. This badge indicates their credentials are authentic.',
      },
      {
        q: 'How do I become a verified tutor?',
        a: 'Apply via the "Become a Tutor" page and upload your academic documents. Our team reviews applications within 2–3 business days.',
      },
      {
        q: 'What is a "Gold Tutor" badge?',
        a: 'The Gold Tutor badge is awarded to tutors who consistently maintain high ratings (4.8+), have completed a significant number of sessions, and demonstrate exceptional punctuality and reliability.',
      },
    ],
  },
  {
    category: 'Ratings & Quality',
    icon: Star,
    questions: [
      {
        q: 'How are tutors rated?',
        a: 'After each session or assignment, parents rate tutors on four criteria: knowledge/intelligence, punctuality, communication, and reliability. The overall rating is the average of these scores.',
      },
      {
        q: 'What happens if I receive a low rating?',
        a: 'Tutors who receive ratings below 3 stars are flagged for review. Our team may reach out to understand the situation and offer support. Repeated low ratings may result in account suspension.',
      },
    ],
  },
]

export const metadata = {
  title: 'Help Center – አጋዤ',
  description: 'Frequently asked questions and support for the አጋዤ tutoring platform.',
}

export default function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Help Center</h1>
          <p className="mb-8 text-muted-foreground">
            Frequently asked questions about using አጋዤ.
          </p>

          <div className="space-y-8">
            {faqs.map((section) => {
              const Icon = section.icon
              return (
                <div key={section.category}>
                  <div className="mb-3 flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">{section.category}</h2>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    {section.questions.map((item, i) => (
                      <AccordionItem key={i} value={`${section.category}-${i}`}>
                        <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )
            })}
          </div>

          {/* Still need help */}
          <Card className="mt-12">
            <CardContent className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Still have questions?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our support team is available Monday–Saturday, 9 AM – 6 PM EAT.
                </p>
              </div>
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
