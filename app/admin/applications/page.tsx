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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, CheckCircle2, XCircle, Eye, FileText, Award } from 'lucide-react'
import { toast } from 'sonner'

type AppStatus = 'pending' | 'reviewing' | 'approved' | 'rejected'
type BadgeStatus = 'pending' | 'approved' | 'rejected'

interface BadgeApplication {
  type: string
  documentUrl?: string
  status: BadgeStatus
}

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
  status: AppStatus
  date: string
  transcriptUrl?: string
  eueeUrl?: string
  badgeApplications?: BadgeApplication[]
}

const sampleApplications: Application[] = [
  {
    id: '1',
    name: 'Kidist Alemayehu',
    email: 'kidist@example.com',
    phone: '+251 911 234 567',
    university: 'Addis Ababa University',
    major: 'Physics',
    yearOfStudy: '3rd Year',
    subjects: ['Mathematics', 'Physics'],
    specialization: 'EUEE Preparation',
    hourlyRate: 350,
    bio: 'Passionate physics student with a knack for simplifying complex concepts.',
    status: 'pending',
    date: '2024-01-15',
    transcriptUrl: '#',
    eueeUrl: '#',
    badgeApplications: [
      { type: 'EUEE Expert', documentUrl: '#', status: 'pending' },
    ],
  },
  {
    id: '2',
    name: 'Yohannes Tadesse',
    email: 'yohannes@example.com',
    phone: '+251 922 345 678',
    university: 'AAiT',
    major: 'Computer Science',
    yearOfStudy: '4th Year',
    subjects: ['Computer Science', 'Mathematics'],
    specialization: 'SAT Preparation',
    hourlyRate: 320,
    bio: 'Software engineering student offering ICT and mathematics tutoring.',
    status: 'reviewing',
    date: '2024-01-14',
    transcriptUrl: '#',
    eueeUrl: '#',
    badgeApplications: [
      { type: 'SAT Specialist', documentUrl: '#', status: 'pending' },
      { type: 'EUEE Expert', documentUrl: '#', status: 'approved' },
    ],
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
    transcriptUrl: '#',
    eueeUrl: '#',
  },
]

const statusBadge: Record<AppStatus, { variant: 'default' | 'secondary' | 'outline' | 'destructive'; label: string }> = {
  pending: { variant: 'outline', label: 'Pending' },
  reviewing: { variant: 'secondary', label: 'Reviewing' },
  approved: { variant: 'default', label: 'Approved' },
  rejected: { variant: 'destructive', label: 'Rejected' },
}

