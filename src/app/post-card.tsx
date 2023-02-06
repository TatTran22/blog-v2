import formatDate from 'lib/formatDate'
import type { Post } from 'lib/types'
import Link from 'next/link'

import ViewCounter from './view-counter'

export default function PostCard({ post }: { post: Post }) {
  const { title, coverImage, publicReleaseDate, authors, slug, excerpt, tags } = post

  return (
    <li key={slug} className="py-4">
      <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={publicReleaseDate}>{formatDate(publicReleaseDate)}</time>
          </dd>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <ViewCounter slug={post.slug} trackView={false} />
          </dd>
          {/* Tags */}
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            {tags.map((c) => (
              <div
                key={c.slug}
                className="mr-2 inline-block rounded-full bg-gray-200 px-2 py-1 text-xs font-medium leading-4 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              >
                <Link href={`/posts?tags=${c.slug}`}>{c.title}</Link>
              </div>
            ))}
          </dd>
        </dl>
        <div className="space-y-3 xl:col-span-3">
          <div>
            <h3 className="text-2xl font-bold leading-4 ">
              <Link
                href={`/posts/${slug}`}
                className="background-author-animate bg-gradient-to-r text-gray-900 hover:bg-gradient-to-r hover:from-rose-400 hover:via-fuchsia-500 hover:to-indigo-500 hover:bg-clip-text hover:text-transparent dark:text-gray-100 dark:hover:text-transparent"
              >
                {title}
              </Link>
            </h3>
          </div>
          <div className="prose max-w-none text-gray-500 dark:text-gray-400">{excerpt}</div>
        </div>
      </article>
    </li>
  )
}
