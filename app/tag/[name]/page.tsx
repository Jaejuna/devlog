import { notFound } from 'next/navigation'
import { getAllPosts } from '@/lib/mdx'
import type { Metadata } from 'next'
import PostList from '@/components/blog/PostList'
import Link from 'next/link'

interface TagPageProps {
  params: { name: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags)))
  return tags.map((tag) => ({ name: tag }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const name = decodeURIComponent(params.name)
  return {
    title: `#${name} | devlog`,
    description: `${name} 태그의 포스트 목록`,
    robots: { index: false },
    openGraph: {
      title: `#${name} | devlog`,
      description: `${name} 태그의 포스트 목록`,
      type: 'website',
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary',
      title: `#${name} | devlog`,
    },
  }
}

export default function TagPage({ params }: TagPageProps) {
  const tagName = decodeURIComponent(params.name)
  const posts = getAllPosts().filter((p) => p.tags.includes(tagName))

  if (posts.length === 0) notFound()

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* 헤더 */}
      <div className="mb-8">
        <Link
          href="/tags"
          className="font-mono text-xs text-slate-700 hover:text-accent-400 transition-colors mb-4 inline-block"
        >
          ← /tags
        </Link>
        <p className="font-mono text-xs text-accent-600 mb-2">{'$ grep --tag'}</p>
        <h1 className="text-2xl font-bold text-slate-100 mb-1">
          <span className="text-slate-500 font-normal">#</span>
          {tagName}
        </h1>
        <p className="font-mono text-xs text-slate-700">
          {'// '}
          <span className="text-slate-500">{posts.length}</span>
          {' posts found'}
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
