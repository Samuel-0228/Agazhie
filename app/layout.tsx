import type { Metadata } from 'next'
import { Inter, Noto_Sans_Ethiopic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const notoEthiopic = Noto_Sans_Ethiopic({ 
  subsets: ['ethiopic'],
  variable: '--font-ethiopic',
  weight: ['400', '500', '600', '700'],
})

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
      <body className={`${inter.variable} ${notoEthiopic.variable} font-sans antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
