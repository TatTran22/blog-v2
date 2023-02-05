'use client'

import fetcher from 'lib/fetcher'
import { useEffect } from 'react'
import useSWR from 'swr'

type PostViewResponse = {
  pageviews: {
    id: string
    slug: string
    view_count: string
  }[]
  error?: any
}

export default function ViewCounter({ slug, trackView }: { slug: string; trackView: boolean }) {
  const { data } = useSWR<PostViewResponse>('/api/views', fetcher)
  const viewsForSlug = data && data.pageviews.find((view) => view.slug === slug)
  const views = new Number(viewsForSlug?.view_count || 0)

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      })

    if (trackView) {
      registerView()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  return (
    <p className="text-sm text-gray-500 dark:text-gray-400">
      {data ? `${views.toLocaleString()} views` : '–––'}
    </p>
  )
}
