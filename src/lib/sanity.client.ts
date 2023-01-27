import 'server-only'

import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import {
  featuredPostsQuery,
  getAllTagsQuery,
  getAllTagsWithCountQuery,
  getAuthorQuery,
  getPostsBySlugTagQuery,
  indexQuery,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postSlugsQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import { Author, Category, Post, Settings, Tag } from 'lib/types'
import { createClient } from 'next-sanity'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId ? createClient({ projectId, dataset, apiVersion, useCdn }) : null

export async function getSettings(): Promise<Settings> {
  if (client) {
    return (await client.fetch(settingsQuery)) || {}
  }
  return {}
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

export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
  if (client) {
    const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
    return slugs.map((slug) => ({ slug }))
  }
  return []
}

export async function getPostBySlug(slug: string): Promise<Post> {
  if (client) {
    return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
  }
  return {} as any
}

export async function getPostAndMoreStories(
  slug: string,
  token?: string | null
): Promise<{ post: Post; morePosts: Post[] }> {
  if (projectId) {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token: token || undefined,
    })
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

export async function getAllTags(): Promise<(Tag & { count: number })[]> {
  if (client) {
    return (await client.fetch(getAllTagsQuery)) || []
  }
  return []
}

export async function getAllTagsWithCount(): Promise<Tag[]> {
  if (client) {
    return (await client.fetch(getAllTagsWithCountQuery)) || []
  }
  return []
}

export async function getPostsBySlugTag(slug: string): Promise<Post[]> {
  if (client) {
    return (await client.fetch(getPostsBySlugTagQuery, { slug })) || []
  }
  return []
}
