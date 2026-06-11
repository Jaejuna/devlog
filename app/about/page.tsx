import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '소개 | devlog',
  description: 'Linguistic Engineer — 언어와 시스템의 교차점에서 일합니다.',
}

// ── 데이터 ─────────────────────────────────────────────────────────────────
// 아래 배열에 항목을 추가하면 자동으로 섹션에 렌더링됩니다.

const EXPERIENCE = [
  {
    role: 'AI/ML Engineer',
    company: 'Nexon Korea',
    period: '2023 — 현재',
    desc: '현지화(L10N) · 국제화(I18N) 자동화를 위한 LLM 파이프라인 및 언어 처리 시스템 구축',
    tags: ['LLM', 'FastAPI', 'AWS', 'PostgreSQL'],
  },
  // 예시: 이전 경력은 아래에 추가
]

const EDUCATION = [
  {
    degree: '학사',
    school: '○○대학교',
    dept: '언어학과',
    period: '2019 — 2023',
    desc: '',
  },
]

const PUBLICATIONS = [
  // 예시:
  // {
  //   title: '논문 제목',
  //   venue: '학회 / 저널',
  //   year: '2023',
  //   link: 'https://...',
  // },
] as { title: string; venue: string; year: string; link?: string }[]

const ACTIVITIES = [
  {
    title: 'devlog · 기술 블로그 운영',
    period: '2024 — 현재',
    desc: 'AI, LLM, 개발 경험을 정리하는 개인 블로그. 월 방문자 성장 중.',
    link: 'https://j-devlog.space',
  },
  // 오픈소스 기여, 커뮤니티 활동 등 추가
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

// ── 서브 컴포넌트 ───────────────────────────────────────────────────────────

function SectionHeader({ label }: { label: string }) {
  return (
    <h2 className="font-mono text-xs text-slate-700 mb-5">
      {'// '}
      <span className="text-slate-500">{label}</span>
    </h2>
  )
}

function TimelineItem({
  children,
  isLast = false,
}: {
  children: React.ReactNode
  isLast?: boolean
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-2 h-2 rounded-full bg-accent-600 ring-2 ring-[#0a0e17] mt-1.5 flex-shrink-0" />
        {!isLast && <div className="w-px flex-1 bg-slate-800/60 mt-1" />}
      </div>
      <div className={`flex-1 pb-6 ${isLast ? '' : ''}`}>{children}</div>
    </div>
  )
}

// ── 페이지 ──────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      {/* ── 프로필 ─────────────────────────────────── */}
      <section className="flex flex-col sm:flex-row items-start gap-6 mb-10 pb-10 border-b border-slate-800/60">
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative ring-1 ring-slate-700/50">
          <Image src="/blog-profile.png" alt="Jaejuna 프로필" fill className="object-cover" priority />
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
                className="font-mono text-xs text-slate-500 hover:text-primary-400 border border-slate-800/60 hover:border-primary-800/40 px-2.5 py-1 rounded transition-all"
              >
                [github]
              </a>
              <a
                href="https://www.linkedin.com/in/jaejun-jung-37107a293/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-slate-500 hover:text-primary-400 border border-slate-800/60 hover:border-primary-800/40 px-2.5 py-1 rounded transition-all"
              >
                [linkedin]
              </a>
              <a
                href="mailto:anayana9988@gmail.com"
                className="font-mono text-xs text-slate-500 hover:text-primary-400 border border-slate-800/60 hover:border-primary-800/40 px-2.5 py-1 rounded transition-all"
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

          <div className="flex flex-wrap gap-4 mt-4">
            <span className="font-mono text-xs text-slate-500">
              <span className="text-accent-700">❯</span> Seoul, Korea
            </span>
            <span className="font-mono text-xs text-slate-500">
              <span className="text-accent-700">❯</span> Open to connect
            </span>
          </div>
        </div>
      </section>

      {/* ── 경력 ───────────────────────────────────── */}
      <section className="mb-10 pb-10 border-b border-slate-800/60">
        <SectionHeader label="experience" />
        <div>
          {EXPERIENCE.map((exp, i) => (
            <TimelineItem key={exp.company + exp.role} isLast={i === EXPERIENCE.length - 1}>
              <div className="flex items-start justify-between flex-wrap gap-1 mb-1">
                <div>
                  <p className="text-sm font-semibold text-slate-200">{exp.role}</p>
                  <p className="font-mono text-xs text-accent-500 mt-0.5">{exp.company}</p>
                </div>
                <span className="font-mono text-xs text-slate-600">{exp.period}</span>
              </div>
              {exp.desc && (
                <p className="text-sm text-slate-400 leading-relaxed mt-1 mb-2">{exp.desc}</p>
              )}
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
            </TimelineItem>
          ))}
        </div>
      </section>

      {/* ── 학력 ───────────────────────────────────── */}
      <section className="mb-10 pb-10 border-b border-slate-800/60">
        <SectionHeader label="education" />
        <div>
          {EDUCATION.map((edu, i) => (
            <TimelineItem key={edu.school + edu.degree} isLast={i === EDUCATION.length - 1}>
              <div className="flex items-start justify-between flex-wrap gap-1 mb-1">
                <div>
                  <p className="text-sm font-semibold text-slate-200">{edu.school}</p>
                  <p className="font-mono text-xs text-accent-500 mt-0.5">
                    {edu.degree} · {edu.dept}
                  </p>
                </div>
                <span className="font-mono text-xs text-slate-600">{edu.period}</span>
              </div>
              {edu.desc && (
                <p className="text-sm text-slate-400 leading-relaxed mt-1">{edu.desc}</p>
              )}
            </TimelineItem>
          ))}
        </div>
      </section>

      {/* ── 논문 / 발표 (항목이 있을 때만 렌더) ─────── */}
      {PUBLICATIONS.length > 0 && (
        <section className="mb-10 pb-10 border-b border-slate-800/60">
          <SectionHeader label="publications" />
          <div className="flex flex-col gap-3">
            {PUBLICATIONS.map((pub) => (
              <div
                key={pub.title}
                className="p-4 rounded-lg border border-slate-800/60 bg-slate-900/20"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    {pub.link ? (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-slate-200 hover:text-primary-400 transition-colors"
                      >
                        {pub.title}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-slate-200">{pub.title}</p>
                    )}
                    <p className="font-mono text-xs text-accent-500 mt-0.5">{pub.venue}</p>
                  </div>
                  <span className="font-mono text-xs text-slate-600 flex-shrink-0">{pub.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 활동 ───────────────────────────────────── */}
      <section className="mb-10 pb-10 border-b border-slate-800/60">
        <SectionHeader label="activities" />
        <div>
          {ACTIVITIES.map((act, i) => (
            <TimelineItem key={act.title} isLast={i === ACTIVITIES.length - 1}>
              <div className="flex items-start justify-between flex-wrap gap-1 mb-1">
                <div>
                  {act.link ? (
                    <a
                      href={act.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-slate-200 hover:text-primary-400 transition-colors"
                    >
                      {act.title}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-slate-200">{act.title}</p>
                  )}
                </div>
                <span className="font-mono text-xs text-slate-600">{act.period}</span>
              </div>
              {act.desc && (
                <p className="text-sm text-slate-400 leading-relaxed mt-1">{act.desc}</p>
              )}
            </TimelineItem>
          ))}
        </div>
      </section>

      {/* ── 스킬 ───────────────────────────────────── */}
      <section>
        <SectionHeader label="skills" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SKILLS.map((group) => (
            <div key={group.label} className="p-4 rounded-lg border border-slate-800/60 bg-slate-900/20">
              <p className="font-mono text-xs text-accent-500 mb-3">[{group.label}]</p>
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
    </div>
  )
}
