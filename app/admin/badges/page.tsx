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
import { Search, CheckCircle2, XCircle, Eye, Award, FileText } from 'lucide-react'
import { toast } from 'sonner'

interface BadgeApplication {
  id: string
  tutorName: string
  tutorId: string
  badgeType: string
  badgeLabel: string
  documentName: string
  status: 'pending' | 'approved' | 'rejected'
  submittedDate: string
  notes?: string
}

const sampleBadgeApplications: BadgeApplication[] = [
  {
    id: '1',
    tutorName: 'Abebe Kebede',
    tutorId: '1',
    badgeType: 'euee-specialist',
    badgeLabel: 'EUEE Specialist',
    documentName: 'EUEE_Certificate_Abebe.pdf',
    status: 'pending',
    submittedDate: '2024-01-15',
    notes: 'Average EUEE score: 92%',
  },
  {
    id: '2',
    tutorName: 'Sara Tesfaye',
    tutorId: '2',
    badgeType: 'sat-specialist',
    badgeLabel: 'SAT Specialist',
    documentName: 'SAT_Score_Sara.pdf',
    status: 'approved',
    submittedDate: '2024-01-10',
    notes: 'SAT Score: 1520',
  },
  {
    id: '3',
    tutorName: 'Dawit Mulugeta',
    tutorId: '3',
    badgeType: 'olympiad',
    badgeLabel: 'Olympiad Winner',
    documentName: 'Olympiad_Certificate_Dawit.jpg',
    status: 'pending',
    submittedDate: '2024-01-14',
  },
  {
    id: '4',
    tutorName: 'Hanna Girma',
    tutorId: '4',
    badgeType: 'euee-specialist',
    badgeLabel: 'EUEE Specialist',
    documentName: 'EUEE_Certificate_Hanna.pdf',
    status: 'rejected',
    submittedDate: '2024-01-08',
    notes: 'Score below threshold',
  },
]

const statusConfig: Record<BadgeApplication['status'], { label: string; variant: 'default' | 'secondary' | 'outline'; className?: string }> = {
  pending: { label: 'Pending', variant: 'outline' },
  approved: { label: 'Approved', variant: 'default', className: 'bg-green-500 text-white hover:bg-green-600' },
  rejected: { label: 'Rejected', variant: 'outline', className: 'border-red-300 text-red-600' },
}

export default function BadgesPage() {
  const [applications, setApplications] = useState(sampleBadgeApplications)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedApp, setSelectedApp] = useState<BadgeApplication | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredApps = applications.filter(app =>
    app.tutorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.badgeLabel.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleApprove = (id: string) => {
    setApplications(prev =>
      prev.map(app => app.id === id ? { ...app, status: 'approved' as const } : app)
    )
    toast.success('Badge approved!', {
      description: "The badge will now appear on the tutor's profile.",
    })
    setIsDialogOpen(false)
  }

  const handleReject = (id: string) => {
    setApplications(prev =>
      prev.map(app => app.id === id ? { ...app, status: 'rejected' as const } : app)
    )
    toast.success('Badge application rejected.', {
      description: 'The tutor has been notified.',
    })
    setIsDialogOpen(false)
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Badge Applications</h1>
        <p className="mt-2 text-muted-foreground">
          Review and approve tutor badge applications. Only approved badges appear on tutor profiles.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Pending Review</p>
            <p className="text-2xl font-bold">{applications.filter(a => a.status === 'pending').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Approved</p>
            <p className="text-2xl font-bold text-green-600">{applications.filter(a => a.status === 'approved').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Rejected</p>
            <p className="text-2xl font-bold text-red-500">{applications.filter(a => a.status === 'rejected').length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Badge Applications</CardTitle>
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
                <TableHead>Tutor</TableHead>
                <TableHead>Badge Type</TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApps.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <p className="font-medium">{app.tutorName}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span>{app.badgeLabel}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span className="truncate max-w-[160px]">{app.documentName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={statusConfig[app.status].variant}
                      className={statusConfig[app.status].className}
                    >
                      {statusConfig[app.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>{app.submittedDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedApp(app)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Review
                      </Button>
                      {app.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => handleApprove(app.id)}
                          >
                            <CheckCircle2 className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                            onClick={() => handleReject(app.id)}
                          >
                            <XCircle className="mr-1 h-4 w-4" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          {selectedApp && (
            <>
              <DialogHeader>
                <DialogTitle>Badge Application Review</DialogTitle>
                <DialogDescription>
                  {selectedApp.tutorName} — {selectedApp.badgeLabel}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tutor</p>
                    <p>{selectedApp.tutorName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Badge Type</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span>{selectedApp.badgeLabel}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Submitted Document</p>
                  <div className="mt-1 flex items-center gap-2 rounded-md border border-border bg-muted/30 p-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{selectedApp.documentName}</span>
                    <Button variant="outline" size="sm" className="ml-auto text-xs">
                      View Document
                    </Button>
                  </div>
                </div>

                {selectedApp.notes && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Notes</p>
                    <p className="text-sm">{selectedApp.notes}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Status</p>
                  <Badge
                    variant={statusConfig[selectedApp.status].variant}
                    className={statusConfig[selectedApp.status].className}
                  >
                    {statusConfig[selectedApp.status].label}
                  </Badge>
                </div>
              </div>

              <DialogFooter className="flex-col gap-2 sm:flex-row">
                {selectedApp.status === 'pending' && (
                  <>
                    <Button
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                      onClick={() => handleReject(selectedApp.id)}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => handleApprove(selectedApp.id)}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Approve Badge
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
