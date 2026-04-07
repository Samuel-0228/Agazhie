'use client'

import { TutorCard, type Tutor } from './tutor-card'
import { Empty } from '@/components/ui/empty'
import { Search } from 'lucide-react'

interface TutorListProps {
  tutors: Tutor[]
}

export function TutorList({ tutors }: TutorListProps) {
  if (tutors.length === 0) {
    return (
      <Empty
        icon={Search}
        title="No tutors found"
        description="Try adjusting your filters or search criteria to find more tutors."
      />
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
