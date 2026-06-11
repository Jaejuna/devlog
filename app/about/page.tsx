import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '소개 | devlog',
  description: 'Localization Engineer & PM @ Nexon Korea — LLM 번역·평가 연구',
}

// ── 데이터 ─────────────────────────────────────────────────────────────────

const EXPERIENCE: {
  role: string
  company: string
  period: string
  type?: string
  desc?: string
  bullets?: string[]
  tags?: string[]
}[] = [
  {
    role: 'Localization PM & Engineer',
    company: 'Nexon Korea',
    period: 'Jul 2024 — 현재',
    type: 'Full-time',
    bullets: [
      'MapleStory: Idle RPG — 텍스트 데이터 관리, 예산·일정 컨트롤, 다국어 번역 벤더 코디네이션',
      'LLM Translation System — RAG 기반 클라우드 플랫폼으로 다국어 게임 텍스트 번역·평가 시스템 개발',
      'Domain Specific Benchmark — HITL 파이프라인이 포함된 게임 도메인 번역 벤치마크 시스템 설계 및 개발',
    ],
    tags: ['Localization Engineering', 'LLM', 'RAG', 'HITL', 'AWS'],
  },
  {
    role: 'Localization Engineer',
    company: 'Nexon Korea',
    period: 'Jan 2024 — Jul 2024',
    type: 'Internship',
    tags: ['Project Planning', 'Project Management', 'L10N'],
  },
  {
    role: 'Research Assistant',
    company: 'Hanyang University · MILab',
    period: 'Jan 2023 — Dec 2023',
    type: 'Internship',
    desc: 'Multimodal Intelligence and Interaction Group (ERICA)',
    tags: ['Data Analysis', 'Machine Learning', 'Multimodal AI'],
  },
]

const EDUCATION: {
  degree: string
  school: string
  dept: string
  period: string
  desc?: string
}[] = [
  {
    degree: 'B.A.',
    school: 'Hanyang University ERICA',
    dept: 'French Studies',
    period: 'Mar 2017 — Feb 2024',
  },
  {
    degree: 'B.S. (Dual)',
    school: 'Hanyang University ERICA',
    dept: 'Software Engineering',
    period: 'Mar 2017 — Feb 2024',
  },
]

const CERTIFICATIONS: {
  name: string
  issuer: string
  date: string
  expires?: string
  credentialId?: string
}[] = [
  {
    name: 'Hugging Face Agents Course',
    issuer: 'Hugging Face',
    date: 'Feb 2026',
    credentialId: 'jajuna99',
  },
  {
    name: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Jan 2026',
    expires: 'Jan 2029',
  },
  {
    name: 'Azure AI Fundamentals',
    issuer: 'Microsoft',
    date: 'Dec 2024',
    credentialId: 'BEB321926F561C6E',
  },
  {
    name: 'Google Analytics Certification',
    issuer: 'Google',
    date: 'Feb 2025',
    expires: 'Feb 2026',
  },
]

const PUBLICATIONS: {
  title: string
  venue: string
  year: string
  link?: string
}[] = [
  {
    title: 'Speech-Gesture Recognition Model for Intuitive Control of Industrial Rail Robots',
    venue: 'The 19th Korea Robotics Society Annual Conference (KRoC 2024)',
    year: 'Jan 2024',
  },
]

const ACTIVITIES: {
  title: string
  period: string
  role?: string
  desc?: string
  link?: string
  award?: string
}[] = [
  {
    title: 'Pseudo Lab — A S-class Translation System',
    period: 'Mar 2026 — 현재',
    role: '12th Member as Runner',
    desc: '일반 LLM을 넘어서는 한국 문화 콘텐츠 번역 시스템 구축 연구',
  },
  {
    title: 'KakaoImpact × Modulabs — B-Peach LAB',
    period: 'Jul 2025 — Jan 2026',
    role: 'AI Dev Leader (2nd Member)',
    desc: '사회적 취약계층의 정보 격차 해소를 위한 AI 적응형 서비스 개발',
  },
  {
    title: 'ABB Hackathon',
    period: '2024',
    award: '🥈 2nd place — AI Business Development Division',
    desc: 'AI/빅데이터/블록체인 해커톤',
  },
  {
    title: 'NDC Monlakethon',
    period: 'NDC 2024',
    award: '5th place — Idea Division',
    desc: 'Nexon Developers Conference 2024',
  },
  {
    title: 'Peer Tutor',
    period: 'Mar 2021 — Jul 2021',
    role: 'Hanyang University · Hanmille',
    desc: '외국인 유학생 대상 동료 튜터링',
  },
]

const ORGANIZATIONS: {
  name: string
  role?: string
  period: string
  desc?: string
  affiliation?: string
}[] = [
  {
    name: 'BOAZ',
    role: '20th Member · Data Analysis Part',
    period: 'Jan 2023 — Feb 2024',
    desc: 'Inter-university Big Data club',
  },
  {
    name: 'Typhoon',
    role: 'Tech Leader',
    period: 'Mar 2019 — Feb 2024',
    affiliation: 'Hanyang University',
    desc: 'Central Club · Basketball',
  },
]

