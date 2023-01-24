import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'

import type { Database } from '@/lib/types'

export const createClient = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
