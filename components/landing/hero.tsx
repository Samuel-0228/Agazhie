import Link from 'next/link'

const videoUrl =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4'

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      <div className="relative z-10 flex w-full flex-col items-center px-6 pt-32 pb-40 text-center">
        <h1
          className="font-display animate-fade-rise max-w-7xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] text-foreground sm:text-7xl md:text-8xl"
        >
          Find <em className="not-italic text-muted-foreground">trusted tutors</em> for{' '}
          <em className="not-italic text-muted-foreground">focused learning at home.</em>
        </h1>

        <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Agazhie helps families submit a tutoring request, then the admin team matches and manages the right support.
        </p>

        <Link
          href="/request-tutor"
          className="liquid-glass animate-fade-rise-delay-2 mt-12 inline-flex cursor-pointer rounded-full px-14 py-5 text-base text-foreground transition-transform hover:scale-[1.03]"
        >
          <span className="relative z-10">Request a Tutor</span>
        </Link>
      </div>
    </section>
  )
}
