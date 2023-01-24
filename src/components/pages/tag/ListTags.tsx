import Layout from 'components/BlogLayout'
import ContainerHeader from 'components/ContainerHeader'
import type { Tag } from 'lib/types'
import Link from 'next/link'
import { Suspense } from 'react'

import TagComponent from './Tag'

interface TagsPageProps {
  tags: (Tag & { count: number })[]
  preview?: boolean
  loading?: boolean
}

export default function TagsPage(props: TagsPageProps) {
  const { preview, loading, tags } = props

  return (
    <Layout preview={preview} loading={loading}>
      <Suspense fallback={null}>
        <div className="pb-8 space-y-2 md:space-y-5">
          <ContainerHeader title="Tags" />
          <div className="flex flex-wrap max-w-lg">
            {Object.keys(tags).length === 0 && 'No tags found.'}
            {tags.map((t) => {
              return (
                <div key={t.slug} className="mt-2 mb-2 mr-5">
                  <TagComponent text={t.slug} />
                  <Link
                    href={`/tags/${t.slug}`}
                    className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                  >
                    {` (${t.count})`}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </Suspense>
    </Layout>
  )
}
