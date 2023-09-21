import { genPageMetadata } from 'app/seo'
import type { Resume } from 'contentlayer/generated'
import { ReactNode } from 'react'

export const metadata = genPageMetadata({ title: 'Resume' })

export default function PDFLayout({ children }: { children: ReactNode }) {
  return <div className="flex flex-col items-center justify-center space-y-2">{children}</div>
}
