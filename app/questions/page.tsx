'use client'

import { useState } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ThumbsUp,
  MessageCircle,
  Search,
  Plus,
  ChevronUp,
  CheckCircle2,
} from 'lucide-react'
import { toast } from 'sonner'

const sampleQuestions = [
  {
    id: '1',
    question: 'What is the formula for the area of a circle?',
    subject: 'Mathematics',
    gradeLevel: 'Grade 7',
    askedBy: 'Student',
    askedAt: '30 minutes ago',
    upvotes: 12,
    answers: [
      {
        id: 'a1',
        tutor: 'Abebe Kebede',
        tutorAvatar: 'AK',
        isVerified: true,
        text: 'The formula for the area of a circle is A = πr², where r is the radius of the circle and π (pi) ≈ 3.14159. For example, if the radius is 5 cm, the area = π × 5² = 3.14159 × 25 ≈ 78.54 cm².',
        upvotes: 8,
        answeredAt: '20 minutes ago',
        isBest: true,
      },
      {
        id: 'a2',
        tutor: 'Sara Tesfaye',
        tutorAvatar: 'ST',
        isVerified: false,
        text: 'Area = π × r². Remember: diameter = 2 × radius, so you can also write it as A = π(d/2)².',
        upvotes: 3,
        answeredAt: '15 minutes ago',
        isBest: false,
      },
    ],
  },
  {
    id: '2',
    question: 'Can someone explain Newton\'s Third Law of Motion with a simple example?',
    subject: 'Physics',
    gradeLevel: 'Grade 9',
    askedBy: 'Student',
    askedAt: '2 hours ago',
    upvotes: 18,
    answers: [
      {
        id: 'a3',
        tutor: 'Dawit Mulugeta',
        tutorAvatar: 'DM',
        isVerified: true,
        text: 'Newton\'s Third Law states: "For every action, there is an equal and opposite reaction." \n\nSimple example: When you jump off a boat onto a dock, you push backward on the boat, and the boat pushes you forward. That\'s why the boat moves backward when you jump forward!',
        upvotes: 15,
        answeredAt: '1 hour ago',
        isBest: true,
      },
    ],
  },
  {
    id: '3',
    question: 'How do I write a proper introduction paragraph for an essay?',
    subject: 'English',
    gradeLevel: 'Grade 10',
    askedBy: 'Student',
    askedAt: '3 hours ago',
    upvotes: 9,
    answers: [],
  },
  {
    id: '4',
    question: 'What is the difference between mitosis and meiosis?',
    subject: 'Biology',
    gradeLevel: 'Grade 11',
    askedBy: 'Student',
    askedAt: '5 hours ago',
    upvotes: 21,
    answers: [
      {
        id: 'a4',
        tutor: 'Hanna Girma',
        tutorAvatar: 'HG',
        isVerified: true,
        text: 'Mitosis produces 2 identical daughter cells (diploid) and is used for growth and repair. Meiosis produces 4 genetically unique daughter cells (haploid) and is used for sexual reproduction. Key difference: meiosis has 2 rounds of cell division and results in genetic variation.',
        upvotes: 19,
        answeredAt: '4 hours ago',
        isBest: true,
      },
    ],
  },
]

const subjects = [
  'All Subjects', 'Mathematics', 'Physics', 'Chemistry', 'Biology',
  'English', 'Amharic', 'History', 'Geography', 'Economics', 'ICT',
]

