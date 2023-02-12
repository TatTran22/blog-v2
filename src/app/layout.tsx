import 'server-only'
import 'styles/globals.css'

import { LoginDialogProvider } from 'components/providers/login-dialog-provider'
import SupabaseProvider from 'components/providers/supabase-provider'
import ToastProvider from 'components/providers/toast-provider'
import SupabaseListener from 'components/SupabaseListener'
import { createClient } from 'lib/supabase-server'
import React from 'react'

// do not cache this layout
export const revalidate = 0

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <head />
      <body className="bg-gray-50 dark:bg-gray-900">
        <SupabaseProvider session={session}>
          <ToastProvider>
            <LoginDialogProvider>
              <SupabaseListener serverAccessToken={session?.access_token} />
              {children}
            </LoginDialogProvider>
          </ToastProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
