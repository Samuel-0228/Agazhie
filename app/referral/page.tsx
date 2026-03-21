'use client'

import { useState } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Copy, Share2, Users, Gift, CheckCircle2, Link as LinkIcon } from 'lucide-react'
import { toast } from 'sonner'

const referralStats = {
  code: 'AGAZHIE-SAM228',
  totalReferrals: 7,
  successfulReferrals: 4,
  pendingReward: 280,
  totalEarned: 560,
  creditsBalance: 280,
}

const referralHistory = [
  { id: '1', name: 'Tigist H.', status: 'completed', reward: 140, date: 'Mar 15' },
  { id: '2', name: 'Bekele T.', status: 'completed', reward: 140, date: 'Mar 10' },
  { id: '3', name: 'Meron A.', status: 'pending', reward: 0, date: 'Mar 18' },
  { id: '4', name: 'Yonas K.', status: 'completed', reward: 140, date: 'Feb 28' },
  { id: '5', name: 'Hiwot G.', status: 'pending', reward: 0, date: 'Mar 20' },
]

export default function ReferralPage() {
  const [copied, setCopied] = useState(false)
  const referralLink = `https://agazhie.et/ref/${referralStats.code}`

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: string) => {
    const message = `Join አጋዤ — Ethiopia's trusted tutoring platform! Get 30% off your first lesson. Use my referral link: ${referralLink}`
    let url = ''
    if (platform === 'telegram') {
      url = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(message)}`
    } else if (platform === 'whatsapp') {
      url = `https://wa.me/?text=${encodeURIComponent(message)}`
    } else if (platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`
    }
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Referral Program</h1>
            <p className="mt-2 text-muted-foreground">
              Invite friends and earn credits for every successful referral. The more you share, the more you save.
            </p>
          </div>

          {/* Referral card */}
          <Card className="mb-8 bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2">
                    <Gift className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-bold">Your Referral Link</h2>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Share this link with friends. When they complete their first booking, you both earn credits!
                  </p>
                </div>
                <Badge className="text-base px-4 py-1.5 font-mono">
                  {referralStats.creditsBalance} ETB credits
                </Badge>
              </div>

              <div className="mt-4 flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={referralLink} readOnly className="pl-9 font-mono text-sm" />
                </div>
                <Button variant="outline" className="gap-2 shrink-0" onClick={() => handleCopy(referralLink)}>
                  {copied ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>

              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" className="gap-2 flex-1" onClick={() => handleShare('telegram')}>
                  <Share2 className="h-3.5 w-3.5" />
                  Telegram
                </Button>
                <Button size="sm" variant="outline" className="gap-2 flex-1" onClick={() => handleShare('whatsapp')}>
                  <Share2 className="h-3.5 w-3.5" />
                  WhatsApp
                </Button>
                <Button size="sm" variant="outline" className="gap-2 flex-1" onClick={() => handleShare('facebook')}>
                  <Share2 className="h-3.5 w-3.5" />
                  Facebook
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Referrals</p>
                    <p className="text-3xl font-bold">{referralStats.totalReferrals}</p>
                  </div>
                  <Users className="h-8 w-8 text-muted-foreground/40" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Successful</p>
                    <p className="text-3xl font-bold text-green-600">{referralStats.successfulReferrals}</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-600/30" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="text-3xl font-bold text-primary">{referralStats.totalEarned} ETB</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground">Available Credits</p>
                <p className="text-3xl font-bold">{referralStats.creditsBalance} ETB</p>
              </CardContent>
            </Card>
          </div>

          {/* How it works */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How the Referral Program Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { step: '1', title: 'Share Your Link', desc: 'Send your unique referral link to friends and family via Telegram, WhatsApp, or any platform.' },
                  { step: '2', title: 'They Sign Up & Book', desc: 'When your friend creates an account and completes their first tutoring session, the referral is confirmed.' },
                  { step: '3', title: 'You Both Earn', desc: 'You earn 140 ETB credits. Your friend gets 30% off their first lesson. Credits can be used for future sessions.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Referral history */}
          <Card>
            <CardHeader>
              <CardTitle>Referral History</CardTitle>
              <CardDescription>Track who you&apos;ve referred and the status of each referral</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-muted-foreground">Conversion rate</span>
                  <span className="font-medium">
                    {referralStats.successfulReferrals}/{referralStats.totalReferrals}
                  </span>
                </div>
                <Progress
                  value={(referralStats.successfulReferrals / referralStats.totalReferrals) * 100}
                  className="h-2"
                />
              </div>
              <div className="space-y-3">
                {referralHistory.map((ref) => (
                  <div key={ref.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                        {ref.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{ref.name}</p>
                        <p className="text-xs text-muted-foreground">Referred {ref.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={ref.status === 'completed' ? 'default' : 'secondary'} className="capitalize">
                        {ref.status}
                      </Badge>
                      {ref.reward > 0 && (
                        <p className="mt-1 text-xs text-green-600">+{ref.reward} ETB</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
