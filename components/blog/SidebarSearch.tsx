'use client'

import { useState } from 'react'
import SearchModal from './SearchModal'

export default function SidebarSearch() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left px-3 py-2 font-mono text-xs text-slate-600 border border-slate-800/60 rounded bg-slate-800/20 hover:border-accent-700/40 hover:text-slate-400 transition-all focus:outline-none"
      >
        포스트 검색...
      </button>
      <SearchModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
