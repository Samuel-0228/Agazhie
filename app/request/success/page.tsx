import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, Home, Search } from 'lucide-react'

export default function RequestSuccessPage() {
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
              
              <h1 className="text-2xl font-bold">Request Submitted!</h1>
              <p className="mt-3 text-muted-foreground">
                Thank you for your tutor request. Our team will review your requirements 
                and contact you within 24 hours with the best tutor matches.
              </p>

              <div className="mt-6 rounded-lg bg-muted/50 p-4 text-left">
                <h3 className="font-medium">What happens next?</h3>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>1. We review your requirements</li>
                  <li>2. Match you with qualified tutors</li>
                  <li>3. Call you to discuss options</li>
                  <li>4. Schedule your first session</li>
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/tutors">
                    <Search className="mr-2 h-4 w-4" />
                    Browse Tutors
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
