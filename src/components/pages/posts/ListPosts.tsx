import Layout from 'components/BlogLayout'
import ContainerHeader from 'components/ContainerHeader'
import InputSearch from 'components/pages/posts/InputSearch'
import PostCard from 'components/pages/posts/PostCard'
import TagsFilter from 'components/pages/posts/TagsFilter'
import type { SearchPostsResponse, TagWithCount } from 'lib/types'
import { Suspense } from 'react'

interface BlogPostsProps {
  heading?: string
  postsResponse: SearchPostsResponse
  tagsResponse: TagWithCount[]
  search?: string
  preview?: boolean
  loading?: boolean
}

export default function BlogPosts(props: BlogPostsProps) {
  const { preview, loading, postsResponse, tagsResponse } = props
  const { posts } = postsResponse
  return (
    <Layout preview={preview} loading={loading}>
      <Suspense fallback={null}>
        <div className="space-y-2 pb-8 md:space-y-5">
          <ContainerHeader title="All Posts" />
          <div className="relative flex flex-row items-center space-x-4">
            <InputSearch />
            <TagsFilter tags={tagsResponse} />
          </div>
        </div>
        {posts.length === 0 && 'No posts found.'}
        <ul>
          {posts.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </ul>
      </Suspense>
    </Layout>
  )
}
