import { getViews, incrementViews } from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const views = await getViews(params.slug)
  return NextResponse.json({ views })
}

export async function POST(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const views = await incrementViews(params.slug)
  return NextResponse.json({ views })
}
