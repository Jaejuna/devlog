'use client'

import { useEffect, useRef } from 'react'

interface AdBannerProps {
  adClient: string
  adSlot: string
}

export default function AdBanner({ adClient, adSlot }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null)

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
      <div
        className="w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded"
        style={{ height: '90px', maxWidth: '728px', margin: '0 auto' }}
      >
        <span className="text-xs text-gray-400 dark:text-gray-500">
          광고 영역 (728×90) — 개발 환경 플레이스홀더
        </span>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '728px', height: '90px' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
      />
    </div>
  )
}
