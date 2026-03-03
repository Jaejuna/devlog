import Link from 'next/link'
import type { PostMeta } from '@/lib/types'

interface PostNavigationProps {
  prev: PostMeta | null
  next: PostMeta | null
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null

  return (
    <nav
      aria-label="이전/다음 포스트"
      className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* 이전 포스트 (오래된 것) */}
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex flex-col p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-primary-400 dark:hover:border-primary-600 transition-colors"
        >
          <span className="text-xs text-gray-400 dark:text-gray-500 mb-1 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            이전 포스트
          </span>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {/* 다음 포스트 (최신 것) */}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col items-end p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-primary-400 dark:hover:border-primary-600 transition-colors text-right"
        >
          <span className="text-xs text-gray-400 dark:text-gray-500 mb-1 flex items-center gap-1">
            다음 포스트
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
