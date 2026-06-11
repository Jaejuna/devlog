'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import SearchModal from '@/components/blog/SearchModal'

const navLinks = [
  { href: '/', label: '/home' },
  { href: '/tags', label: '/tags' },
  { href: '/about', label: '/about' },
]

type CategoryData = { name: string; posts: { slug: string; title: string }[] }
type TagData = { name: string; count: number }

interface HeaderProps {
  categories: CategoryData[]
  tags: TagData[]
}

export default function Header({ categories, tags }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  function toggleCategory(name: string) {
    setOpenCategories((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#0a0e17]/90 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Terminal prompt logo */}
          <Link href="/" className="flex items-center gap-1 group font-mono">
            <span className="text-accent-500 text-sm group-hover:text-accent-400 transition-colors">❯</span>
            <span className="text-slate-100 text-sm font-semibold ml-1 group-hover:text-white transition-colors">
              j-devlog
            </span>
            <span className="text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 text-sm">
              ▊
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 font-mono text-sm text-slate-500 hover:text-primary-400 hover:bg-slate-800/40 rounded transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Search — desktop with kbd hint */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded bg-slate-800/60 border border-slate-700/40 text-slate-500 hover:text-slate-300 hover:border-slate-600/60 transition-all font-mono text-xs"
              aria-label="검색 (⌘K)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <span>검색</span>
              <kbd className="px-1 py-0.5 text-[10px] bg-slate-700/80 rounded border border-slate-600/50 text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Mobile search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="md:hidden p-2 text-slate-500 hover:text-primary-400 transition-colors"
              aria-label="검색"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 text-slate-500 hover:text-primary-400 transition-colors"
              aria-label="메뉴"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-[#0d1117] border-l border-slate-800/60 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-slate-800/60 flex-shrink-0">
          <span className="font-mono text-sm text-slate-500">
            <span className="text-accent-600">~</span>/nav
          </span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1.5 text-slate-700 hover:text-slate-300 transition-colors rounded"
            aria-label="닫기"
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5">
          {/* Nav links */}
          <nav>
            <ul className="space-y-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 py-2 px-2 font-mono text-sm text-slate-400 hover:text-primary-400 hover:bg-slate-800/40 rounded transition-all"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <span className="text-accent-700 text-xs">❯</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-slate-800/60" />

          {/* Categories */}
          <div>
            <h3 className="font-mono text-xs text-slate-700 mb-2 px-2">{'// categories'}</h3>
            <ul className="space-y-0.5">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <button
                    className="w-full flex items-center justify-between py-1.5 px-2 font-mono text-sm text-slate-400 hover:text-accent-400 hover:bg-slate-800/40 rounded transition-all text-left"
                    onClick={() => toggleCategory(cat.name)}
                  >
                    <span>[{cat.name}]</span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-700">{cat.posts.length}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className={`transition-transform duration-200 text-slate-700 ${
                          openCategories[cat.name] ? 'rotate-180' : ''
                        }`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  {openCategories[cat.name] && (
                    <ul className="mt-0.5 ml-3 border-l border-slate-800 pl-3 space-y-0.5">
                      {cat.posts.map((post) => (
                        <li key={post.slug}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="block py-1 font-mono text-xs text-slate-600 hover:text-primary-400 leading-snug transition-colors"
                            onClick={() => setDrawerOpen(false)}
                          >
                            {post.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-800/60" />

          {/* Tags */}
          <div>
            <h3 className="font-mono text-xs text-slate-700 mb-2 px-2">{'// tags'}</h3>
            <div className="flex flex-wrap gap-1.5 px-2">
              {tags.map(({ name, count }) => (
                <Link
                  key={name}
                  href={`/tag/${encodeURIComponent(name)}`}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-xs bg-slate-800/60 text-slate-500 hover:bg-slate-700/60 hover:text-accent-400 border border-slate-700/40 hover:border-accent-700/40 transition-all"
                  onClick={() => setDrawerOpen(false)}
                >
                  #{name}
                  <span className="text-slate-700">{count}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