const badgeStatusBadge: Record<BadgeStatus, { variant: 'default' | 'secondary' | 'outline' | 'destructive'; label: string }> = {
  pending: { variant: 'outline', label: 'Pending' },
  approved: { variant: 'default', label: 'Approved' },
  rejected: { variant: 'destructive', label: 'Rejected' },
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(sampleApplications)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filtered = applications.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleAppStatus = (id: string, status: AppStatus) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    if (selectedApp?.id === id) setSelectedApp(prev => prev ? { ...prev, status } : prev)
    toast.success(`Application ${status}.`)
  }

  const handleBadgeStatus = (appId: string, badgeIndex: number, status: BadgeStatus) => {
    setApplications(prev => prev.map(a => {
      if (a.id !== appId) return a
      const badges = (a.badgeApplications || []).map((b, i) =>
        i === badgeIndex ? { ...b, status } : b
      )
      return { ...a, badgeApplications: badges }
    }))
    setSelectedApp(prev => {
      if (!prev || prev.id !== appId) return prev
      const badges = (prev.badgeApplications || []).map((b, i) =>
        i === badgeIndex ? { ...b, status } : b
      )
      return { ...prev, badgeApplications: badges }
    })
    toast.success(`Badge ${status}.`)
  }

  const counts = {
    pending: applications.filter(a => a.status === 'pending').length,
    reviewing: applications.filter(a => a.status === 'reviewing').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tutor Applications</h1>
        <p className="mt-2 text-muted-foreground">
          Review applications, verify documents, and approve or reject tutors and badges.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {(Object.keys(counts) as AppStatus[]).map(s => (
          <Card key={s}>
            <CardContent className="pt-5">
              <p className="text-2xl font-bold">{counts[s]}</p>
              <p className="text-sm text-muted-foreground capitalize">{s}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Applications</CardTitle>
              <CardDescription>{counts.pending} pending review</CardDescription>
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
                <TableHead>Badges</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((app) => {
                const cfg = statusBadge[app.status]
                return (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{app.name}</p>
                        <p className="text-xs text-muted-foreground">{app.yearOfStudy}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{app.university}</p>
                      <p className="text-xs text-muted-foreground">{app.major}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {app.subjects.slice(0, 2).map(s => (
                          <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                        ))}
                        {app.subjects.length > 2 && (
                          <Badge variant="outline" className="text-xs">+{app.subjects.length - 2}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {app.badgeApplications && app.badgeApplications.length > 0 ? (
                        <Badge variant="secondary" className="gap-1 text-xs">
                          <Award className="h-3 w-3" />
                          {app.badgeApplications.length}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>{app.hourlyRate} ETB</TableCell>
                    <TableCell>
                      <Badge variant={cfg.variant} className="capitalize">{cfg.label}</Badge>
                    </TableCell>
                    <TableCell>{app.date}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { setSelectedApp(app); setIsDialogOpen(true) }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Application Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedApp && (
            <>
              <DialogHeader>
                <DialogTitle>Application — {selectedApp.name}</DialogTitle>
                <DialogDescription>{selectedApp.university} · {selectedApp.major}</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  {selectedApp.badgeApplications && selectedApp.badgeApplications.length > 0 && (
                    <TabsTrigger value="badges">Badges</TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="details" className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <Badge variant={statusBadge[selectedApp.status].variant} className="capitalize mt-1">
                        {statusBadge[selectedApp.status].label}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Hourly Rate</p>
                      <p>{selectedApp.hourlyRate} ETB</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <p className="text-sm">{selectedApp.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="text-sm">{selectedApp.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Subjects</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {selectedApp.subjects.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Specialization</p>
                    <p className="text-sm">{selectedApp.specialization}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Bio</p>
                    <p className="text-sm">{selectedApp.bio}</p>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="flex flex-col gap-4">
                  <div className="rounded-lg border border-border p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Grade 12 Transcript</p>
                        <p className="text-xs text-muted-foreground">Required document</p>
                      </div>
                    </div>
                    {selectedApp.transcriptUrl ? (
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedApp.transcriptUrl} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </Button>
                    ) : (
                      <Badge variant="outline">Not uploaded</Badge>
                    )}
                  </div>
                  <div className="rounded-lg border border-border p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">EUEE Result</p>
                        <p className="text-xs text-muted-foreground">Required document</p>
                      </div>
                    </div>
                    {selectedApp.eueeUrl ? (
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedApp.eueeUrl} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </Button>
                    ) : (
                      <Badge variant="outline">Not uploaded</Badge>
                    )}
                  </div>
                </TabsContent>

                {selectedApp.badgeApplications && selectedApp.badgeApplications.length > 0 && (
                  <TabsContent value="badges" className="flex flex-col gap-4">
                    {selectedApp.badgeApplications.map((badge, index) => {
                      const bcfg = badgeStatusBadge[badge.status]
                      return (
                        <div key={index} className="rounded-lg border border-border p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-primary" />
                              <span className="font-medium">{badge.type}</span>
                            </div>
                            <Badge variant={bcfg.variant}>{bcfg.label}</Badge>
                          </div>
                          {badge.documentUrl && (
                            <div className="mb-3">
                              <Button variant="outline" size="sm" asChild>
                                <a href={badge.documentUrl} target="_blank" rel="noopener noreferrer">
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Supporting Document
                                </a>
                              </Button>
                            </div>
                          )}
                          {badge.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleBadgeStatus(selectedApp.id, index, 'approved')}
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Approve Badge
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleBadgeStatus(selectedApp.id, index, 'rejected')}
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </TabsContent>
                )}
              </Tabs>

              <DialogFooter className="flex-col gap-2 sm:flex-row mt-4">
                {(selectedApp.status === 'pending' || selectedApp.status === 'reviewing') && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => handleAppStatus(selectedApp.id, 'reviewing')}
                      disabled={selectedApp.status === 'reviewing'}
                    >
                      Mark as Reviewing
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => { handleAppStatus(selectedApp.id, 'rejected'); setIsDialogOpen(false) }}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => { handleAppStatus(selectedApp.id, 'approved'); setIsDialogOpen(false) }}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Approve Tutor
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
