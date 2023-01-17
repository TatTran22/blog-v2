// 'tailwindcss/tailwind.css'
// import '@/styles/prism.css'
import '@/styles/globals.css'

import React from 'react'

import Container from '@/components/pages/Container'
import LayoutProvider from '@/components/providers'
import { getAuthorBySlug } from '@/lib/sanity.client'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const author = await getAuthorBySlug('tat-tran')

  return (
    <html lang="en">
      <head />
      <body className="bg-gray-50 dark:bg-gray-900">
        <LayoutProvider>
          <Container siteOwner={author}>{children}</Container>
        </LayoutProvider>
      </body>
    </html>
  )
}
