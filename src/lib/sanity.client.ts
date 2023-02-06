import 'server-only'

import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import {
  featuredPostsQuery,
  getAllTagsQuery,
  getAuthorQuery,
  getPostsBySlugTagQuery,
  indexQuery,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  searchPostsQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import { Author, Post, PostHeading, SearchPostsResponse, Settings, TagWithCount } from 'lib/types'
import { createClient } from 'next-sanity'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId ? createClient({ projectId, dataset, apiVersion, useCdn }) : null

export async function getSettings(): Promise<Settings | null> {
  if (client) {
    return (await client.fetch(settingsQuery)) || null
  }
  return null
}

export async function getAllPosts(): Promise<Post[]> {
  if (client) {
    return (await client.fetch(indexQuery)) || []
  }
  return []
}

export async function getFeaturedPosts(): Promise<Post[]> {
  if (client) {
    return (await client.fetch(featuredPostsQuery)) || []
  }
  return []
}

export async function getPostBySlug(slug: string): Promise<{
  current: Post
  headings: PostHeading[]
  previous: Pick<Post, 'title' | 'slug' | 'publicReleaseDate' | 'tags'>
  next: Pick<Post, 'title' | 'slug' | 'publicReleaseDate' | 'tags'>
}> {
  if (client) {
    return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
  }
  return {} as any
}

export async function searchPosts(payload: {
  search: string
  page: number
  perPage: number
}): Promise<SearchPostsResponse> {
  if (client) {
    const { search = '*', page = 0, perPage = 10 } = payload

    return (await client.fetch(searchPostsQuery, { search, page, perPage })) || ({} as any)
  }
  return {} as any
}

export async function getPostAndMoreStories(
  slug: string,
  token?: string | null
): Promise<{ post: Post; morePosts: Post[] }> {
  if (client) {
    return await client.fetch(postAndMoreStoriesQuery, { slug })
  }
  return { post: null, morePosts: [] }
}

export async function getAuthorBySlug(slug: string): Promise<Author> {
  if (client) {
    return (await client.fetch(getAuthorQuery, { slug })) || ({} as any)
  }
  return {} as any
}

export async function getAllTags(): Promise<TagWithCount[]> {
  if (client) {
    return (await client.fetch(getAllTagsQuery)) || []
  }
  return []
}

export async function getPostsBySlugTag(slug: string): Promise<Post[]> {
  if (client) {
    return (await client.fetch(getPostsBySlugTagQuery, { slug })) || []
  }
  return []
}
