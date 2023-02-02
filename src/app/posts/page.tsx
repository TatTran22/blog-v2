import ListPosts from 'components/pages/posts/ListPosts'
import { searchPosts } from 'lib/sanity.client'

export default async function Blog({
  searchParams,
}: {
  searchParams: { search: string; page: number; perPage: number }
}) {
  const payload = {
    search: searchParams.search || '*',
    page: Number(searchParams.page || 0),
    perPage: Number(searchParams.perPage || 10),
  }

  const response = await searchPosts(payload)
  console.log(response)
  const { posts, total, page, perPage } = response

  return <ListPosts posts={posts} total={total} search={searchParams.search} />
}

// FIXME: remove the `revalidate` export below once you've followed the instructions in `/pages/api/revalidate.ts`
export const revalidate = 1
