'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
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
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Users,
  DollarSign,
  Clock,
  Upload,
  Plus,
  Trash2,
} from 'lucide-react'
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

const universities = [
  'Addis Ababa University',
  'AAiT',
  'Bahir Dar University',
  'Hawassa University',
  'Jimma University',
  'Mekelle University',
  'Other',
]

const specializations = [
  { value: 'euee', label: 'EUEE Preparation', badge: 'EUEE Expert' },
  { value: 'sat', label: 'SAT Preparation', badge: 'SAT Specialist' },
  { value: 'ielts', label: 'IELTS/TOEFL', badge: 'IELTS/TOEFL Specialist' },
  { value: 'none', label: 'General Tutoring', badge: null },
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

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Earnings',
    description: 'Set your own rates and earn 250–500 ETB per hour',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Choose when and where you want to teach',
  },
  {
    icon: Users,
    title: 'Build Experience',
    description: 'Gain valuable teaching experience while studying',
  },
  {
    icon: GraduationCap,
    title: 'Make an Impact',
    description: 'Help students achieve their academic goals',
  },
]

interface BadgeApplication {
  type: string
  file: File | null
  fileName: string
}

interface FormData {
  fullName: string
  phone: string
  email: string
  university: string
  otherUniversity: string
  yearOfStudy: string
  major: string
  selectedSubjects: string[]
  gradeLevels: string[]
  specialization: string
  hourlyRate: string
  availability: string
  bio: string
  transcriptFile: File | null
  transcriptFileName: string
  eueeFile: File | null
  eueeFileName: string
  applyForBadge: boolean
  badgeApplications: BadgeApplication[]
}

function FileUploadField({
  label,
  hint,
  fileName,
  onFileChange,
  required,
}: {
  label: string
  hint?: string
  fileName: string
  onFileChange: (file: File | null, name: string) => void
  required?: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <Field>
      <FieldLabel>
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </FieldLabel>
      {hint && <p className="mb-1 text-xs text-muted-foreground">{hint}</p>}
      <div
        className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-border bg-muted/30 p-4 transition-colors hover:border-primary/50"
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="h-5 w-5 shrink-0 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {fileName || 'Click to upload (PDF or image)'}
        </span>
        {fileName && <CheckCircle2 className="ml-auto h-4 w-4 text-primary" />}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null
          onFileChange(file, file?.name ?? '')
        }}
      />
    </Field>
  )
}

