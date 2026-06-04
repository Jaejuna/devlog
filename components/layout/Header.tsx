'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import SearchModal from '@/components/blog/SearchModal'
import ThemeToggle from '@/components/ui/ThemeToggle'

const DRAWER_MIN = 240
const DRAWER_MAX = 560
const DRAWER_DEFAULT = 288

const navLinks = [
  { href: '/', label: '홈' },
  { href: '/tags', label: '태그' },
  { href: '/about', label: '소개' },
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
  const [drawerWidth, setDrawerWidth] = useState(DRAWER_DEFAULT)
  const drawerWidthRef = useRef(DRAWER_DEFAULT)

  useEffect(() => {
    const saved = localStorage.getItem('drawer-width')
    if (saved) {
      const w = Number(saved)
      drawerWidthRef.current = w
      setDrawerWidth(w)
    }
  }, [])

  function handleResizeStart(e: React.MouseEvent) {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = drawerWidthRef.current

    const onMove = (ev: MouseEvent) => {
      const newWidth = Math.max(DRAWER_MIN, Math.min(DRAWER_MAX, startWidth + (startX - ev.clientX)))
      drawerWidthRef.current = newWidth
      setDrawerWidth(newWidth)
    }
    const onUp = () => {
      localStorage.setItem('drawer-width', String(drawerWidthRef.current))
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'col-resize'
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  function toggleCategory(name: string) {
    setOpenCategories((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            devlog.
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Search */}
            <button
              aria-label="검색"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              onClick={() => setSearchOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>

            {/* Hamburger */}
            <button
              aria-label="메뉴"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              onClick={() => setDrawerOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full bg-white dark:bg-gray-950 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: drawerWidth }}
      >
        {/* Resize handle */}
        <div
          onMouseDown={handleResizeStart}
          className="absolute left-0 top-0 h-full w-1.5 cursor-col-resize hover:bg-primary-400/40 dark:hover:bg-primary-500/40 transition-colors z-10"
          title="드래그하여 너비 조절"
        />
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
          <span className="font-bold text-gray-900 dark:text-white">메뉴</span>
          <button
            aria-label="닫기"
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            onClick={() => setDrawerOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-6">
          {/* Nav links */}
          <nav>
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-gray-100 dark:border-gray-800" />

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
              카테고리
            </h3>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.name}>
                  {/* Category toggle button */}
                  <button
                    className="w-full flex items-center justify-between py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-left"
                    onClick={() => toggleCategory(cat.name)}
                  >
                    <span>{cat.name}</span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-400">{cat.posts.length}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className={`transition-transform duration-200 ${openCategories[cat.name] ? 'rotate-180' : ''}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  {/* Posts list */}
                  {openCategories[cat.name] && (
                    <ul className="mt-1 ml-3 border-l border-gray-200 dark:border-gray-700 pl-3 space-y-1">
                      {cat.posts.map((post) => (
                        <li key={post.slug}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="block py-1 text-xs text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 leading-snug transition-colors"
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

          <div className="border-t border-gray-100 dark:border-gray-800" />

          {/* Tags */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
              태그
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {tags.map(({ name, count }) => (
                <Link
                  key={name}
                  href={`/tag/${encodeURIComponent(name)}`}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  onClick={() => setDrawerOpen(false)}
                >
                  {name}
                  <span className="text-gray-400 dark:text-gray-500">{count}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 검색 모달 */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
