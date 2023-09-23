import { genPageMetadata } from 'app/seo'
import type { Resume } from 'contentlayer/generated'
import { ReactNode } from 'react'

export const metadata = genPageMetadata({ title: 'Resume' })

export default function PDFLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-[8.27in] flex-col items-center justify-center">{children}</div>
  )
}
