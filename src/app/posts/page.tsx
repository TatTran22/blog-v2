import ListPosts from 'components/pages/posts/ListPosts'
import { getAllTags, searchPosts } from 'lib/sanity.client'

export default async function Blog({
  searchParams,
}: {
  searchParams: { search: string; page: number; perPage: number; tags: string }
}) {
  const payload = {
    search: searchParams.search || '*',
    page: Number(searchParams.page || 0),
    perPage: Number(searchParams.perPage || 100),
  }

  const [postsResponse, tagsResponse] = await Promise.all([searchPosts(payload), getAllTags()])
  const tags = searchParams.tags
    ? searchParams.tags.split(',')
    : tagsResponse.map((tag) => tag.slug)

  const filteredPosts = {
    posts: postsResponse.posts.filter((post) => {
      return post.tags.some((tag) => tags.includes(tag.slug))
    }),
    page: postsResponse.page,
    perPage: postsResponse.perPage,
    total: postsResponse.total,
  }

  return (
    <ListPosts
      postsResponse={filteredPosts}
      search={searchParams.search}
      tagsResponse={tagsResponse}
    />
  )
}

// FIXME: remove the `revalidate` export below once you've followed the instructions in `/pages/api/revalidate.ts`
export const revalidate = 1
