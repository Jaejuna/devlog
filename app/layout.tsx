import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://devlog.dev'),
  title: {
    default: 'devlog — 개발자 블로그',
    template: '%s | devlog',
  },
  description: '개발 경험과 면접 준비 콘텐츠를 다루는 개인 기술 블로그',
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
