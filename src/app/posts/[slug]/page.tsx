import PostDetail from 'components/pages/posts/PostDetail'
import PreviewPostPage from 'components/PreviewPostPage'
import { PreviewSuspense } from 'components/PreviewSuspense'
import { getAllPostsSlugs, getPostAndMoreStories } from 'lib/sanity.client'
import { previewData } from 'next/headers'

// export async function generateStaticParams() {
//   return await getAllPostsSlugs()
// }

export default async function BlogDetailRoute({
  params,
}: {
  params: { slug: string }
}) {
  const data = getPostAndMoreStories(params.slug)
  return <PostDetail data={await data} />
}

// FIXME: remove the `revalidate` export below once you've followed the instructions in `/pages/api/revalidate.ts`
export const revalidate = 1
