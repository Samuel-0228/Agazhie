'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Send } from 'lucide-react'
import { toast } from 'sonner'
import { submitApplication } from './actions'

export function ApplyButton({ jobCode }: { jobCode: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onApply = async () => {
    setIsSubmitting(true)
    const result = await submitApplication(jobCode)
    setIsSubmitting(false)

    if (result.success) {
      toast.success('Application submitted successfully.')
      return
    }

    toast.error(result.error || 'Failed to submit application.')
  }

  return (
    <Button onClick={onApply} disabled={isSubmitting} size="lg" className="min-w-52">
      {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Apply for This Job
    </Button>
  )
}
