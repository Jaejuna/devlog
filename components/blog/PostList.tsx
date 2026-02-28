import type { PostMeta } from '@/lib/types'
import PostCard from './PostCard'

export default function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
