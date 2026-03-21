import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const requestSchema = z.object({
  parentName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(9, 'Phone number required'),
  studentName: z.string().min(2, 'Student name required'),
  gradeLevel: z.string().min(1, 'Grade level required'),
  subjects: z.array(z.string()).min(1, 'At least one subject required'),
  sessionType: z.enum(['in-person', 'online', 'both']),
  frequency: z.string().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
  preferredTutorId: z.string().uuid().optional(),
  budget: z.number().int().positive().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = requestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const data = parsed.data
    const supabase = await createClient()

    // Optionally associate the request with a logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data: inserted, error } = await supabase
      .from('tutor_requests')
      .insert({
        parent_id: user?.id ?? null,
        parent_name: data.parentName,
        email: data.email,
        phone: data.phone,
        student_name: data.studentName,
        grade_level: data.gradeLevel,
        subjects: data.subjects,
        session_type: data.sessionType,
        frequency: data.frequency ?? null,
        location: data.location ?? null,
        notes: data.notes ?? null,
        tutor_id: data.preferredTutorId ?? null,
        status: 'new',
      })
      .select('id')
      .single()

    if (error) {
      console.error('[POST /api/requests] Supabase error:', error)
      return NextResponse.json({ error: 'Failed to submit request. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ id: inserted.id }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/requests] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    let query = supabase
      .from('tutor_requests')
      .select('*')
      .order('created_at', { ascending: false })

    // Non-admins can only see their own requests
    if (profile?.role !== 'admin') {
      query = query.eq('parent_id', user.id)
    }

    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error('[GET /api/requests] Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 })
    }

    return NextResponse.json({ requests: data })
  } catch (err) {
    console.error('[GET /api/requests] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
