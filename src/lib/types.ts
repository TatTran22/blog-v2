import type { Image } from 'sanity'

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

export interface PostHeading {
  _key: string
  style: string
  children: {
    text: string
  }[]
}

export interface Post {
  _id: string
  title?: string
  coverImage?: Image
  publicReleaseDate?: string
  excerpt?: string
  authors?: Author[]
  slug: string
  content: any[]
  categories?: Category[]
  tags?: Tag[]
}

export interface Tag {
  _id: string
  title: string
  slug: string
}

export interface TagWithCount extends Tag {
  count: number
}

export interface Settings {
  title?: string
  owner: Author
  description?: any[]
  ogImage?: Image & { title: string }
}

export interface SearchPostsResponse {
  posts: Post[]
  total: number
  page: number
  perPage: number
}

export type Message = Database['public']['Tables']['channel_messages']['Row'] & {
  users: Database['public']['Tables']['users']['Row']
}

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      channel_members: {
        Row: {
          channel_id: string
          id: number
          user_id: string
        }
        Insert: {
          channel_id: string
          id?: number
          user_id: string
        }
        Update: {
          channel_id?: string
          id?: number
          user_id?: string
        }
      }
      channel_messages: {
        Row: {
          channel_id: string
          content: string
          created_at: string
          id: string
          parent_message_id: string | null
          sender_id: string
          updated_at: string
        }
        Insert: {
          channel_id: string
          content: string
          created_at?: string
          id?: string
          parent_message_id?: string | null
          sender_id: string
          updated_at?: string
        }
        Update: {
          channel_id?: string
          content?: string
          created_at?: string
          id?: string
          parent_message_id?: string | null
          sender_id?: string
          updated_at?: string
        }
      }
      channels: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
      }
      pageviews: {
        Row: {
          id: number
          inserted_at: string
          slug: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          id?: number
          inserted_at?: string
          slug: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          id?: number
          inserted_at?: string
          slug?: string
          updated_at?: string
          view_count?: number | null
        }
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database['public']['Enums']['app_permission']
          role: Database['public']['Enums']['app_role']
        }
        Insert: {
          id?: number
          permission: Database['public']['Enums']['app_permission']
          role: Database['public']['Enums']['app_role']
        }
        Update: {
          id?: number
          permission?: Database['public']['Enums']['app_permission']
          role?: Database['public']['Enums']['app_role']
        }
      }
      user_roles: {
        Row: {
          id: number
          role: Database['public']['Enums']['app_role']
          user_id: string
        }
        Insert: {
          id?: number
          role: Database['public']['Enums']['app_role']
          user_id: string
        }
        Update: {
          id?: number
          role?: Database['public']['Enums']['app_role']
          user_id?: string
        }
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          status: Database['public']['Enums']['user_status'] | null
          updated_at: string
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          status?: Database['public']['Enums']['user_status'] | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          status?: Database['public']['Enums']['user_status'] | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database['public']['Enums']['app_permission']
          user_id: string
        }
        Returns: boolean
      }
      update_views: {
        Args: { page_slug: string }
        Returns: undefined
      }
    }
    Enums: {
      app_permission: 'channels.delete' | 'channel_messages.delete'
      app_role: 'admin' | 'moderator'
      user_status: 'ONLINE' | 'OFFLINE'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: { name: string }
        Returns: string
      }
      filename: {
        Args: { name: string }
        Returns: string
      }
      foldername: {
        Args: { name: string }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: { size: number; bucket_id: string }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
