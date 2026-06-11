import { getAllPosts } from '@/lib/mdx'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: '태그 목록 | devlog',
  description: '블로그의 모든 태그 목록',
}

export default async function TagsPage() {
  const t = await getTranslations('tags')
  const posts = getAllPosts()

  const tagCounts = posts.reduce<Record<string, number>>((acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] ?? 0) + 1
    })
    return acc
  }, {})

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-10">
        <p className="font-mono text-xs text-accent-600 mb-2">{t('command')}</p>
        <h1 className="text-2xl font-bold text-slate-100 mb-1">{t('title')}</h1>
        <p className="font-mono text-xs text-slate-700">
          {'// '}
          <span className="text-slate-500">{sortedTags.length}</span>
          {` ${t('found')}`}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tag/${encodeURIComponent(tag)}`}
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded border border-slate-800/60 bg-slate-900/20 hover:border-accent-700/50 hover:bg-slate-800/30 transition-all"
          >
            <span className="font-mono text-sm text-slate-400 group-hover:text-accent-400 transition-colors">
              #{tag}
            </span>
            <span className="font-mono text-xs text-slate-700 bg-slate-800/60 px-1.5 py-0.5 rounded">
              {count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
