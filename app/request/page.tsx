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
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FieldGroup, Field, FieldLabel, FieldSet, FieldLegend } from '@/components/ui/field'
import { toast } from 'sonner'
import { CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react'
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
  { value: '9', label: 'Grade 9' },
  { value: '10', label: 'Grade 10' },
  { value: '11', label: 'Grade 11' },
  { value: '12', label: 'Grade 12' },
  { value: 'university', label: 'University' },
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

function RequestFormContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tutorId = searchParams.get('tutor')
  
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    studentName: '',
    gradeLevel: '',
    selectedSubjects: [] as string[],
    sessionType: '',
    frequency: '',
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

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    toast.success('Request submitted successfully!', {
      description: 'We will contact you within 24 hours to confirm your tutor match.',
    })

    setIsSubmitting(false)
    router.push('/request/success')
  }

  const canProceedStep1 = formData.parentName && formData.phone && formData.email
  const canProceedStep2 = formData.studentName && formData.gradeLevel && formData.selectedSubjects.length > 0
  const canSubmit = formData.sessionType && formData.frequency

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
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
                <Field>
                  <FieldLabel htmlFor="email">Email Address</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
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
              Fill out this form and we will match you with the best tutor for your needs.
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
