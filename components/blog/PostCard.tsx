import Link from 'next/link'
import Image from 'next/image'
import type { PostMeta } from '@/lib/types'
import { translateTag } from '@/lib/tagTranslations'

interface PostCardProps {
  post: PostMeta
  locale?: string
}

function formatDate(dateString: string, locale: string): string {
  return new Date(dateString).toLocaleDateString(
    locale === 'en' ? 'en-US' : 'ko-KR',
    { year: 'numeric', month: '2-digit', day: '2-digit' },
  )
}

export default function PostCard({ post, locale = 'ko' }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="relative py-5 border-b border-slate-800/60">
        {/* Amber left accent line */}
        <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-slate-800 group-hover:bg-primary-500/60 transition-all duration-300 rounded-full" />

        <div className="flex gap-4 pl-4">
          {/* Text content */}
          <div className="flex-1 min-w-0">
            {/* Meta */}
            <div className="flex items-center gap-2 mb-2 font-mono text-xs">
              <span className="text-accent-500/80 bg-accent-900/10 border border-accent-800/20 px-1.5 py-0.5 rounded">
                [{post.category}]
              </span>
              <span className="text-slate-700">·</span>
              <time dateTime={post.date} className="text-slate-500">
                {formatDate(post.date, locale)}
              </time>
              <span className="text-slate-700">·</span>
              <span className="text-slate-500">{post.readTime}min</span>
            </div>

            {/* Title */}
            <h2 className="text-base font-bold text-slate-200 mb-1.5 leading-snug line-clamp-2 group-hover:text-primary-400 transition-colors duration-150">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-3">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-slate-500 bg-slate-800/40 border border-slate-700/30 px-1.5 py-0.5 rounded"
                  >
                    #{translateTag(tag, locale)}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail */}
          {post.thumbnail && (
            <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-slate-800 self-center border border-slate-700/30">
              <Image
                src={post.thumbnail}
                alt={post.title}
                width={96}
                height={96}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
