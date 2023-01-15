import { PortableText } from '@portabletext/react'

import Layout from '@/components/BlogLayout'
import HeroPost from '@/components/HeroPost'
import MoreStories from '@/components/MoreStories'
import BlogHeader from '@/components/pages/homepage/BlogHeader'
import * as demo from '@/lib/demo.data'
import type { Post, Settings } from '@/lib/sanity.queries'

import Header from './Header'

export default function IndexPage(props: {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
}) {
  const { preview, loading, posts, settings } = props
  const [heroPost, ...morePosts] = posts || []
  const { title, description } = settings

  return (
    <>
      <Layout preview={preview} loading={loading}>
        <BlogHeader title={title} description={description} level={1} />
        {/* <Header title={title} description={description} level={1} /> */}

        {/* {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )} */}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}

        {/* <IntroTemplate /> */}
      </Layout>
    </>
  )
}
