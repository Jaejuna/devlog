import Link from 'next/link'
import Image from 'next/image'
import type { PostMeta } from '@/lib/types'
import Tag from '@/components/ui/Tag'

interface PostCardProps {
  post: PostMeta
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="py-5 border-b border-gray-100 dark:border-gray-800 -mx-2 px-2 rounded-lg hover:bg-gray-50/80 dark:hover:bg-gray-900/50 transition-colors duration-150">
        <div className="flex gap-4">
          {/* Text content */}
          <div className="flex-1 min-w-0">
            {/* Meta: category · date · readTime */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                {post.category}
              </span>
              <span className="text-gray-300 dark:text-gray-700">·</span>
              <time dateTime={post.date} className="text-xs text-gray-400 dark:text-gray-500">
                {formatDate(post.date)}
              </time>
              <span className="text-gray-300 dark:text-gray-700">·</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">{post.readTime}분 읽기</span>
            </div>

            {/* Title */}
            <h2 className="text-[17px] font-bold text-gray-900 dark:text-white mb-1.5 leading-snug line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-3">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 5).map((tag) => (
                  <Tag key={tag} variant="gray">
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail */}
          {post.thumbnail && (
            <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 self-center">
              <Image
                src={post.thumbnail}
                alt={post.title}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
