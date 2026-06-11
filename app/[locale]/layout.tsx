import type { Metadata } from 'next'
import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import '../globals.css'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github-dark-dimmed.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getAllPosts } from '@/lib/mdx'
import { routing } from '@/i18n/routing'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://j-devlog.space'),
  title: {
    default: 'devlog — 개발자 블로그',
    template: '%s | devlog',
  },
  description: '삽질의 흔적을 정리합니다.',
  verification: {
    google: 'sxvIVKBQt9YBYmJTtpKUGnFWNhhRuNdJMjDEWYPjqkQ',
  },
  openGraph: {
    siteName: 'devlog',
    description: '삽질의 흔적을 정리합니다.',
    images: [{ url: '/soong.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    description: '삽질의 흔적을 정리합니다.',
    images: ['/soong.png'],
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound()
  }

  const messages = await getMessages()

  const posts = getAllPosts()
  const categoryMap: Record<string, { slug: string; title: string }[]> = {}
  for (const post of posts) {
    if (!categoryMap[post.category]) categoryMap[post.category] = []
    categoryMap[post.category].push({ slug: post.slug, title: post.title })
  }
  const categories = Object.entries(categoryMap).map(([name, catPosts]) => ({
    name,
    posts: catPosts,
  }))

  const tagCount: Record<string, number> = {}
  for (const post of posts) {
    for (const tag of post.tags) {
      tagCount[tag] = (tagCount[tag] ?? 0) + 1
    }
  }
  const tags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }))

  return (
    <html lang={locale} className="dark">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4027542037390876" />
        {adsenseId && process.env.NODE_ENV === 'production' && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-screen bg-[#0a0e17] text-slate-200">
        <NextIntlClientProvider messages={messages}>
          <Header categories={categories} tags={tags} />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
