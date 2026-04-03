import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MessageSquare, ArrowRight, ClipboardList } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  
  // Fetch real data
  const { data: recentRequests, error } = await supabase
    .from('parent_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  const pendingCount = recentRequests?.filter(r => r.status === 'pending').length || 0;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Overview of your tutoring agency activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-3xl font-bold">{recentRequests?.length || 0}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-3xl font-bold text-amber-500">{pendingCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-amber-500/10">
                <ClipboardList className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <div className="mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Parent Requests</CardTitle>
              <CardDescription>Latest tutor jobs to match and broadcast</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-red-500">Failed to load requests: {error.message}</div>
            ) : recentRequests && recentRequests.length > 0 ? (
              <div className="flex flex-col gap-4">
                {recentRequests.map((req) => (
                  <div key={req.job_code} className="flex items-center justify-between rounded-sm border border-border p-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold flex items-center gap-2">
                        {req.job_code}
                        <Badge 
                          variant={req.status === 'pending' ? 'destructive' : req.status === 'approved' ? 'default' : 'secondary'}
                          className="capitalize text-[10px]"
                        >
                          {req.status}
                        </Badge>
                      </p>
                      <p className="font-medium truncate">{req.parent_name} - {req.student_grade}</p>
                      <div className="mt-1 flex flex-wrap gap-1 text-sm text-muted-foreground">
                        {req.subject} | {req.location}
                      </div>
                    </div>
                    <div className="ml-4 flex items-center gap-2">
                      <Button variant="default" size="sm" asChild>
                        <Link href={`/admin/jobs/${req.job_code}`}>
                          Manage Job <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-4 text-center">No requests found yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
