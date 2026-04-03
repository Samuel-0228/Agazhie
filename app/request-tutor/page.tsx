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
import { CheckCircle2, ArrowLeft, ArrowRight, Send, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { submitParentRequest } from './actions'
import { generateBunaBotDeepLink } from '@/lib/telegram-format'

const subjects = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English',
  'Amharic', 'History', 'Geography', 'Economics', 'ICT',
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

function RequestFormContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tutorId = searchParams.get('tutor')
  
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState<{ url: string, jobCode: string } | null>(null)
  
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
      const res = await submitParentRequest(formData);
      
      if (res.success && res.jobCode) {
        const url = generateBunaBotDeepLink({
          jobCode: res.jobCode,
          parentName: formData.parentName,
          phone: formData.phone,
          subject: formData.selectedSubjects.join(', '),
          grade: formData.gradeLevel,
          schedule: `${formData.sessionType} - ${formData.frequency}`,
          location: formData.location || 'Online',
          notes: formData.additionalNotes || '',
        })
        setSubmittedData({ url, jobCode: res.jobCode });
      } else {
        toast.error('Failed to submit try again.');
      }
    } catch(err) {
      toast.error('An error occurred.');
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceedStep1 = formData.parentName && formData.phone
  const canProceedStep2 = formData.studentName && formData.gradeLevel && formData.selectedSubjects.length > 0
  const canSubmit = formData.sessionType && formData.frequency && formData.budget && formData.paymentDuration

  if (submittedData) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card className="border-green-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-sm bg-green-100 dark:bg-green-900">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl text-green-700 dark:text-green-400">Request Successfully Received!</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 text-center">
            <p className="text-lg font-medium text-slate-800 dark:text-slate-200">
              Your request has been successfully recieved. We will review and contact you on your provided telegram account shortly.
            </p>
            
            <div className="flex flex-col items-center rounded-sm border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/30">
              <p className="mb-4 text-sm font-semibold text-blue-900 dark:text-blue-100">
                If you want a very fast response, click the button below to send this request to the Telegram bot:
              </p>
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 bg-[#0088cc] hover:bg-[#0077bb] text-white"
                onClick={() => window.open(submittedData.url, '_blank')}
              >
                Send to Telegram
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-sm text-slate-500 mt-4">
              Reference Code: <span className="font-mono font-bold">{submittedData.jobCode}</span>
            </div>

            <div className="flex justify-center pt-4">
              <Button variant="outline" onClick={() => router.push('/')}>
                Back to Home
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
            {step === 2 && 'Tell us about your child'}
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
                  <FieldLabel htmlFor="phone">Phone Number (or Telegram User)</FieldLabel>
                  <Input
                    id="phone"
                    placeholder="+251 9XX XXX XXXX or @username"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
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
                         <SelectItem key={grade.value} value={grade.label}>{grade.label}</SelectItem>
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
                        <SelectItem key={type.value} value={type.label}>{type.label}</SelectItem>
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
                        <SelectItem key={freq.value} value={freq.label}>{freq.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="budget">Budget (ETB per hour)</FieldLabel>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
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
                      <SelectValue placeholder="How will you pay?" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentDurations.map((pd) => (
                        <SelectItem key={pd.value} value={pd.label}>{pd.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                {formData.sessionType.includes('In-Person') && (
                  <Field>
                    <FieldLabel htmlFor="location">Location / Neighborhood</FieldLabel>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </Field>
                )}
                <Field>
                  <FieldLabel htmlFor="notes">Additional Notes</FieldLabel>
                  <Textarea
                    id="notes"
                    rows={3}
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                  />
                </Field>
              </FieldGroup>
            )}

            <div className="mt-6 flex justify-between">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              ) : (
                <Button type="button" variant="outline" asChild>
                  <Link href="/">Cancel</Link>
                </Button>
              )}
              
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  Submit Request
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
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight">Request a Tutor</h1>
          </div>
          <Suspense fallback={<div className="flex justify-center py-8">Loading form...</div>}>
            <RequestFormContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
