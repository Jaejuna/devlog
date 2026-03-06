import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github-dark-dimmed.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://j-devlog.space'),
  title: {
    default: 'devlog — 개발자 블로그',
    template: '%s | devlog',
  },
  description: '게임과 영화를 좋아하는 개발자의 개발, AI 기술 블로그',
  verification: {
    google: 'sxvIVKBQt9YBYmJTtpKUGnFWNhhRuNdJMjDEWYPjqkQ',
  },
  openGraph: {
    siteName: 'devlog',
    images: [{ url: '/soong.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/soong.png'],
  },
}

const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

// Runs before React hydration to avoid flash of wrong theme
const themeScript = `
(function() {
  var stored = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (stored === 'dark' || (!stored && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* AdSense 소유권 확인 */}
        <meta name="google-adsense-account" content="ca-pub-4027542037390876" />

        {/* Theme init — must run before paint to prevent flash */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* AdSense — production only */}
        {adsenseId && process.env.NODE_ENV === 'production' && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
