import { getVisitStats } from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function GET() {
  const stats = await getVisitStats()
  return NextResponse.json(stats)
}
