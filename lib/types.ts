import GithubSlugger from 'github-slugger'

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

export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

// Uses github-slugger (same as rehype-slug) so TOC IDs always match DOM IDs
export function extractHeadings(content: string): TocItem[] {
  const slugger = new GithubSlugger()
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: TocItem[] = []

  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3
    const text = match[2].trim()
    const id = slugger.slug(text)
    headings.push({ id, text, level })
  }

  return headings
}
