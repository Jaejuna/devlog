import type { Metadata } from 'next'
import Image from 'next/image'
import { getAllPosts } from '@/lib/mdx'
import PostCard from '@/components/blog/PostCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '소개',
  description: '개발자 블로그 devlog.의 소개 페이지입니다.',
}

const techStack = [
  {
    category: 'Data Science',
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'PyTorch', 'Jupyter'],
  },
  {
    category: 'AI',
    skills: ['LangChain', 'HuggingFace', 'RAG', 'Fine-tuning', 'Prompt Engineering'],
  },
  {
    category: 'Backend',
    skills: ['FastAPI', 'PostgreSQL', 'Redis', 'API', 'SQL'],
  },
  {
    category: 'DevOps & 인프라',
    skills: ['Docker', 'GitHub Actions', 'AWS', 'Linux', 'Git'],
  },
]

export default function AboutPage() {
  const recentPosts = getAllPosts().slice(0, 3)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* 자기소개 */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* 프로필 사진 */}
          <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 relative">
            <Image
              src="/blog-profile.png"
              alt="프로필 사진"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              J's Devlog
            </h1>
            <p className="text-primary-600 dark:text-primary-400 font-medium mb-4">
              devlog.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Data Science, AI, 시스템 개발을 공부하는 개발자의 기술 블로그입니다. <br />
              배운 개념을 직접 정리하고, 실험한 결과를 솔직하게 기록합니다.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              이론부터 실습, 설계, 운영까지 — 관심 가는 건 다 파고듭니다.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://github.com/Jaejuna"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/jaejun-jung-37107a293/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="mailto:anayana9988@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.364l-6.545-4.636v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.273l6.545-4.636 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
                  <path d="M0 5.457v13.909c0 .904.732 1.636 1.636 1.636h3.819V11.73L0 7.64V5.457z" fill="#34A853"/>
                  <path d="M24 5.457v2.183l-5.455 4.09v9.636h3.819A1.636 1.636 0 0 0 24 19.366V5.457z" fill="#4285F4"/>
                  <path d="M0 7.64l5.455 4.09V4.64L3.927 3.493C2.309 2.28 0 3.434 0 5.457V7.64z" fill="#FBBC05"/>
                  <path d="M24 7.64l-5.455 4.09V4.64l1.528-1.147C21.69 2.28 24 3.434 24 5.457V7.64z" fill="#EA4335"/>
                </svg>
                Gmail
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 기술 스택 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          기술 스택
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techStack.map((group) => (
            <div
              key={group.category}
              className="p-5 border border-gray-200 dark:border-gray-800 rounded-xl"
            >
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 최근 포스트 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            최근 포스트
          </h2>
          <Link
            href="/"
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}
