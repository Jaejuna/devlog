'use client'

import { useEffect } from 'react'

interface AdInFeedProps {
  adClient?: string
  adSlot?: string
}

export default function AdInFeed({ adClient, adSlot }: AdInFeedProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return

    try {
      const adsbygoogle = (
        window as Window & { adsbygoogle?: unknown[] }
      ).adsbygoogle
      if (adsbygoogle) {
        adsbygoogle.push({})
      }
    } catch {
      // AdSense 초기화 실패 무시
    }
  }, [])

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div className="w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg py-6">
        <span className="text-xs text-gray-400 dark:text-gray-500">
          인피드 광고 — 개발 환경 플레이스홀더
        </span>
      </div>
    )
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-format="fluid"
      data-ad-layout="in-article"
      data-ad-client={adClient}
      data-ad-slot={adSlot}
    />
  )
}
