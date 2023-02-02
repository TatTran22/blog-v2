import Layout from 'components/BlogLayout'
import ContainerHeader from 'components/ContainerHeader'
import InputSearch from 'components/pages/posts/InputSearch'
import PostCard from 'components/pages/posts/PostCard'
import type { Post } from 'lib/types'
import { Suspense } from 'react'

interface BlogPostsProps {
  heading?: string
  posts: Post[]
  total: number
  search?: string
  preview?: boolean
  loading?: boolean
}

export default function BlogPosts(props: BlogPostsProps) {
  const { preview, loading, search, posts } = props

  return (
    <Layout preview={preview} loading={loading}>
      <Suspense fallback={null}>
        <div className="space-y-2 pb-8 md:space-y-5">
          <ContainerHeader title="All Posts" />
          <InputSearch search={search} />
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
