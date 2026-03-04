import { getTotalViews } from '@/lib/redis'
import { getAllPosts } from '@/lib/mdx'
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = getAllPosts()
  const total = await getTotalViews(posts.map((p) => p.slug))
  return NextResponse.json({ total })
}
