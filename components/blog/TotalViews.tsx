'use client'

import { useEffect, useState } from 'react'

export default function TotalViews() {
  const [total, setTotal] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/views')
      .then((res) => res.json())
      .then((data) => setTotal(data.total))
      .catch(() => {})
  }, [])

  if (total === null) return null

  return (
    <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
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
      <span>
        총{' '}
        <strong className="text-gray-800 dark:text-gray-200 font-semibold">
          {total.toLocaleString('ko-KR')}
        </strong>
        회 조회
      </span>
    </div>
  )
}
