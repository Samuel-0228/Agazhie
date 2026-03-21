'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Clock, DollarSign, GraduationCap, ArrowLeft, Send } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

const sampleJobs: Record<string, {
  id: string; subject: string; gradeLevel: string; location: string; sessionType: string;
  frequency: string; budget: number; description: string; goal: string; postedAt: string;
  status: string; anonymous: string;
}> = {
  '1': {
    id: '1', subject: 'Mathematics', gradeLevel: 'Grade 10', location: 'Bole, Addis Ababa',
    sessionType: 'In-Person', frequency: '3 sessions/week', budget: 350,
    description: 'Need a patient Math tutor for my daughter who is preparing for her Grade 10 national exam. Focus on algebra and geometry. Preferred tutor should have experience with national exam preparation and be able to work with a student who needs extra encouragement.',
    goal: 'National exam prep', postedAt: '2 hours ago', status: 'open', anonymous: 'Parent in Bole',
  },
  '2': {
    id: '2', subject: 'English', gradeLevel: 'Grade 8', location: 'Online',
    sessionType: 'Online', frequency: '2 sessions/week', budget: 250,
    description: 'Looking for an English tutor for my son to improve his reading and writing skills. Online sessions preferred. The student has basic grammar but struggles with essay writing.',
    goal: 'Improve language skills', postedAt: '5 hours ago', status: 'open', anonymous: 'Parent in Kirkos',
  },
}

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const job = sampleJobs[id] || sampleJobs['1']
  const [message, setMessage] = useState('')
  const [isApplying, setIsApplying] = useState(false)

  const handleApply = async () => {
    if (!message.trim()) {
      toast.error('Please write a message to apply.')
      return
    }
    setIsApplying(true)
    await new Promise(r => setTimeout(r, 1000))
    setIsApplying(false)
    toast.success('Application sent! The parent will be notified.')
    setMessage('')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" className="mb-6 gap-2" asChild>
            <Link href="/jobs">
              <ArrowLeft className="h-4 w-4" />
              Back to Jobs
            </Link>
          </Button>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">{job.subject} Tutor Needed</CardTitle>
                      <p className="mt-1 text-muted-foreground">{job.gradeLevel} • Posted {job.postedAt}</p>
                    </div>
                    <Badge variant={job.status === 'open' ? 'default' : 'secondary'} className="capitalize">
                      {job.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed">{job.description}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0 text-primary" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 shrink-0 text-primary" />
                      <span>{job.frequency}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4 shrink-0 text-primary" />
                      <span>{job.budget} ETB/hr</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GraduationCap className="h-4 w-4 shrink-0 text-primary" />
                      <span>Goal: {job.goal}</span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-sm">
                    <p className="font-medium">Posted by: {job.anonymous}</p>
                    <p className="text-muted-foreground text-xs mt-1">Parent identity is anonymized until you are matched.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Apply for this Job</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Introduce yourself and explain why you are a great fit for this tutoring request.
                  </p>
                  <Textarea
                    placeholder="Hi, I am [your name] and I specialize in [subject]. I have [X years] of experience teaching Grade [level] students..."
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button className="w-full gap-2" onClick={handleApply} disabled={isApplying}>
                    <Send className="h-4 w-4" />
                    {isApplying ? 'Sending...' : 'Send Application'}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    You must be logged in to apply.{' '}
                    <Link href="/auth/login" className="underline underline-offset-2">Log in</Link>
                  </p>
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
