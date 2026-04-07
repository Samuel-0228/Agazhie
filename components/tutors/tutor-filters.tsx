'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Amharic',
  'History',
  'Geography',
  'Economics',
  'ICT',
]

const gradeLevels = [
  { value: '9-10', label: 'Grade 9-10' },
  { value: '11-12', label: 'Grade 11-12' },
  { value: 'university', label: 'University' },
]

const specializations = [
  { value: 'euee', label: 'EUEE Expert' },
  { value: 'sat', label: 'SAT Prep' },
  { value: 'ielts', label: 'IELTS/TOEFL' },
]

const locations = [
  'Addis Ababa',
  'Bahir Dar',
  'Dire Dawa',
  'Hawassa',
  'Mekelle',
  'Online Only',
]

interface TutorFiltersProps {
  className?: string
}

function FilterContent({ onClose }: { onClose?: () => void }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    searchParams.get('subjects')?.split(',').filter(Boolean) || []
  )
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>(
    searchParams.get('specializations')?.split(',').filter(Boolean) || []
  )

  const updateFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (selectedSubjects.length > 0) {
      params.set('subjects', selectedSubjects.join(','))
    } else {
      params.delete('subjects')
    }
    
    if (selectedSpecializations.length > 0) {
      params.set('specializations', selectedSpecializations.join(','))
    } else {
      params.delete('specializations')
    }
    
    router.push(`/tutors?${params.toString()}`)
    onClose?.()
  }, [router, searchParams, selectedSubjects, selectedSpecializations, onClose])

  const clearFilters = useCallback(() => {
    setSelectedSubjects([])
    setSelectedSpecializations([])
    router.push('/tutors')
    onClose?.()
  }, [router, onClose])

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    )
  }

  const toggleSpecialization = (spec: string) => {
    setSelectedSpecializations(prev =>
      prev.includes(spec)
        ? prev.filter(s => s !== spec)
        : [...prev, spec]
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <Accordion type="multiple" defaultValue={['subjects', 'specialization']} className="w-full">
        <AccordionItem value="subjects">
          <AccordionTrigger className="text-sm font-medium">Subjects</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {subjects.map((subject) => (
                <div key={subject} className="flex items-center gap-2">
                  <Checkbox
                    id={`subject-${subject}`}
                    checked={selectedSubjects.includes(subject)}
                    onCheckedChange={() => toggleSubject(subject)}
                  />
                  <Label
                    htmlFor={`subject-${subject}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {subject}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="specialization">
          <AccordionTrigger className="text-sm font-medium">Specialization</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {specializations.map((spec) => (
                <div key={spec.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`spec-${spec.value}`}
                    checked={selectedSpecializations.includes(spec.value)}
                    onCheckedChange={() => toggleSpecialization(spec.value)}
                  />
                  <Label
                    htmlFor={`spec-${spec.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {spec.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="grade">
          <AccordionTrigger className="text-sm font-medium">Grade Level</AccordionTrigger>
          <AccordionContent>
            <Select 
              defaultValue={searchParams.get('grade') || undefined}
              onValueChange={(value) => {
                const params = new URLSearchParams(searchParams.toString())
                params.set('grade', value)
                router.push(`/tutors?${params.toString()}`)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                {gradeLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location">
          <AccordionTrigger className="text-sm font-medium">Location</AccordionTrigger>
          <AccordionContent>
            <Select 
              defaultValue={searchParams.get('location') || undefined}
              onValueChange={(value) => {
                const params = new URLSearchParams(searchParams.toString())
                params.set('location', value)
                router.push(`/tutors?${params.toString()}`)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc.toLowerCase().replace(' ', '-')}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex gap-2">
        <Button onClick={updateFilters} className="flex-1">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={clearFilters}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export function TutorFilters({ className }: TutorFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (searchQuery) {
      params.set('q', searchQuery)
    } else {
      params.delete('q')
    }
    router.push(`/tutors?${params.toString()}`)
  }

  return (
    <div className={className}>
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tutors by name or subject..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent onClose={() => setMobileFiltersOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
        <Button type="submit">Search</Button>
      </form>

      <div className="mt-6 hidden lg:block">
        <h3 className="mb-4 font-semibold">Filters</h3>
        <FilterContent />
      </div>
    </div>
  )
}
