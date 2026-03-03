'use client'

import { useEffect } from 'react'

interface AdSidebarProps {
  adClient?: string
  adSlot?: string
  sticky?: boolean
}

export default function AdSidebar({
  adClient,
  adSlot,
  sticky = false,
}: AdSidebarProps) {
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

  const wrapperClass = sticky ? 'sticky top-20' : ''

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div className={wrapperClass}>
        <div
          className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
          style={{ width: '300px', height: '250px' }}
        >
          <span className="text-xs text-gray-400 dark:text-gray-500 text-center px-4">
            사이드바 광고<br />(300×250)<br />개발 환경 플레이스홀더
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={wrapperClass}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '300px', height: '250px' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
      />
    </div>
  )
}
