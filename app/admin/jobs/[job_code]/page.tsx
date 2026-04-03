import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getTopTutors } from '@/lib/matching'
import { JobClientActions } from './JobClientActions'
import { requireAdmin } from '@/lib/auth'

export default async function JobDetailPage({ params }: { params: Promise<{ job_code: string }> }) {
  const resolvedParams = await params
  const jobCode = resolvedParams.job_code

  await requireAdmin(`/admin/jobs/${jobCode}`)
  const supabase = await createClient()

  // 1. Fetch Job
  const { data: job, error } = await supabase
    .from('parent_requests')
    .select(`
      *,
      applications:tutor_applications (
        id,
        tutor_id,
        status,
        created_at,
        tutor:tutors (*)
      )
    `)
    .eq('job_code', jobCode)
    .single()

  if (error || !job) {
    notFound()
  }

  // 2. Automated Matching Tutors
  const matchedTutors = await getTopTutors(job.subject, job.student_grade, job.schedule || '')

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job Dashboard: {job.job_code}</h1>
        <p className="mt-2 text-muted-foreground">Manage job info, matching, and applicants.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* SECTION 1: Job Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <div className="flex gap-2 pt-2">
                <Badge variant={job.status === 'pending' ? 'destructive' : job.status === 'posted' ? 'default' : 'secondary'}>
                  {job.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground">Parent Name</dt>
                  <dd className="font-semibold">{job.parent_name}</dd>
                </dl>
              </div>
              <div>
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground">Contact</dt>
                  <dd className="font-semibold">{job.phone}</dd>
                </dl>
              </div>
              <div>
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground">Subject & Grade</dt>
                  <dd className="font-semibold">{job.subject} - {job.student_grade}</dd>
                </dl>
              </div>
              <div>
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground">Schedule</dt>
                  <dd className="font-semibold">{job.schedule}</dd>
                </dl>
              </div>
              <div>
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground">Location</dt>
                  <dd className="font-semibold">{job.location}</dd>
                </dl>
              </div>
              <div>
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground">Additional Notes</dt>
                  <dd className="text-sm whitespace-pre-wrap">{job.notes || 'None'}</dd>
                </dl>
              </div>

              {/* Server Action trigger via Client Component */}
              <div className="pt-4 border-t">
                 <JobClientActions jobCode={job.job_code} status={job.status} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* SECTION 2: Suggested Tutors */}
          <Card className="border-blue-200 shadow-sm bg-blue-50/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">⭐ Auto-Matched Tutors</CardTitle>
              <CardDescription>Top 3 matches based on subject, grade, and stats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <JobClientActions jobCode={job.job_code} isSuggestedAction={true} />
              </div>
              {matchedTutors.length > 0 ? (
                <div className="space-y-4">
                  {matchedTutors.map((t) => (
                    <div key={t.id} className="flex justify-between items-center rounded bg-white dark:bg-slate-900 border p-3">
                      <div>
                        <div className="font-bold flex items-center gap-2">
                           {t.full_name}
                           <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                             {t.matchPercentage}% Match
                           </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {t.subjects.join(', ')} • {t.years_experience || t.experience || 0} yrs exp • {t.number_of_jobs_completed || 0} jobs done
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground text-sm">No highly relevant tutors found.</div>
              )}
            </CardContent>
          </Card>

          {/* SECTION 3: All Applicants List */}
          <Card>
            <CardHeader>
              <CardTitle>Applications ({job.applications?.length || 0})</CardTitle>
              <CardDescription>Tutors who have applied for this job</CardDescription>
            </CardHeader>
            <CardContent>
              {job.applications && job.applications.length > 0 ? (
                <div className="space-y-4">
                  {job.applications.map((app: any) => (
                     <div key={app.id} className={`flex flex-col justify-between border p-4 sm:flex-row sm:items-center rounded-sm ${app.status === 'selected' ? 'bg-green-50/50 border-green-200' : ''}`}>
                       <div>
                         <p className="font-semibold">{app.tutor?.full_name}</p>
                         <p className="text-sm text-muted-foreground">{app.tutor?.phone} • {app.tutor?.email}</p>
                         <Badge className="mt-2" variant={app.status === 'selected' ? 'default' : 'outline'}>{app.status}</Badge>
                       </div>
                       <div className="mt-4 sm:mt-0 flex gap-2">
                          <JobClientActions 
                            jobCode={job.job_code}
                            applicationId={app.id} 
                            tutorId={app.tutor_id} 
                            isApplicantAction={true}
                            applicantStatus={app.status}
                          />
                       </div>
                     </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No applications yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
