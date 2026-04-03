import { Suspense } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { TutorFilters } from '@/components/tutors/tutor-filters'
import { TutorList } from '@/components/tutors/tutor-list'
import { Skeleton } from '@/components/ui/skeleton'
import type { Tutor } from '@/components/tutors/tutor-card'
import { createClient } from '@/lib/supabase/server'

function TutorListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-sm border border-border bg-card p-6">
          <div className="flex gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-18" />
              </div>
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function TutorsPage() {
  const supabase = await createClient()
  const { data: dbTutors } = await supabase.from('tutors').select('*').eq('status', 'open')

  const tutors: Tutor[] = dbTutors ? dbTutors.map((t: any) => ({
    id: t.id,
    name: t.name,
    initials: t.initials,
    university: t.university,
    subjects: t.subjects,
    rating: t.rating || 0,
    reviewCount: t.review_count || 0,
    hourlyRate: t.hourly_rate,
    location: t.location,
    isVerified: t.is_verified,
    specialization: t.specialization,
    badges: t.badges || [],
    grades: t.grades || [],
    bio: t.bio,
    ratings: t.ratings_json || { intelligence: 5, punctuality: 5, communication: 5, loyalty: 5 }
  })) : []

  return (
    <div className="page-shell flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-16">
        <div className="page-section">
          <div className="glass-panel mb-8 rounded-[2rem] p-8 md:p-10">
            <h1 className="text-4xl tracking-tight text-foreground sm:text-5xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Find the right tutor for your child.
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Browse verified tutors across Ethiopia, compare strengths, and choose someone who matches your subject, schedule, and learning goals.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="hidden lg:block">
              <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                <TutorFilters />
              </Suspense>
            </aside>

            <div>
              <div className="mb-6 lg:hidden">
                <Suspense fallback={<Skeleton className="h-10 w-full" />}>
                  <TutorFilters />
                </Suspense>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {tutors.length} tutors found
                </p>
              </div>

              <Suspense fallback={<TutorListSkeleton />}>
                <TutorList tutors={tutors} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
