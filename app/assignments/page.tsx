'use client'

import { useState } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import {
  FileText,
  Clock,
  DollarSign,
  Search,
  Upload,
  Filter,
  Plus,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { toast } from 'sonner'

const sampleAssignments = [
  {
    id: '1',
    title: 'Solve 10 Algebra Problems',
    subject: 'Mathematics',
    gradeLevel: 'Grade 9',
    deadline: '24 hours',
    budget: 80,
    description: 'I need help solving 10 algebra problems including linear equations and inequalities. Please show all working steps.',
    attachments: ['algebra_homework.pdf'],
    status: 'open',
    postedAt: '1 hour ago',
    applicants: 3,
  },
  {
    id: '2',
    title: 'English Essay on Climate Change',
    subject: 'English',
    gradeLevel: 'Grade 10',
    deadline: '48 hours',
    budget: 150,
    description: 'Need a 500-word essay on climate change and its effects on Ethiopia. Must include introduction, body, and conclusion.',
    attachments: [],
    status: 'open',
    postedAt: '3 hours ago',
    applicants: 5,
  },
  {
    id: '3',
    title: 'Chemistry Lab Report',
    subject: 'Chemistry',
    gradeLevel: 'Grade 11',
    deadline: '72 hours',
    budget: 200,
    description: 'Complete a lab report for a titration experiment. Data is provided. Need proper format with hypothesis, procedure, results, and conclusion.',
    attachments: ['lab_data.xlsx'],
    status: 'open',
    postedAt: '6 hours ago',
    applicants: 2,
  },
  {
    id: '4',
    title: 'Physics Force and Motion Problems',
    subject: 'Physics',
    gradeLevel: 'Grade 12',
    deadline: '36 hours',
    budget: 120,
    description: 'Solve 8 problems on Newton\'s laws, friction, and circular motion. Show all formulas and calculations.',
    attachments: ['physics_problems.jpg'],
    status: 'in-progress',
    postedAt: '1 day ago',
    applicants: 4,
  },
  {
    id: '5',
    title: 'Biology Cell Division Diagram',
    subject: 'Biology',
    gradeLevel: 'Grade 9',
    deadline: '12 hours',
    budget: 60,
    description: 'Draw and label the stages of mitosis and meiosis with brief explanations of each stage.',
    attachments: [],
    status: 'open',
    postedAt: '2 hours ago',
    applicants: 1,
  },
  {
    id: '6',
    title: 'Amharic Short Story Writing',
    subject: 'Amharic',
    gradeLevel: 'Grade 7',
    deadline: '48 hours',
    budget: 90,
    description: 'Write a short story in Amharic (about 300 words) on the theme of friendship. Must use proper grammar and vocabulary.',
    attachments: [],
    status: 'completed',
    postedAt: '3 days ago',
    applicants: 6,
  },
]

const subjects = [
  'All Subjects', 'Mathematics', 'Physics', 'Chemistry', 'Biology',
  'English', 'Amharic', 'History', 'Geography', 'Economics', 'ICT',
]

const deadlineOptions = [
  { value: 'all', label: 'Any Deadline' },
  { value: 'urgent', label: 'Urgent (< 24h)' },
  { value: 'short', label: 'Short (24–48h)' },
  { value: 'normal', label: 'Normal (48–72h)' },
]

const statusColors: Record<string, string> = {
  open: 'default',
  'in-progress': 'secondary',
  completed: 'outline',
}

export default function AssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('All Subjects')
  const [showFilters, setShowFilters] = useState(false)
  const [postDialogOpen, setPostDialogOpen] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [newAssignment, setNewAssignment] = useState({
    title: '', subject: '', gradeLevel: '', deadline: '', budget: '', description: '',
  })

  const filtered = sampleAssignments.filter((a) => {
    const matchSearch =
      !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchSubject = subjectFilter === 'All Subjects' || a.subject === subjectFilter
    return matchSearch && matchSubject
  })

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPosting(true)
    await new Promise(r => setTimeout(r, 1000))
    setIsPosting(false)
    setPostDialogOpen(false)
    toast.success('Assignment posted! Tutors will be notified.')
    setNewAssignment({ title: '', subject: '', gradeLevel: '', deadline: '', budget: '', description: '' })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Assignment Marketplace</h1>
              <p className="mt-2 text-muted-foreground">
                Post homework assignments and get help from qualified tutors. Payment is held in escrow until you approve the solution.
              </p>
            </div>
            <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
              <DialogTrigger asChild>
                <Button className="shrink-0 gap-2">
                  <Plus className="h-4 w-4" />
                  Post Assignment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Post a New Assignment</DialogTitle>
                  <DialogDescription>
                    Describe your assignment and set a budget. Payment is held safely in escrow until you approve the solution.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handlePost}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="aTitle">Assignment Title</FieldLabel>
                      <Input
                        id="aTitle"
                        placeholder="e.g., Solve 10 Algebra Problems"
                        value={newAssignment.title}
                        onChange={(e) => setNewAssignment(p => ({ ...p, title: e.target.value }))}
                        required
                      />
                    </Field>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="aSubject">Subject</FieldLabel>
                        <Select
                          value={newAssignment.subject}
                          onValueChange={(v) => setNewAssignment(p => ({ ...p, subject: v }))}
                        >
                          <SelectTrigger id="aSubject"><SelectValue placeholder="Select subject" /></SelectTrigger>
                          <SelectContent>
                            {subjects.filter(s => s !== 'All Subjects').map(s => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="aGrade">Grade Level</FieldLabel>
                        <Input
                          id="aGrade"
                          placeholder="e.g., Grade 10"
                          value={newAssignment.gradeLevel}
                          onChange={(e) => setNewAssignment(p => ({ ...p, gradeLevel: e.target.value }))}
                          required
                        />
                      </Field>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="aDeadline">Deadline (hours)</FieldLabel>
                        <Input
                          id="aDeadline"
                          type="number"
                          placeholder="e.g., 24"
                          value={newAssignment.deadline}
                          onChange={(e) => setNewAssignment(p => ({ ...p, deadline: e.target.value }))}
                          required
                          min={1}
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="aBudget">Budget (ETB)</FieldLabel>
                        <Input
                          id="aBudget"
                          type="number"
                          placeholder="e.g., 100"
                          value={newAssignment.budget}
                          onChange={(e) => setNewAssignment(p => ({ ...p, budget: e.target.value }))}
                          required
                          min={1}
                        />
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel htmlFor="aDescription">Description</FieldLabel>
                      <Textarea
                        id="aDescription"
                        placeholder="Describe the assignment clearly. Include any specific requirements..."
                        rows={4}
                        value={newAssignment.description}
                        onChange={(e) => setNewAssignment(p => ({ ...p, description: e.target.value }))}
                        required
                      />
                    </Field>
                    <div className="rounded-lg border border-dashed border-border p-4 text-center">
                      <Upload className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Attach files (PDF, image) — optional
                      </p>
                      <Button variant="outline" size="sm" className="mt-2" type="button">
                        Choose Files
                      </Button>
                    </div>
                    <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-sm">
                      <div className="flex gap-2">
                        <AlertCircle className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                        <p className="text-muted-foreground">
                          Your payment is held safely in <strong>escrow</strong> until you approve the solution. You can request a refund if unsatisfied.
                        </p>
                      </div>
                    </div>
                  </FieldGroup>
                  <DialogFooter className="mt-4">
                    <Button type="submit" disabled={isPosting} className="w-full">
                      {isPosting ? 'Posting...' : 'Post Assignment'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Escrow notice */}
          <div className="mb-6 flex items-center gap-3 rounded-lg bg-primary/5 border border-primary/20 p-4">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm">
              <strong>Safe Payments:</strong> Money is held in escrow until your assignment is completed to your satisfaction. Pay via Telebirr — Ethiopia&apos;s most trusted mobile wallet.
            </p>
          </div>

          {/* Search */}
          <div className="mb-6 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search assignments by title or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {showFilters && (
            <div className="mb-4 rounded-lg border border-border p-4">
              <label className="mb-1 block text-sm font-medium">Subject</label>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="max-w-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}

          <p className="mb-4 text-sm text-muted-foreground">
            {filtered.length} assignment{filtered.length !== 1 ? 's' : ''} available
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((assignment) => (
              <Card key={assignment.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base line-clamp-2">{assignment.title}</CardTitle>
                    <Badge variant={statusColors[assignment.status] as 'default' | 'secondary' | 'outline'} className="shrink-0 capitalize">
                      {assignment.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-xs">{assignment.subject}</Badge>
                    <Badge variant="outline" className="text-xs">{assignment.gradeLevel}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{assignment.description}</p>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-orange-500" />
                      <span>Deadline: {assignment.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="h-3.5 w-3.5 shrink-0 text-green-600" />
                      <span>{assignment.budget} ETB (held in escrow)</span>
                    </div>
                    {assignment.attachments.length > 0 && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText className="h-3.5 w-3.5 shrink-0" />
                        <span>{assignment.attachments.length} file(s) attached</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{assignment.applicants} tutor{assignment.applicants !== 1 ? 's' : ''} applied</span>
                    <span>{assignment.postedAt}</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border pt-4">
                  {assignment.status === 'open' ? (
                    <Button className="w-full" size="sm">
                      Apply to Solve
                    </Button>
                  ) : assignment.status === 'in-progress' ? (
                    <Button variant="outline" className="w-full" size="sm" disabled>
                      In Progress
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" size="sm" disabled>
                      Completed
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
