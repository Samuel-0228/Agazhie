import { createClient } from '@/lib/supabase/server'

type TelegramMessageType = 'parent_request' | 'channel_post' | 'top3_shortlist'

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

type MatchedTutorPayload = {
  full_name: string
  phone?: string | null
  years_experience?: number | null
  number_of_jobs_completed?: number | null
  matchPercentage: number
}

export async function sendTelegramMessage(chatId: string, text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  if (!botToken) {
    throw new Error('Telegram bot token not configured.')
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data?.description || 'Failed to send telegram message')
  }

  return data
}

export function formatParentRequestMessage(payload: ParentRequestPayload) {
  return [
    '<b>New Parent Request</b>',
    '',
    `<b>Job Code:</b> ${payload.jobCode}`,
    `<b>Parent:</b> ${payload.parentName}`,
    `<b>Phone:</b> ${payload.phone}`,
    `<b>Subject:</b> ${payload.subject}`,
    `<b>Grade:</b> ${payload.grade}`,
    `<b>Schedule:</b> ${payload.schedule || 'Not specified'}`,
    `<b>Location:</b> ${payload.location || 'Not specified'}`,
    `<b>Notes:</b> ${payload.notes || 'None'}`,
  ].join('\n')
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

export async function logTelegramMessage(params: {
  jobCode?: string
  messageType: TelegramMessageType
  targetChat: string
  payload: string
  status: 'success' | 'failed'
  telegramMessageId?: string | null
  errorDetails?: string | null
}) {
  const supabase = await createClient()
  await supabase.from('telegram_logs').insert({
    job_code: params.jobCode || null,
    message_type: params.messageType,
    status: params.status,
    telegram_message_id: params.telegramMessageId || null,
    error_details: params.errorDetails || null,
    target_chat: params.targetChat,
    payload: params.payload,
  })
}

export async function sendTelegramWithLog(params: {
  jobCode?: string
  messageType: TelegramMessageType
  chatId: string
  text: string
}) {
  try {
    const result = await sendTelegramMessage(params.chatId, params.text)
    await logTelegramMessage({
      jobCode: params.jobCode,
      messageType: params.messageType,
      targetChat: params.chatId,
      payload: params.text,
      status: 'success',
      telegramMessageId: String(result?.result?.message_id || ''),
    })
    return result
  } catch (error) {
    await logTelegramMessage({
      jobCode: params.jobCode,
      messageType: params.messageType,
      targetChat: params.chatId,
      payload: params.text,
      status: 'failed',
      errorDetails: error instanceof Error ? error.message : 'Unknown telegram error',
    })
    throw error
  }
}

export async function notifyAdminNewRequest(payload: ParentRequestPayload) {
  const adminChatId = process.env.ADMIN_TELEGRAM_CHAT_ID
  if (!adminChatId) return

  const msg = formatParentRequestMessage(payload)
  await sendTelegramWithLog({
    jobCode: payload.jobCode,
    messageType: 'parent_request',
    chatId: adminChatId,
    text: msg,
  })
}

export async function postJobToChannel(params: {
  channelChat: string
  jobCode: string
  subject: string
  grade: string
  location?: string | null
  schedule?: string | null
  notes?: string | null
  applyLink: string
}) {
  const msg = [
    '<b>New Tutoring Opportunity</b>',
    '',
    `<b>Job Code:</b> ${params.jobCode}`,
    `<b>Subject:</b> ${params.subject}`,
    `<b>Grade:</b> ${params.grade}`,
    `<b>Schedule:</b> ${params.schedule || 'Not specified'}`,
    `<b>Location:</b> ${params.location || 'Not specified'}`,
    `<b>Notes:</b> ${params.notes || 'None'}`,
    '',
    `<b>Apply:</b> <a href="${params.applyLink}">${params.applyLink}</a>`,
  ].join('\n')

  return sendTelegramWithLog({
    jobCode: params.jobCode,
    messageType: 'channel_post',
    chatId: params.channelChat,
    text: msg,
  })
}

export async function sendTopTutorsShortlist(params: {
  chatId: string
  jobCode: string
  subject: string
  grade: string
  tutors: MatchedTutorPayload[]
}) {
  const lines = params.tutors.map((tutor, index) => {
    return `${index + 1}. <b>${tutor.full_name}</b> (${tutor.matchPercentage}%)\n   Exp: ${tutor.years_experience || 0} yrs | Jobs: ${tutor.number_of_jobs_completed || 0} | Phone: ${tutor.phone || 'N/A'}`
  })

  const msg = [
    '<b>Top 3 Suggested Tutors</b>',
    '',
    `<b>Job Code:</b> ${params.jobCode}`,
    `<b>Subject:</b> ${params.subject}`,
    `<b>Grade:</b> ${params.grade}`,
    '',
    ...lines,
  ].join('\n')

  return sendTelegramWithLog({
    jobCode: params.jobCode,
    messageType: 'top3_shortlist',
    chatId: params.chatId,
    text: msg,
  })
}
