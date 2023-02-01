import PostDetail from 'components/pages/posts/PostDetail'
import { getPostBySlug } from 'lib/sanity.client'

export default async function BlogDetailRoute({ params }: { params: { slug: string } }) {
  const data = await getPostBySlug(params.slug)
  console.log(data)
  return <PostDetail data={data} />
}

// FIXME: remove the `revalidate` export below once you've followed the instructions in `/pages/api/revalidate.ts`
export const revalidate = 1
