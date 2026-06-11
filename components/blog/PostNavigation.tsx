import Link from 'next/link'
import type { PostMeta } from '@/lib/types'
import { getTranslations } from 'next-intl/server'

interface PostNavigationProps {
  prev: PostMeta | null
  next: PostMeta | null
}

export default async function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null

  const t = await getTranslations('blog')

  return (
    <nav
      aria-label="prev/next post"
      className="mt-12 pt-8 border-t border-slate-800/60 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex flex-col p-4 border border-slate-800/60 rounded-xl hover:border-primary-700/50 hover:bg-slate-800/20 transition-all"
        >
          <span className="font-mono text-xs text-slate-600 mb-1 flex items-center gap-1 group-hover:text-primary-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {t('prevPost')}
          </span>
          <span className="font-mono text-sm text-slate-400 group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col items-end p-4 border border-slate-800/60 rounded-xl hover:border-primary-700/50 hover:bg-slate-800/20 transition-all text-right"
        >
          <span className="font-mono text-xs text-slate-600 mb-1 flex items-center gap-1 group-hover:text-primary-500 transition-colors">
            {t('nextPost')}
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <span className="font-mono text-sm text-slate-400 group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
