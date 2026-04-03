const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app/admin/page.tsx');
const newContent = `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MessageSquare, ArrowRight, ClipboardList, Users } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  
  // Fetch recent requests
  const { data: recentRequests, error: demandsErr } = await supabase
    .from('tutor_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  // Fetch recent applications
  const { data: recentApplications, error: appsErr } = await supabase
    .from('tutor_applications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  const pendingRequests = recentRequests?.filter(r => r.status === 'new').length || 0;
  const pendingApps = recentApplications?.filter(r => r.status === 'pending').length || 0;

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
                <p className="text-sm text-muted-foreground">Total Jobs</p>
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
                <p className="text-sm text-muted-foreground">New Requests</p>
                <p className="text-3xl font-bold text-amber-500">{pendingRequests}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-amber-500/10">
                <ClipboardList className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Tutor Apps</p>
                <p className="text-3xl font-bold text-blue-500">{pendingApps}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-blue-500/10">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Recent Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Parent Requests</CardTitle>
              <CardDescription>Latest requests for a tutor</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {demandsErr ? (
              <div className="text-red-500">Failed to load requests: {demandsErr.message}</div>
            ) : recentRequests && recentRequests.length > 0 ? (
              <div className="flex flex-col gap-4">
                {recentRequests.slice(0, 5).map((req) => (
                  <div key={req.id} className="flex items-center justify-between rounded-sm border border-border p-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold flex items-center gap-2">
                        {req.parent_name}
                        <Badge 
                          variant={req.status === 'new' ? 'destructive' : req.status === 'fulfilled' ? 'default' : 'secondary'}
                          className="capitalize text-[10px]"
                        >
                          {req.status}
                        </Badge>
                      </p>
                      <p className="font-medium truncate text-sm text-muted-foreground">{req.grade_level} - {Array.isArray(req.subjects) ? req.subjects.join(', ') : req.subjects}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-4 text-center">No requests found yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Tutor Applications</CardTitle>
              <CardDescription>Latest tutors waiting for review</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {appsErr ? (
              <div className="text-red-500">Failed to load applications: {appsErr.message}</div>
            ) : recentApplications && recentApplications.length > 0 ? (
              <div className="flex flex-col gap-4">
                {recentApplications.slice(0, 5).map((app) => (
                  <div key={app.id} className="flex items-center justify-between rounded-sm border border-border p-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold flex items-center gap-2">
                        {app.full_name}
                        <Badge 
                          variant={app.status === 'pending' ? 'destructive' : app.status === 'approved' ? 'default' : 'secondary'}
                          className="capitalize text-[10px]"
                        >
                          {app.status}
                        </Badge>
                      </p>
                      <p className="font-medium truncate text-sm text-muted-foreground">{app.university} - {app.major}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-4 text-center">No applications found yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
`;

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully updated app/admin/page.tsx');
