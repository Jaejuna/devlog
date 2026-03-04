const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

function authHeaders() {
  return { Authorization: `Bearer ${REDIS_TOKEN ?? ''}` }
}

export async function getViews(slug: string): Promise<number> {
  if (!REDIS_URL || !REDIS_TOKEN) return 0
  try {
    const res = await fetch(`${REDIS_URL}/get/views:${slug}`, {
      headers: authHeaders(),
      next: { revalidate: 60 },
    })
    const { result } = await res.json()
    return Number(result ?? 0)
  } catch {
    return 0
  }
}

export async function incrementViews(slug: string): Promise<number> {
  if (!REDIS_URL || !REDIS_TOKEN) return 0
  try {
    const res = await fetch(`${REDIS_URL}/incr/views:${slug}`, {
      method: 'POST',
      headers: authHeaders(),
    })
    const { result } = await res.json()
    return Number(result ?? 0)
  } catch {
    return 0
  }
}

export async function getTotalViews(slugs: string[]): Promise<number> {
  if (!REDIS_URL || !REDIS_TOKEN || slugs.length === 0) return 0
  try {
    const res = await fetch(`${REDIS_URL}/pipeline`, {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify([['MGET', ...slugs.map((s) => `views:${s}`)]]),
      next: { revalidate: 60 },
    })
    const data = await res.json()
    const values: (number | null)[] = data[0]?.result ?? []
    return values.reduce((sum: number, v) => sum + Number(v ?? 0), 0)
  } catch {
    return 0
  }
}
