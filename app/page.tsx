import { getAllPosts } from '@/lib/mdx'
import { getViewsMap } from '@/lib/redis'
import PostList from '@/components/blog/PostList'
import AdSidebar from '@/components/ads/AdSidebar'
import AdBanner from '@/components/ads/AdBanner'
import Badge from '@/components/ui/Badge'
import Link from 'next/link'
import type { Metadata } from 'next'
import SidebarSearch from '@/components/blog/SidebarSearch'
import TotalViews from '@/components/blog/TotalViews'
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

type CategoryConfig = {
  bg: string
  border: string
  text: string
  description: string
}

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  AI: {
    bg: 'bg-gray-50 dark:bg-gray-900/30',
    border: 'border-gray-200 dark:border-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
    description: 'LLM, 프롬프트 엔지니어링, AI 도구 활용',
  },
  개발: {
    bg: 'bg-gray-50 dark:bg-gray-900/30',
    border: 'border-gray-200 dark:border-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
    description: '웹·백엔드 개념, 패턴, 실무 경험',
  },
  면접: {
    bg: 'bg-gray-50 dark:bg-gray-900/30',
    border: 'border-gray-200 dark:border-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
    description: 'CS 기초, 기술 면접 빈출 문제 정리',
  },
  회고: {
    bg: 'bg-gray-50 dark:bg-gray-900/30',
    border: 'border-gray-200 dark:border-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
    description: '프로젝트와 이벤트 경험의 기록',
  },
  MMD: {
    bg: 'bg-gray-50 dark:bg-gray-900/30',
    border: 'border-gray-200 dark:border-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
    description: 'ML/DS를 위한 선형대수, 미적분, 통계',
  },
}

const DEFAULT_CONFIG: CategoryConfig = {
  bg: 'bg-gray-50 dark:bg-gray-900/30',
  border: 'border-gray-200 dark:border-gray-800',
  text: 'text-gray-700 dark:text-gray-300',
  description: '관련 포스트 모음',
}

function CategoryCard({
  category,
  posts,
  config,
}: {
  category: string
  posts: PostMeta[]
  config: CategoryConfig
}) {
  return (
    <Link href={`/?category=${encodeURIComponent(category)}`}>
      <div
        className={`h-full p-5 rounded-xl border ${config.border} ${config.bg} hover:shadow-md transition-all cursor-pointer group`}
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className={`font-bold text-base ${config.text}`}>{category}</h3>
          <span className="text-xs text-gray-400 dark:text-gray-500 bg-white/70 dark:bg-black/20 px-2 py-0.5 rounded-full shrink-0 ml-2">
            {posts.length}개
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
          {config.description}
        </p>
        <ul className="space-y-1">
          {posts.slice(0, 2).map((p) => (
            <li
              key={p.slug}
              className="text-xs text-gray-500 dark:text-gray-400 truncate group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors"
            >
              · {p.title}
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

  const categories = Array.from(new Set(allPosts.map((p) => p.category)))
    .sort((a, b) => {
      const latestA = Math.max(...allPosts.filter((p) => p.category === a).map((p) => new Date(p.date).getTime()))
      const latestB = Math.max(...allPosts.filter((p) => p.category === b).map((p) => new Date(p.date).getTime()))
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Sidebar (desktop only) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 flex flex-col gap-6">
            {/* 검색 */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                검색
              </h3>
              <SidebarSearch />
            </div>

            {/* 전체 조회수 */}
            <TotalViews />

            {/* 인기글 */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                인기글
              </h3>
              <ul className="flex flex-col gap-3">
                {popularPosts.map((post, i) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-start gap-3 group"
                    >
                      <span className="text-2xl font-bold text-gray-200 dark:text-gray-700 leading-none">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {post.readTime}분 읽기
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* 상단 광고 배너 */}
          <div className="mb-6">
            <AdBanner
              adClient={process.env.NEXT_PUBLIC_ADSENSE_ID ?? ''}
              adSlot={process.env.NEXT_PUBLIC_AD_SLOT_BANNER ?? ''}
            />
          </div>

          {!isFiltered ? (
            <>
              {/* Hero */}
              <div className="mb-10 pb-8 border-b border-gray-100 dark:border-gray-800">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                  J&apos;s Devlog
                </h1>
                <p className="text-base text-gray-500 dark:text-gray-400 mb-5">
                  개발, 연구 경험을 정리하는 기술 블로그
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                  <span>
                    <strong className="text-gray-600 dark:text-gray-300 font-semibold">{allPosts.length}</strong>
                    {' '}개 포스트
                  </span>
                  <span className="text-gray-300 dark:text-gray-700">·</span>
                  <span>
                    <strong className="text-gray-600 dark:text-gray-300 font-semibold">{categories.length}</strong>
                    {' '}개 카테고리
                  </span>
                </div>
              </div>

              {/* Category Grid */}
              <section className="mb-10">
                <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                  카테고리
                </h2>
                <div className="overflow-x-auto">
                  <div className="grid grid-rows-3 md:grid-rows-2 grid-flow-col gap-3 auto-cols-[calc(50%-6px)] md:auto-cols-[calc(33.333%-8px)]">
                    {categories.map((cat) => (
                      <CategoryCard
                        key={cat}
                        category={cat}
                        posts={postsByCategory[cat]}
                        config={CATEGORY_CONFIG[cat] ?? DEFAULT_CONFIG}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Latest Posts */}
              <section>
                <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                  최신 글
                </h2>
                <PostList
                  posts={allPosts.slice(0, 6)}
                  adClient={process.env.NEXT_PUBLIC_ADSENSE_ID}
                  adSlot={process.env.NEXT_PUBLIC_AD_SLOT_INFEED}
                />
              </section>
            </>
          ) : (
            <>
              {/* 카테고리 필터 탭 */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Link href="/">
                  <Badge variant="gray">전체</Badge>
                </Link>
                {categories.map((cat) => (
                  <Link key={cat} href={`/?category=${encodeURIComponent(cat)}`}>
                    <Badge variant={searchParams.category === cat ? 'purple' : 'gray'}>
                      {cat}
                    </Badge>
                  </Link>
                ))}
              </div>

              {/* 활성 필터 표시 */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs text-gray-400 dark:text-gray-500">필터:</span>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                >
                  {searchParams.category}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Link>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  ({filteredPosts.length}개)
                </span>
              </div>

              {filteredPosts.length > 0 ? (
                <PostList
                  posts={filteredPosts}
                  adClient={process.env.NEXT_PUBLIC_ADSENSE_ID}
                  adSlot={process.env.NEXT_PUBLIC_AD_SLOT_INFEED}
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-16">
                  해당 조건의 포스트가 없습니다.
                </p>
              )}
            </>
          )}
        </div>

        {/* 오른쪽 광고 사이드바 (desktop only) */}
        <aside className="hidden xl:block w-56 flex-shrink-0">
          <div className="sticky top-24">
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
