'use client'

import { useEffect, useState } from 'react'

type Stats = { total: number; today: number; month: number }

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

export default function TotalViews() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/views').then((r) => r.json()),
      fetch('/api/visitors').then((r) => r.json()),
    ])
      .then(([views, visits]) => {
        setStats({ total: views.total, today: visits.today, month: visits.month })
      })
      .catch(() => {})
  }, [])

  if (stats === null) return null

  return (
    <div className="flex flex-col gap-1.5 text-xs text-gray-500 dark:text-gray-400 p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <EyeIcon />
          오늘 방문
        </span>
        <strong className="text-gray-700 dark:text-gray-300 font-semibold tabular-nums">
          {stats.today.toLocaleString('ko-KR')}
        </strong>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <EyeIcon />
          이번 달 방문
        </span>
        <strong className="text-gray-700 dark:text-gray-300 font-semibold tabular-nums">
          {stats.month.toLocaleString('ko-KR')}
        </strong>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 my-0.5" />
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <EyeIcon />
          누적 조회
        </span>
        <strong className="text-gray-700 dark:text-gray-300 font-semibold tabular-nums">
          {stats.total.toLocaleString('ko-KR')}
        </strong>
      </div>
    </div>
  )
}
