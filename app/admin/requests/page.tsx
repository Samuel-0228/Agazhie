'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Search, Eye, CheckCircle2, Send, Flag } from 'lucide-react'
import { toast } from 'sonner'

type RequestStatus = 'draft' | 'sent' | 'completed'

interface TutorRequest {
  id: string
  parentName: string
  phone: string
  email: string
  studentName: string
  gradeLevel: string
  subjects: string[]
  sessionType: string
  frequency: string
  schedule: string
  budget: string
  paymentDuration: string
  location: string
  notes: string
  status: RequestStatus
  preferredTutor?: string
  date: string
}

const sampleRequests: TutorRequest[] = [
  {
    id: '1',
    parentName: 'Tigist Haile',
    phone: '+251 911 111 111',
    email: 'tigist@example.com',
    studentName: 'Yared Haile',
    gradeLevel: 'Grade 11',
    subjects: ['Physics', 'Chemistry'],
    sessionType: 'In-Person',
    frequency: '2 sessions per week',
    schedule: 'Evening',
    budget: '350',
    paymentDuration: 'Monthly',
    location: 'Bole, Addis Ababa',
    notes: 'Preparing for EUEE. Needs help with problem-solving.',
    status: 'draft',
    preferredTutor: 'Abebe Kebede',
    date: '2024-01-15',
  },
  {
    id: '2',
    parentName: 'Bekele Tadesse',
    phone: '+251 922 222 222',
    email: 'bekele@example.com',
    studentName: 'Nahom Bekele',
    gradeLevel: 'Grade 12',
    subjects: ['Mathematics'],
    sessionType: 'Online',
    frequency: '3 sessions per week',
    schedule: 'Afternoon',
    budget: '300',
    paymentDuration: 'Weekly',
    location: 'Online Only',
    notes: 'SAT preparation. Target score: 1400+',
    status: 'sent',
    date: '2024-01-14',
  },
  {
    id: '3',
    parentName: 'Meron Getachew',
    phone: '+251 933 333 333',
    email: 'meron@example.com',
    studentName: 'Selam Getachew',
    gradeLevel: 'Grade 10',
    subjects: ['English', 'History'],
    sessionType: 'In-Person',
    frequency: '1 session per week',
    schedule: 'Weekend',
    budget: '250',
    paymentDuration: 'Biweekly',
    location: 'Kazanchis, Addis Ababa',
    notes: 'Struggling with essay writing and reading comprehension.',
    status: 'completed',
    date: '2024-01-13',
  },
]

const statusConfig: Record<RequestStatus, { label: string; variant: 'default' | 'secondary' | 'outline'; icon: React.ElementType }> = {
  draft: { label: 'Draft', variant: 'outline', icon: Flag },
  sent: { label: 'Sent', variant: 'secondary', icon: Send },
  completed: { label: 'Completed', variant: 'default', icon: CheckCircle2 },
}

export default function RequestsPage() {
  const [requests, setRequests] = useState(sampleRequests)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedReq, setSelectedReq] = useState<TutorRequest | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredRequests = requests.filter(req =>
    req.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleStatusUpdate = (id: string, status: RequestStatus) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req))
    if (selectedReq?.id === id) {
      setSelectedReq(prev => prev ? { ...prev, status } : prev)
    }
    toast.success(`Request marked as ${statusConfig[status].label}.`)
  }

  const counts = {
    draft: requests.filter(r => r.status === 'draft').length,
    sent: requests.filter(r => r.status === 'sent').length,
    completed: requests.filter(r => r.status === 'completed').length,
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Parent Requests</h1>
        <p className="mt-2 text-muted-foreground">
          Track and manage tutor requests. Status: Draft → Sent → Completed.
        </p>
      </div>

      {/* Status Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {(Object.keys(statusConfig) as RequestStatus[]).map((s) => {
          const cfg = statusConfig[s]
          return (
            <Card key={s}>
              <CardContent className="pt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <cfg.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{counts[s]}</p>
                  <p className="text-sm text-muted-foreground">{cfg.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Requests</CardTitle>
              <CardDescription>{counts.draft} draft(s) awaiting action</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parent</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((req) => {
                const cfg = statusConfig[req.status]
                return (
                  <TableRow key={req.id}>
                    <TableCell>
                      <p className="font-medium">{req.parentName}</p>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{req.studentName}</p>
                        <p className="text-sm text-muted-foreground">{req.gradeLevel}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {req.subjects.slice(0, 2).map((s) => (
                          <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                        ))}
                        {req.subjects.length > 2 && (
                          <Badge variant="outline" className="text-xs">+{req.subjects.length - 2}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{req.budget} ETB/hr</TableCell>
                    <TableCell>
                      <Badge variant={cfg.variant} className="capitalize gap-1">
                        <cfg.icon className="h-3 w-3" />
                        {cfg.label}
                      </Badge>
                    </TableCell>
                    <TableCell>{req.date}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { setSelectedReq(req); setIsDialogOpen(true) }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Request Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedReq && (
            <>
              <DialogHeader>
                <DialogTitle>Request Details</DialogTitle>
                <DialogDescription>Tutor request from {selectedReq.parentName}</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Parent Name</p>
                    <p>{selectedReq.parentName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <Badge variant={statusConfig[selectedReq.status].variant} className="capitalize gap-1">
                      {(() => { const I = statusConfig[selectedReq.status].icon; return <I className="h-3 w-3" /> })()}
                      {statusConfig[selectedReq.status].label}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p className="text-sm">{selectedReq.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="text-sm">{selectedReq.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Student Name</p>
                    <p>{selectedReq.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Grade Level</p>
                    <p>{selectedReq.gradeLevel}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Subjects Needed</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedReq.subjects.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Budget</p>
                    <p>{selectedReq.budget} ETB/hr</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Payment</p>
                    <p>{selectedReq.paymentDuration}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Session Type</p>
                    <p>{selectedReq.sessionType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Schedule</p>
                    <p>{selectedReq.schedule}</p>
                  </div>
                </div>

                {selectedReq.location && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Location</p>
                    <p>{selectedReq.location}</p>
                  </div>
                )}

                {selectedReq.preferredTutor && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Preferred Tutor</p>
                    <p>{selectedReq.preferredTutor}</p>
                  </div>
                )}

                {selectedReq.notes && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Notes</p>
                    <p className="text-sm">{selectedReq.notes}</p>
                  </div>
                )}
              </div>

              <DialogFooter className="flex-col gap-2 sm:flex-row">
                {selectedReq.status === 'draft' && (
                  <Button onClick={() => handleStatusUpdate(selectedReq.id, 'sent')}>
                    <Send className="mr-2 h-4 w-4" />
                    Mark as Sent
                  </Button>
                )}
                {selectedReq.status === 'sent' && (
                  <Button onClick={() => handleStatusUpdate(selectedReq.id, 'completed')}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Mark as Completed
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
