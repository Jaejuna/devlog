import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'devlog — 개발자 블로그'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
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
            marginBottom: 40,
          }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#f8fafc',
            letterSpacing: '-2px',
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          devlog
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#94a3b8',
            fontWeight: 400,
          }}
        >
          개발자 블로그
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 80,
            fontSize: 20,
            color: '#475569',
          }}
        >
          devlog.dev
        </div>
      </div>
    ),
    { ...size }
  )
}
