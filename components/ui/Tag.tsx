import type { ReactNode } from 'react'
import Link from 'next/link'

const variantClasses = {
  blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40',
  gray: 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700',
}

interface TagProps {
  children: ReactNode
  variant?: keyof typeof variantClasses
  href?: string
}

export default function Tag({ children, variant = 'blue', href }: TagProps) {
  const className = `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium transition-colors ${variantClasses[variant]}`

  if (href) {
    return (
      <Link href={href} className={className}>
        #{children}
      </Link>
    )
  }

  return (
    <span className={className}>
      #{children}
    </span>
  )
}
