import Link from 'next/link'
import type { PostMeta } from '@/lib/types'
import Badge from '@/components/ui/Badge'
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
      <article className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        {/* Category + Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="purple">{post.category}</Badge>
          {post.tags.map((tag) => (
            <Tag key={tag} variant="blue">
              {tag}
            </Tag>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        {/* Meta: date + read time */}
        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readTime}분 읽기</span>
        </div>
      </article>
    </Link>
  )
}
