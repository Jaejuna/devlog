import type { ReactNode } from 'react'

const variantClasses = {
  purple: 'bg-primary-900/20 text-primary-400 border border-primary-800/30',
  amber: 'bg-primary-900/20 text-primary-400 border border-primary-800/30',
  gray: 'bg-slate-800/60 text-slate-400 border border-slate-700/40',
  blue: 'bg-accent-900/20 text-accent-400 border border-accent-800/30',
  teal: 'bg-accent-900/20 text-accent-400 border border-accent-800/30',
}

interface BadgeProps {
  children: ReactNode
  variant?: keyof typeof variantClasses
}

export default function Badge({ children, variant = 'amber' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded font-mono text-xs ${variantClasses[variant]}`}
    >
      {children}
    </span>
  )
}
