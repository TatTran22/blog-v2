import { getAllTags, searchPosts } from 'lib/sanity.client'
import React, { Suspense } from 'react'

import ContainerHeader from '../container-header'
import PostCard from '../post-card'
import InputSearch from './input-search'
import TagsFilter from './tags-filter'

export interface NameProps {
  params?: { name: string }
  searchParams?: { search?: string; page?: number; perPage?: number; tags?: string }
}

const Posts: ({ searchParams }: NameProps) => Promise<JSX.Element> = async ({
  searchParams,
}: NameProps) => {
  const payload = {
    search: searchParams.search || '*',
    page: Number(searchParams.page || 0),
    perPage: Number(searchParams.perPage || 100),
  }

  const [postsResponse, tagsResponse] = await Promise.all([searchPosts(payload), getAllTags()])
  const tags = searchParams.tags
    ? searchParams.tags.split(',')
    : tagsResponse.map((tag) => tag.slug)

  const posts = postsResponse.posts.filter((post) => {
    return post.tags.some((tag) => tags.includes(tag.slug))
  })

  return (
    <>
      <Suspense fallback={null}>
        <div className="space-y-2 pb-8 md:space-y-5">
          <ContainerHeader title="All Posts" />
          <div className="relative flex flex-row items-center space-x-4">
            <InputSearch />
            <TagsFilter tags={tagsResponse} />
          </div>
        </div>
        {posts.length === 0 && 'No posts found.'}
        <ul>
          {posts.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </ul>
      </Suspense>
    </>
  )
}

export default Posts

// FIXME: remove the `revalidate` export below once you've followed the instructions in `/pages/api/revalidate.ts`
export const revalidate = 1
