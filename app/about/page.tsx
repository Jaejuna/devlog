import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx'
import PostCard from '@/components/blog/PostCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '소개',
  description: '개발자 블로그 devlog.의 소개 페이지입니다.',
}

const techStack = [
  { category: 'Frontend', skills: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'] },
  { category: 'Backend', skills: ['Node.js', 'Express', 'PostgreSQL', 'Redis'] },
  { category: 'DevOps', skills: ['Docker', 'GitHub Actions', 'Vercel', 'AWS'] },
  { category: 'Tools', skills: ['Git', 'VS Code', 'Figma', 'Notion'] },
]

export default function AboutPage() {
  const recentPosts = getAllPosts().slice(0, 3)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* 자기소개 */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* 아바타 자리 */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
            <span className="text-4xl text-white font-bold">D</span>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              개발자 블로그
            </h1>
            <p className="text-primary-600 dark:text-primary-400 font-medium mb-4">
              devlog.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              개발 경험과 면접 준비 콘텐츠를 다루는 개인 기술 블로그입니다.
              프론트엔드 개발을 중심으로 다양한 기술 스택을 탐구하고, 배운 것을
              글로 정리합니다.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              CS 기초부터 최신 프레임워크까지, 실무에서 마주치는 문제와
              해결책을 솔직하게 공유합니다.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://github.com"
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
