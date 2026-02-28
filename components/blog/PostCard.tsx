import type { PostMeta } from '@/lib/types'

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <div>
      <h2>{post.title}</h2>
    </div>
  )
}
