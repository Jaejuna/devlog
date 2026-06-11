import { getAllPosts } from '@/lib/mdx'
import { getViewsMap } from '@/lib/redis'
import PostList from '@/components/blog/PostList'
import AdSidebar from '@/components/ads/AdSidebar'
import AdBanner from '@/components/ads/AdBanner'
import Badge from '@/components/ui/Badge'
import HeroSection from '@/components/ui/HeroSection'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { PostMeta } from '@/lib/types'

export const metadata: Metadata = {
  title: 'devlog — 개발자 블로그',
  description: '개발 경험과 면접 준비 콘텐츠를 다루는 개인 기술 블로그',
  alternates: {
    canonical: 'https://j-devlog.space',
  },
  openGraph: {
    title: 'devlog — 개발자 블로그',
    description: '개발 경험과 면접 준비 콘텐츠를 다루는 개인 기술 블로그',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'devlog',
    url: process.env.NEXT_PUBLIC_BASE_URL ?? 'https://devlog-two.vercel.app',
    images: [{ url: '/soong.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'devlog — 개발자 블로그',
    description: '개발 경험과 면접 준비 콘텐츠를 다루는 개인 기술 블로그',
    images: ['/soong.png'],
  },
}

const CATEGORY_DESC: Record<string, string> = {
  AI: 'LLM, 프롬프트 엔지니어링, AI 도구 활용',
  개발: '웹·백엔드 개념, 패턴, 실무 경험',
  면접: 'CS 기초, 기술 면접 빈출 문제 정리',
  회고: '프로젝트와 이벤트 경험의 기록',
  MMD: 'ML/DS를 위한 선형대수, 미적분, 통계',
}

function CategoryCard({ category, posts }: { category: string; posts: PostMeta[] }) {
  const desc = CATEGORY_DESC[category] ?? '관련 포스트 모음'
  return (
    <Link href={`/?category=${encodeURIComponent(category)}`}>
      <div className="h-full p-4 rounded-lg border border-slate-800/60 bg-slate-900/20 hover:border-accent-800/50 hover:bg-slate-800/30 transition-all cursor-pointer group">
        <div className="flex items-start justify-between mb-2">
          <span className="font-mono text-sm text-accent-500/80 bg-accent-900/10 border border-accent-800/20 px-1.5 py-0.5 rounded">
            [{category}]
          </span>
          <span className="font-mono text-xs text-slate-700 bg-slate-800/40 px-1.5 py-0.5 rounded ml-2 shrink-0">
            {posts.length}
          </span>
        </div>
        <p className="text-xs text-slate-600 mb-2 leading-relaxed">{desc}</p>
        <ul className="space-y-0.5">
          {posts.slice(0, 2).map((p) => (
            <li
              key={p.slug}
              className="font-mono text-xs text-slate-700 truncate group-hover:text-slate-500 transition-colors"
            >
              ↳ {p.title}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  )
}

interface HomePageProps {
  searchParams: {
    category?: string
  }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const allPosts = getAllPosts()
  const isFiltered = !!searchParams.category

  const filteredPosts = isFiltered
    ? allPosts.filter((post) => post.category === searchParams.category)
    : allPosts

  const categories = Array.from(new Set(allPosts.map((p) => p.category))).sort((a, b) => {
    const latestA = Math.max(
      ...allPosts.filter((p) => p.category === a).map((p) => new Date(p.date).getTime()),
    )
    const latestB = Math.max(
      ...allPosts.filter((p) => p.category === b).map((p) => new Date(p.date).getTime()),
    )
    return latestA - latestB
  })

  const viewsMap = await getViewsMap(allPosts.map((p) => p.slug))
  const popularPosts = [...allPosts]
    .sort((a, b) => (viewsMap[b.slug] ?? 0) - (viewsMap[a.slug] ?? 0))
    .slice(0, 4)

  const postsByCategory = categories.reduce<Record<string, PostMeta[]>>((acc, cat) => {
    acc[cat] = allPosts.filter((p) => p.category === cat)
    return acc
  }, {})

  return (
    <>
      {/* Fixed left sidebar (xl+ only) */}
      <aside className="hidden xl:flex fixed top-20 left-6 w-56 flex-col gap-5 z-10">
        <div>
          <h3 className="font-mono text-xs text-slate-700 mb-3 px-1">{'// top.posts'}</h3>
          <ul className="flex flex-col gap-3">
            {popularPosts.map((post, i) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="flex items-start gap-2.5 group">
                  <span className="font-mono text-sm font-bold text-slate-700 leading-none mt-0.5 group-hover:text-primary-500 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-500 group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </p>
                    <p className="font-mono text-xs text-slate-700 mt-0.5">{post.readTime}min</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <AdSidebar
          adClient={process.env.NEXT_PUBLIC_ADSENSE_ID ?? ''}
          adSlot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR ?? ''}
        />
      </aside>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-4">
        {/* 상단 광고 배너 */}
        <div className="mb-4">
          <AdBanner
            adClient={process.env.NEXT_PUBLIC_ADSENSE_ID ?? ''}
            adSlot={process.env.NEXT_PUBLIC_AD_SLOT_BANNER ?? ''}
          />
        </div>

        {!isFiltered ? (
          <>
            {/* Hero */}
            <HeroSection postCount={allPosts.length} categoryCount={categories.length} />

            {/* Divider */}
            <div className="border-t border-slate-800/60 mb-10" />

            {/* Category Grid */}
            <section className="mb-10">
              <h2 className="font-mono text-xs text-slate-700 mb-4">{'// categories'}</h2>
              <div className="overflow-x-auto">
                <div className="grid grid-rows-3 md:grid-rows-2 grid-flow-col gap-3 auto-cols-[calc(50%-6px)] md:auto-cols-[calc(33.333%-8px)]">
                  {categories.map((cat) => (
                    <CategoryCard key={cat} category={cat} posts={postsByCategory[cat]} />
                  ))}
                </div>
              </div>
            </section>

            {/* Latest Posts */}
            <section>
              <h2 className="font-mono text-xs text-slate-700 mb-4">{'// latest.posts'}</h2>
              <PostList
                posts={allPosts.slice(0, 6)}
                adClient={process.env.NEXT_PUBLIC_ADSENSE_ID}
                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_INFEED}
              />
            </section>
          </>
        ) : (
          <>
            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-2 mb-4 pt-6">
              <Link href="/">
                <Badge variant="gray">전체</Badge>
              </Link>
              {categories.map((cat) => (
                <Link key={cat} href={`/?category=${encodeURIComponent(cat)}`}>
                  <Badge variant={searchParams.category === cat ? 'amber' : 'gray'}>{cat}</Badge>
                </Link>
              ))}
            </div>

            {/* Active filter */}
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-xs text-slate-600">filter:</span>
              <Link
                href="/"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded font-mono text-xs bg-primary-900/20 text-primary-400 border border-primary-800/30 hover:bg-primary-900/30 transition-colors"
              >
                [{searchParams.category}]
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Link>
              <span className="font-mono text-xs text-slate-700">({filteredPosts.length})</span>
            </div>

            {filteredPosts.length > 0 ? (
              <PostList
                posts={filteredPosts}
                adClient={process.env.NEXT_PUBLIC_ADSENSE_ID}
                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_INFEED}
              />
            ) : (
              <p className="font-mono text-slate-600 text-center py-16">
                {'// no posts found'}
              </p>
            )}
          </>
        )}
      </div>
    </>
  )
}
