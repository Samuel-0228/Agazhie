import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDays, Clock, ArrowRight, BookOpen, Share2 } from 'lucide-react'

const blogPosts = [
  {
    id: '1',
    title: 'How to Prepare for Ethiopia\'s Grade 12 National Exam',
    excerpt: 'A comprehensive guide for Grade 12 students on how to study effectively, manage time, and prepare mentally for the national university entrance examination.',
    category: 'Exam Tips',
    readTime: '5 min read',
    date: 'Mar 18, 2025',
    author: 'Agazhie Team',
    featured: true,
    image: null,
  },
  {
    id: '2',
    title: '10 Study Techniques That Actually Work for Ethiopian Students',
    excerpt: 'Discover evidence-based study techniques adapted for the Ethiopian curriculum and learning environment, from spaced repetition to active recall.',
    category: 'Study Hacks',
    readTime: '7 min read',
    date: 'Mar 15, 2025',
    author: 'Sara Tesfaye (Verified Tutor)',
    featured: true,
    image: null,
  },
  {
    id: '3',
    title: 'Success Story: From Grade 8 Failure to Top 10 in Grade 10 Exams',
    excerpt: 'Kidist Alemu shares how online tutoring through Agazhie helped her transform her academic performance in just one year.',
    category: 'Success Stories',
    readTime: '4 min read',
    date: 'Mar 10, 2025',
    author: 'Agazhie Team',
    featured: false,
    image: null,
  },
  {
    id: '4',
    title: 'Understanding Telebirr Escrow: Why Your Money is Safe on Agazhie',
    excerpt: 'A plain-language explanation of how our escrow payment system works, why it protects both parents and tutors, and how to use it confidently.',
    category: 'Platform Guide',
    readTime: '3 min read',
    date: 'Mar 7, 2025',
    author: 'Agazhie Team',
    featured: false,
    image: null,
  },
  {
    id: '5',
    title: 'Top 5 Math Tutors in Addis Ababa (2025 Edition)',
    excerpt: 'We highlight our highest-rated Math tutors available in Addis Ababa, what makes each one special, and how to book a session with them.',
    category: 'Tutor Spotlight',
    readTime: '4 min read',
    date: 'Mar 3, 2025',
    author: 'Agazhie Team',
    featured: false,
    image: null,
  },
  {
    id: '6',
    title: 'Teaching Amharic Effectively: Tips for Tutors',
    excerpt: 'A guide for tutors teaching Amharic language skills to students in Ethiopia, covering reading, writing, and communication.',
    category: 'For Tutors',
    readTime: '6 min read',
    date: 'Feb 25, 2025',
    author: 'Abebe Kebede (Gold Tutor)',
    featured: false,
    image: null,
  },
]

const categories = ['All', 'Exam Tips', 'Study Hacks', 'Success Stories', 'Platform Guide', 'Tutor Spotlight', 'For Tutors']

const categoryColors: Record<string, string> = {
  'Exam Tips': 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
  'Study Hacks': 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  'Success Stories': 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
  'Platform Guide': 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
  'Tutor Spotlight': 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
  'For Tutors': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300',
}

export default function BlogPage() {
  const featured = blogPosts.filter(p => p.featured)
  const rest = blogPosts.filter(p => !p.featured)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Blog & Resources</h1>
            <p className="mt-2 text-muted-foreground">
              Exam tips, study strategies, success stories, and platform guides for Ethiopian students, parents, and tutors.
            </p>
          </div>

          {/* Category tabs */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className="rounded-full border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured posts */}
          <div className="mb-10 grid gap-6 lg:grid-cols-2">
            {featured.map((post) => (
              <Card key={post.id} className="flex flex-col overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-primary/40" />
                </div>
                <CardHeader className="pb-3">
                  <div className="mb-2">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[post.category] || 'bg-muted text-muted-foreground'}`}>
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Read <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* All posts */}
          <h2 className="mb-4 text-xl font-semibold">Latest Articles</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Card key={post.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="mb-2">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[post.category] || 'bg-muted text-muted-foreground'}`}>
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="text-base leading-snug">{post.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Share2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" asChild>
                        <Link href={`/blog/${post.id}`}>
                          Read <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
