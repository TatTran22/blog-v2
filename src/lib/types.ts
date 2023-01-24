import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface Author {
  _id: string
  name: string
  slug: string
  avatar: any
  bio: any[]
  occupation?: string
  company?: string
  socials?: {
    email: string
    twitter?: string
    facebook?: string
    linkedin?: string
    github?: string
  }
}

export interface Category {
  _id: string
  title: string
  slug: string
}

export interface Post {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  excerpt?: string
  author?: Author
  slug: string
  content?: any
  categories?: Category[]
}

export interface Tag {
  _id: string
  title: string
  slug: string
}

export interface Snippet {
  _id: string
  slug: string
  content: MDXRemoteSerializeResult
  title: string
  description: string
  logo: string
}

export enum Form {
  Initial,
  Loading,
  Success,
  Error,
}

export interface FormState {
  state: Form
  message?: string
}

export interface Subscribers {
  count: number
}

export interface Views {
  total: number
}

export interface Song {
  songUrl: string
  artist: string
  title: string
}

export interface NowPlayingSong {
  album: string
  albumImageUrl: string
  artist: string
  isPlaying: boolean
  songUrl: string
  title: string
}

export interface TopTracks {
  tracks: Song[]
}

export interface YouTube {
  subscriberCount: number
  viewCount: number
}

export interface GitHub {
  stars: number
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}

export interface Unsplash {
  downloads: number
  views: number
}

export interface Database {}
