import type { ReactNode } from 'react'

const variantClasses = {
  purple:
    'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
  gray: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
}

interface BadgeProps {
  children: ReactNode
  variant?: keyof typeof variantClasses
}

export default function Badge({ children, variant = 'purple' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  )
}
