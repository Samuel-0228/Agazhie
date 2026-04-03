type ParentRequestPayload = {
  jobCode: string
  parentName: string
  phone: string
  subject: string
  grade: string
  schedule?: string | null
  location?: string | null
  notes?: string | null
}

export function generateBunaBotDeepLink(payload: ParentRequestPayload) {
  const botName = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'Buna_tutorsbot'
  const plain = [
    'Hello, I submitted a tutor request.',
    '',
    `Job Code: ${payload.jobCode}`,
    `Parent: ${payload.parentName}`,
    `Phone: ${payload.phone}`,
    `Subject: ${payload.subject}`,
    `Grade: ${payload.grade}`,
    `Schedule: ${payload.schedule || 'Not specified'}`,
    `Location: ${payload.location || 'Not specified'}`,
  ].join('\n')

  return `https://t.me/${botName}?start=${encodeURIComponent(payload.jobCode)}&text=${encodeURIComponent(plain)}`
}
