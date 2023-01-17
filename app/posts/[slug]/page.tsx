import { previewData } from 'next/headers'

import PostDetail from '@/components/pages/posts/PostDetail'
import PreviewPostPage from '@/components/PreviewPostPage'
import { PreviewSuspense } from '@/components/PreviewSuspense'
import {
  getAllPostsSlugs,
  getPostAndMoreStories,
  getSettings,
} from '@/lib/sanity.client'

export async function generateStaticParams() {
  return await getAllPostsSlugs()
}

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
