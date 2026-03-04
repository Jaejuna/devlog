'use client'

import { useEffect, useState } from 'react'

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    fetch(`/api/views/${slug}`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch(() => {})
  }, [slug])

  return (
    <span className="flex items-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      {views === null ? (
        <span className="w-10 h-3.5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse inline-block" />
      ) : (
        <span>{views.toLocaleString('ko-KR')}회</span>
      )}
    </span>
  )
}
