import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'አጋዤ - Your Best Tutors',
  description: 'Find verified, trusted tutors for your children. Connect with qualified student and graduate tutors who excel in EUEE, SAT, and all subjects.',
  keywords: ['tutors', 'Ethiopia', 'education', 'EUEE', 'SAT', 'learning', 'አጋዤ'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
