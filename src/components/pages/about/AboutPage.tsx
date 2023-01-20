import { PortableText } from '@portabletext/react'

import Layout from '@/components/BlogLayout'
import type { Author } from '@/lib/types'

import AuthorContainer from '../AuthorContainer'

export default function AboutPage(props: {
  preview?: boolean
  loading?: boolean
  author: Author
}) {
  const { preview, loading, author } = props

  return (
    <>
      <Layout preview={preview} loading={loading}>
        <AuthorContainer author={author}>
          <PortableText value={author.bio} />
        </AuthorContainer>
      </Layout>
    </>
  )
}
