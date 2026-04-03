import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Lock, FileWarning } from 'lucide-react'
import { ApplyButton } from './ApplyButton'
import { enableOpenForJobs } from './actions'

export default async function TutorApplyPage({ params }: { params: Promise<{ job_code: string }> }) {
  const resolvedParams = await params
  const jobCode = resolvedParams.job_code
  
  const supabase = await createClient()

  // 1. Check Authentication
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect(`/auth/login?redirect=/apply/${jobCode}`)
  }

  // 2. Fetch Job Details
  const { data: job, error: jobError } = await supabase
    .from('parent_requests')
    .select('*')
    .eq('job_code', jobCode)
    .single()

  if (jobError || !job) {
    notFound()
  }

  // 3. Fetch Tutor Profile & Verification Status
  const { data: tutor } = await supabase
    .from('tutors')
    .select('*')
    .eq('id', user.id)
    .single()

  // 4. Check if already applied
  let hasApplied = false
  if (tutor) {
    const { data: existingApp } = await supabase
      .from('tutor_applications')
      .select('id')
      .eq('job_code', jobCode)
      .eq('tutor_id', tutor.id)
      .single()
      
    if (existingApp) {
      hasApplied = true
    }
  }

  // View Restrictions
  if (!tutor) {
    return (
      <div className="p-8 max-w-xl mx-auto flex flex-col items-center text-center space-y-4">
        <FileWarning className="h-16 w-16 text-amber-500" />
        <h1 className="text-2xl font-bold">Profile Not Found</h1>
        <p className="text-muted-foreground">You must complete your tutor profile before you can apply to jobs.</p>
        <Button asChild><a href="/become-tutor">Complete Profile</a></Button>
      </div>
    )
  }

  if (!tutor.is_verified) {
    redirect('/become-tutor/success')
  }

  if (!tutor.is_open_for_jobs) {
    async function openJobsAction() {
      'use server'
      await enableOpenForJobs(jobCode)
    }

    return (
      <div className="p-8 max-w-xl mx-auto flex flex-col items-center text-center space-y-4">
        <Lock className="h-16 w-16 text-amber-500" />
        <h1 className="text-2xl font-bold">Open for Jobs is Off</h1>
        <p className="text-muted-foreground">Enable Open for Jobs in your tutor profile to apply for opportunities.</p>
        <form action={openJobsAction}>
          <Button variant="outline" type="submit">Turn On Open for Jobs</Button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Apply for Tutoring Job</h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Review the job details below before submitting your application.</p>
        </div>

        <Card className="shadow-lg border-0 ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader className="bg-white dark:bg-slate-900 border-b pb-6">
            <div className="flex items-center justify-between">
               <CardTitle className="text-2xl">{job.subject}</CardTitle>
               <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100 px-3 py-1 text-sm">{job.student_grade}</Badge>
            </div>
            <CardDescription className="font-mono text-sm tracking-widest mt-2">{job.job_code}</CardDescription>
          </CardHeader>
          <CardContent className="bg-white dark:bg-slate-900 pt-6 space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-1">Schedule</h3>
                   <p className="font-medium">{job.schedule}</p>
                </div>
                <div>
                   <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-1">Location</h3>
                   <p className="font-medium">{job.location}</p>
                </div>
                <div className="md:col-span-2">
                   <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-1">Additional Notes</h3>
                   <p className="rounded-sm bg-slate-50 p-4 whitespace-pre-wrap text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                     {job.notes || 'No additional notes provided.'}
                   </p>
                </div>
             </div>

             <div className="border-t pt-6 mt-6 flex flex-col items-center">
                {hasApplied ? (
                  <div className="flex flex-col items-center text-green-600 dark:text-green-400 gap-2">
                    <CheckCircle2 className="h-10 w-10" />
                    <span className="font-bold text-lg">You have applied for this job!</span>
                    <p className="text-sm text-slate-500">The admin team will review matches and contact selected tutors.</p>
                  </div>
                ) : (
                  <ApplyButton jobCode={jobCode} />
                )}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
