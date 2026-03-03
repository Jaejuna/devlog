'use client'

import { useState } from 'react'
import TableOfContents from './TableOfContents'
import type { TocItem } from '@/lib/types'

interface MobileTocProps {
  headings: TocItem[]
}

export default function MobileToc({ headings }: MobileTocProps) {
  const [open, setOpen] = useState(false)

  if (headings.length === 0) return null

  return (
    <div className="lg:hidden mb-6 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={open}
      >
        <span>목차</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-gray-800">
          <TableOfContents headings={headings} />
        </div>
      )}
    </div>
  )
}
