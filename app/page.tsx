import { getAllPosts } from '@/lib/mdx'
import PostList from '@/components/blog/PostList'
import AdSidebar from '@/components/ads/AdSidebar'
import AdBanner from '@/components/ads/AdBanner'
import Badge from '@/components/ui/Badge'
import Tag from '@/components/ui/Tag'
import Link from 'next/link'

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
              <Badge variant={!searchParams.category ? 'purple' : 'gray'}>
                전체
              </Badge>
            </Link>
            {categories.map((cat) => (
              <Link key={cat} href={`/?category=${encodeURIComponent(cat)}`}>
                <Badge
                  variant={searchParams.category === cat ? 'purple' : 'gray'}
                >
                  {cat}
                </Badge>
              </Link>
            ))}
          </div>

          {/* 태그 필터 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {allTags.map((tag) => (
              <Link key={tag} href={`/?tag=${encodeURIComponent(tag)}`}>
                <Tag variant={searchParams.tag === tag ? 'blue' : 'gray'}>
                  {tag}
                </Tag>
              </Link>
            ))}
          </div>

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
              <input
                type="text"
                placeholder="포스트 검색..."
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                readOnly
              />
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

            {/* 뉴스레터 구독 */}
            <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-800">
              <h3 className="text-sm font-semibold text-primary-700 dark:text-primary-300 mb-2">
                뉴스레터 구독
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                새 포스트 알림을 이메일로 받아보세요.
              </p>
              <input
                type="email"
                placeholder="이메일 주소"
                className="w-full px-3 py-2 text-xs border border-primary-200 dark:border-primary-700 rounded-lg mb-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium rounded-lg transition-colors">
                구독하기
              </button>
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
