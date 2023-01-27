import 'styles/globals.css'

import Container from 'components/pages/Container'
import SupabaseProvider from 'components/providers/supabase-provider'
import SupabaseListener from 'components/SupabaseListener'
import { getAuthorBySlug } from 'lib/sanity.client'
import { createClient } from 'lib/supabase-server'
import React from 'react'

// do not cache this layout
export const revalidate = 0

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const author = await getAuthorBySlug('tat-tran')

  return (
    <html lang="en">
      <head />
      <body className="bg-gray-50 dark:bg-gray-900">
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <Container siteOwner={author}>{children}</Container>
        </SupabaseProvider>
      </body>
    </html>
  )
}
