'use client'

import { useState } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Video,
  Mic,
  Monitor,
  Users,
  Clock,
  CalendarDays,
  ExternalLink,
  Wifi,
  Phone,
} from 'lucide-react'
import { toast } from 'sonner'

const upcomingSessions = [
  {
    id: '1',
    tutor: 'Abebe Kebede',
    subject: 'Mathematics',
    gradeLevel: 'Grade 10',
    date: 'Today, Mar 21',
    time: '4:00 PM – 5:30 PM',
    type: 'online',
    status: 'upcoming',
    jitsiRoom: 'agazhie-session-abebe-001',
  },
  {
    id: '2',
    tutor: 'Sara Tesfaye',
    subject: 'English',
    gradeLevel: 'Grade 8',
    date: 'Mar 23, 2025',
    time: '6:00 PM – 7:00 PM',
    type: 'online',
    status: 'scheduled',
    jitsiRoom: 'agazhie-session-sara-002',
  },
]

const pastSessions = [
  {
    id: '3',
    tutor: 'Dawit Mulugeta',
    subject: 'Physics',
    gradeLevel: 'Grade 12',
    date: 'Mar 18, 2025',
    time: '5:00 PM – 6:30 PM',
    type: 'online',
    status: 'completed',
    rating: 5,
  },
  {
    id: '4',
    tutor: 'Hanna Girma',
    subject: 'Chemistry',
    gradeLevel: 'Grade 11',
    date: 'Mar 15, 2025',
    time: '4:00 PM – 5:00 PM',
    type: 'online',
    status: 'completed',
    rating: 4,
  },
]

export default function SessionsPage() {
  const [lowBandwidth, setLowBandwidth] = useState(false)

  const handleJoinSession = (room: string) => {
    const baseUrl = 'https://meet.jit.si'
    const config = lowBandwidth
      ? `#config.resolution=360&config.constraints.video.height.ideal=360&config.disableAudioLevels=true`
      : ''
    const url = `${baseUrl}/${room}${config}`
    window.open(url, '_blank', 'noopener,noreferrer')
    toast.success('Opening Jitsi meeting room...', {
      description: 'A new tab will open with your session.',
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Live Sessions</h1>
            <p className="mt-2 text-muted-foreground">
              Join and manage your tutoring sessions. Powered by Jitsi for secure, browser-based video.
            </p>
          </div>

          {/* Bandwidth toggle */}
          <div className="mb-6 flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
            <div className="flex items-center gap-3">
              <Wifi className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Low Bandwidth Mode</p>
                <p className="text-xs text-muted-foreground">
                  Reduces video quality and disables HD — better for 3G connections.
                </p>
              </div>
            </div>
            <button
              role="switch"
              aria-checked={lowBandwidth}
              onClick={() => setLowBandwidth(!lowBandwidth)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                lowBandwidth ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  lowBandwidth ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Features */}
          <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Video, label: 'HD Video', desc: 'Crystal clear video calls' },
              { icon: Mic, label: 'Audio Only', desc: 'Audio fallback for slow connections' },
              { icon: Monitor, label: 'Screen Share', desc: 'Share your screen or documents' },
              { icon: Users, label: 'Group Sessions', desc: 'Up to 10 participants' },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{f.label}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
              <TabsTrigger value="past">Past Sessions</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id}>
                    <CardContent className="pt-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold">{session.subject} with {session.tutor}</p>
                            <Badge variant={session.status === 'upcoming' ? 'default' : 'secondary'} className="capitalize">
                              {session.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{session.gradeLevel}</p>
                          <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <CalendarDays className="h-4 w-4" />
                              {session.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4" />
                              {session.time}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            className="gap-2"
                            onClick={() => handleJoinSession(session.jitsiRoom)}
                          >
                            <Video className="h-4 w-4" />
                            Join Session
                            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Phone className="h-3.5 w-3.5" />
                            Audio Only
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {upcomingSessions.length === 0 && (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
                    <Video className="mb-4 h-12 w-12 text-muted-foreground/50" />
                    <p className="text-muted-foreground">No upcoming sessions scheduled.</p>
                    <Button className="mt-4" asChild>
                      <a href="/tutors">Find a Tutor</a>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="space-y-4">
                {pastSessions.map((session) => (
                  <Card key={session.id}>
                    <CardContent className="pt-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold">{session.subject} with {session.tutor}</p>
                          <p className="text-sm text-muted-foreground">{session.gradeLevel}</p>
                          <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <CalendarDays className="h-4 w-4" />
                              {session.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4" />
                              {session.time}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">Completed</Badge>
                          {'rating' in session && (
                            <div className="mt-2 flex justify-end gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={`text-sm ${i < session.rating ? 'text-yellow-500' : 'text-muted-foreground'}`}>★</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
