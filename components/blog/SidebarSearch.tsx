'use client'

import { useState } from 'react'
import SearchModal from './SearchModal'

export default function SidebarSearch() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-400 hover:border-primary-400 dark:hover:border-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        포스트 검색...
      </button>
      <SearchModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
