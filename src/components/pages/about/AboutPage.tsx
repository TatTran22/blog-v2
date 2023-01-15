'use client'
import { PortableText } from '@portabletext/react'
import { useEffect } from 'react'

import Layout from '@/components/BlogLayout'
import type { Author } from '@/lib/types'

import AuthorContainer from '../AuthorContainer'

export default function AboutPage(props: {
  preview?: boolean
  loading?: boolean
  author: Author
}) {
  const { preview, loading, author } = props

  useEffect(() => {
    console.log('AboutPage')
    console.log('author', author)
  }, [author])

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
