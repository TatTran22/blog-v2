import PostDetail from 'components/pages/posts/PostDetail'
import { getAllPostsSlugs, getPostAndMoreStories } from 'lib/sanity.client'

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
