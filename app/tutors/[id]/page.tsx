import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { 
  Star, 
  MapPin, 
  CheckCircle2, 
  GraduationCap, 
  Clock, 
  Calendar,
  MessageSquare,
  BookOpen
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Sample data - will be replaced with database queries
const tutorsData: Record<string, TutorProfile> = {
  '1': {
    id: '1',
    name: 'Abebe Kebede',
    initials: 'AK',
    university: 'Addis Ababa University',
    degree: 'BSc Physics (4th Year)',
    subjects: ['Physics', 'Mathematics', 'Chemistry'],
    rating: 4.9,
    reviewCount: 47,
    hourlyRate: 350,
    location: 'Addis Ababa',
    isVerified: true,
    specialization: 'EUEE Expert',
    bio: 'I am a final year physics student at Addis Ababa University with a passion for teaching. Over the past 3 years, I have helped more than 50 students achieve their academic goals, with many scoring above 90% in their EUEE physics exams.',
    experience: '3 years of tutoring experience',
    availability: 'Weekdays: 4PM-8PM, Weekends: 9AM-6PM',
    teachingStyle: 'I believe in building strong foundations before moving to advanced topics. My sessions include clear explanations, worked examples, and practice problems tailored to each student\'s level.',
    languages: ['Amharic', 'English'],
    reviews: [
      {
        id: '1',
        name: 'Tigist H.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Abebe is an excellent tutor! My son\'s physics grades improved from C to A in just 2 months. Highly recommend!',
      },
      {
        id: '2',
        name: 'Bekele T.',
        rating: 5,
        date: '1 month ago',
        comment: 'Very patient and explains concepts clearly. My daughter scored 95% in EUEE physics.',
      },
      {
        id: '3',
        name: 'Meron G.',
        rating: 5,
        date: '2 months ago',
        comment: 'Professional and reliable. Always comes prepared with practice materials.',
      },
    ],
  },
  '2': {
    id: '2',
    name: 'Sara Tesfaye',
    initials: 'ST',
    university: 'AAiT',
    degree: 'BSc Computer Science (3rd Year)',
    subjects: ['Mathematics', 'ICT', 'English'],
    rating: 4.8,
    reviewCount: 32,
    hourlyRate: 300,
    location: 'Addis Ababa',
    isVerified: true,
    specialization: 'SAT Prep',
    bio: 'I scored 1520 on my SAT and am passionate about helping students achieve their dreams of studying abroad. I specialize in SAT Math and English preparation with proven strategies and techniques.',
    experience: '2 years of tutoring experience',
    availability: 'Flexible - Online sessions available',
    teachingStyle: 'I focus on test-taking strategies and time management alongside content mastery. Students learn proven techniques that help them perform their best under pressure.',
    languages: ['Amharic', 'English'],
    reviews: [
      {
        id: '1',
        name: 'Dawit M.',
        rating: 5,
        date: '1 week ago',
        comment: 'Sara helped me improve my SAT score by 200 points! Her strategies really work.',
      },
      {
        id: '2',
        name: 'Hana A.',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Excellent tutor for SAT prep. Very knowledgeable about the test format.',
      },
    ],
  },
}

interface TutorProfile {
  id: string
  name: string
  initials: string
  university: string
  degree: string
  subjects: string[]
  rating: number
  reviewCount: number
  hourlyRate: number
  location: string
  isVerified: boolean
  specialization?: string
  bio: string
  experience: string
  availability: string
  teachingStyle: string
  languages: string[]
  reviews: {
    id: string
    name: string
    rating: number
    date: string
    comment: string
  }[]
}

export default async function TutorProfilePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const tutor = tutorsData[id]

  if (!tutor) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Main Content */}
            <div className="flex flex-col gap-6">
              {/* Profile Header */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-6 sm:flex-row">
                    <Avatar className="h-24 w-24 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                        {tutor.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold">{tutor.name}</h1>
                        {tutor.isVerified && (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        <span>{tutor.degree}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{tutor.university}</p>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tutor.specialization && (
                          <Badge className="bg-accent text-accent-foreground">
                            {tutor.specialization}
                          </Badge>
                        )}
                        {tutor.subjects.map((subject) => (
                          <Badge key={subject} variant="secondary">
                            {subject}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          <span className="font-medium">{tutor.rating.toFixed(1)}</span>
                          <span className="text-muted-foreground">
                            ({tutor.reviewCount} reviews)
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{tutor.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{tutor.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="h-5 w-5" />
                    About Me
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{tutor.bio}</p>
                </CardContent>
              </Card>

              {/* Teaching Style */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Teaching Approach</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{tutor.teachingStyle}</p>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageSquare className="h-5 w-5" />
                    Reviews ({tutor.reviewCount})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    {tutor.reviews.map((review, index) => (
                      <div key={review.id}>
                        {index > 0 && <Separator className="mb-4" />}
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{review.name}</span>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold">{tutor.hourlyRate} ETB</p>
                    <p className="text-sm text-muted-foreground">per hour</p>
                  </div>

                  <Separator className="my-6" />

                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Availability</p>
                        <p className="text-sm text-muted-foreground">{tutor.availability}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MessageSquare className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Languages</p>
                        <p className="text-sm text-muted-foreground">{tutor.languages.join(', ')}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="flex flex-col gap-3">
                    <Button size="lg" className="w-full" asChild>
                      <Link href={`/request?tutor=${tutor.id}`}>
                        Request This Tutor
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
