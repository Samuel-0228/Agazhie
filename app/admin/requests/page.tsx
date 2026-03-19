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
import { Search, Eye, Phone, Mail, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

interface TutorRequest {
  id: string
  parentName: string
  email: string
  phone: string
  studentName: string
  gradeLevel: string
  subjects: string[]
  sessionType: string
  frequency: string
  location: string
  notes: string
  status: 'new' | 'contacted' | 'matched' | 'completed'
  date: string
}

const sampleRequests: TutorRequest[] = [
  {
    id: '1',
    parentName: 'Tigist Haile',
    email: 'tigist@example.com',
    phone: '+251 911 111 111',
    studentName: 'Yared Haile',
    gradeLevel: 'Grade 11',
    subjects: ['Physics', 'Chemistry'],
    sessionType: 'In-Person',
    frequency: '2 sessions per week',
    location: 'Bole, Addis Ababa',
    notes: 'Preparing for EUEE. Needs help with problem-solving.',
    status: 'new',
    date: '2024-01-15',
  },
  {
    id: '2',
    parentName: 'Bekele Tadesse',
    email: 'bekele@example.com',
    phone: '+251 922 222 222',
    studentName: 'Nahom Bekele',
    gradeLevel: 'Grade 12',
    subjects: ['Mathematics'],
    sessionType: 'Online',
    frequency: '3 sessions per week',
    location: 'Online Only',
    notes: 'SAT preparation. Target score: 1400+',
    status: 'contacted',
    date: '2024-01-14',
  },
  {
    id: '3',
    parentName: 'Meron Getachew',
    email: 'meron@example.com',
    phone: '+251 933 333 333',
    studentName: 'Selam Getachew',
    gradeLevel: 'Grade 10',
    subjects: ['English', 'History'],
    sessionType: 'In-Person',
    frequency: '1 session per week',
    location: 'Kazanchis, Addis Ababa',
    notes: 'Struggling with essay writing and reading comprehension.',
    status: 'matched',
    date: '2024-01-13',
  },
]

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

  const handleStatusUpdate = (id: string, status: TutorRequest['status']) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status } : req
      )
    )
    toast.success('Status updated', {
      description: `Request marked as ${status}.`,
    })
  }

  const getStatusColor = (status: TutorRequest['status']) => {
    switch (status) {
      case 'new':
        return 'default'
      case 'contacted':
        return 'secondary'
      case 'matched':
        return 'outline'
      case 'completed':
        return 'outline'
      default:
        return 'outline'
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Parent Requests</h1>
        <p className="mt-2 text-muted-foreground">
          Manage tutor requests from parents.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Requests</CardTitle>
              <CardDescription>
                {filteredRequests.filter(r => r.status === 'new').length} new requests awaiting response
              </CardDescription>
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
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((req) => (
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
                      {req.subjects.slice(0, 2).map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {req.subjects.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{req.subjects.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{req.sessionType}</TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusColor(req.status)}
                      className="capitalize"
                    >
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{req.date}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedReq(req)
                        setIsDialogOpen(true)
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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
                <DialogDescription>
                  Tutor request from {selectedReq.parentName}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Parent Name</p>
                    <p>{selectedReq.parentName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <Badge variant={getStatusColor(selectedReq.status)} className="capitalize">
                      {selectedReq.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedReq.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedReq.phone}</span>
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
                    {selectedReq.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Session Type</p>
                    <p>{selectedReq.sessionType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Frequency</p>
                    <p>{selectedReq.frequency}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p>{selectedReq.location}</p>
                </div>

                {selectedReq.notes && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Additional Notes</p>
                    <p className="text-sm">{selectedReq.notes}</p>
                  </div>
                )}
              </div>

              <DialogFooter className="flex-col gap-2 sm:flex-row">
                {selectedReq.status === 'new' && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleStatusUpdate(selectedReq.id, 'contacted')
                      setIsDialogOpen(false)
                    }}
                  >
                    Mark as Contacted
                  </Button>
                )}
                {selectedReq.status === 'contacted' && (
                  <Button
                    onClick={() => {
                      handleStatusUpdate(selectedReq.id, 'matched')
                      setIsDialogOpen(false)
                    }}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Mark as Matched
                  </Button>
                )}
                {selectedReq.status === 'matched' && (
                  <Button
                    onClick={() => {
                      handleStatusUpdate(selectedReq.id, 'completed')
                      setIsDialogOpen(false)
                    }}
                  >
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
