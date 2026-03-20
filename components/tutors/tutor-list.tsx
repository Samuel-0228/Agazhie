'use client'

import { TutorCard, type Tutor } from './tutor-card'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
import { Search } from 'lucide-react'

interface TutorListProps {
  tutors: Tutor[]
}

export function TutorList({ tutors }: TutorListProps) {
  if (tutors.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Search />
          </EmptyMedia>
          <EmptyTitle>No tutors found</EmptyTitle>
          <EmptyDescription>
            Try adjusting your filters or search criteria to find more tutors.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {tutors.map((tutor) => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  )
}
