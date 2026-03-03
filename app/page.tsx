import { getAllPosts } from '@/lib/mdx'
import PostList from '@/components/blog/PostList'
import AdSidebar from '@/components/ads/AdSidebar'
import AdBanner from '@/components/ads/AdBanner'
import Badge from '@/components/ui/Badge'
import Tag from '@/components/ui/Tag'
import Link from 'next/link'
import type { Metadata } from 'next'
import SidebarSearch from '@/components/blog/SidebarSearch'

export const metadata: Metadata = {
  title: 'devlog — 개발자 블로그',
  description: '개발 경험과 면접 준비 콘텐츠를 다루는 개인 기술 블로그',
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

interface HomePageProps {
  searchParams: {
    category?: string
    tag?: string
  }
}

export default function HomePage({ searchParams }: HomePageProps) {
  const allPosts = getAllPosts()

  // 카테고리/태그 필터링
  const filteredPosts = allPosts.filter((post) => {
    if (searchParams.category && post.category !== searchParams.category) {
      return false
    }
    if (searchParams.tag && !post.tags.includes(searchParams.tag)) {
      return false
    }
    return true
  })

  // 모든 카테고리/태그 수집
  const categories = Array.from(new Set(allPosts.map((p) => p.category)))
  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags)))

  // 인기글 (최근 4개 — 조회수 없으면 날짜순)
  const popularPosts = allPosts.slice(0, 4)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* 상단 광고 배너 */}
          <div className="mb-6">
            <AdBanner
              adClient={process.env.NEXT_PUBLIC_ADSENSE_ID ?? ''}
              adSlot={process.env.NEXT_PUBLIC_AD_SLOT_BANNER ?? ''}
            />
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Link href="/">
              <Badge variant={!searchParams.category && !searchParams.tag ? 'purple' : 'gray'}>
                전체
              </Badge>
            </Link>
            {categories.map((cat) => (
              <Link key={cat} href={`/?category=${encodeURIComponent(cat)}`}>
                <Badge variant={searchParams.category === cat ? 'purple' : 'gray'}>
                  {cat}
                </Badge>
              </Link>
            ))}
          </div>

          {/* 태그 필터 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {allTags.map((tag) => (
              <Link key={tag} href={`/?tag=${encodeURIComponent(tag)}`}>
                <Tag variant={searchParams.tag === tag ? 'blue' : 'gray'}>
                  {tag}
                </Tag>
              </Link>
            ))}
          </div>

          {/* 활성 필터 표시 */}
          {(searchParams.category || searchParams.tag) && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs text-gray-400 dark:text-gray-500">필터:</span>
              {searchParams.category && (
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                >
                  {searchParams.category}
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Link>
              )}
              {searchParams.tag && (
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                >
                  #{searchParams.tag}
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Link>
              )}
              <span className="text-xs text-gray-400 dark:text-gray-500">
                ({filteredPosts.length}개)
              </span>
            </div>
          )}

          {/* 포스트 목록 */}
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
        </div>

        {/* Sidebar (desktop only) */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <div className="flex flex-col gap-6">
            {/* 검색 박스 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                검색
              </h3>
              <SidebarSearch />
            </div>

            {/* 광고 */}
            <AdSidebar
              adClient={process.env.NEXT_PUBLIC_ADSENSE_ID}
              adSlot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR}
              sticky
            />

            {/* 인기글 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
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

            {/* 태그 클라우드 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                태그
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Tag key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
