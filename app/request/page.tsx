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
import { CheckCircle2, ArrowLeft, ArrowRight, Send, MessageCircle } from 'lucide-react'
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
  { value: 'freshman', label: 'Freshman (University Year 1)' },
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

const gradeLabel = (value: string) => {
  const g = gradeLevels.find(g => g.value === value)
  return g ? g.label : value
}

function buildTelegramMessage(data: {
  parentName: string
  studentName: string
  gradeLevel: string
  selectedSubjects: string[]
  budget: string
  sessionType: string
  frequency: string
  paymentDuration: string
  location: string
  additionalNotes: string
  preferredTutor: string
}) {
  const lines = [
    `Hi አጋዤ, I'm looking for a tutor:`,
    `Subject: ${data.selectedSubjects.join(', ')}`,
    `Grade: ${gradeLabel(data.gradeLevel)}`,
    `Budget: ${data.budget} ETB/hr`,
    `Payment: ${data.paymentDuration}`,
    `Schedule: ${data.sessionType} — ${data.frequency} session(s)/week`,
  ]
  if (data.preferredTutor) lines.push(`Preferred Tutor: ${data.preferredTutor}`)
  if (data.location) lines.push(`Location: ${data.location}`)
  if (data.additionalNotes) lines.push(`Notes: ${data.additionalNotes}`)
  lines.push(`Parent: ${data.parentName}`)
  return lines.join('\n')
}

function RequestFormContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tutorId = searchParams.get('tutor')
  const tutorName = searchParams.get('tutorName') || ''
  
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [telegramUrl, setTelegramUrl] = useState('')
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    studentName: '',
    gradeLevel: '',
    selectedSubjects: [] as string[],
    sessionType: '',
    frequency: '',
    paymentDuration: '',
    budget: '',
    location: '',
    additionalNotes: '',
    preferredTutor: tutorName,
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

    const message = buildTelegramMessage(formData)
    const url = `https://t.me/agazhie?text=${encodeURIComponent(message)}`
    setTelegramUrl(url)
    setSubmitted(true)

    toast.success('Request ready!', {
      description: 'Click the Telegram button below to send your request directly to @agazhie.',
    })
  }

  const canProceedStep1 = formData.parentName && formData.phone
  const canProceedStep2 = formData.studentName && formData.gradeLevel && formData.selectedSubjects.length > 0
  const canSubmit = formData.sessionType && formData.frequency && formData.budget && formData.paymentDuration

  if (submitted && telegramUrl) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-sm bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Request Ready!</CardTitle>
            <CardDescription>
              Your tutor request has been prepared. Click the button below to send it directly
              to <strong>@agazhie</strong> on Telegram. You can review or edit the message before sending.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="rounded-sm border border-border bg-muted/50 p-4">
              <p className="mb-2 text-sm font-medium text-muted-foreground">Preview message:</p>
              <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                {decodeURIComponent(telegramUrl.split('?text=')[1] || '')}
              </pre>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                className="w-full gap-2 bg-[#0088cc] hover:bg-[#0077bb] text-white"
                onClick={() => window.open(telegramUrl, '_blank')}
              >
                <MessageCircle className="h-5 w-5" />
                Contact via Telegram
                <Send className="h-4 w-4" />
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Opens Telegram with your request pre-filled. You control what you send.
              </p>
            </div>

            <div className="rounded-sm border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
              <h3 className="font-medium text-sm text-blue-900 dark:text-blue-200">What happens next?</h3>
              <ol className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-300 list-decimal list-inside">
                <li>Telegram opens with your pre-filled request message</li>
                <li>Review or edit the message as you like</li>
                <li>Click <strong>Send</strong> to contact @agazhie directly</li>
                <li>The admin will match you with the best tutor within 24 hours</li>
              </ol>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => {
                setSubmitted(false)
                setStep(1)
                setFormData(prev => ({ ...prev, parentName: '', phone: '', studentName: '', gradeLevel: '', selectedSubjects: [], sessionType: '', frequency: '', paymentDuration: '', budget: '', location: '', additionalNotes: '', preferredTutor: '' }))
              }}>
                Start a New Request
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link href="/tutors">Browse Tutors</Link>
              </Button>
            </div>
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
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-sm text-sm font-medium ${
                  step >= s
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`h-1 w-16 sm:w-24 ${
                    step > s ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>Your Info</span>
          <span>Student Details</span>
          <span>Preferences</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && 'Parent Information'}
            {step === 2 && 'Student Details'}
            {step === 3 && 'Session Preferences'}
          </CardTitle>
          <CardDescription>
            {step === 1 && 'Tell us how we can contact you'}
            {step === 2 && 'Tell us about your child and their tutoring needs'}
            {step === 3 && 'Choose your preferred tutoring arrangement'}
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
                {tutorId && (
                  <Field>
                    <FieldLabel htmlFor="preferredTutor">Preferred Tutor (Optional)</FieldLabel>
                    <Input
                      id="preferredTutor"
                      placeholder="Tutor name"
                      value={formData.preferredTutor}
                      onChange={(e) => setFormData(prev => ({ ...prev, preferredTutor: e.target.value }))}
                    />
                  </Field>
                )}
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
                <Field>
                  <FieldLabel htmlFor="budget">Budget (ETB per hour)</FieldLabel>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="e.g., 300"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    required
                  />
                  <p className="mt-1 text-xs text-muted-foreground">Typical range: 200–500 ETB/hr</p>
                </Field>
                <Field>
                  <FieldLabel htmlFor="paymentDuration">Payment Duration</FieldLabel>
                  <Select
                    value={formData.paymentDuration}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, paymentDuration: value }))}
                  >
                    <SelectTrigger id="paymentDuration">
                      <SelectValue placeholder="How will you pay?" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentDurations.map((pd) => (
                        <SelectItem key={pd.value} value={pd.value}>
                          {pd.label}
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
                <Field>
                  <FieldLabel htmlFor="notes">Additional Notes (Optional)</FieldLabel>
                  <Textarea
                    id="notes"
                    placeholder="Any specific requirements or information about your child's learning needs..."
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
              
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={!canSubmit}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Prepare Telegram Request
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
              Fill out this form and connect with the admin via Telegram to get matched with the best tutor.
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
