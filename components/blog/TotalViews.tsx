'use client'

import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'

type Stats = { total: number; today: number; month: number }

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

export default function TotalViews() {
  const [stats, setStats] = useState<Stats | null>(null)
  const t = useTranslations('blog')
  const locale = useLocale()

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

  const fmt = (n: number) => n.toLocaleString(locale === 'en' ? 'en-US' : 'ko-KR')

  return (
    <div className="flex flex-col gap-1.5 text-xs p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-slate-600">
          <EyeIcon />
          {t('todayVisits')}
        </span>
        <strong className="text-slate-400 font-semibold tabular-nums font-mono">
          {fmt(stats.today)}
        </strong>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-slate-600">
          <EyeIcon />
          {t('monthVisits')}
        </span>
        <strong className="text-slate-400 font-semibold tabular-nums font-mono">
          {fmt(stats.month)}
        </strong>
      </div>
      <div className="border-t border-slate-800/60 my-0.5" />
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-slate-600">
          <EyeIcon />
          {t('totalViews')}
        </span>
        <strong className="text-slate-400 font-semibold tabular-nums font-mono">
          {fmt(stats.total)}
        </strong>
      </div>
    </div>
  )
}
