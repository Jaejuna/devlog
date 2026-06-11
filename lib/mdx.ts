import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, PostMeta } from './types'

const postsDirectory = path.join(process.cwd(), 'content/posts')

function extractFirstImage(content: string): string | undefined {
  const mdMatch = content.match(/!\[.*?\]\(([^)]+)\)/)
  if (mdMatch) return mdMatch[1]
  const htmlMatch = content.match(/<img[^>]+src=["']([^"']+)["']/)
  if (htmlMatch) return htmlMatch[1]
  return undefined
}

function resolvePostPath(slug: string, locale?: string): string {
  if (locale === 'en') {
    const enPath = path.join(postsDirectory, `${slug}.en.mdx`)
    if (fs.existsSync(enPath)) return enPath
  }
  return path.join(postsDirectory, `${slug}.mdx`)
}

export function getAllPosts(locale?: string): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((name) => name.endsWith('.mdx') && !name.endsWith('.en.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const localizedPath = resolvePostPath(slug, locale)
      const fileContents = fs.readFileSync(localizedPath, 'utf8')
      const { data, content } = matter(fileContents)
      // always extract thumbnail from base (ko) file so EN files don't need images
      const basePath = path.join(postsDirectory, fileName)
      const baseContent = localizedPath !== basePath
        ? matter(fs.readFileSync(basePath, 'utf8')).content
        : content
      const thumbnail = extractFirstImage(baseContent)

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

export function getPostBySlug(slug: string, locale?: string): Post | null {
  const fullPath = resolvePostPath(slug, locale)

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

export function getAdjacentPosts(
  slug: string,
  locale?: string,
): { prev: PostMeta | null; next: PostMeta | null } {
  const posts = getAllPosts(locale)
  const index = posts.findIndex((p) => p.slug === slug)

  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  }
}
