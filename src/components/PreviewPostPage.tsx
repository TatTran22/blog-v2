'use client'

import PostDetail from 'components/pages/posts/PostDetail'
import { usePreview } from 'lib/sanity.preview'
import { postAndMoreStoriesQuery, settingsQuery } from 'lib/sanity.queries'
import { type Post, type Settings } from 'lib/types'

export default function PreviewPostPage({
  token,
  slug,
}: {
  token: null | string
  slug: string
}) {
  const data: { post: Post; morePosts: Post[] } = usePreview(
    token,
    postAndMoreStoriesQuery,
    {
      slug,
    }
  ) || { post: null, morePosts: [] }
  const settings: Settings = usePreview(token, settingsQuery) || {}

  return <PostDetail preview data={data} />
}
