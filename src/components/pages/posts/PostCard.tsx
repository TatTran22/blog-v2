import Category from 'components/Category'
import formatDate from 'lib/formatDate'
// import useSWR from 'swr'
//
// import fetcher from 'lib/fetcher'
import type { Post } from 'lib/types'
import Link from 'next/link'

export default function PostCard({ post }: { post: Post }) {
  // const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher)
  // const views = data?.total
  const { title, coverImage, publicReleaseDate, authors, slug, excerpt, categories } = post

  return (
    <li key={slug} className="py-4">
      <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={publicReleaseDate}>{formatDate(publicReleaseDate)}</time>
          </dd>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            {/*{`${views ? new Number(views).toLocaleString() : '–––'} views`}*/}3 views
          </dd>
        </dl>
        <div className="space-y-3 xl:col-span-3">
          <div>
            <h3 className="text-2xl font-bold leading-8 ">
              <Link
                href={`/posts/${slug}`}
                className="background-author-animate bg-gradient-to-r text-gray-900 hover:bg-gradient-to-r hover:from-rose-400 hover:via-fuchsia-500 hover:to-indigo-500 hover:bg-clip-text hover:text-transparent dark:text-gray-100 dark:hover:text-transparent"
              >
                {title}
              </Link>
            </h3>
            {/* <div className="flex flex-wrap">
              {categories.map((c) => (
                <Category key={c.slug} category={c} />
              ))}
            </div> */}
          </div>
          <div className="prose max-w-none text-gray-500 dark:text-gray-400">{excerpt}</div>
        </div>
      </article>
    </li>
  )
}
