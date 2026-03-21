import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const applicationSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(9, 'Phone number required'),
  university: z.string().min(2, 'University required'),
  yearOfStudy: z.string().optional(),
  major: z.string().optional(),
  subjects: z.array(z.string()).min(1, 'At least one subject required'),
  gradeLevels: z.array(z.string()).optional(),
  specialization: z.string().optional(),
  hourlyRate: z.number().int().positive('Hourly rate must be positive'),
  bio: z.string().min(20, 'Bio must be at least 20 characters').optional(),
  experience: z.string().optional(),
  availability: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = applicationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const data = parsed.data
    const supabase = await createClient()

    const { data: inserted, error } = await supabase
      .from('tutor_applications')
      .insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        university: data.university,
        year_of_study: data.yearOfStudy ?? null,
        major: data.major ?? null,
        subjects: data.subjects,
        grade_levels: data.gradeLevels ?? [],
        specialization: data.specialization ?? null,
        hourly_rate: data.hourlyRate,
        bio: data.bio ?? null,
        experience: data.experience ?? null,
        availability: data.availability ?? null,
        status: 'pending',
      })
      .select('id')
      .single()

    if (error) {
      // Handle duplicate application (same email already applied)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'An application with this email already exists.' },
          { status: 409 },
        )
      }
      console.error('[POST /api/applications] Supabase error:', error)
      return NextResponse.json({ error: 'Failed to submit application. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ id: inserted.id }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/applications] Unexpected error:', err)
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

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const url = new URL(request.url)
    const status = url.searchParams.get('status')

    let query = supabase
      .from('tutor_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error('[GET /api/applications] Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
    }

    return NextResponse.json({ applications: data })
  } catch (err) {
    console.error('[GET /api/applications] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
