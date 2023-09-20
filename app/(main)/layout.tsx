import 'css/tailwind.css'
import 'pliny/search/algolia.css'

import { SearchConfig, SearchProvider } from 'pliny/search'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SectionContainer>
      <div className="flex min-h-screen flex-col justify-between">
        <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
          <Header />
          <main className="mb-auto">{children}</main>
        </SearchProvider>
        <Footer />
      </div>
    </SectionContainer>
  )
}
