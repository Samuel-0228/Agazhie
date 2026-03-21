import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const url = new URL(request.url)

    const subject = url.searchParams.get('subject')
    const location = url.searchParams.get('location')
    const minRate = url.searchParams.get('minRate')
    const maxRate = url.searchParams.get('maxRate')
    const verified = url.searchParams.get('verified')
    const search = url.searchParams.get('search')
    const page = parseInt(url.searchParams.get('page') ?? '1', 10)
    const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '20', 10), 50)
    const offset = (page - 1) * limit

    let query = supabase
      .from('tutors')
      .select(
        'id, user_id, university, major, subjects, grade_levels, specialization, hourly_rate, bio, location, is_verified, rating, review_count, languages, availability, created_at',
        { count: 'exact' },
      )
      .eq('is_active', true)
      .order('rating', { ascending: false })
      .range(offset, offset + limit - 1)

    if (subject) {
      // Filter tutors who teach the given subject (case-insensitive array contains)
      query = query.contains('subjects', [subject])
    }

    if (location) {
      query = query.ilike('location', `%${location}%`)
    }

    if (minRate) {
      query = query.gte('hourly_rate', parseInt(minRate, 10))
    }

    if (maxRate) {
      query = query.lte('hourly_rate', parseInt(maxRate, 10))
    }

    if (verified === 'true') {
      query = query.eq('is_verified', true)
    }

    if (search) {
      // Full-text search on bio, university, major
      query = query.or(
        `bio.ilike.%${search}%,university.ilike.%${search}%,major.ilike.%${search}%`,
      )
    }

    const { data, error, count } = await query

    if (error) {
      console.error('[GET /api/tutors] Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch tutors' }, { status: 500 })
    }

    // Join with profiles to get the tutor's display name
    const tutorIds = (data ?? []).map((t) => t.user_id).filter(Boolean)
    let profileMap: Record<string, string> = {}
    if (tutorIds.length > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', tutorIds)
      profileMap = Object.fromEntries((profiles ?? []).map((p) => [p.id, p.full_name]))
    }

    const enriched = (data ?? []).map((t) => ({
      ...t,
      name: profileMap[t.user_id] ?? 'Tutor',
    }))

    return NextResponse.json({
      tutors: enriched,
      total: count ?? 0,
      page,
      limit,
    })
  } catch (err) {
    console.error('[GET /api/tutors] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
