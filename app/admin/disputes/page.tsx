import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, CheckCircle2, XCircle, Clock, MessageSquare } from 'lucide-react'

const disputes = [
  {
    id: '1',
    type: 'payment',
    title: 'Payment not released after session',
    parent: 'Tigist Haile',
    tutor: 'Abebe Kebede',
    amount: 350,
    status: 'open',
    priority: 'high',
    submittedAt: '2 hours ago',
    description: 'Parent claims session did not happen but tutor says it did. Payment is stuck in escrow.',
  },
  {
    id: '2',
    type: 'quality',
    title: 'Assignment solution quality dispute',
    parent: 'Bekele Tadesse',
    tutor: 'Dawit Mulugeta',
    amount: 120,
    status: 'reviewing',
    priority: 'medium',
    submittedAt: '1 day ago',
    description: 'Student says the submitted solution was incorrect and copied from the internet.',
  },
  {
    id: '3',
    type: 'no-show',
    title: 'Tutor did not show up for session',
    parent: 'Meron Getachew',
    tutor: 'Sara Tesfaye',
    amount: 500,
    status: 'resolved',
    priority: 'low',
    submittedAt: '3 days ago',
    description: 'Tutor missed the session without notice. Refund was processed.',
  },
  {
    id: '4',
    type: 'payment',
    title: 'Double charge for single session',
    parent: 'Kidist Alemayehu',
    tutor: 'Hanna Girma',
    amount: 400,
    status: 'open',
    priority: 'high',
    submittedAt: '4 hours ago',
    description: 'Parent was charged twice through Telebirr. Requesting refund of duplicate payment.',
  },
]

const priorityConfig: Record<string, { variant: 'default' | 'secondary' | 'outline' | 'destructive'; label: string }> = {
  high: { variant: 'destructive', label: 'High' },
  medium: { variant: 'secondary', label: 'Medium' },
  low: { variant: 'outline', label: 'Low' },
}

const statusConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  open: { color: 'text-red-500', icon: AlertTriangle, label: 'Open' },
  reviewing: { color: 'text-orange-500', icon: Clock, label: 'In Review' },
  resolved: { color: 'text-green-500', icon: CheckCircle2, label: 'Resolved' },
  rejected: { color: 'text-muted-foreground', icon: XCircle, label: 'Rejected' },
}

export default function DisputesPage() {
  const open = disputes.filter(d => d.status === 'open').length
  const reviewing = disputes.filter(d => d.status === 'reviewing').length

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dispute Resolution</h1>
        <p className="mt-2 text-muted-foreground">
          Review and resolve payment disputes and quality complaints between parents and tutors.
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm text-muted-foreground">Open Disputes</p>
            <p className="text-3xl font-bold text-red-500">{open}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm text-muted-foreground">In Review</p>
            <p className="text-3xl font-bold text-orange-500">{reviewing}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm text-muted-foreground">Resolved (30d)</p>
            <p className="text-3xl font-bold text-green-600">{disputes.filter(d => d.status === 'resolved').length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {disputes.map((dispute) => {
          const statusInfo = statusConfig[dispute.status]
          const StatusIcon = statusInfo.icon
          return (
            <Card key={dispute.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <StatusIcon className={`h-5 w-5 shrink-0 ${statusInfo.color}`} />
                    <div>
                      <CardTitle className="text-base">{dispute.title}</CardTitle>
                      <CardDescription>
                        Parent: {dispute.parent} · Tutor: {dispute.tutor} · {dispute.amount} ETB · {dispute.submittedAt}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={priorityConfig[dispute.priority].variant}>
                      {priorityConfig[dispute.priority].label} Priority
                    </Badge>
                    <Badge variant={dispute.status === 'resolved' ? 'outline' : 'secondary'} className="capitalize">
                      {statusInfo.label}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{dispute.description}</p>
                {dispute.status !== 'resolved' && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="gap-2">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Contact Both Parties
                    </Button>
                    <Button size="sm" className="gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Issue Refund
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      Release to Tutor
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
