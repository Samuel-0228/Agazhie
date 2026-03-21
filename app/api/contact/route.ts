import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const { name, email, message } = parsed.data

    // Log the contact request (in production, send an email or save to DB)
    // TODO: Integrate with email service (e.g. Resend, SendGrid) or n8n webhook
    console.info('[Contact Form]', { name, email, messageLength: message.length })

    // If a CONTACT_WEBHOOK_URL env var is set, forward to n8n/Zapier/etc.
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message, source: 'agazhie-contact-form' }),
        })
      } catch (webhookErr) {
        // Non-fatal: log and continue
        console.error('[Contact Form] Webhook delivery failed:', webhookErr)
      }
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[POST /api/contact] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
