import { notFound } from 'next/navigation'
import { getAllPosts } from '@/lib/mdx'
import type { Metadata } from 'next'
import PostList from '@/components/blog/PostList'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { translateTag } from '@/lib/tagTranslations'

interface TagPageProps {
  params: { locale: string; name: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags)))
  return routing.locales.flatMap((locale) => tags.map((name) => ({ locale, name })))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const name = decodeURIComponent(params.name)
  return {
    title: `#${name} | devlog`,
    description: `${name} 태그의 포스트 목록`,
    robots: { index: false },
    openGraph: { title: `#${name} | devlog`, description: `${name} 태그의 포스트 목록`, type: 'website', locale: 'ko_KR' },
    twitter: { card: 'summary', title: `#${name} | devlog` },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const t = await getTranslations('tag')
  const { locale } = params
  const tagName = decodeURIComponent(params.name)
  const posts = getAllPosts(locale).filter((p) => p.tags.includes(tagName))

  if (posts.length === 0) notFound()

  const displayName = translateTag(tagName, locale)

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link href="/tags" className="font-mono text-xs text-slate-700 hover:text-accent-400 transition-colors mb-4 inline-block">
          {t('back')}
        </Link>
        <p className="font-mono text-xs text-accent-600 mb-2">{t('command')}</p>
        <h1 className="text-2xl font-bold text-slate-100 mb-1">
          <span className="text-slate-500 font-normal">#</span>
          {displayName}
        </h1>
        <p className="font-mono text-xs text-slate-700">
          {'// '}
          <span className="text-slate-500">{posts.length}</span>
          {` ${t('found')}`}
        </p>
      </div>

      <PostList
        posts={posts}
        adClient={process.env.NEXT_PUBLIC_ADSENSE_ID}
        adSlot={process.env.NEXT_PUBLIC_AD_SLOT_INFEED}
        locale={locale}
      />
    </div>
  )
}
