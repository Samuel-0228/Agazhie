'use server'

import { requireAdmin } from '@/lib/auth'
import { postJobToChannel } from '@/lib/telegram'
import { sendTopTutorsShortlist } from '@/lib/telegram'
import { getTopTutors } from '@/lib/matching'
import { revalidatePath } from 'next/cache'

export async function approveAndPostJob(jobCode: string) {
  const { supabase, user } = await requireAdmin(`/admin/jobs/${jobCode}`)

  const { data: job, error: jobError } = await supabase
    .from('parent_requests')
    .select('*')
    .eq('job_code', jobCode)
    .single()

  if (jobError || !job) {
    return { success: false, error: 'Job not found' }
  }

  const channel = process.env.TELEGRAM_CHANNEL_USERNAME || '@Buna_tutorsbot'
  const applyLink = `${process.env.NEXT_PUBLIC_SITE_URL}/apply/${jobCode}`

  if (job.status === 'posted' || job.status === 'completed') {
    return { success: false, error: 'This job has already been posted.' }
  }

  try {
    await postJobToChannel(
      {
        channelChat: channel,
        jobCode,
        subject: job.subject,
        grade: job.student_grade,
        location: job.location,
        schedule: job.schedule,
        notes: job.notes,
        applyLink,
      }
    )
  } catch (err: any) {
    return { success: false, error: `Failed to post to Telegram: ${err.message}` }
  }

  const { error: updateError } = await supabase
    .from('parent_requests')
    .update({
      status: 'posted',
      approved_by: user.id,
      posted_at: new Date().toISOString(),
    })
    .eq('job_code', jobCode)

  if (updateError) {
    return { success: false, error: updateError.message }
  }

  revalidatePath(`/admin/jobs/${jobCode}`)
  revalidatePath('/admin')
  return { success: true }
}

export async function sendTop3ToTelegram(jobCode: string) {
  const { supabase } = await requireAdmin(`/admin/jobs/${jobCode}`)

  const { data: job, error } = await supabase
    .from('parent_requests')
    .select('*')
    .eq('job_code', jobCode)
    .single()

  if (error || !job) {
    return { success: false, error: 'Job not found.' }
  }

  const topTutors = await getTopTutors(job.subject, job.student_grade, job.schedule || '')
  if (!topTutors.length) {
    return { success: false, error: 'No relevant tutors found for shortlist.' }
  }

  const targetChat = process.env.ADMIN_TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHANNEL_USERNAME
  if (!targetChat) {
    return { success: false, error: 'Telegram target chat is not configured.' }
  }

  try {
    await sendTopTutorsShortlist({
      chatId: targetChat,
      jobCode,
      subject: job.subject,
      grade: job.student_grade,
      tutors: topTutors.map((t) => ({
        full_name: t.full_name,
        phone: t.phone,
        years_experience: t.years_experience,
        number_of_jobs_completed: t.number_of_jobs_completed,
        matchPercentage: t.matchPercentage,
      })),
    })
  } catch (e: any) {
    return { success: false, error: e.message || 'Failed to send shortlist to Telegram.' }
  }

  return { success: true }
}

export async function regenerateMatches(jobCode: string) {
  await requireAdmin(`/admin/jobs/${jobCode}`)
  revalidatePath(`/admin/jobs/${jobCode}`)
  return { success: true }
}

export async function markTutorSelected(applicationId: string, jobCode: string, tutorId: string) {
  const { supabase } = await requireAdmin(`/admin/jobs/${jobCode}`)

  const { error: appError } = await supabase
    .from('tutor_applications')
    .update({ status: 'selected' })
    .eq('id', applicationId)

  if (appError) return { success: false, error: appError.message }

  await supabase
    .from('tutor_applications')
    .update({ status: 'rejected' })
    .eq('job_code', jobCode)
    .neq('id', applicationId)

  await supabase
    .from('parent_requests')
    .update({ status: 'completed', selected_tutor_id: tutorId })
    .eq('job_code', jobCode)

  const { data: tutor } = await supabase
    .from('tutors')
    .select('number_of_jobs_completed')
    .eq('id', tutorId)
    .single()

  if (tutor) {
    await supabase
      .from('tutors')
      .update({ number_of_jobs_completed: (tutor.number_of_jobs_completed || 0) + 1 })
      .eq('id', tutorId)
  }

  revalidatePath(`/admin/jobs/${jobCode}`)
  revalidatePath('/admin')
  return { success: true }
}
