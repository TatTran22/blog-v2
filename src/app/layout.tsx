import 'server-only'
import 'styles/globals.css'

import localFont from '@next/font/local'
import cn from 'classnames'
import { LoginDialogProvider } from 'components/providers/login-dialog-provider'
import SupabaseProvider from 'components/providers/supabase-provider'
import ToastProvider from 'components/providers/toast-provider'
import SupabaseListener from 'components/SupabaseListener'
import { getSettings } from 'lib/sanity.client'
import { createClient } from 'lib/supabase-server'
import React from 'react'

const radiance = localFont({
  src: [
    {
      weight: '500',
      path: '../../public/fonts/radiance/radiance.woff',
    },
    {
      weight: '600',
      path: '../../public/fonts/radiance/radiance-semibold.woff',
    },
    {
      weight: '700',
      path: '../../public/fonts/radiance/radiance-bold.woff',
    },
  ],
  variable: '--font-radiance',
  display: 'swap',
})

const reaver = localFont({
  src: [
    {
      weight: '500',
      path: '../../public/fonts/reaver/Reaver-Regular.woff',
    },
    {
      weight: '600',
      path: '../../public/fonts/reaver/Reaver-SemiBold.woff',
    },
    {
      weight: '700',
      path: '../../public/fonts/reaver/Reaver-Bold.woff',
    },
  ],
  variable: '--font-reaver',
  display: 'swap',
})

const firaCode = localFont({
  src: [
    {
      weight: '300',
      path: '../../public/fonts/fira-code/FiraCode-Light.woff2',
    },
    {
      weight: '400',
      path: '../../public/fonts/fira-code/FiraCode-Medium.woff2',
    },
    {
      weight: '500',
      path: '../../public/fonts/fira-code/FiraCode-Regular.woff2',
    },
    {
      weight: '600',
      path: '../../public/fonts/fira-code/FiraCode-SemiBold.woff2',
    },
    {
      weight: '700',
      path: '../../public/fonts/fira-code/FiraCode-Bold.woff2',
    },
  ],
  variable: '--font-fira-code',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()

  const [
    {
      data: { session },
    },
    { data: profiles },
  ] = await Promise.all([supabase.auth.getSession(), supabase.from('users').select('*')])

  return (
    <html lang="en">
      <head />
      <body
        className={cn(
          'bg-gray-50 dark:bg-gray-900',
          radiance.variable,
          reaver.variable,
          firaCode.variable
        )}
      >
        <SupabaseProvider session={session} profiles={profiles}>
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

// do not cache this layout
export const revalidate = 0
export async function generateMetadata() {
  const { title, owner, description } = await getSettings()

  return {
    title: {
      default: title,
      template: `%s | ${owner.name}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: title,
      card: 'summary_large_image',
      type: 'website',
      description: description,
      images: [
        {
          url: 'https://tattran.com/images/tattran-square1.png',
          width: 1200,
          height: 1200,
          alt: 'Tat Tran',
        },
      ],
    },
    openGraph: {
      title: title,
      type: 'website',
      description: description,
      images: [
        {
          url: 'https://tattran.com/images/tattran-square1.png',
          width: 1200,
          height: 1200,
          alt: 'Tat Tran',
        },
      ],
    },
    icons: {
      shortcut: '/favicon/favicon.ico',
      icon: [
        {
          url: '/favicon/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: '/favicon/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: '/favicon/favicon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          url: '/favicon/favicon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
      apple: [
        {
          url: '/favicon/favicon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
    },
    verification: {
      google: 'rEaLJ9ZqjVEg_PS-thiTZclKzso61gEmPuKzkxiF5q4',
    },
    locale: 'en_US',
    type: 'website',
  }
}
