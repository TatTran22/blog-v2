'use client'

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

async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
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
  }, [slug, trackView])

  return (
    <p className="text-sm text-gray-500 dark:text-gray-400">
      {data ? `${views.toLocaleString()} views` : '–––'}
    </p>
  )
}
