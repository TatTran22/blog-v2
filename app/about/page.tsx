// import { previewData } from 'next/headers'

import AboutPage from '@/components/pages/about/AboutPage'
// import PreviewIndexPage from '@/components/PreviewIndexPage'
// import { PreviewSuspense } from '@/components/PreviewSuspense'
import { getAuthorBySlug } from '@/lib/sanity.client'

export default async function AboutRoute() {
  // Fetch queries in parallel
  const author = await getAuthorBySlug('tat-tran')

  // if (previewData()) {
  //   const token = previewData().token || null

  //   return (
  //     <PreviewSuspense fallback={<AboutPage loading preview author={author} />}>
  //       <PreviewIndexPage token={token} />
  //     </PreviewSuspense>
  //   )
  // }

  return <AboutPage author={author} />
}

// FIXME: remove the `revalidate` export below once you've followed the instructions in `/pages/api/revalidate.ts`
export const revalidate = 1
