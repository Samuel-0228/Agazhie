import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, MapPin, CheckCircle2 } from 'lucide-react'

export interface Tutor {
  id: string
  name: string
  initials: string
  university: string
  subjects: string[]
  rating: number
  reviewCount: number
  hourlyRate: number
  location: string
  isVerified: boolean
  specialization?: string
  bio: string
}

interface TutorCardProps {
  tutor: Tutor
}

export function TutorCard({ tutor }: TutorCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="flex items-start gap-4 p-4 sm:p-6">
            <Avatar className="h-16 w-16 shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                {tutor.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Link 
                  href={`/tutors/${tutor.id}`}
                  className="font-semibold hover:text-primary transition-colors truncate"
                >
                  {tutor.name}
                </Link>
                {tutor.isVerified && (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">{tutor.university}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tutor.specialization && (
                  <Badge className="bg-accent text-accent-foreground">
                    {tutor.specialization}
                  </Badge>
                )}
                {tutor.subjects.slice(0, 3).map((subject) => (
                  <Badge key={subject} variant="secondary">
                    {subject}
                  </Badge>
                ))}
                {tutor.subjects.length > 3 && (
                  <Badge variant="outline">+{tutor.subjects.length - 3}</Badge>
                )}
              </div>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                {tutor.bio}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-4 border-t border-border bg-muted/30 p-4 sm:flex-col sm:items-end sm:justify-center sm:border-l sm:border-t-0 sm:p-6">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{tutor.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">
                ({tutor.reviewCount})
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{tutor.location}</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{tutor.hourlyRate} ETB</p>
              <p className="text-xs text-muted-foreground">per hour</p>
            </div>
            <Button asChild className="w-full sm:w-auto">
              <Link href={`/tutors/${tutor.id}`}>View Profile</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
