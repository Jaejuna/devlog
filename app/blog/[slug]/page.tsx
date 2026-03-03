import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import type { Metadata } from 'next'
import Badge from '@/components/ui/Badge'
import Tag from '@/components/ui/Tag'
import AdSidebar from '@/components/ads/AdSidebar'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import mdxComponents from '@/components/blog/MdxComponents'

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) notFound()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <article className="flex-1 min-w-0">
          {/* 헤더 */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="purple">{post.category}</Badge>
              {post.tags.map((tag) => (
                <Tag key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                  {tag}
                </Tag>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.readTime}분 읽기</span>
            </div>
          </header>

          {/* MDX 본문 */}
          <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:scroll-mt-20">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                    rehypeHighlight,
                  ],
                },
              }}
            />
          </div>
        </article>

        {/* Sidebar (desktop only) */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-20 flex flex-col gap-6">
            {/* 목차 자리 (4-3에서 구현) */}
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                목차
              </h3>
              <p className="text-xs text-gray-400">[목차 — 4-3 태스크에서 구현]</p>
            </div>

            {/* 사이드바 광고 */}
            <AdSidebar
              adClient={process.env.NEXT_PUBLIC_ADSENSE_ID}
              adSlot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR}
              sticky
            />
          </div>
        </aside>
      </div>
    </div>
  )
}
