'use client'

import { useState, useEffect } from 'react'

interface HeroSectionProps {
  postCount: number
  categoryCount: number
}

const HERO_TOKENS = [
  { text: '언어를', typeLabel: '<noun>', colorClass: 'text-amber-400' },
  { text: '설계하는', typeLabel: '<verb>', colorClass: 'text-accent-400' },
  { text: '엔지니어', typeLabel: '<concept>', colorClass: 'text-amber-300' },
]

const BG_TOKENS = [
  'parse()', 'tokenize', 'syntax', 'semantic', '∇',
  'compile()', 'regex', 'AST', 'NLP', 'embed()',
  'context', 'transform()', 'infer()', 'prompt',
  'attention', 'grammar', 'lexicon', 'vector',
  'fn(x)', '→', 'Σ', 'λ', '∈', 'yield',
]

function TokenWord({
  token,
  visible,
}: {
  token: (typeof HERO_TOKENS)[0]
  visible: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <span
      className={`relative inline-block cursor-default mx-1 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 font-mono text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-600/50 whitespace-nowrap z-10 pointer-events-none">
          {token.typeLabel}
        </span>
      )}
      <span className={`${token.colorClass} font-bold`}>{token.text}</span>
    </span>
  )
}

export default function HeroSection({ postCount, categoryCount }: HeroSectionProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    if (visibleCount < HERO_TOKENS.length) {
      const t = setTimeout(() => setVisibleCount((v) => v + 1), 500)
      return () => clearTimeout(t)
    } else {
      const t1 = setTimeout(() => setShowSubtitle(true), 200)
      const t2 = setTimeout(() => setShowStats(true), 450)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
  }, [visibleCount])

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
      {/* Floating background tokens */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
        {BG_TOKENS.map((tok, i) => (
          <span
            key={tok + i}
            className="absolute font-mono text-xs text-slate-700 animate-float"
            style={{
              left: `${((i * 17 + 5) % 92) + 2}%`,
              top: `${((i * 13 + 8) % 82) + 5}%`,
              animationDelay: `${(i * 0.8) % 6}s`,
              animationDuration: `${8 + (i % 6) * 1.5}s`,
            }}
          >
            {tok}
          </span>
        ))}
      </div>

      <div className="relative z-10">
        {/* Terminal init line */}
        <div className="font-mono text-sm text-accent-600 mb-6 flex items-center gap-1">
          <span>$ linguistic-engineer --init</span>
          <span
            className={`text-primary-500 ml-1 transition-opacity duration-75 ${
              showCursor ? 'opacity-100' : 'opacity-0'
            }`}
          >
            ▊
          </span>
        </div>

        {/* Main heading with token reveal */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          {HERO_TOKENS.map((token, i) => (
            <TokenWord key={i} token={token} visible={i < visibleCount} />
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className={`font-mono text-slate-500 text-base mb-8 transition-all duration-500 ${
            showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <span className="text-slate-700">{'// '}</span>
          개발 경험과 연구를 언어로 정리합니다
        </p>

        {/* Stats */}
        <div
          className={`flex items-center gap-6 transition-all duration-500 ${
            showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-2xl text-primary-400">{postCount}</span>
            <span className="font-mono text-sm text-slate-500">posts</span>
          </div>
          <span className="text-slate-700 font-mono">|</span>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-2xl text-accent-500">{categoryCount}</span>
            <span className="font-mono text-sm text-slate-500">categories</span>
          </div>
        </div>
      </div>
    </section>
  )
}
