import { genPageMetadata } from 'app/seo'
import type { Resume } from 'contentlayer/generated'
import { ReactNode } from 'react'

import Image from '@/components/Image'
import SocialIcon from '@/components/social-icons'

interface Props {
  children: ReactNode
  content: Omit<Resume, '_id' | '_raw' | 'body'>
}
export const metadata = genPageMetadata({ title: 'Resume' })

export default function PDFLayout({ children }: Props) {
  return <div className="flex flex-col items-center justify-center space-y-2">{children}</div>
}
