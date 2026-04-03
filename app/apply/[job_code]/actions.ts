'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitApplication(jobCode: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Please log in to apply.' }
  }

  const { data: tutor } = await supabase
    .from('tutors')
    .select('id, is_verified, is_open_for_jobs')
    .eq('id', user.id)
    .single()

  if (!tutor) {
    return { success: false, error: 'Complete your tutor profile first.' }
  }

  if (!tutor.is_verified) {
    return { success: false, error: 'Your profile is not verified yet.' }
  }

  if (!tutor.is_open_for_jobs) {
    return { success: false, error: 'Enable Open for Jobs before applying.' }
  }

  const { error } = await supabase
    .from('tutor_applications')
    .insert({
      job_code: jobCode,
      tutor_id: user.id,
      status: 'applied'
    })

  if (error) {
    if (error.code === '23505') {
       return { success: false, error: 'You have already applied for this job.' }
    }
    return { success: false, error: error.message }
  }

  revalidatePath(`/apply/${jobCode}`)
  return { success: true }
}

export async function enableOpenForJobs(jobCode: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Please log in first.' }
  }

  const { error } = await supabase
    .from('tutors')
    .update({ is_open_for_jobs: true })
    .eq('id', user.id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath(`/apply/${jobCode}`)
  return { success: true }
}
