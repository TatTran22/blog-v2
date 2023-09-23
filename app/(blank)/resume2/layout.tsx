import { genPageMetadata } from 'app/seo'
export const metadata = genPageMetadata({ title: 'Resume' })

export default function PDFLayout({ children }) {
  return <div className="mx-auto w-[7.5in]">{children}</div>
}
