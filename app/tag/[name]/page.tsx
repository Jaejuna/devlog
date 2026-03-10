import { notFound } from 'next/navigation'
import { getAllPosts } from '@/lib/mdx'
import type { Metadata } from 'next'
import PostList from '@/components/blog/PostList'

interface TagPageProps {
  params: { name: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags)))
  return tags.map((tag) => ({ name: tag }))
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const name = decodeURIComponent(params.name)
  return {
    title: `#${name} 태그`,
    description: `${name} 태그의 포스트 목록`,
    robots: { index: false },
    openGraph: {
      title: `#${name} 태그 | devlog`,
      description: `${name} 태그의 포스트 목록`,
      type: 'website',
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary',
      title: `#${name} 태그 | devlog`,
    },
  }
}

export default function TagPage({ params }: TagPageProps) {
  const tagName = decodeURIComponent(params.name)
  const posts = getAllPosts().filter((p) => p.tags.includes(tagName))

  if (posts.length === 0) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 제목 */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">태그</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          #{tagName}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          총 {posts.length}개의 포스트
        </p>
      </div>

      <PostList
        posts={posts}
        adClient={process.env.NEXT_PUBLIC_ADSENSE_ID}
        adSlot={process.env.NEXT_PUBLIC_AD_SLOT_INFEED}
      />
    </div>
  )
}
