import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, getAdjacentPosts } from '@/lib/mdx'
import type { Metadata } from 'next'
import Tag from '@/components/ui/Tag'
import AdSidebar from '@/components/ads/AdSidebar'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import mdxComponents from '@/components/blog/MdxComponents'
import TableOfContents from '@/components/blog/TableOfContents'
import { extractHeadings } from '@/lib/types'
import MobileToc from '@/components/blog/MobileToc'
import AdBanner from '@/components/ads/AdBanner'
import PostNavigation from '@/components/blog/PostNavigation'
import RelatedPosts from '@/components/blog/RelatedPosts'
import ReadingProgress from '@/components/blog/ReadingProgress'
import ViewCounter from '@/components/blog/ViewCounter'
import TotalViews from '@/components/blog/TotalViews'
import { routing } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { translateTag } from '@/lib/tagTranslations'

interface BlogPostPageProps {
  params: { locale: string; slug: string }
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPosts().map((post) => ({ locale, slug: post.slug })),
  )
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://j-devlog.space'
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${BASE}/blog/${params.slug}` },
    openGraph: {
      title: post.title, description: post.excerpt, type: 'article',
      publishedTime: post.date, tags: post.tags, locale: 'ko_KR',
      siteName: 'devlog', url: `${BASE}/blog/${params.slug}`,
      images: [{ url: '/soong.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt, images: ['/soong.png'] },
  }
}

function formatDate(dateString: string, locale: string): string {
  return new Date(dateString).toLocaleDateString(
    locale === 'en' ? 'en-US' : 'ko-KR',
    { year: 'numeric', month: 'long', day: 'numeric' },
  )
}

function splitAtFirstH2(content: string): [string, string] {
  let count = 0
  let splitIndex = -1
  const lines = content.split('\n')
  let charIndex = 0
  for (const line of lines) {
    if (line.startsWith('## ')) {
      count++
      if (count === 2) { splitIndex = charIndex; break }
    }
    charIndex += line.length + 1
  }
  if (splitIndex === -1) return [content, '']
  return [content.slice(0, splitIndex), content.slice(splitIndex)]
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug, params.locale)
  if (!post) notFound()

  const t = await getTranslations('post')
  const headings = extractHeadings(post.content)
  const [contentPart1, contentPart2] = splitAtFirstH2(post.content)
  const { prev, next } = getAdjacentPosts(params.slug, params.locale)
  const relatedPosts = getAllPosts(params.locale)
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://j-devlog.space'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title, description: post.excerpt,
    datePublished: post.date, dateModified: post.date,
    author: { '@type': 'Person', name: 'devlog', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'devlog', url: BASE_URL },
    url: `${BASE_URL}/blog/${post.slug}`,
    keywords: post.tags.join(', '), articleSection: post.category, inLanguage: 'ko',
  }

  const mdxOptions = {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeSlug, rehypeHighlight, rehypeKatex],
    },
  }

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <aside className="hidden xl:flex fixed top-20 left-6 w-56 flex-col gap-6 z-10 overflow-y-auto max-h-[calc(100vh-5rem)] pb-8">
        {headings.length > 0 && (
          <div className="p-4 border border-slate-800/60 rounded-xl">
            <TableOfContents headings={headings} />
          </div>
        )}
        <TotalViews />
        <AdSidebar adClient={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR} sticky />
      </aside>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <article>
          <header className="mb-10">
            <p className="font-mono text-xs text-accent-500/80 bg-accent-900/10 border border-accent-800/20 px-1.5 py-0.5 rounded inline-block mb-4">
              [{post.category}]
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100 mb-5 leading-tight tracking-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-sm text-slate-500 mb-5">
              <time dateTime={post.date}>{formatDate(post.date, params.locale)}</time>
              <span className="text-slate-700">·</span>
              <span>{t('readTime', { minutes: post.readTime })}</span>
              <span className="text-slate-700">·</span>
              <ViewCounter slug={params.slug} />
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Tag key={tag} href={`/tag/${encodeURIComponent(tag)}`}>{translateTag(tag, params.locale)}</Tag>
                ))}
              </div>
            )}
            <div className="mt-8 border-t border-slate-800/60" />
          </header>

          <MobileToc headings={headings} />

          <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:scroll-mt-20">
            <MDXRemote source={contentPart1} components={mdxComponents} options={mdxOptions} />
          </div>

          {contentPart2 && (
            <div className="my-8">
              <AdBanner adClient={process.env.NEXT_PUBLIC_ADSENSE_ID ?? ''} adSlot={process.env.NEXT_PUBLIC_AD_SLOT_BANNER ?? ''} />
            </div>
          )}

          {contentPart2 && (
            <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:scroll-mt-20">
              <MDXRemote source={contentPart2} components={mdxComponents} options={mdxOptions} />
            </div>
          )}

          <div className="mt-12 mb-6">
            <AdBanner adClient={process.env.NEXT_PUBLIC_ADSENSE_ID ?? ''} adSlot={process.env.NEXT_PUBLIC_AD_SLOT_BANNER ?? ''} />
          </div>

          <PostNavigation prev={prev} next={next} />
          <RelatedPosts posts={relatedPosts} />
        </article>
      </div>
    </>
  )
}
