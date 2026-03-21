'use client'

import { useState } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Shield,
  AlertCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  Phone,
} from 'lucide-react'
import { toast } from 'sonner'

const walletData = {
  balance: 1250,
  escrowHeld: 800,
  totalEarned: 4500,
  pendingPayout: 350,
}

const transactions = [
  {
    id: '1',
    type: 'escrow_deposit',
    label: 'Escrow Deposit – Math Tutoring',
    amount: -500,
    status: 'held',
    date: '2025-03-18',
    description: 'Payment held for 4 sessions with Abebe Kebede',
  },
  {
    id: '2',
    type: 'payout',
    label: 'Payout – Physics Session',
    amount: +350,
    status: 'completed',
    date: '2025-03-15',
    description: 'Session confirmed and payment released',
  },
  {
    id: '3',
    type: 'deposit',
    label: 'Telebirr Deposit',
    amount: +1000,
    status: 'completed',
    date: '2025-03-10',
    description: 'Added via Telebirr (0911 *** ***)',
  },
  {
    id: '4',
    type: 'escrow_deposit',
    label: 'Escrow Deposit – Assignment Help',
    amount: -150,
    status: 'held',
    date: '2025-03-08',
    description: 'Payment held for Algebra assignment',
  },
  {
    id: '5',
    type: 'refund',
    label: 'Refund – Cancelled Session',
    amount: +200,
    status: 'completed',
    date: '2025-03-05',
    description: 'Refund processed for cancelled session',
  },
]

const transactionTypeConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  deposit: { color: 'text-green-600', icon: ArrowDownCircle, label: 'Deposit' },
  payout: { color: 'text-green-600', icon: ArrowDownCircle, label: 'Earnings' },
  escrow_deposit: { color: 'text-orange-500', icon: Shield, label: 'Escrow' },
  refund: { color: 'text-blue-500', icon: ArrowDownCircle, label: 'Refund' },
}

export default function WalletPage() {
  const [isDepositing, setIsDepositing] = useState(false)

  const handleDeposit = async () => {
    setIsDepositing(true)
    await new Promise(r => setTimeout(r, 1200))
    setIsDepositing(false)
    toast.success('Redirecting to Telebirr payment gateway...', {
      description: 'You will be redirected to complete your payment via Telebirr.',
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">My Wallet</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your payments, escrow balances, and transaction history.
            </p>
          </div>

          {/* Wallet overview */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="lg:col-span-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Available Balance</p>
                    <p className="text-4xl font-bold text-primary">{walletData.balance.toLocaleString()} ETB</p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Wallet className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button className="flex-1 gap-2" onClick={handleDeposit} disabled={isDepositing}>
                    <Phone className="h-4 w-4" />
                    {isDepositing ? 'Connecting...' : 'Add via Telebirr'}
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <CreditCard className="h-4 w-4" />
                    Bank Transfer
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">In Escrow</p>
                    <p className="text-2xl font-bold text-orange-500">{walletData.escrowHeld.toLocaleString()} ETB</p>
                  </div>
                  <Shield className="h-8 w-8 text-orange-500/50" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Held safely until sessions are confirmed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Payout</p>
                    <p className="text-2xl font-bold text-green-600">{walletData.pendingPayout.toLocaleString()} ETB</p>
                  </div>
                  <ArrowUpCircle className="h-8 w-8 text-green-600/50" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Will be released after session confirmation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Escrow explanation */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">How Escrow Works</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</div>
                  <div>
                    <p className="text-sm font-medium">You Pay</p>
                    <p className="text-xs text-muted-foreground">Deposit money via Telebirr. It is held safely — not given to the tutor yet.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</div>
                  <div>
                    <p className="text-sm font-medium">Session Happens</p>
                    <p className="text-xs text-muted-foreground">Tutor completes the lesson or assignment as agreed.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</div>
                  <div>
                    <p className="text-sm font-medium">You Confirm</p>
                    <p className="text-xs text-muted-foreground">Release payment to the tutor, or dispute within 48 hours if unsatisfied.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs: Transactions & Escrow */}
          <Tabs defaultValue="transactions">
            <TabsList className="mb-4">
              <TabsTrigger value="transactions">Transaction History</TabsTrigger>
              <TabsTrigger value="escrow">Active Escrow</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>All Transactions</CardTitle>
                  <CardDescription>Your complete payment history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactions.map((tx) => {
                      const config = transactionTypeConfig[tx.type]
                      const Icon = config.icon
                      return (
                        <div key={tx.id} className="flex items-center gap-4 rounded-lg border border-border p-3">
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted ${config.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{tx.label}</p>
                            <p className="text-xs text-muted-foreground">{tx.description}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-foreground'}`}>
                              {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} ETB
                            </p>
                            <Badge
                              variant={tx.status === 'completed' ? 'outline' : 'secondary'}
                              className="mt-1 text-xs capitalize"
                            >
                              {tx.status === 'held' ? (
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Held</span>
                              ) : (
                                <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Done</span>
                              )}
                            </Badge>
                            <p className="mt-0.5 text-xs text-muted-foreground">{tx.date}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="escrow">
              <Card>
                <CardHeader>
                  <CardTitle>Active Escrow Payments</CardTitle>
                  <CardDescription>Payments currently held, pending confirmation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-border p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium">Math Tutoring – Abebe Kebede</p>
                          <p className="text-sm text-muted-foreground">4 sessions booked • Ongoing</p>
                          <div className="mt-2 flex gap-2">
                            <Badge variant="secondary" className="text-xs">500 ETB held</Badge>
                            <Badge variant="outline" className="text-xs">Expires Mar 30</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Release
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1 text-destructive">
                            <AlertCircle className="h-3.5 w-3.5" />
                            Dispute
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                          <span>2 of 4 sessions completed</span>
                          <span>50%</span>
                        </div>
                        <Progress value={50} className="h-1.5" />
                      </div>
                    </div>

                    <div className="rounded-lg border border-border p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium">Algebra Assignment – Anonymous Tutor</p>
                          <p className="text-sm text-muted-foreground">Assignment submitted • Awaiting review</p>
                          <div className="mt-2 flex gap-2">
                            <Badge variant="secondary" className="text-xs">150 ETB held</Badge>
                            <Badge variant="outline" className="text-xs">Review by Mar 22</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1 text-destructive">
                            <AlertCircle className="h-3.5 w-3.5" />
                            Dispute
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
