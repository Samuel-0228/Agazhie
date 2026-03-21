'use client'

import { useState } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { MessageCircle, Mail, Phone, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all fields.')
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error || 'Failed to send message.')
      } else {
        toast.success('Message sent! We will get back to you soon.')
        setName('')
        setEmail('')
        setMessage('')
      }
    } catch {
      toast.error('An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Contact Us</h1>
          <p className="mb-8 text-muted-foreground">
            Have a question or need help? Reach out to the አጋዤ team.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact form */}
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  We typically respond within 24 hours on business days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="name">Your Name</FieldLabel>
                      <Input
                        id="name"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="email">Email Address</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="message">Message</FieldLabel>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </Field>
                  </FieldGroup>
                  <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
                    {isLoading ? 'Sending…' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Direct contact options */}
            <div className="flex flex-col gap-4">
              <Card>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Telegram</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      For the fastest response, message us on Telegram.
                    </p>
                    <a
                      href="https://t.me/agazhie"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary underline underline-offset-2"
                    >
                      @agazhie <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Send us an email and we&apos;ll respond within 24 hours.
                    </p>
                    <a
                      href="mailto:support@agazhie.com"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary underline underline-offset-2"
                    >
                      support@agazhie.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone / WhatsApp</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Available Monday–Saturday, 9 AM – 6 PM EAT.
                    </p>
                    <a
                      href="tel:+251911000000"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary underline underline-offset-2"
                    >
                      +251 911 000 000
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
