'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { notifyAdminNewRequest } from '@/lib/telegram'

const ParentRequestSchema = z.object({
  parentName: z.string().min(2),
  phone: z.string().min(5),
  studentName: z.string().optional(),
  gradeLevel: z.string().min(1),
  selectedSubjects: z.array(z.string()).min(1),
  sessionType: z.string().min(1),
  frequency: z.string().min(1),
  paymentDuration: z.string().min(1),
  budget: z.string().min(1),
  location: z.string().optional(),
  additionalNotes: z.string().optional(),
})

function buildJobCode() {
  return `JOB-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
}

export async function submitParentRequest(input: unknown) {
  const parsed = ParentRequestSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: 'Invalid request data.' }
  }

  const data = parsed.data
  const supabase = await createClient()
  const jobCode = buildJobCode()

  // Ensure subjects is stringified properly or array based on schema
  const { error } = await supabase.from('parent_requests').insert({
    job_code: jobCode,
    parent_name: data.parentName,
    phone: data.phone,
    student_name: data.studentName || null,
    student_grade: data.gradeLevel,
    subject: data.selectedSubjects.join(', '),
    schedule: `${data.sessionType} - ${data.frequency}`,
    location: data.location || 'Online',
    notes: `Budget: ${data.budget} ETB/hr\nPayment: ${data.paymentDuration}\nNotes: ${data.additionalNotes || 'None'}`,
    status: 'pending'
  })

  if (error) {
    return { success: false, error: error.message }
  }

  try {
    await notifyAdminNewRequest({
      jobCode,
      parentName: data.parentName,
      phone: data.phone,
      subject: data.selectedSubjects.join(', '),
      grade: data.gradeLevel,
      schedule: `${data.sessionType} - ${data.frequency}`,
      location: data.location || 'Online',
      notes: data.additionalNotes || null,
    })
  } catch (e) {
    console.error('Telegram request notification failed', e)
  }

  return { success: true, jobCode }
}
