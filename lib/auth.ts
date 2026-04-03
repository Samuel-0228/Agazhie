import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function requireUser(redirectTo?: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    if (redirectTo) {
      redirect(`/auth/login?redirect=${encodeURIComponent(redirectTo)}`)
    }
    redirect('/auth/login')
  }

  return { supabase, user }
}

export async function requireAdmin(redirectTo = '/admin') {
  const { supabase, user } = await requireUser(redirectTo)
  const role = user.app_metadata?.role ?? user.user_metadata?.role
  const isAdmin = role === 'admin' || user.user_metadata?.is_admin === true

  if (!isAdmin) {
    redirect('/')
  }

  return { supabase, user }
}
