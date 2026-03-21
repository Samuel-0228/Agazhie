import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'

export const metadata = {
  title: 'Terms of Service – አጋዤ',
  description: 'Terms of Service for the አጋዤ tutoring marketplace platform.',
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mb-8 text-sm text-muted-foreground">Last updated: March 2025</p>

          <div className="prose prose-sm max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
              <p className="mt-2 text-muted-foreground">
                By accessing or using አጋዤ (&quot;the Platform&quot;), you agree to be bound by these Terms
                of Service. If you do not agree to these terms, please do not use the Platform. These
                terms apply to all visitors, parents, students, tutors, and administrators who access
                or use the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">2. Description of Service</h2>
              <p className="mt-2 text-muted-foreground">
                አጋዤ is an online marketplace that connects parents and students with qualified tutors
                in Ethiopia. The Platform facilitates the booking of tutoring sessions, assignment
                help, in-app communication, and payments via Telebirr and other supported methods.
                አጋዤ is not responsible for the quality of tutoring services provided; it serves as
                an intermediary platform only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">3. User Accounts</h2>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                <li>You must provide accurate and complete information when registering.</li>
                <li>You are responsible for maintaining the security of your account credentials.</li>
                <li>You must be at least 18 years old to create an account, or have parental consent.</li>
                <li>Each person may maintain only one account. Duplicate accounts may be removed.</li>
                <li>
                  አጋዤ reserves the right to suspend or terminate accounts that violate these Terms.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold">4. Tutor Verification</h2>
              <p className="mt-2 text-muted-foreground">
                Tutors must submit valid academic documents and pass identity verification to receive
                a &quot;Verified Tutor&quot; badge. አጋዤ reviews submitted documents in good faith but
                does not guarantee the accuracy or authenticity of any credentials. Parents and
                students are encouraged to conduct their own due diligence.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">5. Payments and Escrow</h2>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                <li>
                  All payments are processed through the Platform&apos;s escrow system to protect
                  both parents and tutors.
                </li>
                <li>
                  Funds deposited into escrow are held until a session or assignment is marked
                  complete by both parties.
                </li>
                <li>
                  The Platform deducts a commission (currently 15–25%, configurable) from each
                  completed transaction before releasing payment to the tutor.
                </li>
                <li>
                  Refund requests must be raised within 48 hours of a session or assignment
                  completion. Disputes are reviewed by the አጋዤ support team.
                </li>
                <li>
                  አጋዤ is not responsible for any losses arising from Telebirr or third-party
                  payment gateway failures.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold">6. Prohibited Conduct</h2>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                <li>Submitting false, misleading, or fraudulent information.</li>
                <li>Attempting to bypass the Platform&apos;s payment system by paying tutors directly.</li>
                <li>Harassing, threatening, or abusing other users.</li>
                <li>Uploading malicious files or attempting to compromise Platform security.</li>
                <li>
                  Using the Platform for academic fraud, including completing assessments on behalf
                  of enrolled students in a deceptive manner.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold">7. Intellectual Property</h2>
              <p className="mt-2 text-muted-foreground">
                All content, trademarks, and intellectual property on the Platform are owned by
                አጋዤ or its licensors. Users retain ownership of content they upload (e.g., tutor
                profiles, assignment files) but grant አጋዤ a non-exclusive licence to display and
                process such content to provide the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">8. Limitation of Liability</h2>
              <p className="mt-2 text-muted-foreground">
                To the maximum extent permitted by applicable Ethiopian law, አጋዤ shall not be
                liable for any indirect, incidental, special, or consequential damages arising from
                your use of the Platform. Our total liability to you in any circumstance shall not
                exceed the amount you paid to the Platform in the preceding three (3) months.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">9. Governing Law</h2>
              <p className="mt-2 text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of the
                Federal Democratic Republic of Ethiopia. Any disputes arising under these Terms
                shall be subject to the exclusive jurisdiction of the courts of Addis Ababa, Ethiopia.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">10. Changes to Terms</h2>
              <p className="mt-2 text-muted-foreground">
                አጋዤ reserves the right to update these Terms at any time. We will notify users of
                material changes via email or an in-app notification at least 14 days before the
                changes take effect. Continued use of the Platform after such notification constitutes
                acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">11. Contact</h2>
              <p className="mt-2 text-muted-foreground">
                For questions about these Terms, please contact us at{' '}
                <a href="mailto:legal@agazhie.com" className="underline underline-offset-2">
                  legal@agazhie.com
                </a>{' '}
                or via Telegram at{' '}
                <a
                  href="https://t.me/agazhie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  @agazhie
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
