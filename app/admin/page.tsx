import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  UserCheck, 
  MessageSquare, 
  ClipboardList,
  TrendingUp,
  ArrowRight 
} from 'lucide-react'
import Link from 'next/link'

const stats = [
  {
    title: 'Total Tutors',
    value: '47',
    change: '+5 this week',
    icon: UserCheck,
    href: '/admin/tutors',
  },
  {
    title: 'Pending Applications',
    value: '12',
    change: '3 new today',
    icon: ClipboardList,
    href: '/admin/applications',
  },
  {
    title: 'Active Requests',
    value: '28',
    change: '+8 this week',
    icon: MessageSquare,
    href: '/admin/requests',
  },
  {
    title: 'Total Users',
    value: '324',
    change: '+23 this month',
    icon: Users,
    href: '/admin/users',
  },
]

const recentApplications = [
  {
    id: '1',
    name: 'Kidist Alemayehu',
    university: 'Addis Ababa University',
    subjects: ['Mathematics', 'Physics'],
    date: '2 hours ago',
    status: 'pending',
  },
  {
    id: '2',
    name: 'Yohannes Tadesse',
    university: 'AAiT',
    subjects: ['Computer Science', 'Mathematics'],
    date: '5 hours ago',
    status: 'pending',
  },
  {
    id: '3',
    name: 'Hiwot Gebremedhin',
    university: 'Bahir Dar University',
    subjects: ['Chemistry', 'Biology'],
    date: '1 day ago',
    status: 'reviewing',
  },
]

const recentRequests = [
  {
    id: '1',
    parentName: 'Tigist Haile',
    studentGrade: 'Grade 11',
    subjects: ['Physics', 'Chemistry'],
    date: '1 hour ago',
    status: 'new',
  },
  {
    id: '2',
    parentName: 'Bekele Tadesse',
    studentGrade: 'Grade 12',
    subjects: ['Mathematics'],
    date: '3 hours ago',
    status: 'matched',
  },
  {
    id: '3',
    parentName: 'Meron Getachew',
    studentGrade: 'Grade 10',
    subjects: ['English', 'History'],
    date: '1 day ago',
    status: 'new',
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Overview of your tutoring platform activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-primary">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <Link href={stat.href}>
                <Button variant="link" className="mt-2 h-auto p-0 text-xs">
                  View all
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>New tutor applications awaiting review</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/applications">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{app.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{app.university}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {app.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <Badge 
                      variant={app.status === 'pending' ? 'outline' : 'secondary'}
                      className="capitalize"
                    >
                      {app.status}
                    </Badge>
                    <p className="mt-1 text-xs text-muted-foreground">{app.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Requests</CardTitle>
              <CardDescription>Latest tutor requests from parents</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/requests">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {recentRequests.map((req) => (
                <div key={req.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{req.parentName}</p>
                    <p className="text-sm text-muted-foreground">{req.studentGrade}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {req.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <Badge 
                      variant={req.status === 'new' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {req.status}
                    </Badge>
                    <p className="mt-1 text-xs text-muted-foreground">{req.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
