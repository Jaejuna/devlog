export interface Post {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  excerpt: string
  readTime: number
  content: string
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  excerpt: string
  readTime: number
}
