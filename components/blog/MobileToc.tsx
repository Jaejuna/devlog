'use client'

import { useState } from 'react'
import TableOfContents from './TableOfContents'
import type { TocItem } from '@/lib/types'
import { useTranslations } from 'next-intl'

interface MobileTocProps {
  headings: TocItem[]
}

export default function MobileToc({ headings }: MobileTocProps) {
  const [open, setOpen] = useState(false)
  const t = useTranslations('blog')

  if (headings.length === 0) return null

  return (
    <div className="lg:hidden mb-6 border border-slate-800/60 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 font-mono text-sm text-slate-400 hover:bg-slate-800/30 transition-colors"
        aria-expanded={open}
      >
        <span className="text-slate-500">{t('toc')}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className={`transition-transform text-slate-600 ${open ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-2 border-t border-slate-800/60">
          <TableOfContents headings={headings} />
        </div>
      )}
    </div>
  )
}
