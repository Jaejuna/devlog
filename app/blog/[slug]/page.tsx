import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, getAdjacentPosts } from '@/lib/mdx'
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
import TableOfContents, { extractHeadings } from '@/components/blog/TableOfContents'
import AdBanner from '@/components/ads/AdBanner'
import PostNavigation from '@/components/blog/PostNavigation'
import RelatedPosts from '@/components/blog/RelatedPosts'

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
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
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

function splitAtFirstH2(content: string): [string, string] {
  // 두 번째 ## 헤딩 위치를 찾아 분리
  let count = 0
  let splitIndex = -1
  const lines = content.split('\n')
  let charIndex = 0

  for (const line of lines) {
    if (line.startsWith('## ')) {
      count++
      if (count === 2) {
        splitIndex = charIndex
        break
      }
    }
    charIndex += line.length + 1
  }

  if (splitIndex === -1) return [content, '']
  return [content.slice(0, splitIndex), content.slice(splitIndex)]
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) notFound()

  const headings = extractHeadings(post.content)
  const [contentPart1, contentPart2] = splitAtFirstH2(post.content)
  const { prev, next } = getAdjacentPosts(params.slug)

  // 관련 포스트: 같은 카테고리 내 최근 3개 (현재 포스트 제외)
  const relatedPosts = getAllPosts()
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)

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

          {/* MDX 본문 — Part 1 */}
          <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:scroll-mt-20">
            <MDXRemote
              source={contentPart1}
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

          {/* 본문 중간 광고 (첫 번째 h2 이후) */}
          {contentPart2 && (
            <div className="my-8">
              <AdBanner
                adClient={process.env.NEXT_PUBLIC_ADSENSE_ID ?? ''}
                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_BANNER ?? ''}
              />
            </div>
          )}

          {/* MDX 본문 — Part 2 */}
          {contentPart2 && (
            <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:scroll-mt-20">
              <MDXRemote
                source={contentPart2}
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
          )}

          {/* 본문 하단 광고 */}
          <div className="mt-12 mb-6">
            <AdBanner
              adClient={process.env.NEXT_PUBLIC_ADSENSE_ID ?? ''}
              adSlot={process.env.NEXT_PUBLIC_AD_SLOT_BANNER ?? ''}
            />
          </div>

          {/* 이전/다음 포스트 네비게이션 */}
          <PostNavigation prev={prev} next={next} />

          {/* 관련 포스트 */}
          <RelatedPosts posts={relatedPosts} />
        </article>

        {/* Sidebar (desktop only) */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-20 flex flex-col gap-6">
            {/* 목차 */}
            {headings.length > 0 && (
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
                <TableOfContents headings={headings} />
              </div>
            )}

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
