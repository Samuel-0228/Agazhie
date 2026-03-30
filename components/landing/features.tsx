import {
  Search,
  Shield,
  MessageSquare,
  Calendar,
  Award,
  CreditCard,
} from 'lucide-react'

const features = [
  {
    number: '01',
    icon: Search,
    title: 'Smart Matching',
    description: "Find tutors based on subject, availability, location, and teaching style that matches your child's needs.",
  },
  {
    number: '02',
    icon: Shield,
    title: 'Verified Profiles',
    description: 'All tutors are verified students or graduates from accredited universities with proven academic excellence.',
  },
  {
    number: '03',
    icon: MessageSquare,
    title: 'Direct Communication',
    description: "Message tutors directly to discuss your child's needs before booking a session.",
  },
  {
    number: '04',
    icon: Calendar,
    title: 'Flexible Scheduling',
    description: 'Book sessions that fit your schedule. In-person at home or online — you choose.',
  },
  {
    number: '05',
    icon: Award,
    title: 'EUEE & SAT Specialists',
    description: 'Expert tutors who have excelled in national exams and can help your child succeed.',
  },
  {
    number: '06',
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Pay securely through our platform with transparent pricing and no hidden fees.',
  },
]

export function Features() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Why Goongoon
            </p>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Everything you need to find the right tutor
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-base text-muted-foreground lg:text-right">
            Our platform makes it easy to connect with qualified tutors who help your child excel academically.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Number watermark */}
              <span className="absolute right-5 top-4 text-6xl font-black text-border/60 select-none transition-colors group-hover:text-primary/10">
                {feature.number}
              </span>

              {/* Icon */}
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>

              {/* Content */}
              <div className="relative flex flex-col gap-2">
                <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
