import { groq } from 'next-sanity'

const categoryFields = groq`
  _id,
  title,
  "slug": slug.current,
`

const tagFields = groq`
  _id,
  title,
  "slug": slug.current,
`

const authorFields = groq`
  _id,
  name,
  "slug": slug.current,
  avatar,
  bio,
  occupation,
  company,
  socials,
`

const postFields = groq`
  _id,
  title,
  publicReleaseDate,
  content,
  excerpt,
  categories[]->{${categoryFields}},
  coverImage,
  "slug": slug.current,
  authors[]->{${authorFields}},
  tags[]->{${tagFields}},
`

export const settingsQuery = groq`*[_type == "settings"][0]{
  title,
  owner->{${authorFields}},
  description,
  ogImage,
}`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

// export const featuredPostsQuery (latest 3 posts)
export const featuredPostsQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) [0..3] {
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    ${postFields}
  }
}`

export const postBySlugQuery = groq`
*[_type == "post"  && slug.current == $slug]{
  "current": { 
    ${postFields}
  },
  "headings": content[length(style) == 2 && string::startsWith(style, "h")],
  "previous": *[_type == "post" && count((tags[]->tag)[@ in ^.^.tags[]->tag]) > 0 && ^.publicReleaseDate > publicReleaseDate]|order(publicReleaseDate desc)[0]{ 
      "slug": slug.current, title, publicReleaseDate, "tags": tags[]->
  },
  "next": *[_type == "post" && count((tags[]->tag)[@ in ^.^.tags[]->tag]) > 0 && ^.publicReleaseDate < publicReleaseDate]|order(publicReleaseDate asc)[0]{ 
      "slug": slug.current, title, publicReleaseDate, "tags": tags[]->
  },
}|order(publicReleaseDate)[0]
`

export const searchPostsQuery = groq`
{
  "posts": *[_type == "post" && defined(slug.current) && (title match $search || content match $search)]
  | order(date desc, _updatedAt desc) [$page...$page + $perPage] {
    ${postFields}
  },
  "total": count(*[_type == "post" && defined(slug.current) && (title match $search || content match $search)]),
  "page": $page,
  "perPage": $perPage
}
`
const snippetFields = `
  _id,
  title,
  description,
  logo,
  "slug": slug.current,
`

export const allSnippetsQuery = `
*[_type == "snippet"] | order(date desc, _updatedAt desc) {
  ${snippetFields}
}`

export const snippetsQuery = `
{
  "snippet": *[_type == "snippet" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${snippetFields}
  }
}`

export const snippetSlugsQuery = `
*[_type == "snippet" && defined(slug.current)][].slug.current
`

export const snippetBySlugQuery = `
*[_type == "snippet" && slug.current == $slug][0] {
  ${snippetFields}
}
`
// all fields
export const getAuthorQuery = groq`
*[_type == "author" && slug.current == $slug][0] {
  ${authorFields}
}
`

export const getAllTagsQuery = groq`
*[_type == "tag"] | order(title asc) {
  ${tagFields}
  "count": count(*[_type == "post" && references(^._id)])
}
`

export const getPostsBySlugTagQuery = groq`
*[_type == "post" && $slug in tags[]->slug.current] | order(date desc, _updatedAt desc) {
  ${postFields}
}
`
