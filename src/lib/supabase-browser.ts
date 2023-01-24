import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

import { Database } from '@/lib/types'

export const createBrowserClient = () => createBrowserSupabaseClient<Database>()
