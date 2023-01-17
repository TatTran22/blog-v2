import { PortableText } from '@portabletext/react'

import Layout from '@/components/BlogLayout'
import FuturePost from '@/components/FuturePost'
import BlogHero from '@/components/pages/homepage/BlogHero'
import type { Post, Settings } from '@/lib/types'

export default function IndexPage(props: {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
}) {
  const { preview, loading, posts, settings } = props
  const { title, description } = settings

  return (
    <>
      <Layout preview={preview} loading={loading}>
        <BlogHero title={title} description={description} level={1} />
        {posts.length > 0 && <FuturePost posts={posts} />}
      </Layout>
    </>
  )
}
