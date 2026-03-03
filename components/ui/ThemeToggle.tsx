'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggle() {
    const isDark = document.documentElement.classList.toggle('dark')
    setDark(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  // 마운트 전에는 같은 크기의 빈 버튼 렌더 (레이아웃 시프트 방지)
  if (!mounted) {
    return <button aria-hidden className="p-2 w-9 h-9" disabled />
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      {dark ? (
        // Sun icon — 현재 다크, 라이트로 전환
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ) : (
        // Moon icon — 현재 라이트, 다크로 전환
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  )
}
