'use client'

import { useState, Suspense } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  MapPin,
  Clock,
  DollarSign,
  Search,
  BookOpen,
  GraduationCap,
  Filter,
  MessageSquare,
} from 'lucide-react'
import Link from 'next/link'

const sampleJobs = [
  {
    id: '1',
    subject: 'Mathematics',
    gradeLevel: 'Grade 10',
    location: 'Bole, Addis Ababa',
    sessionType: 'in-person',
    frequency: '3 sessions/week',
    budget: 350,
    description: 'Need a patient Math tutor for my daughter who is preparing for her Grade 10 national exam. Focus on algebra and geometry.',
    goal: 'National exam prep',
    postedAt: '2 hours ago',
    status: 'open',
    anonymous: 'Parent in Bole',
  },
  {
    id: '2',
    subject: 'English',
    gradeLevel: 'Grade 8',
    location: 'Online',
    sessionType: 'online',
    frequency: '2 sessions/week',
    budget: 250,
    description: 'Looking for an English tutor for my son to improve his reading and writing skills. Online sessions preferred.',
    goal: 'Improve language skills',
    postedAt: '5 hours ago',
    status: 'open',
    anonymous: 'Parent in Kirkos',
  },
  {
    id: '3',
    subject: 'Physics',
    gradeLevel: 'Grade 12',
    location: 'Kazanchis, Addis Ababa',
    sessionType: 'both',
    frequency: '4 sessions/week',
    budget: 500,
    description: 'My son is a Grade 12 student preparing for university entrance exam. Needs intensive Physics tutoring covering all chapters.',
    goal: 'University entrance exam',
    postedAt: '1 day ago',
    status: 'open',
    anonymous: 'Parent in Kazanchis',
  },
  {
    id: '4',
    subject: 'Chemistry',
    gradeLevel: 'Grade 11',
    location: 'Sarbet, Addis Ababa',
    sessionType: 'in-person',
    frequency: '2 sessions/week',
    budget: 400,
    description: 'Seeking a Chemistry tutor for Grade 11 student. Must be able to explain organic chemistry clearly.',
    goal: 'Semester exam preparation',
    postedAt: '2 days ago',
    status: 'open',
    anonymous: 'Parent in Sarbet',
  },
  {
    id: '5',
    subject: 'Biology',
    gradeLevel: 'Grade 9',
    location: 'Online',
    sessionType: 'online',
    frequency: '1 session/week',
    budget: 200,
    description: 'Need Biology help for Grade 9 student focusing on cell biology and human body systems.',
    goal: 'General improvement',
    postedAt: '3 days ago',
    status: 'open',
    anonymous: 'Parent in Megenagna',
  },
  {
    id: '6',
    subject: 'Amharic',
    gradeLevel: 'Grade 5',
    location: 'Piazza, Addis Ababa',
    sessionType: 'in-person',
    frequency: '2 sessions/week',
    budget: 150,
    description: 'My child needs help with Amharic reading and composition. Patient and encouraging tutor preferred.',
    goal: 'Reading and writing improvement',
    postedAt: '4 days ago',
    status: 'in-review',
    anonymous: 'Parent in Piazza',
  },
]

const subjects = [
  'All Subjects',
  'Mathematics', 'Physics', 'Chemistry', 'Biology',
  'English', 'Amharic', 'History', 'Geography', 'Economics', 'ICT',
]

const gradeLevels = [
  'All Grades',
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
  'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
  'Grade 11', 'Grade 12', 'Freshman',
]

const sessionTypeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'in-person', label: 'In-Person' },
  { value: 'online', label: 'Online' },
  { value: 'both', label: 'Either' },
]

function JobsContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('All Subjects')
  const [gradeFilter, setGradeFilter] = useState('All Grades')
  const [sessionTypeFilter, setSessionTypeFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = sampleJobs.filter((job) => {
    const matchSearch =
      !searchQuery ||
      job.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchSubject = subjectFilter === 'All Subjects' || job.subject === subjectFilter
    const matchGrade = gradeFilter === 'All Grades' || job.gradeLevel === gradeFilter
    const matchSession = sessionTypeFilter === 'all' || job.sessionType === sessionTypeFilter
    return matchSearch && matchSubject && matchGrade && matchSession
  })

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tutor Job Postings</h1>
        <p className="mt-2 text-muted-foreground">
          Browse tutoring requests from parents and students. Apply to the ones that match your expertise.
        </p>
      </div>

      {/* Search and filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by subject, location, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <div className="grid gap-3 rounded-lg border border-border p-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Subject</label>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Grade Level</label>
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {gradeLevels.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Session Type</label>
              <Select value={sessionTypeFilter} onValueChange={setSessionTypeFilter}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {sessionTypeOptions.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        {filtered.length} job{filtered.length !== 1 ? 's' : ''} found
      </p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
          <BookOpen className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">No jobs found</h3>
          <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <Card key={job.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base">{job.subject}</CardTitle>
                    <p className="text-sm text-muted-foreground">{job.gradeLevel}</p>
                  </div>
                  <Badge variant={job.status === 'open' ? 'default' : 'secondary'} className="shrink-0 capitalize">
                    {job.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    <span>{job.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-3.5 w-3.5 shrink-0" />
                    <span>{job.budget} ETB/hr</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                    <span>Goal: {job.goal}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{job.anonymous}</span>
                  <span>{job.postedAt}</span>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border pt-4">
                <Button className="w-full gap-2" asChild>
                  <Link href={`/jobs/${job.id}`}>
                    <MessageSquare className="h-4 w-4" />
                    Apply / Message
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-12 rounded-xl bg-primary/5 border border-primary/20 p-6 text-center">
        <h3 className="text-lg font-semibold">Are you a parent looking for a tutor?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Post your tutoring request and let qualified tutors find you.
        </p>
        <Button className="mt-4" asChild>
          <Link href="/request">Post a Tutoring Request</Link>
        </Button>
      </div>
    </div>
  )
}

export default function JobsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <Suspense fallback={<div className="flex justify-center py-12">Loading...</div>}>
          <JobsContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
