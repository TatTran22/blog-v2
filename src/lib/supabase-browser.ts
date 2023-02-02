import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from 'lib/types'

export const createBrowserClient = () => createBrowserSupabaseClient<Database>()
