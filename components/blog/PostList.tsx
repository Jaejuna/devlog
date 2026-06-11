import type { PostMeta } from '@/lib/types'
import PostCard from './PostCard'
import AdInFeed from '@/components/ads/AdInFeed'

interface PostListProps {
  posts: PostMeta[]
  adClient?: string
  adSlot?: string
  locale?: string
}

export default function PostList({ posts, adClient, adSlot, locale = 'ko' }: PostListProps) {
  return (
    <div className="flex flex-col">
      {posts.map((post, index) => (
        <>
          <PostCard key={post.slug} post={post} locale={locale} />
          {index === 1 && (
            <AdInFeed key="ad-infeed" adClient={adClient} adSlot={adSlot} />
          )}
        </>
      ))}
    </div>
  )
}
