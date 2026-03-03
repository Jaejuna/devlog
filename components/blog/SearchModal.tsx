'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

interface SearchItem {
  slug: string
  title: string
  excerpt: string
  tags: string[]
  category: string
  date: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<SearchItem[]>([])
  const [results, setResults] = useState<SearchItem[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedQuery = useDebounce(query, 300)

  // 검색 인덱스 fetch
  useEffect(() => {
    if (!isOpen || index.length > 0) return

    fetch('/search-index.json')
      .then((res) => res.json())
      .then((data: SearchItem[]) => setIndex(data))
      .catch(() => {
        // fetch 실패 시 무시
      })
  }, [isOpen, index.length])

  // 검색 필터링
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([])
      return
    }

    const q = debouncedQuery.toLowerCase()
    const filtered = index.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q)),
    )
    setResults(filtered.slice(0, 8))
  }, [debouncedQuery, index])

  // 모달 열릴 때 입력 포커스
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  // ESC로 닫기
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="text-gray-400 flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="포스트 검색..."
            className="flex-1 text-base text-gray-900 dark:text-white bg-transparent outline-none placeholder-gray-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <ul className="max-h-96 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
            {results.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/blog/${item.slug}`}
                  onClick={onClose}
                  className="flex flex-col px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                    {item.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : query && debouncedQuery ? (
          <div className="px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
            검색 결과가 없습니다.
          </div>
        ) : (
          <div className="px-4 py-6 text-center text-sm text-gray-400 dark:text-gray-500">
            검색어를 입력하세요
          </div>
        )}
      </div>
    </div>
  )
}
