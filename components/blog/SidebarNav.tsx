import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

interface SidebarNavProps {
  currentSlug: string
}

export default function SidebarNav({ currentSlug }: SidebarNavProps) {
  const posts = getAllPosts()

  // 카테고리별 그룹
  const categoryMap: Record<string, { slug: string; title: string }[]> = {}
  for (const post of posts) {
    if (!categoryMap[post.category]) categoryMap[post.category] = []
    categoryMap[post.category].push({ slug: post.slug, title: post.title })
  }

  // 태그 빈도 집계
  const tagCount: Record<string, number> = {}
  for (const post of posts) {
    for (const tag of post.tags) {
      tagCount[tag] = (tagCount[tag] ?? 0) + 1
    }
  }
  const sortedTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1])

  return (
    <div className="text-sm flex flex-col gap-6">
      {/* 카테고리별 포스트 */}
      <div>
        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
          카테고리
        </h3>
        <div className="flex flex-col gap-4">
          {Object.entries(categoryMap).map(([category, catPosts]) => (
            <div key={category}>
              <Link
                href={`/category/${encodeURIComponent(category)}`}
                className="block text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide mb-1.5 hover:underline"
              >
                {category} ({catPosts.length})
              </Link>
              <ul className="space-y-1">
                {catPosts.map((p: { slug: string; title: string }) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className={`block leading-snug py-0.5 transition-colors ${
                        p.slug === currentSlug
                          ? 'text-gray-900 dark:text-white font-medium'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      {p.slug === currentSlug && (
                        <span className="mr-1 text-primary-500">›</span>
                      )}
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 태그 */}
      <div>
        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
          태그
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {sortedTags.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}`}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              {tag}
              <span className="text-gray-400 dark:text-gray-500">{count}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
