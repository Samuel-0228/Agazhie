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
  title: 'Goongoon — Find the Perfect Tutor for Your Child',
  description: 'Connect with verified university students and graduates who excel academically. Personalized tutoring for EUEE, SAT, and all subjects across Ethiopia.',
  keywords: ['tutors', 'Ethiopia', 'education', 'EUEE', 'SAT', 'learning', 'Goongoon'],
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
