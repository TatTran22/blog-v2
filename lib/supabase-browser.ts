import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from 'lib/types'

export const createClientComponent = () => createClientComponentClient<Database>()
