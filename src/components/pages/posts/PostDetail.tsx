import { PortableText } from '@portabletext/react'
import Layout from 'components/BlogLayout'
import { ExternalLink } from 'components/ExternalLink'
import TableOfContent from 'components/pages/posts/TableOfContent'
import { urlForImage } from 'lib/sanity.image'
import type { Post, PostHeading } from 'lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import BlogContentPortableComponents from './BlogContentPortableComponent'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export default function PostDetail(props: {
  preview?: boolean
  loading?: boolean
  data: {
    current: Post
    headings: PostHeading[]
    previous: Pick<Post, 'title' | 'slug' | 'publicReleaseDate' | 'tags'>
    next: Pick<Post, 'title' | 'slug' | 'publicReleaseDate' | 'tags'>
  }
}) {
  const { preview, loading, data } = props
  const { current, headings, previous, next } = data

  if ((!current || !current.slug) && !preview) {
    notFound()
  }

  const { title, coverImage, publicReleaseDate, authors, content } = current

  return (
    <Layout preview={preview} loading={loading}>
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={publicReleaseDate}>
                      {new Date(publicReleaseDate).toLocaleDateString('en-US', postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <h1 className="text-3xl font-extrabold leading-9 text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                  {title}
                </h1>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authors.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={urlForImage(author.avatar).width(768).height(768).url()}
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="background-author-animate bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text font-semibold text-transparent">
                          {author.name}
                        </dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.socials.twitter && (
                            <ExternalLink
                              href={`https://twitter.com/${author.socials.twitter}`}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              @{author.socials.twitter}
                            </ExternalLink>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">
                <PortableText value={content} components={BlogContentPortableComponents} />
              </div>
              {/*<div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">*/}
              {/*  <Link href={discussUrl(slug)} rel="nofollow">*/}
              {/*    {'Discuss on Twitter'}*/}
              {/*  </Link>*/}
              {/*  {` • `}*/}
              {/*  <Link href={editUrl(slug)}>{'View on GitHub'}</Link>*/}
              {/*</div>*/}
              {/*<Comments frontMatter={content} />*/}
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                <TableOfContent headings={headings} />
                {(next || previous) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {previous && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/posts/${previous.slug}`}>{previous.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/posts/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </Layout>
  )
}
