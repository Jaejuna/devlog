import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import type { Post, PostMeta } from './types'

const postsDirectory = path.join(process.cwd(), 'content/posts')

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
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        category: data.category as string,
        tags: (data.tags as string[]) ?? [],
        excerpt: data.excerpt as string,
        readTime: data.readTime as number,
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

export async function serializeMdx(content: string) {
  return serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        rehypeHighlight,
      ],
    },
  })
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
