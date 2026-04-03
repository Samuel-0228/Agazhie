import type { Metadata } from 'next'
import { Instrument_Serif, Inter, Noto_Sans_Ethiopic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500'],
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-display',
  weight: '400',
})

const notoEthiopic = Noto_Sans_Ethiopic({
  subsets: ['ethiopic'],
  variable: '--font-ethiopic',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Agazhie | Find the Right Tutor Across Ethiopia',
  description: 'Agazhie connects families with verified university tutors across Ethiopia for focused, trusted learning support.',
  keywords: ['Agazhie', 'tutors', 'Ethiopia', 'education', 'EUEE', 'SAT', 'learning support'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${instrumentSerif.variable} ${notoEthiopic.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
