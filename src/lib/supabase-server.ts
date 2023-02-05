import 'server-only'

import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from 'lib/types'
import { cookies, headers } from 'next/headers'

export const createClient = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
