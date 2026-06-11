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
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (!isOpen || index.length > 0) return
    fetch('/search-index.json')
      .then((res) => res.json())
      .then((data: SearchItem[]) => setIndex(data))
      .catch(() => {})
  }, [isOpen, index.length])

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
    setSelectedIndex(-1)
  }, [debouncedQuery, index])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
      setResults([])
      setSelectedIndex(-1)
    }
  }, [isOpen])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, -1))
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        const item = results[selectedIndex]
        if (item) {
          window.location.href = `/blog/${item.slug}`
          onClose()
        }
      }
    },
    [isOpen, onClose, results, selectedIndex],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl bg-[#0d1117] border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800/60">
          <span className="font-mono text-accent-600 text-sm flex-shrink-0">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="포스트 검색..."
            className="flex-1 font-mono text-sm text-slate-200 bg-transparent outline-none placeholder-slate-700"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="font-mono text-xs text-slate-700 hover:text-slate-400 transition-colors"
            >
              [esc]
            </button>
          )}
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <ul className="max-h-80 overflow-y-auto">
            {results.map((item, i) => (
              <li key={item.slug}>
                <Link
                  href={`/blog/${item.slug}`}
                  onClick={onClose}
                  className={`flex flex-col px-4 py-3 border-b border-slate-800/40 transition-colors ${
                    i === selectedIndex
                      ? 'bg-slate-800/70 border-l-2 border-l-primary-500'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-accent-600 bg-accent-900/10 border border-accent-800/20 px-1.5 py-0.5 rounded">
                      [{item.category}]
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-200 mb-0.5">{item.title}</p>
                  <p className="font-mono text-xs text-slate-600 line-clamp-1">{item.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : query && debouncedQuery ? (
          <div className="px-4 py-8 text-center font-mono text-sm text-slate-700">
            {'// no results found'}
          </div>
        ) : (
          <div className="px-4 py-6 text-center font-mono text-sm text-slate-700">
            {'// type to search'}
          </div>
        )}

        {/* Keyboard hints */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-slate-800/60 bg-slate-900/30">
          <span className="font-mono text-[10px] text-slate-700">↑↓ navigate</span>
          <span className="font-mono text-[10px] text-slate-700">↵ open</span>
          <span className="font-mono text-[10px] text-slate-700">esc close</span>
        </div>
      </div>
    </div>
  )
}
