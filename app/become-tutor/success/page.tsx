import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, Home, Mail } from 'lucide-react'

export default function TutorSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center py-12">
        <div className="mx-auto max-w-md px-4 text-center">
          <Card>
            <CardContent className="pt-8 pb-8">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold">Application Received!</h1>
              <p className="mt-3 text-muted-foreground">
                Thank you for applying to become a tutor with አጋዤ. 
                Our team will review your application and get back to you within 48 hours.
              </p>

              <div className="mt-6 rounded-lg bg-muted/50 p-4 text-left">
                <h3 className="font-medium">Next Steps</h3>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>1. Application review (1-2 days)</li>
                  <li>2. Short phone interview</li>
                  <li>3. Profile verification</li>
                  <li>4. Start tutoring!</li>
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>Check your email for confirmation</span>
              </div>

              <div className="mt-8">
                <Button asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
