import type { PostMeta } from '@/lib/types'
import PostCard from './PostCard'
import AdInFeed from '@/components/ads/AdInFeed'

interface PostListProps {
  posts: PostMeta[]
  adClient?: string
  adSlot?: string
}

export default function PostList({ posts, adClient, adSlot }: PostListProps) {
  return (
    <div className="flex flex-col gap-6">
      {posts.map((post, index) => (
        <>
          <PostCard key={post.slug} post={post} />
          {index === 1 && (
            <AdInFeed key="ad-infeed" adClient={adClient} adSlot={adSlot} />
          )}
        </>
      ))}
    </div>
  )
}
