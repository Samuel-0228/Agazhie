const steps = [
  {
    number: '01',
    title: 'Search for tutors',
    description: 'Browse our verified tutors by subject, grade level, and availability. Filter by EUEE or SAT expertise.',
  },
  {
    number: '02',
    title: 'Review profiles',
    description: 'Check qualifications, reviews from other parents, and teaching style. Message tutors with questions.',
  },
  {
    number: '03',
    title: 'Book a session',
    description: 'Schedule a session at a time that works for you. Choose in-person or online tutoring.',
  },
  {
    number: '04',
    title: 'Start learning',
    description: 'Your child receives personalized attention from a qualified tutor who understands their needs.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-muted/50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Getting started is easy. Find and book your tutor in just a few steps.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-8 hidden h-0.5 w-full bg-border lg:block" />
              )}
              <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {step.number}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
