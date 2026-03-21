import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const reviewSchema = z.object({
  action: z.enum(['approve', 'reject']),
  notes: z.string().optional(),
})

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    if (!id) {
      return NextResponse.json({ error: 'Application ID required' }, { status: 400 })
    }

    const body = await request.json()
    const parsed = reviewSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const newStatus = parsed.data.action === 'approve' ? 'approved' : 'rejected'

    // Fetch the application first
    const { data: application, error: fetchError } = await supabase
      .from('tutor_applications')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    // Update application status
    const { error: updateError } = await supabase
      .from('tutor_applications')
      .update({
        status: newStatus,
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (updateError) {
      console.error('[PATCH /api/admin/applications/[id]] Update error:', updateError)
      return NextResponse.json({ error: 'Failed to update application' }, { status: 500 })
    }

    // If approved, create a tutor profile entry
    if (newStatus === 'approved') {
      // Look up the user by email to get their auth id
      const { data: matchedProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', application.user_id ?? '')
        .maybeSingle()

      // Only create tutor record if we can identify the user
      // If the applicant has no account yet, the tutor record will be created when they sign up.
      if (matchedProfile || application.user_id) {
        const { error: tutorError } = await supabase.from('tutors').upsert(
          {
            user_id: application.user_id ?? matchedProfile?.id,
            university: application.university,
            major: application.major,
            year_of_study: application.year_of_study,
            subjects: application.subjects,
            grade_levels: application.grade_levels,
            specialization: application.specialization,
            hourly_rate: application.hourly_rate,
            bio: application.bio,
            experience: application.experience,
            availability: application.availability,
            is_verified: true,
            is_active: true,
          },
          { onConflict: 'user_id' },
        )

        if (tutorError) {
          // Log but don't fail the whole request — application is already approved
          console.error('[PATCH /api/admin/applications/[id]] Tutor upsert error:', tutorError)
        }
      }
    }

    return NextResponse.json({ success: true, status: newStatus })
  } catch (err) {
    console.error('[PATCH /api/admin/applications/[id]] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
