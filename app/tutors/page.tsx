import { Suspense } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { TutorFilters } from '@/components/tutors/tutor-filters'
import { TutorList } from '@/components/tutors/tutor-list'
import { Skeleton } from '@/components/ui/skeleton'
import type { Tutor } from '@/components/tutors/tutor-card'

// Sample data - will be replaced with database queries
const sampleTutors: Tutor[] = [
  {
    id: '1',
    name: 'Abebe Kebede',
    initials: 'AK',
    university: 'Addis Ababa University - Physics',
    subjects: ['Physics', 'Mathematics', 'Chemistry'],
    rating: 4.9,
    reviewCount: 47,
    hourlyRate: 350,
    location: 'Addis Ababa',
    isVerified: true,
    specialization: 'EUEE Expert',
    bio: 'Final year physics student with 3 years of tutoring experience. Helped 50+ students score above 90% in EUEE physics. Patient and methodical teaching approach.',
  },
  {
    id: '2',
    name: 'Sara Tesfaye',
    initials: 'ST',
    university: 'AAiT - Computer Science',
    subjects: ['Mathematics', 'ICT', 'English'],
    rating: 4.8,
    reviewCount: 32,
    hourlyRate: 300,
    location: 'Addis Ababa',
    isVerified: true,
    specialization: 'SAT Prep',
    bio: 'Scored 1520 on SAT and passionate about helping students achieve their dreams of studying abroad. Specializing in SAT Math and English preparation.',
  },
  {
    id: '3',
    name: 'Dawit Mulugeta',
    initials: 'DM',
    university: 'Bahir Dar University - Biology',
    subjects: ['Biology', 'Chemistry', 'Physics'],
    rating: 4.7,
    reviewCount: 28,
    hourlyRate: 280,
    location: 'Bahir Dar',
    isVerified: true,
    bio: 'Medical school aspirant with strong foundation in natural sciences. I make complex biological concepts easy to understand through visual learning and real-world examples.',
  },
  {
    id: '4',
    name: 'Hanna Girma',
    initials: 'HG',
    university: 'Hawassa University - Mathematics',
    subjects: ['Mathematics', 'Physics'],
    rating: 4.9,
    reviewCount: 56,
    hourlyRate: 320,
    location: 'Hawassa',
    isVerified: true,
    specialization: 'EUEE Expert',
    bio: 'Top scorer in national mathematics olympiad. Specialized in helping struggling students build confidence and strong foundations in mathematics.',
  },
  {
    id: '5',
    name: 'Yonas Bekele',
    initials: 'YB',
    university: 'Jimma University - English',
    subjects: ['English', 'History', 'Civics'],
    rating: 4.6,
    reviewCount: 21,
    hourlyRate: 250,
    location: 'Online Only',
    isVerified: true,
    specialization: 'IELTS/TOEFL',
    bio: 'IELTS Band 8.5 scorer offering comprehensive English language tutoring. Flexible online sessions for students anywhere in Ethiopia.',
  },
  {
    id: '6',
    name: 'Meron Alemu',
    initials: 'MA',
    university: 'Mekelle University - Chemistry',
    subjects: ['Chemistry', 'Biology', 'Mathematics'],
    rating: 4.8,
    reviewCount: 39,
    hourlyRate: 300,
    location: 'Mekelle',
    isVerified: true,
    bio: 'Chemistry graduate with a passion for making science fun and accessible. I use interactive experiments and demonstrations to help concepts stick.',
  },
]

function TutorListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-lg border border-border bg-card p-6">
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

export default function TutorsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Find Tutors</h1>
            <p className="mt-2 text-muted-foreground">
              Browse our verified tutors and find the perfect match for your child.
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
                  {sampleTutors.length} tutors found
                </p>
              </div>

              <Suspense fallback={<TutorListSkeleton />}>
                <TutorList tutors={sampleTutors} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
