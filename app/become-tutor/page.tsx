'use client'

import { useState } from 'react'
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
import { CheckCircle2, ArrowLeft, ArrowRight, GraduationCap, Users, DollarSign, Clock } from 'lucide-react'
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
  { value: 'euee', label: 'EUEE Preparation' },
  { value: 'sat', label: 'SAT Preparation' },
  { value: 'ielts', label: 'IELTS/TOEFL' },
  { value: 'none', label: 'General Tutoring' },
]

const gradeLevels = [
  { value: '9-10', label: 'Grade 9-10' },
  { value: '11-12', label: 'Grade 11-12' },
  { value: 'university', label: 'University' },
]

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Earnings',
    description: 'Set your own rates and earn 250-500 ETB per hour',
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

export default function BecomeTutorPage() {
  const router = useRouter()
  const [step, setStep] = useState(0) // 0 is info page, 1-4 are form steps
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    university: '',
    otherUniversity: '',
    yearOfStudy: '',
    major: '',
    selectedSubjects: [] as string[],
    gradeLevels: [] as string[],
    specialization: '',
    hourlyRate: '',
    availability: '',
    bio: '',
    experience: '',
    agreeTerms: false,
  })

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSubjects: prev.selectedSubjects.includes(subject)
        ? prev.selectedSubjects.filter(s => s !== subject)
        : [...prev.selectedSubjects, subject],
    }))
  }

  const handleGradeLevelToggle = (level: string) => {
    setFormData(prev => ({
      ...prev,
      gradeLevels: prev.gradeLevels.includes(level)
        ? prev.gradeLevels.filter(l => l !== level)
        : [...prev.gradeLevels, level],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreeTerms) {
      toast.error('Please agree to the terms and conditions')
      return
    }
    
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    toast.success('Application submitted successfully!', {
      description: 'We will review your application and get back to you within 48 hours.',
    })

    setIsSubmitting(false)
    router.push('/become-tutor/success')
  }

  const canProceedStep1 = formData.fullName && formData.phone && formData.email
  const canProceedStep2 = formData.university && formData.yearOfStudy && formData.major
  const canProceedStep3 = formData.selectedSubjects.length > 0 && formData.gradeLevels.length > 0
  const canSubmit = formData.hourlyRate && formData.bio && formData.agreeTerms

  if (step === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-primary/5 to-background py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                  Share your knowledge,{' '}
                  <span className="text-primary">earn while you learn</span>
                </h1>
                <p className="mt-6 text-pretty text-lg text-muted-foreground">
                  Join አጋዤ as a tutor and help students across Ethiopia achieve their academic goals 
                  while earning extra income on your own schedule.
                </p>
                <div className="mt-8">
                  <Button size="lg" onClick={() => setStep(1)} className="text-base">
                    Start Your Application
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
                Why tutor with አጋዤ?
              </h2>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {benefits.map((benefit) => (
                  <Card key={benefit.title} className="text-center">
                    <CardContent className="pt-6">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-4 font-semibold">{benefit.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Requirements Section */}
          <section className="bg-muted/50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl">
                <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
                  Requirements
                </h2>
                <div className="mt-8 rounded-lg bg-card p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>Currently enrolled in or graduated from an accredited Ethiopian university</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>Strong academic performance in subjects you wish to teach</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>Patient, reliable, and passionate about education</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>Available for at least 4 hours per week</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 text-center">
                  <Button size="lg" onClick={() => setStep(1)}>
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
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
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Tutor Application</h1>
            <p className="mt-2 text-muted-foreground">
              Complete your application to become a verified tutor.
            </p>
          </div>

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
                      className={`h-1 w-12 sm:w-16 ${
                        step > s ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Contact</span>
              <span>Education</span>
              <span>Subjects</span>
              <span>Profile</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && 'Contact Information'}
                {step === 2 && 'Education Details'}
                {step === 3 && 'Teaching Subjects'}
                {step === 4 && 'Your Profile'}
              </CardTitle>
              <CardDescription>
                {step === 1 && 'How can we reach you?'}
                {step === 2 && 'Tell us about your academic background'}
                {step === 3 && 'What subjects can you teach?'}
                {step === 4 && 'Tell students about yourself'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
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
                            <SelectItem key={uni} value={uni.toLowerCase().replace(/\s+/g, '-')}>
                              {uni}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    {formData.university === 'other' && (
                      <Field>
                        <FieldLabel htmlFor="otherUniversity">University Name</FieldLabel>
                        <Input
                          id="otherUniversity"
                          placeholder="Enter your university name"
                          value={formData.otherUniversity}
                          onChange={(e) => setFormData(prev => ({ ...prev, otherUniversity: e.target.value }))}
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
                          <SelectItem value="2">2nd Year</SelectItem>
                          <SelectItem value="3">3rd Year</SelectItem>
                          <SelectItem value="4">4th Year</SelectItem>
                          <SelectItem value="5">5th Year</SelectItem>
                          <SelectItem value="graduate">Graduate</SelectItem>
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
                        {gradeLevels.map((level) => (
                          <Badge
                            key={level.value}
                            variant={formData.gradeLevels.includes(level.value) ? 'default' : 'outline'}
                            className="cursor-pointer transition-colors"
                            onClick={() => handleGradeLevelToggle(level.value)}
                          >
                            {level.label}
                          </Badge>
                        ))}
                      </div>
                    </FieldSet>
                    <Field>
                      <FieldLabel htmlFor="specialization">Specialization</FieldLabel>
                      <Select
                        value={formData.specialization}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, specialization: value }))}
                      >
                        <SelectTrigger id="specialization">
                          <SelectValue placeholder="Select specialization (optional)" />
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

                {step === 4 && (
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="hourlyRate">Hourly Rate (ETB)</FieldLabel>
                      <Input
                        id="hourlyRate"
                        type="number"
                        placeholder="e.g., 300"
                        value={formData.hourlyRate}
                        onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                        required
                      />
                      <p className="mt-1 text-xs text-muted-foreground">
                        Recommended: 250-400 ETB per hour
                      </p>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="availability">Availability</FieldLabel>
                      <Input
                        id="availability"
                        placeholder="e.g., Weekdays 4PM-8PM, Weekends flexible"
                        value={formData.availability}
                        onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="bio">About You</FieldLabel>
                      <Textarea
                        id="bio"
                        placeholder="Tell students about yourself, your teaching style, and why you are a great tutor..."
                        rows={4}
                        value={formData.bio}
                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="experience">Teaching Experience (Optional)</FieldLabel>
                      <Textarea
                        id="experience"
                        placeholder="Describe any previous tutoring or teaching experience..."
                        rows={3}
                        value={formData.experience}
                        onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                      />
                    </Field>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, agreeTerms: checked === true }))
                        }
                      />
                      <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                        I agree to the{' '}
                        <Link href="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </FieldGroup>
                )}

                <div className="mt-6 flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setStep(step - 1)}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  
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
