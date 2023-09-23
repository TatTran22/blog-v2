import { genPageMetadata } from 'app/seo'
import { ReactNode } from 'react'

export const metadata = genPageMetadata({ title: 'Privacy Policy' })

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return <div className="mx-auto flex flex-col">{children}</div>
}
