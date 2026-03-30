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
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Warm tinted container */}
        <div className="overflow-hidden rounded-3xl bg-foreground px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          {/* Section header */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground/60">
              Getting Started
            </p>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
              How it works
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-primary-foreground/70">
              Find and book your tutor in just a few simple steps.
            </p>
          </div>

          {/* Steps */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex flex-col gap-4">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-5 top-7 hidden h-px w-[calc(100%+2rem)] bg-primary-foreground/15 lg:block" />
                )}

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <span className="text-5xl font-black text-primary-foreground/15 leading-none">
                    {step.number}
                  </span>
                  <h3 className="text-base font-semibold text-primary-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-primary-foreground/65">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
