import { Header } from '@/components/landing/header'
import { Hero } from '@/components/landing/hero'

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  )
}
