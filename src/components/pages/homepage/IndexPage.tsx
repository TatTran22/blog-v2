import Layout from 'components/BlogLayout'
import BlogHero from 'components/pages/homepage/BlogHero'
import PostCard from 'components/pages/posts/PostCard'
import type { Post, Settings } from 'lib/types'

export default function IndexPage(props: {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
}) {
  const {
    preview,
    loading,
    posts,
    settings: { title, owner, description },
  } = props
  console.log(props)
  return (
    <>
      <Layout preview={preview} loading={loading}>
        <BlogHero siteOwner={owner} description={description} level={1} />
        <ul>
          {posts.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </ul>
      </Layout>
    </>
  )
}