const SKILLS = [
  {
    label: 'Localization',
    items: ['L10N', 'I18N', 'TMS', 'Game Localization', 'CAT Tools', 'Vendor Management'],
  },
  {
    label: 'AI / ML',
    items: ['LLM', 'RAG', 'Fine-tuning', 'Prompt Engineering', 'HuggingFace', 'Azure AI'],
  },
  {
    label: 'Data & Backend',
    items: ['Python', 'FastAPI', 'PostgreSQL', 'Pandas', 'PyTorch', 'SQL'],
  },
  {
    label: 'Infra',
    items: ['AWS', 'Docker', 'GitHub Actions', 'Snowflake', 'Linux', 'Git'],
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
      <div className="flex-1 pb-7">{children}</div>
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
              <p className="font-mono text-sm text-accent-400 mt-0.5">Localization Engineer & PM · Linguistic Engineer</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
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
            Nexon Korea에서 게임 현지화 PM·엔지니어로 일합니다.
            한국 문화 콘텐츠를 위한 LLM 번역·평가 시스템을 연구하고,
            언어와 AI, 엔지니어링이 교차하는 지점을 탐구합니다.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <span className="font-mono text-xs text-slate-500">
              <span className="text-accent-700">❯</span> Pangyo, South Korea
            </span>
            <span className="font-mono text-xs text-slate-500">
              <span className="text-accent-700">❯</span> Nexon Korea
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
                  <p className="font-mono text-xs text-accent-500 mt-0.5">
                    {exp.company}
                    {exp.type && (
                      <span className="text-slate-700 ml-2">· {exp.type}</span>
                    )}
                  </p>
                </div>
                <span className="font-mono text-xs text-slate-600">{exp.period}</span>
              </div>
              {exp.desc && (
                <p className="text-sm text-slate-400 leading-relaxed mt-1 mb-2">{exp.desc}</p>
              )}
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="mt-2 mb-2 space-y-1.5">
                  {exp.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-slate-400 leading-relaxed">
                      <span className="text-accent-700 mt-0.5 flex-shrink-0">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {exp.tags && exp.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs text-slate-500 bg-slate-800/40 border border-slate-800/60 px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </TimelineItem>
          ))}
        </div>
      </section>

      {/* ── 학력 ───────────────────────────────────── */}
      <section className="mb-10 pb-10 border-b border-slate-800/60">
        <SectionHeader label="education" />
        <div>
          {EDUCATION.map((edu, i) => (
            <TimelineItem key={edu.degree + edu.dept} isLast={i === EDUCATION.length - 1}>
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

      {/* ── 자격증 ─────────────────────────────────── */}
      <section className="mb-10 pb-10 border-b border-slate-800/60">
        <SectionHeader label="certifications" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.name}
              className="p-4 rounded-lg border border-slate-800/60 bg-slate-900/20"
            >
              <p className="text-sm font-medium text-slate-200 mb-1">{cert.name}</p>
              <p className="font-mono text-xs text-accent-500">{cert.issuer}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-mono text-xs text-slate-600">{cert.date}</span>
                {cert.expires && (
                  <>
                    <span className="text-slate-800 font-mono text-xs">·</span>
                    <span className="font-mono text-xs text-slate-700">exp {cert.expires}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 논문 ───────────────────────────────────── */}
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
                    <p className="font-mono text-xs text-accent-500 mt-1">{pub.venue}</p>
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
                  {act.role && (
                    <p className="font-mono text-xs text-accent-500 mt-0.5">{act.role}</p>
                  )}
                  {act.award && (
                    <p className="font-mono text-xs text-primary-400 mt-0.5">{act.award}</p>
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

      {/* ── 조직 ───────────────────────────────────── */}
      <section className="mb-10 pb-10 border-b border-slate-800/60">
        <SectionHeader label="organizations" />
        <div>
          {ORGANIZATIONS.map((org, i) => (
            <TimelineItem key={org.name} isLast={i === ORGANIZATIONS.length - 1}>
              <div className="flex items-start justify-between flex-wrap gap-1 mb-1">
                <div>
                  <p className="text-sm font-semibold text-slate-200">{org.name}</p>
                  {org.role && (
                    <p className="font-mono text-xs text-accent-500 mt-0.5">{org.role}</p>
                  )}
                  {org.affiliation && (
                    <p className="font-mono text-xs text-slate-600 mt-0.5">{org.affiliation}</p>
                  )}
                </div>
                <span className="font-mono text-xs text-slate-600">{org.period}</span>
              </div>
              {org.desc && (
                <p className="text-sm text-slate-400 leading-relaxed mt-1">{org.desc}</p>
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
