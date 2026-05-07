import { getViews, incrementViews, incrementVisits } from '@/lib/redis'
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
  const [views] = await Promise.all([incrementViews(params.slug), incrementVisits()])
  return NextResponse.json({ views })
}
