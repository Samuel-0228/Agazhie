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
import { Search, CheckCircle2, XCircle, Eye, Phone, Mail } from 'lucide-react'
import { toast } from 'sonner'

interface Application {
  id: string
  name: string
  email: string
  phone: string
  university: string
  major: string
  yearOfStudy: string
  subjects: string[]
  specialization: string
  hourlyRate: number
  bio: string
  status: 'pending' | 'approved' | 'rejected'
  date: string
}

const sampleApplications: Application[] = [
  {
    id: '1',
    name: 'Kidist Alemayehu',
    email: 'kidist@example.com',
    phone: '+251 911 234 567',
    university: 'Addis Ababa University',
    major: 'Physics',
    yearOfStudy: '4th Year',
    subjects: ['Mathematics', 'Physics'],
    specialization: 'EUEE Preparation',
    hourlyRate: 350,
    bio: 'Passionate about physics and helping students understand complex concepts through simple explanations.',
    status: 'pending',
    date: '2024-01-15',
  },
  {
    id: '2',
    name: 'Yohannes Tadesse',
    email: 'yohannes@example.com',
    phone: '+251 922 345 678',
    university: 'AAiT',
    major: 'Computer Science',
    yearOfStudy: '3rd Year',
    subjects: ['Computer Science', 'Mathematics', 'ICT'],
    specialization: 'General Tutoring',
    hourlyRate: 300,
    bio: 'Software enthusiast with excellent teaching skills. I make programming fun and accessible.',
    status: 'pending',
    date: '2024-01-14',
  },
  {
    id: '3',
    name: 'Hiwot Gebremedhin',
    email: 'hiwot@example.com',
    phone: '+251 933 456 789',
    university: 'Bahir Dar University',
    major: 'Chemistry',
    yearOfStudy: 'Graduate',
    subjects: ['Chemistry', 'Biology'],
    specialization: 'EUEE Preparation',
    hourlyRate: 320,
    bio: 'Recent graduate with 2 years of tutoring experience. Specialized in natural sciences.',
    status: 'pending',
    date: '2024-01-13',
  },
]

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(sampleApplications)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredApps = applications.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleApprove = (id: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: 'approved' as const } : app
      )
    )
    toast.success('Application approved', {
      description: 'The tutor has been notified via email.',
    })
    setIsDialogOpen(false)
  }

  const handleReject = (id: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: 'rejected' as const } : app
      )
    )
    toast.success('Application rejected', {
      description: 'The applicant has been notified.',
    })
    setIsDialogOpen(false)
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tutor Applications</h1>
        <p className="mt-2 text-muted-foreground">
          Review and manage tutor applications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Applications</CardTitle>
              <CardDescription>
                {filteredApps.filter(a => a.status === 'pending').length} pending applications
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
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
                <TableHead>Applicant</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApps.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{app.name}</p>
                      <p className="text-sm text-muted-foreground">{app.major}</p>
                    </div>
                  </TableCell>
                  <TableCell>{app.university}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {app.subjects.slice(0, 2).map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {app.subjects.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{app.subjects.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{app.hourlyRate} ETB</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        app.status === 'approved'
                          ? 'default'
                          : app.status === 'rejected'
                          ? 'destructive'
                          : 'outline'
                      }
                      className="capitalize"
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{app.date}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedApp(app)
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

      {/* Application Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedApp && (
            <>
              <DialogHeader>
                <DialogTitle>Application Details</DialogTitle>
                <DialogDescription>
                  Review the full application from {selectedApp.name}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                    <p>{selectedApp.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <Badge variant={selectedApp.status === 'pending' ? 'outline' : 'default'} className="capitalize">
                      {selectedApp.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedApp.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedApp.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">University</p>
                    <p>{selectedApp.university}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Year</p>
                    <p>{selectedApp.yearOfStudy}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Major</p>
                    <p>{selectedApp.major}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Hourly Rate</p>
                    <p>{selectedApp.hourlyRate} ETB</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Subjects</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedApp.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Specialization</p>
                  <p>{selectedApp.specialization}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bio</p>
                  <p className="text-sm">{selectedApp.bio}</p>
                </div>
              </div>

              {selectedApp.status === 'pending' && (
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button
                    variant="destructive"
                    onClick={() => handleReject(selectedApp.id)}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button onClick={() => handleApprove(selectedApp.id)}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </DialogFooter>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
