import 'server-only'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from 'lib/types'
import { cookies, headers } from 'next/headers'

export const createClient = () =>
  createServerComponentClient<Database>({
    cookies,
  })
