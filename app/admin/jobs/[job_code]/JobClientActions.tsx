'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Send, Loader2, RotateCcw, Stars } from 'lucide-react'
import { approveAndPostJob, markTutorSelected, regenerateMatches, sendTop3ToTelegram } from './actions'
import { toast } from 'sonner'

interface JobClientActionsProps {
  jobCode: string;
  status?: string;
  isApplicantAction?: boolean;
  isSuggestedAction?: boolean;
  applicationId?: string;
  tutorId?: string;
  applicantStatus?: string;
}

export function JobClientActions({ 
  jobCode, 
  status, 
  isApplicantAction, 
  isSuggestedAction,
  applicationId, 
  tutorId, 
  applicantStatus 
}: JobClientActionsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isSuggestedAction) {
    const handleSendTop3 = async () => {
      setIsSubmitting(true)
      const res = await sendTop3ToTelegram(jobCode)
      setIsSubmitting(false)
      if (res.success) toast.success('Top 3 tutors sent to Telegram.')
      else toast.error(res.error || 'Failed to send top 3 list.')
    }

    const handleRegenerate = async () => {
      setIsSubmitting(true)
      const res = await regenerateMatches(jobCode)
      setIsSubmitting(false)
      if (res.success) toast.success('Matches regenerated.')
      else toast.error(res.error || 'Failed to regenerate matches.')
    }

    return (
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={handleSendTop3} disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Stars className="mr-2 h-4 w-4" />}
          Send Top 3 to Telegram
        </Button>
        <Button variant="outline" onClick={handleRegenerate} disabled={isSubmitting}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Regenerate Matches
        </Button>
      </div>
    )
  }

  if (isApplicantAction && applicationId && tutorId) {
    if (applicantStatus === 'selected') return null;

    const handleSelect = async () => {
      setIsSubmitting(true)
      const res = await markTutorSelected(applicationId, jobCode, tutorId)
      setIsSubmitting(false)
      if (res.success) toast.success('Tutor selected! Job marked completely.')
      else toast.error(res.error || 'Failed to select tutor.')
    }

    return (
      <Button size="sm" onClick={handleSelect} disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
        Select Tutor
      </Button>
    )
  }

  // Job Action
  if (status === 'pending' || status === 'approved') {
    const handleBroadcast = async () => {
      setIsSubmitting(true)
      const res = await approveAndPostJob(jobCode)
      setIsSubmitting(false)
      if (res.success) toast.success('Job approved and posted to Telegram channel!')
      else toast.error(res.error || 'Failed to post.')
    }

    return (
      <Button className="w-full bg-[#0088cc] hover:bg-[#0077bb] text-white" onClick={handleBroadcast} disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
        Approve & Send to Channel
      </Button>
    )
  }

  return null;
}
