import { notFound } from 'next/navigation'
import { getAllPosts } from '@/lib/mdx'
import type { Metadata } from 'next'
import PostList from '@/components/blog/PostList'
import AdSidebar from '@/components/ads/AdSidebar'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { translateCategory } from '@/lib/categoryTranslations'

interface CategoryPageProps {
  params: { locale: string; name: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const categories = Array.from(new Set(posts.map((p) => p.category)))
  return routing.locales.flatMap((locale) =>
    categories.map((name) => ({ locale, name: encodeURIComponent(name) })),
  )
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const name = decodeURIComponent(params.name)
  return {
    title: `${name} 카테고리`,
    description: `${name} 카테고리의 포스트 목록`,
    openGraph: { title: `${name} 카테고리 | devlog`, description: `${name} 카테고리의 포스트 목록`, type: 'website', locale: 'ko_KR' },
    twitter: { card: 'summary', title: `${name} 카테고리 | devlog` },
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { locale } = params
  const categoryName = decodeURIComponent(params.name)
  const allPosts = getAllPosts(locale)
  const posts = allPosts.filter((p) => p.category === categoryName)

  if (posts.length === 0) notFound()

  const categories = Array.from(new Set(allPosts.map((p) => p.category)))

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <p className="font-mono text-xs text-accent-600 mb-2">$ filter --category</p>
            <h1 className="text-2xl font-bold text-slate-100">{translateCategory(categoryName, locale)}</h1>
            <p className="font-mono text-xs text-slate-700 mt-1">
              {'// '}
              <span className="text-slate-500">{posts.length}</span>
              {' posts'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Link href="/" className="font-mono text-xs px-3 py-1 rounded border border-slate-800/60 text-slate-500 hover:border-accent-700/40 transition-colors">
              전체
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${encodeURIComponent(cat)}`}
                className={`font-mono text-xs px-3 py-1 rounded border transition-colors ${
                  cat === categoryName
                    ? 'bg-primary-900/20 text-primary-400 border-primary-800/30'
                    : 'border-slate-800/60 text-slate-500 hover:border-accent-700/40'
                }`}
              >
                [{translateCategory(cat, locale)}]
              </Link>
            ))}
          </div>

          <PostList
            posts={posts}
            adClient={process.env.NEXT_PUBLIC_ADSENSE_ID}
            adSlot={process.env.NEXT_PUBLIC_AD_SLOT_INFEED}
            locale={locale}
          />
        </div>

        <aside className="hidden lg:block w-80 flex-shrink-0">
          <AdSidebar
            adClient={process.env.NEXT_PUBLIC_ADSENSE_ID}
            adSlot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR}
            sticky
          />
        </aside>
      </div>
    </div>
  )
}
