import { getAllPosts } from '@/lib/mdx'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '태그 목록',
  description: '블로그의 모든 태그 목록',
}

export default function TagsPage() {
  const posts = getAllPosts()

  // 태그별 포스트 수 집계
  const tagCounts = posts.reduce<Record<string, number>>((acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] ?? 0) + 1
    })
    return acc
  }, {})

  // 포스트 수 내림차순 정렬
  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          태그 목록
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          총 {sortedTags.length}개의 태그
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tag/${encodeURIComponent(tag)}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-400 dark:hover:border-primary-600 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm font-medium"
          >
            <span>#{tag}</span>
            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded-full">
              {count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
