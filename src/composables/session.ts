import type { Session } from '@supabase/supabase-js'
import type { App } from 'vue'
import { supabase } from '../utils/supabase'

const sessionKey = Symbol('session')

export async function provideSession(app: App) {
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error) {
    throw error
  }

  if (!session) {
    throw new Error('getSession error')
  }

  app.provide(sessionKey, session)
}

export function useSession() {
  const session = inject<Session>(sessionKey)

  if (!session) {
    throw new Error('session is not provided')
  }

  return session
}
