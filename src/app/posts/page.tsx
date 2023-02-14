import { getAllTags, getSettings, searchPosts } from 'lib/sanity.client'
import React from 'react'

import Container from '../container'
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

  const [postsResponse, tagsResponse, { owner }] = await Promise.all([
    searchPosts(payload),
    getAllTags(),
    getSettings(),
  ])

  const tags = searchParams.tags
    ? searchParams.tags.split(',')
    : tagsResponse.map((tag) => tag.slug)

  const posts = postsResponse.posts.filter((post) => {
    return post.tags.some((tag) => tags.includes(tag.slug))
  })

  return (
    <>
      <Container siteOwner={owner} heading="All Posts">
        <div className="space-y-2 pb-8 md:space-y-5">
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
      </Container>
    </>
  )
}

export default Posts

// FIXME: remove the `revalidate` export below once you've followed the instructions in `/pages/api/revalidate.ts`
export const revalidate = 1

export const metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
}
