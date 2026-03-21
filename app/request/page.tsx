'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FieldGroup, Field, FieldLabel, FieldSet, FieldLegend } from '@/components/ui/field'
import { toast } from 'sonner'
import { CheckCircle2, ArrowLeft, ArrowRight, Send, UserPlus } from 'lucide-react'
import Link from 'next/link'

const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Amharic',
  'History',
  'Geography',
  'Economics',
  'ICT',
]

const gradeLevels = [
  { value: '1', label: 'Grade 1' },
  { value: '2', label: 'Grade 2' },
  { value: '3', label: 'Grade 3' },
  { value: '4', label: 'Grade 4' },
  { value: '5', label: 'Grade 5' },
  { value: '6', label: 'Grade 6' },
  { value: '7', label: 'Grade 7' },
  { value: '8', label: 'Grade 8' },
  { value: '9', label: 'Grade 9' },
  { value: '10', label: 'Grade 10' },
  { value: '11', label: 'Grade 11' },
  { value: '12', label: 'Grade 12' },
  { value: 'freshman', label: 'Freshman' },
]

const sessionTypes = [
  { value: 'in-person', label: 'In-Person (at my home)' },
  { value: 'online', label: 'Online' },
  { value: 'both', label: 'Either works' },
]

const frequencies = [
  { value: '1', label: '1 session per week' },
  { value: '2', label: '2 sessions per week' },
  { value: '3', label: '3 sessions per week' },
  { value: 'more', label: 'More than 3 per week' },
]

const paymentDurations = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Biweekly (every 2 weeks)' },
  { value: 'monthly', label: 'Monthly' },
]

const scheduleOptions = [
  { value: 'morning', label: 'Morning (6AM–12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM–5PM)' },
  { value: 'evening', label: 'Evening (5PM–9PM)' },
  { value: 'weekend', label: 'Weekends only' },
  { value: 'flexible', label: 'Flexible' },
]

// Tutor names lookup (normally fetched from DB)
const tutorNames: Record<string, string> = {
  '1': 'Abebe Kebede',
  '2': 'Sara Tesfaye',
  '3': 'Dawit Mulugeta',
  '4': 'Hanna Girma',
  '5': 'Yonas Bekele',
  '6': 'Meron Alemu',
}

function buildTelegramMessage(data: {
  parentName: string
  studentName: string
  gradeLevel: string
  selectedSubjects: string[]
  schedule: string
  budget: string
  paymentDuration: string
  sessionType: string
  frequency: string
  location: string
  additionalNotes: string
  preferredTutorId?: string
}) {
  const gradeLabel = gradeLevels.find(g => g.value === data.gradeLevel)?.label || data.gradeLevel
  const scheduleLabel = scheduleOptions.find(s => s.value === data.schedule)?.label || data.schedule
  const paymentLabel = paymentDurations.find(p => p.value === data.paymentDuration)?.label || data.paymentDuration
  const sessionLabel = sessionTypes.find(s => s.value === data.sessionType)?.label || data.sessionType
  const freqLabel = frequencies.find(f => f.value === data.frequency)?.label || data.frequency
  const preferredTutor = data.preferredTutorId ? tutorNames[data.preferredTutorId] : null

  const lines = [
    `Hi አጋዤ, I'm looking for a tutor:`,
    `Parent: ${data.parentName}`,
    `Student: ${data.studentName}`,
    `Grade: ${gradeLabel}`,
    `Subject(s): ${data.selectedSubjects.join(', ')}`,
    `Schedule: ${scheduleLabel}`,
    `Budget: ${data.budget} ETB/hr`,
    `Payment: ${paymentLabel}`,
    `Session: ${sessionLabel}`,
    `Frequency: ${freqLabel}`,
  ]
  if (data.sessionType === 'in-person' && data.location) {
    lines.push(`Location: ${data.location}`)
  }
  if (preferredTutor) {
    lines.push(`Preferred Tutor: ${preferredTutor}`)
  }
  if (data.additionalNotes) {
    lines.push(`Notes: ${data.additionalNotes}`)
  }
  return lines.join('\n')
}

function RequestFormContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tutorId = searchParams.get('tutor') || undefined

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    studentName: '',
    gradeLevel: '',
    selectedSubjects: [] as string[],
    sessionType: '',
    frequency: '',
    schedule: '',
    budget: '',
    paymentDuration: '',
    location: '',
    additionalNotes: '',
  })

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSubjects: prev.selectedSubjects.includes(subject)
        ? prev.selectedSubjects.filter(s => s !== subject)
        : [...prev.selectedSubjects, subject],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: formData.parentName,
          email: formData.email,
          phone: formData.phone,
          studentName: formData.studentName,
          gradeLevel: formData.gradeLevel,
          subjects: formData.selectedSubjects,
          sessionType: formData.sessionType,
          frequency: formData.frequency,
          location: formData.location,
          notes: formData.additionalNotes,
          preferredTutorId: tutorId,
        }),
      })
      // Accept both 201 (DB insert) and non-200 gracefully — we still show the
      // Telegram draft so the user can always complete their request.
      if (!res.ok && res.status !== 201) {
        const data = await res.json().catch(() => ({}))
        console.warn('[Request form] API error (non-fatal):', data.error)
      }
    } catch (err) {
      // Network error — log only; we still show Telegram option below
      console.warn('[Request form] Fetch error (non-fatal):', err)
    } finally {
      setIsSubmitting(false)
      setSubmitted(true)
    }
  }

  const telegramMessage = buildTelegramMessage({ ...formData, preferredTutorId: tutorId })
  const telegramLink = `https://t.me/agazhie?text=${encodeURIComponent(telegramMessage)}`

  const canProceedStep1 = formData.parentName && formData.phone
  const canProceedStep2 = formData.studentName && formData.gradeLevel && formData.selectedSubjects.length > 0
  const canProceedStep3 = formData.sessionType && formData.frequency && formData.schedule
  const canSubmit = formData.budget && formData.paymentDuration

  // Post-submit options screen
  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Request Ready!</CardTitle>
            <CardDescription>
              Your request has been prepared. Choose how you'd like to proceed.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Option A: Telegram */}
            <div className="rounded-xl border border-border bg-muted/30 p-5">
              <div className="mb-3">
                <h3 className="font-semibold">Option A: Contact via Telegram</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Opens Telegram to @agazhie with your request pre-filled. Review the
                  message and tap <strong>Send</strong> yourself — no automatic sending.
                </p>
              </div>
              <div className="mb-4 rounded-lg bg-background p-3 text-xs font-mono text-muted-foreground whitespace-pre-wrap border border-border">
                {telegramMessage}
              </div>
              <Button asChild className="w-full gap-2">
                <a href={telegramLink} target="_blank" rel="noopener noreferrer">
                  <Send className="h-4 w-4" />
                  Open Telegram Draft
                </a>
              </Button>
            </div>

            {/* Option B: Create Account */}
            <div className="rounded-xl border border-border bg-muted/30 p-5">
              <div className="mb-3">
                <h3 className="font-semibold">Option B: Create an Account</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Save your request and preferences so you don't have to refill the form
                  next time. Your data is securely stored.
                </p>
              </div>
              <Button variant="outline" className="w-full gap-2" asChild>
                <Link href={`/auth/register?redirect=/request/success`}>
                  <UserPlus className="h-4 w-4" />
                  Create Account (Optional)
                </Link>
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              You can also{' '}
              <Link href="/" className="underline underline-offset-2">
                skip both and return home
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${
                  step >= s
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
              </div>
              {s < 4 && (
                <div
                  className={`h-1 w-10 sm:w-16 ${step > s ? 'bg-primary' : 'bg-muted'}`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>Your Info</span>
          <span>Student</span>
          <span>Schedule</span>
          <span>Budget</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && 'Parent Information'}
            {step === 2 && 'Student Details'}
            {step === 3 && 'Session Preferences'}
            {step === 4 && 'Budget & Payment'}
          </CardTitle>
          <CardDescription>
            {step === 1 && 'Tell us how we can contact you'}
            {step === 2 && 'Tell us about your child and their tutoring needs'}
            {step === 3 && 'Choose your preferred schedule and session type'}
            {step === 4 && 'Set your hourly budget and payment duration'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="parentName">Full Name</FieldLabel>
                  <Input
                    id="parentName"
                    placeholder="Enter your full name"
                    value={formData.parentName}
                    onChange={(e) => setFormData(prev => ({ ...prev, parentName: e.target.value }))}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+251 9XX XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email Address (Optional)</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </Field>
              </FieldGroup>
            )}

            {step === 2 && (
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="studentName">{"Student's Name"}</FieldLabel>
                  <Input
                    id="studentName"
                    placeholder="Enter student's name"
                    value={formData.studentName}
                    onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="gradeLevel">Grade Level</FieldLabel>
                  <Select
                    value={formData.gradeLevel}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, gradeLevel: value }))}
                  >
                    <SelectTrigger id="gradeLevel">
                      <SelectValue placeholder="Select grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradeLevels.map((grade) => (
                        <SelectItem key={grade.value} value={grade.value}>
                          {grade.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <FieldSet>
                  <FieldLegend>Subjects Needed</FieldLegend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {subjects.map((subject) => (
                      <Badge
                        key={subject}
                        variant={formData.selectedSubjects.includes(subject) ? 'default' : 'outline'}
                        className="cursor-pointer transition-colors"
                        onClick={() => handleSubjectToggle(subject)}
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </FieldSet>
              </FieldGroup>
            )}

            {step === 3 && (
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="schedule">Preferred Schedule</FieldLabel>
                  <Select
                    value={formData.schedule}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, schedule: value }))}
                  >
                    <SelectTrigger id="schedule">
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      {scheduleOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="sessionType">Session Type</FieldLabel>
                  <Select
                    value={formData.sessionType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, sessionType: value }))}
                  >
                    <SelectTrigger id="sessionType">
                      <SelectValue placeholder="Select session type" />
                    </SelectTrigger>
                    <SelectContent>
                      {sessionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="frequency">Session Frequency</FieldLabel>
                  <Select
                    value={formData.frequency}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}
                  >
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="How often?" />
                    </SelectTrigger>
                    <SelectContent>
                      {frequencies.map((freq) => (
                        <SelectItem key={freq.value} value={freq.value}>
                          {freq.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                {formData.sessionType === 'in-person' && (
                  <Field>
                    <FieldLabel htmlFor="location">Location / Neighborhood</FieldLabel>
                    <Input
                      id="location"
                      placeholder="e.g., Bole, Kazanchis, CMC"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </Field>
                )}
              </FieldGroup>
            )}

            {step === 4 && (
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="budget">Budget / Hourly Rate (ETB)</FieldLabel>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="e.g., 300"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    min={0}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="paymentDuration">Payment Duration</FieldLabel>
                  <Select
                    value={formData.paymentDuration}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, paymentDuration: value }))}
                  >
                    <SelectTrigger id="paymentDuration">
                      <SelectValue placeholder="Select payment cycle" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentDurations.map((dur) => (
                        <SelectItem key={dur.value} value={dur.value}>
                          {dur.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="notes">Additional Notes / Preferences (Optional)</FieldLabel>
                  <Textarea
                    id="notes"
                    placeholder="Any specific requirements, learning goals, or information about your child..."
                    rows={4}
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                  />
                </Field>
              </FieldGroup>
            )}

            <div className="mt-6 flex justify-between">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <Button type="button" variant="outline" asChild>
                  <Link href={tutorId ? `/tutors/${tutorId}` : '/tutors'}>
                    Cancel
                  </Link>
                </Button>
              )}

              {step < 4 ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && !canProceedStep1) ||
                    (step === 2 && !canProceedStep2) ||
                    (step === 3 && !canProceedStep3)
                  }
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? 'Preparing...' : 'Submit Request'}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function RequestPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Request a Tutor</h1>
            <p className="mt-2 text-muted-foreground">
              Fill out this form and connect with the best tutor for your needs — no account required.
            </p>
          </div>
          <Suspense fallback={<div className="flex justify-center py-8">Loading...</div>}>
            <RequestFormContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
