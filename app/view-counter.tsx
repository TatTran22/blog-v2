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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
}

export default function ViewCounter({ slug, trackView }: { slug: string; trackView: boolean }) {
  const { data } = useSWR<PostViewResponse>('/api/views', fetcher)
  const viewsForSlug =
    data && data.pageviews ? data.pageviews.find((view) => view.slug === slug) : null
  const views = viewsForSlug && viewsForSlug?.view_count ? Number(viewsForSlug?.view_count) : 0

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      })

    if (trackView) {
      registerView().then((r) => r.json())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  return (
    <p className="text-sm text-gray-500 dark:text-gray-400">
      {data ? `${views.toLocaleString()} views` : '–––'}
    </p>
  )
}
