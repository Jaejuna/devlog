import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '소개 | devlog',
  description: 'Linguistic Engineer — 언어와 시스템의 교차점에서 일합니다.',
}

const EXPERIENCE = [
  {
    role: 'AI/ML Engineer',
    company: 'Nexon Korea',
    period: '2023 — 현재',
    desc: '현지화(L10N) · 국제화(I18N) 자동화를 위한 LLM 파이프라인 및 언어 처리 시스템 구축',
    tags: ['LLM', 'FastAPI', 'AWS', 'PostgreSQL'],
  },
]

const SKILLS = [
  {
    label: 'AI / ML',
    items: ['LLM', 'RAG', 'Fine-tuning', 'Prompt Engineering', 'LangChain', 'HuggingFace'],
  },
  {
    label: 'Data',
    items: ['Pandas', 'NumPy', 'Scikit-learn', 'PyTorch', 'SQL'],
  },
  {
    label: 'Backend',
    items: ['FastAPI', 'PostgreSQL', 'Redis', 'REST API'],
  },
  {
    label: 'Infra',
    items: ['Docker', 'AWS', 'GitHub Actions', 'Linux', 'Git'],
  },
]

const WRITING = [
  { title: 'Claude Code + RTK로 토큰 90% 절약하기', slug: 'rtk-token-killer' },
  { title: 'OAuth 2.0 / OIDC 완전 정복', slug: 'oauth-oidc' },
  { title: 'Slack Socket Mode로 실시간 봇 만들기', slug: 'slack-socket-mode' },
]

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      {/* ── Profile card ─────────────────────────────── */}
      <section className="flex flex-col sm:flex-row items-start gap-6 mb-10 pb-10 border-b border-slate-800/60">
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative ring-1 ring-slate-700/50">
          <Image
            src="/blog-profile.png"
            alt="Jaejuna 프로필"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-xl font-bold text-slate-100">재준 정 · Jaejuna</h1>
              <p className="font-mono text-sm text-accent-400 mt-0.5">Linguistic Engineer</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href="https://github.com/Jaejuna"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-slate-600 hover:text-primary-400 border border-slate-800/60 hover:border-primary-800/40 px-2.5 py-1 rounded transition-all"
              >
                [github]
              </a>
              <a
                href="https://www.linkedin.com/in/jaejun-jung-37107a293/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-slate-600 hover:text-primary-400 border border-slate-800/60 hover:border-primary-800/40 px-2.5 py-1 rounded transition-all"
              >
                [linkedin]
              </a>
              <a
                href="mailto:anayana9988@gmail.com"
                className="font-mono text-xs text-slate-600 hover:text-primary-400 border border-slate-800/60 hover:border-primary-800/40 px-2.5 py-1 rounded transition-all"
              >
                [email]
              </a>
            </div>
          </div>

          <p className="text-sm text-slate-400 mt-4 leading-relaxed">
            언어(Language)와 엔지니어링의 교차점에서 일합니다.
            현지화·국제화 자동화를 위한 LLM 파이프라인을 구축하고,
            자연어와 코드가 만나는 지점을 탐구합니다.
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            <span className="font-mono text-xs text-slate-600">
              <span className="text-accent-700">❯</span> Seoul, Korea
            </span>
            <span className="font-mono text-xs text-slate-600">
              <span className="text-accent-700">❯</span> Open to connect
            </span>
          </div>
        </div>
      </section>

      {/* ── Experience ───────────────────────────────── */}
      <section className="mb-10 pb-10 border-b border-slate-800/60">
        <h2 className="font-mono text-xs text-slate-700 mb-5">{'// experience'}</h2>
        <div className="flex flex-col gap-5">
          {EXPERIENCE.map((exp) => (
            <div key={exp.company} className="flex gap-5">
              <div className="w-1 flex-shrink-0 bg-accent-900/30 rounded-full relative">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-600 ring-2 ring-[#0a0e17]" />
              </div>
              <div className="flex-1 pb-1">
                <div className="flex items-start justify-between flex-wrap gap-1 mb-1">
                  <div>
                    <p className="text-sm font-semibold text-slate-200">{exp.role}</p>
                    <p className="font-mono text-xs text-accent-600">{exp.company}</p>
                  </div>
                  <span className="font-mono text-xs text-slate-700">{exp.period}</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-2">{exp.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs text-slate-500 bg-slate-800/40 border border-slate-800/60 px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────── */}
      <section className="mb-10 pb-10 border-b border-slate-800/60">
        <h2 className="font-mono text-xs text-slate-700 mb-5">{'// skills'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKILLS.map((group) => (
            <div
              key={group.label}
              className="p-4 rounded-lg border border-slate-800/60 bg-slate-900/20"
            >
              <p className="font-mono text-xs text-accent-600 mb-3">[{group.label}]</p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Writing ──────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-mono text-xs text-slate-700">{'// writing'}</h2>
          <Link href="/" className="font-mono text-xs text-slate-700 hover:text-primary-400 transition-colors">
            전체 →
          </Link>
        </div>
        <ul className="flex flex-col gap-2">
          {WRITING.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-800/40 bg-slate-900/10 hover:border-slate-700/60 hover:bg-slate-800/20 transition-all"
              >
                <span className="font-mono text-xs text-slate-700 group-hover:text-primary-500 transition-colors">
                  ↳
                </span>
                <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                  {post.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
