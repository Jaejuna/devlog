'use client'

import { useRef, useState, type ReactNode } from 'react'

export default function CodeBlock({ children }: { children: ReactNode }) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)

  async function copy() {
    const text = preRef.current?.innerText ?? ''
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-6">
      <pre
        ref={preRef}
        className="overflow-x-auto rounded-xl bg-gray-900 dark:bg-gray-800 p-4 text-sm leading-relaxed text-gray-100"
      >
        {children}
      </pre>
      <button
        onClick={copy}
        aria-label="코드 복사"
        className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-150"
      >
        {copied ? '복사됨 ✓' : '복사'}
      </button>
    </div>
  )
}
