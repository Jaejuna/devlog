import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, PostMeta } from './types'

const postsDirectory = path.join(process.cwd(), 'content/posts')

function extractFirstImage(content: string): string | undefined {
  // ![alt](url) 형식
  const mdMatch = content.match(/!\[.*?\]\(([^)]+)\)/)
  if (mdMatch) return mdMatch[1]
  // <img src="..." /> 형식
  const htmlMatch = content.match(/<img[^>]+src=["']([^"']+)["']/)
  if (htmlMatch) return htmlMatch[1]
  return undefined
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const thumbnail = extractFirstImage(content)

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        category: data.category as string,
        tags: (data.tags as string[]) ?? [],
        excerpt: data.excerpt as string,
        readTime: data.readTime as number,
        ...(thumbnail && { thumbnail }),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return posts
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    category: data.category as string,
    tags: (data.tags as string[]) ?? [],
    excerpt: data.excerpt as string,
    readTime: data.readTime as number,
    content,
  }
}


export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null
  next: PostMeta | null
} {
  const posts = getAllPosts()
  const index = posts.findIndex((p) => p.slug === slug)

  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  }
}
