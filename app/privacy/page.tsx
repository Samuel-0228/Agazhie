import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'

export const metadata = {
  title: 'Privacy Policy – አጋዤ',
  description: 'Privacy Policy for the አጋዤ tutoring marketplace platform.',
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mb-8 text-sm text-muted-foreground">Last updated: March 2025</p>

          <div className="prose prose-sm max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="text-xl font-semibold">1. Introduction</h2>
              <p className="mt-2 text-muted-foreground">
                አጋዤ (&quot;we&quot;, &quot;our&quot;, or &quot;the Platform&quot;) is committed to
                protecting the privacy of our users. This Privacy Policy describes how we collect,
                use, disclose, and safeguard your personal information when you use our tutoring
                marketplace platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">2. Information We Collect</h2>
              <p className="mt-2 text-muted-foreground">We collect the following types of information:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                <li>
                  <strong>Account information:</strong> Full name, email address, phone number, and
                  password when you register.
                </li>
                <li>
                  <strong>Profile information:</strong> For tutors — university, degree, subjects,
                  hourly rate, bio, and documents uploaded for verification.
                </li>
                <li>
                  <strong>Usage data:</strong> Pages visited, search queries, booking history, and
                  session logs.
                </li>
                <li>
                  <strong>Payment data:</strong> Transaction records (we do not store full payment
                  card details; payments are processed via Telebirr or partner gateways).
                </li>
                <li>
                  <strong>Communications:</strong> Messages sent through the in-app messaging
                  system and Q&amp;A feature.
                </li>
                <li>
                  <strong>Device &amp; technical data:</strong> IP address, browser type, device
                  identifiers, and cookies.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold">3. How We Use Your Information</h2>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                <li>To create and manage your account and provide Platform services.</li>
                <li>To match parents with suitable tutors based on their stated preferences.</li>
                <li>To process payments and manage the escrow system.</li>
                <li>To verify tutor credentials and assign verification badges.</li>
                <li>To send reminders, notifications, and service-related communications.</li>
                <li>To improve the Platform through analytics and user feedback.</li>
                <li>To comply with our legal obligations under Ethiopian law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold">4. Information Sharing</h2>
              <p className="mt-2 text-muted-foreground">
                We do not sell your personal information. We may share information with:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                <li>
                  <strong>Other users:</strong> Tutor profiles (name, bio, subjects, ratings) are
                  visible to all users. Parent contact information is shared with matched tutors
                  only after a booking is confirmed.
                </li>
                <li>
                  <strong>Service providers:</strong> Supabase (database &amp; auth), Telebirr and
                  payment processors, and SMS/notification providers, under strict data processing
                  agreements.
                </li>
                <li>
                  <strong>Legal authorities:</strong> When required by Ethiopian law or a valid
                  court order.
                </li>
                <li>
                  <strong>Business transfers:</strong> In the event of a merger or acquisition,
                  user data may be transferred as part of the business assets, with prior notice.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold">5. Data Retention</h2>
              <p className="mt-2 text-muted-foreground">
                We retain your personal data for as long as your account is active or as needed to
                provide services. You may request deletion of your account and associated data at
                any time by contacting us (see Section 9). Certain data may be retained for up to
                7 years to comply with financial and legal requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">6. Security</h2>
              <p className="mt-2 text-muted-foreground">
                We implement industry-standard security measures including encrypted data
                transmission (HTTPS/TLS), row-level security in our database, secure hashed
                passwords, and access controls. However, no system is completely secure. We
                encourage you to use a strong, unique password and to contact us immediately if
                you suspect unauthorised access to your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">7. Cookies</h2>
              <p className="mt-2 text-muted-foreground">
                We use essential cookies for authentication (Supabase session tokens) and analytics
                cookies (Vercel Analytics). You may disable non-essential cookies through your
                browser settings; however, this may affect Platform functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">8. Children&apos;s Privacy</h2>
              <p className="mt-2 text-muted-foreground">
                The Platform is intended for use by adults (parents/guardians) on behalf of their
                children. We do not knowingly collect personal information directly from children
                under 13. If you believe a child has provided personal data without parental
                consent, please contact us so we can remove it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">9. Your Rights</h2>
              <p className="mt-2 text-muted-foreground">You have the right to:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                <li>Access the personal data we hold about you.</li>
                <li>Request correction of inaccurate data.</li>
                <li>Request deletion of your data (subject to legal retention requirements).</li>
                <li>Opt out of marketing communications at any time.</li>
                <li>Lodge a complaint with the relevant Ethiopian data protection authority.</li>
              </ul>
              <p className="mt-2 text-muted-foreground">
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:privacy@agazhie.com" className="underline underline-offset-2">
                  privacy@agazhie.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">10. Changes to This Policy</h2>
              <p className="mt-2 text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of material
                changes via email or in-app notification before they take effect. Continued use of
                the Platform after notification constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">11. Contact Us</h2>
              <p className="mt-2 text-muted-foreground">
                For privacy-related questions, please contact:{' '}
                <a href="mailto:privacy@agazhie.com" className="underline underline-offset-2">
                  privacy@agazhie.com
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