export default function QuestionsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('All Subjects')
  const [askDialogOpen, setAskDialogOpen] = useState(false)
  const [isAsking, setIsAsking] = useState(false)
  const [newQuestion, setNewQuestion] = useState({ question: '', subject: '', gradeLevel: '' })
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>('1')

  const filtered = sampleQuestions.filter(q => {
    const matchSearch = !searchQuery || q.question.toLowerCase().includes(searchQuery.toLowerCase())
    const matchSubject = subjectFilter === 'All Subjects' || q.subject === subjectFilter
    return matchSearch && matchSubject
  })

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAsking(true)
    await new Promise(r => setTimeout(r, 800))
    setIsAsking(false)
    setAskDialogOpen(false)
    toast.success('Question posted! Tutors will answer shortly.')
    setNewQuestion({ question: '', subject: '', gradeLevel: '' })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Ask a Question</h1>
              <p className="mt-2 text-muted-foreground">
                Post academic questions and get expert answers from verified tutors. Free for all students.
              </p>
            </div>
            <Dialog open={askDialogOpen} onOpenChange={setAskDialogOpen}>
              <DialogTrigger asChild>
                <Button className="shrink-0 gap-2">
                  <Plus className="h-4 w-4" />
                  Ask Question
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Ask a Question</DialogTitle>
                  <DialogDescription>
                    Post your academic question and verified tutors will answer for free.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAsk}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="qText">Your Question</FieldLabel>
                      <Textarea
                        id="qText"
                        placeholder="Type your question clearly..."
                        rows={4}
                        value={newQuestion.question}
                        onChange={(e) => setNewQuestion(p => ({ ...p, question: e.target.value }))}
                        required
                      />
                    </Field>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="qSubject">Subject</FieldLabel>
                        <Select
                          value={newQuestion.subject}
                          onValueChange={(v) => setNewQuestion(p => ({ ...p, subject: v }))}
                        >
                          <SelectTrigger id="qSubject"><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            {subjects.filter(s => s !== 'All Subjects').map(s => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="qGrade">Grade Level</FieldLabel>
                        <Input
                          id="qGrade"
                          placeholder="e.g., Grade 9"
                          value={newQuestion.gradeLevel}
                          onChange={(e) => setNewQuestion(p => ({ ...p, gradeLevel: e.target.value }))}
                        />
                      </Field>
                    </div>
                  </FieldGroup>
                  <DialogFooter className="mt-4">
                    <Button type="submit" disabled={isAsking} className="w-full">
                      {isAsking ? 'Posting...' : 'Post Question'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and filter */}
          <div className="mb-6 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                {subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Questions list */}
          <div className="space-y-4">
            {filtered.map((q) => (
              <Card key={q.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <button
                      className="flex flex-col items-center gap-1 rounded-md border border-border px-2 py-1.5 text-xs hover:bg-muted transition-colors shrink-0"
                      onClick={() => toast.success('Upvoted!')}
                    >
                      <ChevronUp className="h-4 w-4" />
                      <span>{q.upvotes}</span>
                    </button>
                    <div className="flex-1">
                      <button
                        className="text-left text-base font-semibold hover:text-primary transition-colors"
                        onClick={() => setExpandedQuestion(expandedQuestion === q.id ? null : q.id)}
                      >
                        {q.question}
                      </button>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">{q.subject}</Badge>
                        <Badge variant="outline" className="text-xs">{q.gradeLevel}</Badge>
                        <span>{q.askedBy} • {q.askedAt}</span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {q.answers.length} answer{q.answers.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {expandedQuestion === q.id && (
                  <CardContent className="border-t border-border pt-4">
                    {q.answers.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                        No answers yet. Be the first tutor to answer!
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {q.answers.map((answer) => (
                          <div key={answer.id} className={`rounded-lg border p-4 ${answer.isBest ? 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20' : 'border-border'}`}>
                            <div className="flex items-start gap-3">
                              <Avatar className="h-8 w-8 shrink-0">
                                <AvatarFallback className="text-xs">{answer.tutorAvatar}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="text-sm font-medium">{answer.tutor}</p>
                                  {answer.isVerified && (
                                    <Badge variant="outline" className="gap-1 text-xs text-green-700 border-green-300">
                                      <CheckCircle2 className="h-3 w-3" />
                                      Verified
                                    </Badge>
                                  )}
                                  {answer.isBest && (
                                    <Badge className="text-xs bg-green-600">Best Answer</Badge>
                                  )}
                                </div>
                                <p className="mt-2 text-sm whitespace-pre-wrap">{answer.text}</p>
                                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                                  <button
                                    className="flex items-center gap-1 hover:text-primary transition-colors"
                                    onClick={() => toast.success('Helpful!')}
                                  >
                                    <ThumbsUp className="h-3.5 w-3.5" />
                                    {answer.upvotes} helpful
                                  </button>
                                  <span>{answer.answeredAt}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Write an Answer
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