export default function BecomeTutorPage() {
  const router = useRouter()
  const [step, setStep] = useState(0) // 0 = info, 1–5 = form steps
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    university: '',
    otherUniversity: '',
    yearOfStudy: '',
    major: '',
    selectedSubjects: [],
    gradeLevels: [],
    specialization: '',
    hourlyRate: '',
    availability: '',
    bio: '',
    transcriptFile: null,
    transcriptFileName: '',
    eueeFile: null,
    eueeFileName: '',
    applyForBadge: false,
    badgeApplications: [],
  })

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSubjects: prev.selectedSubjects.includes(subject)
        ? prev.selectedSubjects.filter(s => s !== subject)
        : [...prev.selectedSubjects, subject],
    }))
  }

  const handleGradeToggle = (grade: string) => {
    setFormData(prev => ({
      ...prev,
      gradeLevels: prev.gradeLevels.includes(grade)
        ? prev.gradeLevels.filter(g => g !== grade)
        : [...prev.gradeLevels, grade],
    }))
  }

  const addBadgeApplication = () => {
    setFormData(prev => ({
      ...prev,
      badgeApplications: [
        ...prev.badgeApplications,
        { type: '', file: null, fileName: '' },
      ],
    }))
  }

  const removeBadgeApplication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      badgeApplications: prev.badgeApplications.filter((_, i) => i !== index),
    }))
  }

  const updateBadgeApplication = (index: number, updates: Partial<BadgeApplication>) => {
    setFormData(prev => ({
      ...prev,
      badgeApplications: prev.badgeApplications.map((b, i) =>
        i === index ? { ...b, ...updates } : b
      ),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.transcriptFile) {
      toast.error('Please upload your Grade 12 transcript.')
      return
    }
    if (!formData.eueeFile) {
      toast.error('Please upload your EUEE result.')
      return
    }
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success('Application submitted!', {
      description: 'We will review your application within 1–2 business days.',
    })
    setIsSubmitting(false)
    router.push('/become-tutor/success')
  }

  const totalSteps = 5
  const canProceedStep1 = formData.fullName && formData.phone && formData.email
  const canProceedStep2 =
    formData.university &&
    formData.yearOfStudy &&
    formData.major &&
    (formData.university !== 'Other' || formData.otherUniversity)
  const canProceedStep3 =
    formData.selectedSubjects.length > 0 && formData.gradeLevels.length > 0 && formData.specialization
  const canProceedStep4 = formData.transcriptFile && formData.eueeFile
  const canSubmit = formData.hourlyRate && formData.availability && formData.bio

  // Info / landing step
  if (step === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4">Now Accepting Applications</Badge>
              <h1 className="text-4xl font-bold tracking-tight">Become a Tutor</h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Share your knowledge, earn money, and help students across Ethiopia achieve their
                academic goals.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 mb-12">
              {benefits.map((b) => (
                <Card key={b.title}>
                  <CardContent className="pt-6 flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <b.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{b.title}</p>
                      <p className="text-sm text-muted-foreground">{b.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-6 mb-8">
              <h2 className="font-semibold mb-2">Requirements</h2>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>Currently enrolled in university (any year)</li>
                <li>Grade 12 transcript (mandatory upload)</li>
                <li>EUEE result document (mandatory upload)</li>
                <li>Strong academic performance in chosen subjects</li>
                <li>Commitment to at least 2 sessions per week</li>
              </ul>
            </div>

            <div className="text-center">
              <Button size="lg" onClick={() => setStep(1)}>
                Start Application
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium ${
                      step >= s
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
                  </div>
                  {s < totalSteps && (
                    <div className={`h-1 w-8 sm:w-12 ${step > s ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Personal</span>
              <span>Academic</span>
              <span>Teaching</span>
              <span>Documents</span>
              <span>Profile</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && 'Personal Information'}
                {step === 2 && 'Academic Background'}
                {step === 3 && 'Teaching Preferences'}
                {step === 4 && 'Required Documents'}
                {step === 5 && 'Profile & Rates'}
              </CardTitle>
              <CardDescription>
                {step === 1 && 'Basic contact information'}
                {step === 2 && 'Tell us about your university and studies'}
                {step === 3 && 'Subjects, grades, and specialization'}
                {step === 4 && 'Upload your transcript and EUEE result (required)'}
                {step === 5 && 'Set your rate and write your profile bio'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Info */}
                {step === 1 && (
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
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

                {/* Step 2: Academic Background */}
                {step === 2 && (
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="university">University</FieldLabel>
                      <Select
                        value={formData.university}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, university: value }))}
                      >
                        <SelectTrigger id="university">
                          <SelectValue placeholder="Select your university" />
                        </SelectTrigger>
                        <SelectContent>
                          {universities.map((uni) => (
                            <SelectItem key={uni} value={uni}>
                              {uni}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    {formData.university === 'Other' && (
                      <Field>
                        <FieldLabel htmlFor="otherUniversity">University Name</FieldLabel>
                        <Input
                          id="otherUniversity"
                          placeholder="Enter your university name"
                          value={formData.otherUniversity}
                          onChange={(e) => setFormData(prev => ({ ...prev, otherUniversity: e.target.value }))}
                          required
                        />
                      </Field>
                    )}
                    <Field>
                      <FieldLabel htmlFor="yearOfStudy">Year of Study</FieldLabel>
                      <Select
                        value={formData.yearOfStudy}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, yearOfStudy: value }))}
                      >
                        <SelectTrigger id="yearOfStudy">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', 'Graduate'].map(y => (
                            <SelectItem key={y} value={y}>{y}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="major">Major / Field of Study</FieldLabel>
                      <Input
                        id="major"
                        placeholder="e.g., Physics, Computer Science"
                        value={formData.major}
                        onChange={(e) => setFormData(prev => ({ ...prev, major: e.target.value }))}
                        required
                      />
                    </Field>
                  </FieldGroup>
                )}

                {/* Step 3: Teaching Preferences */}
                {step === 3 && (
                  <FieldGroup>
                    <FieldSet>
                      <FieldLegend>Subjects You Can Teach</FieldLegend>
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
                    <FieldSet>
                      <FieldLegend>Grade Levels You Can Teach</FieldLegend>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {gradeLevels.map((grade) => (
                          <Badge
                            key={grade.value}
                            variant={formData.gradeLevels.includes(grade.value) ? 'default' : 'outline'}
                            className="cursor-pointer transition-colors"
                            onClick={() => handleGradeToggle(grade.value)}
                          >
                            {grade.label}
                          </Badge>
                        ))}
                      </div>
                    </FieldSet>
                    <Field>
                      <FieldLabel htmlFor="specialization">Primary Specialization</FieldLabel>
                      <Select
                        value={formData.specialization}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, specialization: value }))}
                      >
                        <SelectTrigger id="specialization">
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          {specializations.map((spec) => (
                            <SelectItem key={spec.value} value={spec.value}>
                              {spec.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </FieldGroup>
                )}

                {/* Step 4: Required Documents + Optional Badges */}
                {step === 4 && (
                  <FieldGroup>
                    <div className="rounded-lg bg-muted/50 border border-border p-3 text-sm text-muted-foreground">
                      These documents are required for all applicants. They are reviewed by admin and kept confidential.
                    </div>

                    <FileUploadField
                      label="Grade 12 Transcript"
                      hint="Upload your official Grade 12 transcript (PDF or image)"
                      fileName={formData.transcriptFileName}
                      onFileChange={(file, name) =>
                        setFormData(prev => ({ ...prev, transcriptFile: file, transcriptFileName: name }))
                      }
                      required
                    />

                    <FileUploadField
                      label="EUEE Result"
                      hint="Upload your EUEE result certificate or score sheet (PDF or image)"
                      fileName={formData.eueeFileName}
                      onFileChange={(file, name) =>
                        setFormData(prev => ({ ...prev, eueeFile: file, eueeFileName: name }))
                      }
                      required
                    />

                    {/* Optional Badge Applications */}
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="applyForBadge"
                          checked={formData.applyForBadge}
                          onCheckedChange={(checked) => {
                            setFormData(prev => ({
                              ...prev,
                              applyForBadge: !!checked,
                              badgeApplications:
                                checked && prev.badgeApplications.length === 0
                                  ? [{ type: '', file: null, fileName: '' }]
                                  : prev.badgeApplications,
                            }))
                          }}
                        />
                        <label
                          htmlFor="applyForBadge"
                          className="text-sm font-medium cursor-pointer"
                        >
                          Apply for an optional badge (e.g., SAT Specialist, EUEE Expert)
                        </label>
                      </div>

                      {formData.applyForBadge && (
                        <div className="mt-4 flex flex-col gap-4">
                          <p className="text-xs text-muted-foreground">
                            Upload supporting documents for each badge you are applying for.
                            Admin will review and approve if criteria are met.
                          </p>
                          {formData.badgeApplications.map((badge, index) => (
                            <div
                              key={index}
                              className="rounded-lg border border-border p-4 flex flex-col gap-3"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Badge #{index + 1}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeBadgeApplication(index)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                              <Field>
                                <FieldLabel>Badge Type</FieldLabel>
                                <Select
                                  value={badge.type}
                                  onValueChange={(value) =>
                                    updateBadgeApplication(index, { type: value })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select badge type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {specializations
                                      .filter(s => s.badge)
                                      .map((spec) => (
                                        <SelectItem key={spec.value} value={spec.value}>
                                          {spec.badge}
                                        </SelectItem>
                                      ))}
                                    <SelectItem value="olympiad">Olympiad Winner</SelectItem>
                                    <SelectItem value="top_scorer">National Top Scorer</SelectItem>
                                  </SelectContent>
                                </Select>
                              </Field>
                              <FileUploadField
                                label="Supporting Document"
                                hint={
                                  badge.type === 'sat'
                                    ? 'SAT score report (score ≥ 1500)'
                                    : badge.type === 'euee'
                                    ? 'EUEE certificate with average ≥ 90%'
                                    : 'Certificate or official score document'
                                }
                                fileName={badge.fileName}
                                onFileChange={(file, name) =>
                                  updateBadgeApplication(index, { file, fileName: name })
                                }
                              />
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={addBadgeApplication}
                          >
                            <Plus className="h-4 w-4" />
                            Add Another Badge
                          </Button>
                        </div>
                      )}
                    </div>
                  </FieldGroup>
                )}

                {/* Step 5: Profile & Rates */}
                {step === 5 && (
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="hourlyRate">Hourly Rate (ETB)</FieldLabel>
                      <Input
                        id="hourlyRate"
                        type="number"
                        placeholder="e.g., 300"
                        value={formData.hourlyRate}
                        onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                        min={0}
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="availability">Availability</FieldLabel>
                      <Input
                        id="availability"
                        placeholder="e.g., Weekdays 4PM–8PM, Weekends flexible"
                        value={formData.availability}
                        onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="bio">Bio / About You</FieldLabel>
                      <Textarea
                        id="bio"
                        placeholder="Describe your teaching experience, approach, and why parents should choose you..."
                        rows={5}
                        value={formData.bio}
                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        required
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
                    <Button type="button" variant="outline" onClick={() => setStep(0)}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                  )}

                  {step < totalSteps ? (
                    <Button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      disabled={
                        (step === 1 && !canProceedStep1) ||
                        (step === 2 && !canProceedStep2) ||
                        (step === 3 && !canProceedStep3) ||
                        (step === 4 && !canProceedStep4)
                      }
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={!canSubmit || isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
