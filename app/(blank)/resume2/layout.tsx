import { genPageMetadata } from 'app/seo'
export const metadata = genPageMetadata({ title: 'Resume' })

export default function PDFLayout({ children }) {
  return <div className="mx-auto">{children}</div>
}
