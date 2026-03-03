import { ImageResponse } from 'next/og'
import { getPostBySlug, getAllPosts } from '@/lib/mdx'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export default function OgImage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  const title = post?.title ?? 'devlog'
  const category = post?.category ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        }}
      >
        {/* accent bar */}
        <div
          style={{
            width: 64,
            height: 8,
            borderRadius: 4,
            background: '#818cf8',
            marginBottom: 32,
          }}
        />
        {/* category badge */}
        {category && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#312e81',
              color: '#a5b4fc',
              fontSize: 22,
              fontWeight: 600,
              padding: '6px 18px',
              borderRadius: 999,
              marginBottom: 28,
            }}
          >
            {category}
          </div>
        )}
        {/* title */}
        <div
          style={{
            fontSize: title.length > 30 ? 48 : 60,
            fontWeight: 700,
            color: '#f8fafc',
            lineHeight: 1.2,
            letterSpacing: '-1px',
            marginBottom: 'auto',
          }}
        >
          {title}
        </div>
        {/* footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            marginTop: 48,
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 700, color: '#818cf8' }}>
            devlog
          </div>
          <div style={{ fontSize: 20, color: '#475569' }}>
            개발자 블로그
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
