'use client'

import { useEffect, useState } from 'react'
import type { TocItem } from '@/lib/types'

interface TableOfContentsProps {
  headings: TocItem[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0% -80% 0%',
        threshold: 0,
      },
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label="목차" className="text-sm">
      <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
        목차
      </h3>
      <ul className="space-y-1.5">
        {headings.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? 'pl-4' : ''}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                const el = document.getElementById(item.id)
                if (el) {
                  e.preventDefault()
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  setActiveId(item.id)
                }
              }}
              className={`block py-0.5 transition-colors ${
                activeId === item.id
                  ? 'text-primary-600 dark:text-primary-400 font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
