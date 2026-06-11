import type { PostMeta } from '@/lib/types'
import PostCard from './PostCard'
import { getTranslations } from 'next-intl/server'
import { getLocale } from 'next-intl/server'

interface RelatedPostsProps {
  posts: PostMeta[]
}

export default async function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  const t = await getTranslations('blog')
  const locale = await getLocale()

  return (
    <section className="mt-16 pt-8 border-t border-slate-800/60">
      <h2 className="font-mono text-xs text-slate-700 mb-6">
        {'// '}<span className="text-slate-500">{t('relatedPosts')}</span>
      </h2>
      <div className="flex flex-col">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>
    </section>
  )
}
