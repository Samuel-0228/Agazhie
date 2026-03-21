import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Users, BookOpen, DollarSign, Star } from 'lucide-react'

const metrics = [
  {
    title: 'New Users (This Week)',
    value: '47',
    change: '+23%',
    trend: 'up',
    breakdown: { parents: 31, tutors: 16 },
    icon: Users,
  },
  {
    title: 'Sessions Completed (This Week)',
    value: '128',
    change: '+15%',
    trend: 'up',
    breakdown: { live: 89, assignments: 39 },
    icon: BookOpen,
  },
  {
    title: 'GMV (Gross Value, 30d)',
    value: '142,500 ETB',
    change: '+31%',
    trend: 'up',
    breakdown: { sessions: 98200, assignments: 44300 },
    icon: DollarSign,
  },
  {
    title: 'Platform Commission (30d)',
    value: '21,375 ETB',
    change: '+31%',
    trend: 'up',
    breakdown: { rate: '15%' },
    icon: DollarSign,
  },
  {
    title: 'Average Tutor Rating',
    value: '4.6',
    change: '+0.1',
    trend: 'up',
    breakdown: { reviews: 312 },
    icon: Star,
  },
  {
    title: 'Dispute Rate',
    value: '2.1%',
    change: '-0.4%',
    trend: 'down_good',
    breakdown: { total: 4, resolved: 3 },
    icon: TrendingDown,
  },
]

const cityStats = [
  { city: 'Addis Ababa', users: 287, sessions: 103, revenue: '128,400 ETB' },
  { city: 'Adama', users: 23, sessions: 8, revenue: '8,200 ETB' },
  { city: 'Bahir Dar', users: 18, sessions: 6, revenue: '4,900 ETB' },
  { city: 'Mekelle', users: 14, sessions: 5, revenue: '3,600 ETB' },
  { city: 'Hawassa', users: 11, sessions: 4, revenue: '2,800 ETB' },
]

const weeklyData = [
  { week: 'Mar 1', parents: 12, tutors: 5, sessions: 24, revenue: 18400 },
  { week: 'Mar 8', parents: 18, tutors: 7, sessions: 31, revenue: 24200 },
  { week: 'Mar 15', parents: 23, tutors: 9, sessions: 42, revenue: 33100 },
  { week: 'Mar 21', parents: 31, tutors: 16, sessions: 47, revenue: 38200 },
]

export default function MetricsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Metrics</h1>
        <p className="mt-2 text-muted-foreground">
          Platform performance, user growth, and revenue metrics for the past 30 days.
        </p>
      </div>

      {/* Key metrics */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m) => (
          <Card key={m.title}>
            <CardContent className="pt-5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{m.title}</p>
                  <p className="mt-1 text-2xl font-bold">{m.value}</p>
                  <p className={`mt-1 flex items-center gap-1 text-xs ${
                    m.trend === 'up' ? 'text-green-600' : m.trend === 'down_good' ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {m.trend === 'up' || m.trend === 'down_good' ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {m.change} vs last period
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <m.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly trend table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Weekly Growth Trends</CardTitle>
          <CardDescription>New users and sessions per week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-2 text-left font-medium">Week</th>
                  <th className="pb-2 text-right font-medium">New Parents</th>
                  <th className="pb-2 text-right font-medium">New Tutors</th>
                  <th className="pb-2 text-right font-medium">Sessions</th>
                  <th className="pb-2 text-right font-medium">Revenue (ETB)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {weeklyData.map((row) => (
                  <tr key={row.week}>
                    <td className="py-2.5 font-medium">{row.week}</td>
                    <td className="py-2.5 text-right">{row.parents}</td>
                    <td className="py-2.5 text-right">{row.tutors}</td>
                    <td className="py-2.5 text-right">{row.sessions}</td>
                    <td className="py-2.5 text-right">{row.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* City stats */}
      <Card>
        <CardHeader>
          <CardTitle>City-Level Statistics</CardTitle>
          <CardDescription>User distribution and activity across Ethiopian cities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-2 text-left font-medium">City</th>
                  <th className="pb-2 text-right font-medium">Total Users</th>
                  <th className="pb-2 text-right font-medium">Sessions (30d)</th>
                  <th className="pb-2 text-right font-medium">Revenue (30d)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {cityStats.map((row) => (
                  <tr key={row.city}>
                    <td className="py-2.5 font-medium">{row.city}</td>
                    <td className="py-2.5 text-right">{row.users}</td>
                    <td className="py-2.5 text-right">{row.sessions}</td>
                    <td className="py-2.5 text-right">{row.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Platform is expanding. Addis Ababa currently represents 82% of GMV. Adama and Bahir Dar showing early growth signals.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
