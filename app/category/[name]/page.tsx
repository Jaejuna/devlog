import { notFound } from 'next/navigation'
import { getAllPosts } from '@/lib/mdx'
import type { Metadata } from 'next'
import PostList from '@/components/blog/PostList'
import AdSidebar from '@/components/ads/AdSidebar'
import Link from 'next/link'

interface CategoryPageProps {
  params: { name: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const categories = Array.from(new Set(posts.map((p) => p.category)))
  return categories.map((category) => ({
    name: encodeURIComponent(category),
  }))
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const name = decodeURIComponent(params.name)
  return {
    title: `${name} 카테고리`,
    description: `${name} 카테고리의 포스트 목록`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = decodeURIComponent(params.name)
  const allPosts = getAllPosts()
  const posts = allPosts.filter((p) => p.category === categoryName)

  if (posts.length === 0) notFound()

  const categories = Array.from(new Set(allPosts.map((p) => p.category)))

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* 제목 */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              카테고리
            </p>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {categoryName}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              총 {posts.length}개의 포스트
            </p>
          </div>

          {/* 카테고리 탭 */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Link
              href="/"
              className="px-3 py-1 text-sm rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-400 transition-colors"
            >
              전체
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${encodeURIComponent(cat)}`}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  cat === categoryName
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-400'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          <PostList
            posts={posts}
            adClient={process.env.NEXT_PUBLIC_ADSENSE_ID}
            adSlot={process.env.NEXT_PUBLIC_AD_SLOT_INFEED}
          />
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <AdSidebar
            adClient={process.env.NEXT_PUBLIC_ADSENSE_ID}
            adSlot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR}
            sticky
          />
        </aside>
      </div>
    </div>
  )
}
