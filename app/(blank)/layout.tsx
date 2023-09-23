import 'css/tailwind.css'
import 'pliny/search/algolia.css'

import { Metadata } from 'next'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchConfig, SearchProvider } from 'pliny/search'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ToastProvider from '@/components/providers/toast-provider'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid place-items-center">
      <main className="mx-auto mb-auto">{children}</main>
    </div>
  )
}
