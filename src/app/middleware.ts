import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from 'lib/types'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// we need a middleware file to refresh the user's session on navigation.
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareSupabaseClient<Database>({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const path = req.nextUrl.pathname
  if (path.startsWith('/studio') && !session) {
    return NextResponse.redirect('/')
  }

  return res
}
