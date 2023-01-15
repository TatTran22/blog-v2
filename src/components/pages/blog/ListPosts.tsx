'use client'
import Link from 'next/link'
import { ComponentProps, Suspense, useState } from 'react'

import BlogCard from '@/components/pages/blog/BlogCard'
import Tag from '@/components/Tag'
import formatDate from '@/lib/formatDate'
import type { Post } from '@/lib/types'

interface Props {
  posts: Post[]
}

export default function ListLayout({ posts }: Props) {
  return (
    <>
      <Suspense fallback={null}>
        <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          All Posts
        </h3>
        {/*{!filteredBlogPosts.length && (*/}
        {/*  <p className="mb-4 text-gray-600 dark:text-gray-400">*/}
        {/*    No posts found.*/}
        {/*  </p>*/}
        {/*)}*/}
        {posts.map((post) => (
          <BlogCard
            key={post.title}
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt}
          />
        ))}
      </Suspense>
    </>
  )
}
